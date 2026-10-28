"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ListBooks from "./components/ListBooks";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Book {
  id?: number;
  title: string;
  author?: string;
  category: string;
  cover_url: string;
  description?: string;
}

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("http://localhost:5000/api/books");

        if (!response.ok) {
          throw new Error("Gagal mengambil data buku dari server");
        }

        const data = await response.json();

        setBooks(Array.isArray(data) ? data : data.data || []);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan koneksi");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#61A3E2] flex flex-col pt-18">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
      />

      <main className="flex-1 bg-white px-8 py-8 mt-5 flex flex-col gap-10 shadow-inner">
        <div className="w-full h-64 bg-[#EBF3FC] rounded-3xl shadow-sm border border-blue-50 flex items-center justify-center relative overflow-hidden">
          <img
            src="/thumbnail.jpeg"
            alt="Featured Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {loading && (
          <div className="text-center text-gray-500 py-4">
            Memuat data buku dari backend...
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl text-center text-sm">
            {error} (Pastikan server backend port 5000 aktif)
          </div>
        )}

        {!loading && !error && (
          <>
            <ListBooks title="Rekomendasi" books={filteredBooks} />
            <ListBooks title="Rekomendasi Lainnya" books={filteredBooks} />
          </>
        )}
      </main>
      <button
        onClick={() => router.push("/daftarbooks")}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-2xl flex items-center justify-center text-gray-900 shadow-xl hover:opacity-90 transition-all cursor-pointer active:scale-95"
        style={{ backgroundColor: "#C4D664" }}
      >
        <Plus size={32} strokeWidth={2.5} />
      </button>
    </div>
  );
}
