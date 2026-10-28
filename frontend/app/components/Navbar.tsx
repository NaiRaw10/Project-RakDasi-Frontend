"use client";

import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
}

export default function Navbar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
}: NavbarProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    if (confirm("Apakah kamu ingin keluar akun?")) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      router.push("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-8 py-6 flex items-center justify-between bg-[#61A3E2] shadow-sm">
      <div
        className="text-3xl text-white tracking-wider cursor-pointer"
        onClick={() => router.push("/")}
        style={{ fontFamily: '"Macondo Swash Caps", cursive' }}
      >
        RakDasi
      </div>

      <div className="flex items-center gap-6 w-full max-w-2xl mx-4">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 cursor-pointer text-white font-medium text-sm hover:opacity-80 transition-all">
          <ChevronDown size={16} />
          <span>{selectedCategory}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <div 
            onClick={handleLogout}
            className="w-12 h-12 rounded-full border-2 border-white overflow-hidden relative shadow-md bg-gray-200 cursor-pointer hover:opacity-90 transition-all"
            title="Klik untuk Keluar"
          >
            <Image
              src="https://res.cloudinary.com/cgdpdk9v/image/upload/v1792342014/user_profiles/ltocpmcgbflukqkxtlvl.jpg"
              alt="Profile"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <>
            <Link
              href="/logins"
              className="px-5 py-2 bg-white text-gray-800 text-sm font-semibold rounded-full shadow-sm hover:bg-gray-100 transition-all"
            >
              Masuk
            </Link>
            <Link
              href="/regis"
              className="px-5 py-2 text-gray-800 text-sm font-semibold rounded-full shadow-sm hover:opacity-90 transition-all"
              style={{ backgroundColor: "#C4D664" }}
            >
              Daftar
            </Link>
          </>
        )}
      </div>
    </header>
  );
}