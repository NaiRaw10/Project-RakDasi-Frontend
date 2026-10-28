import { ArrowLeft, Plus, Trash2, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Book {
  id?: number;
  title: string;
  author?: string;
  category: string;
  cover_url: string;
  description?: string;
}

interface DaftarBukuProps {
  books: Book[];
  loading: boolean;
  error: string;
  onDelete: (id?: number) => void;
  onOpenAddModal: () => void; 
  onOpenEditModal: (book: Book) => void; 
}

export default function DaftarBuku({ 
  books, 
  loading, 
  error, 
  onDelete, 
  onOpenAddModal, 
  onOpenEditModal 
}: DaftarBukuProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full bg-[#61A3E2] px-8 py-6 flex items-center gap-6 shadow-sm">
        <Link
          href="/"
          className="w-10 h-10 rounded-full bg-[#C4D664] flex items-center justify-center text-gray-800 shadow-sm hover:opacity-90 transition-all cursor-pointer"
        >
          <ArrowLeft size={22} />
        </Link>
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Daftar Buku
        </h1>
      </header>

      <main className="flex-1 px-10 py-8 flex flex-col gap-8 max-w-8xl mx-auto w-full">
        
        <div className="w-fit">
          <button
            onClick={onOpenAddModal}
            className="w-12 h-12 rounded-xl bg-[#C4D664] flex items-center justify-center text-gray-900 shadow-md hover:opacity-90 transition-all cursor-pointer active:scale-95"
          >
            <Plus size={24} strokeWidth={2.5} />
          </button>
        </div>

        {loading && <p className="text-gray-500 text-center py-6">Memuat daftar buku...</p>}
        {error && <p className="text-red-500 text-center py-6">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <div
                key={book.id || index}
                className="bg-white border border-blue-200/80 rounded-3xl p-5 flex gap-4 shadow-sm hover:shadow-md transition-all relative"
              >
                <div className="w-32 h-44 relative rounded-2xl overflow-hidden bg-blue-50 flex-shrink-0 shadow-inner">
                  <Image
                    src={book.cover_url || "https://image.gramedia.net/rs:fit:0:0:f:webp/plain/https://cdn.gramedia.net/uploads/picture_meta/2023/10/25/qnyuvkkqd8n6wfhwldgi9.jpg"}
                    alt={book.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <h3 className="text-base font-bold text-gray-800 line-clamp-2">
                    {book.title}
                  </h3>

                  <div className="flex items-center justify-end gap-3 self-end">
                    <button
                      onClick={() => onDelete(book.id)}
                      className="w-10 h-10 rounded-full bg-[#FF6B6B] flex items-center justify-center text-white shadow-sm hover:opacity-90 transition-all cursor-pointer"
                      title="Hapus Buku"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => onOpenEditModal(book)}
                      className="w-10 h-10 rounded-full bg-[#C4D664] flex items-center justify-center text-gray-900 shadow-sm hover:opacity-90 transition-all cursor-pointer"
                      title="Edit Buku"
                    >
                      <Pencil size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}