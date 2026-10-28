import { Plus } from "lucide-react";
import Image from "next/image";

interface Book {
  id?: number;
  title: string;
  author?: string;
  category: string;
  cover_url: string;
  description?: string;
}

interface ListBooksProps {
  title: string;
  books: Book[];
}

export default function ListBooks({ title, books }: ListBooksProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      
      {books.length === 0 ? (
        <p className="text-sm text-gray-400">Tidak ada buku yang ditemukan.</p>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200">
          {books.map((book, index) => (
            <div 
              key={book.id || index} 
              className="w-48 flex-shrink-0 bg-[#EBF3FC]/60 border border-blue-100/60 rounded-2xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all"
            >

              <div className="w-full h-60 relative rounded-xl overflow-hidden bg-white shadow-sm">
                <Image
                  src={book.cover_url || "https://image.gramedia.net/rs:fit:0:0:f:webp/plain/https://cdn.gramedia.net/uploads/picture_meta/2023/10/25/qnyuvkkqd8n6wfhwldgi9.jpg"}
                  alt={book.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold text-gray-800 truncate" title={book.title}>
                  {book.title}
                </h3>
                <span 
                  className="w-fit px-2.5 py-0.5 text-[10px] font-semibold text-gray-700 rounded-full shadow-xs truncate max-w-full" 
                  style={{ backgroundColor: "#C4D664" }}
                >
                  {book.category}
                </span>
              </div>
            </div>
          ))}

          <div className="w-16 flex-shrink-0 flex items-center justify-center">
            <button className="w-12 h-12 rounded-full bg-[#EBF3FC] border border-blue-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 transition-all shadow-sm cursor-pointer">
              <Plus size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}