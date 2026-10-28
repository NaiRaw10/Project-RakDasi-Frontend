'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

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
  const id = searchParams.get('id');

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
        const result = await response.json();
        setBook(result.data); // Mengambil dari bungkus properti "data" backend
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
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full bg-[#61A3E2] px-8 py-5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-[#C4D664] flex items-center justify-center text-gray-800 shadow-sm hover:opacity-90 transition-all cursor-pointer"
          >
            <ArrowLeft size={22} />
          </Link>
          <span className="text-2xl font-bold text-white tracking-wider">
            RakDasi
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-14 w-full">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-[320px] h-[450px] relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex-shrink-0 bg-gray-50">
            <Image
              src={book.cover_url || "https://image.gramedia.net/rs:fit:0:0:f:webp/plain/https://cdn.gramedia.net/uploads/picture_meta/2023/10/25/qnyuvkkqd8n6wfhwldgi9.jpg"}
              alt={book.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              {book.title}
            </h1>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-gray-900">Description</h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {book.description || 'Deskripsi belum tersedia.'}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <h2 className="text-xl font-bold text-gray-900">Detail Book</h2>
              <div className="grid grid-cols-3 gap-8 max-w-lg">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Author</p>
                  <p className="font-semibold text-gray-800">{book.author || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Page</p>
                  <p className="font-semibold text-gray-800">{book.page || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p className="font-semibold text-gray-800">{book.category || '-'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}