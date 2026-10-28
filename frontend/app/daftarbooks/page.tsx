"use client";

import { useState, useEffect } from "react";
import DaftarBuku from "./DaftarBuku";
import BookFormModal from "./BookFormModal";

interface Book {
  id?: number;
  title: string;
  author?: string;
  page?: string | number;
  category: string;
  cover_url: string;
  description?: string;
}

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        if (!response.ok) throw new Error("Gagal mengambil data buku");
        const data = await response.json();
        setBooks(Array.isArray(data) ? data : data.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const openAddModal = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const openEditModal = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
  };

  const handleSaveBook = async (bookData: Book) => {
    setIsSaving(true);
    try {
      // Ambil token yang tersimpan saat login
      const token = localStorage.getItem("token");
      if (!token) {
        alert(
          "Sesi habis atau token tidak ditemukan. Silakan login ulang sebagai admin.",
        );
        return;
      }

      const isEditing = !!bookData.id;
      const url = isEditing
        ? `http://localhost:5000/api/books/${bookData.id}`
        : "http://localhost:5000/api/books";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <-- Sertakan token di sini
        },
        body: JSON.stringify(bookData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menyimpan buku");
      }

      // Ambil data buku terbaru dari respons backend
      const updatedOrNewBook = result.data || bookData;

      if (isEditing) {
        setBooks(
          books.map((b) =>
            b.id === updatedOrNewBook.id ? updatedOrNewBook : b,
          ),
        );
      } else {
        setBooks([updatedOrNewBook, ...books]);
      }

      alert(
        isEditing ? "Buku berhasil diupdate!" : "Buku berhasil ditambahkan!",
      );
      closeModal();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id?: number) => {
    if (!id) return;
    if (confirm("Apakah kamu yakin ingin menghapus buku ini?")) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Akses ditolak! Token tidak ditemukan.");
        return;
      }

      fetch(`http://localhost:5000/api/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          if (res.ok) {
            setBooks(books.filter((book) => book.id !== id));
            alert("Buku berhasil dihapus.");
          } else {
            const data = await res.json();
            alert(data.message || "Gagal menghapus buku.");
          }
        })
        .catch(() => alert("Terjadi kesalahan koneksi saat menghapus."));
    }
  };

  return (
    <>
      <DaftarBuku
        books={books}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        onOpenAddModal={openAddModal}
        onOpenEditModal={openEditModal}
      />

      <BookFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        bookToEdit={editingBook}
        onSave={(bookData) => {
          handleSaveBook({ ...bookData, cover_url: bookData.cover_url ?? "" });
        }}
        isSaving={isSaving}
      />
    </>
  );
}
