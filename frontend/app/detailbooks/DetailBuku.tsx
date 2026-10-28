'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  author: string;
  page: string | number;
  category: string;
  description: string;
  cover_url: string;
}

export default function DetailBuku() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Mengambil ID dari URL, contoh: /detailbooks?id=1

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('ID buku tidak ditemukan.');
      return;
    }

    const fetchBookDetail = async () => {
      try {
        const response = await fetch(`${API_URL}/books/${id}`);
        if (!response.ok) {
          throw new Error('Gagal mengambil data detail buku dari server.');
        }
        const data = await response.json();
        setBook(data);
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id, API_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-lg font-medium">Memuat detail buku...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <p className="text-red-500 text-lg font-medium mb-4">{error || 'Buku tidak ditemukan.'}</p>
        <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Atas */}
      <header className="w-full bg-[#4A90E2] px-6 py-4 flex items-center justify-between shadow-md">
        <Link href="/" className="text-white text-2xl font-bold tracking-wider">
          RakDasi
        </Link>
        <div className="flex items-center gap-4 w-1/3">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-full bg-gray-100 text-gray-700 focus:outline-none shadow-inner"
            disabled
          />
        </div>
        <div className="flex items-center gap-3">
          <Link href="/logins" className="px-5 py-2 bg-white text-gray-700 font-medium rounded-lg shadow hover:bg-gray-50 transition">
            Masuk
          </Link>
          <Link href="/regis" className="px-5 py-2 bg-[#F5E663] text-gray-800 font-medium rounded-lg shadow hover:bg-[#ebd947] transition">
            Daftar
          </Link>
        </div>
      </header>

      {/* Konten Detail Buku */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Cover Buku di Kiri */}
          <div className="w-full md:w-[320px] flex-shrink-0">
            <img
              src={book.cover_url || '/placeholder-book.jpg'}
              alt={book.title}
              className="w-full h-[450px] object-cover rounded-2xl shadow-xl border border-gray-100"
            />
          </div>

          {/* Informasi Detail di Kanan */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{book.title}</h1>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {book.description || 'Tidak ada deskripsi untuk buku ini.'}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Detail Book</h2>
              <div className="grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Author</p>
                  <p className="font-medium text-gray-800">{book.author}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Page</p>
                  <p className="font-medium text-gray-800">{book.page}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p className="font-medium text-gray-800">{book.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}