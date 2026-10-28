"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/regis",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Gagal melakukan registrasi"
        );
      }

      alert("Registrasi berhasil! Silakan masuk.");
      router.push("/login");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat registrasi"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-5">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">

        <div className="w-full max-w-[440px] md:w-[440px] bg-[#E5F1FA] rounded-[32px] px-8 sm:px-10 py-10 flex flex-col items-center">

          <h1 className="text-2xl font-bold text-black mb-8 tracking-wide">
            Daftar Akun
          </h1>

          {error && (
            <div className="w-full bg-red-100 text-red-600 text-sm p-3 rounded-xl mb-4 text-center">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-3"
          >

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
              className="w-full h-12 px-4 bg-white border border-blue-300 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="w-full h-12 px-4 bg-white border border-blue-300 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                className="w-full h-12 px-4 pr-12 bg-white border border-blue-300 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? "Sembunyikan password"
                    : "Tampilkan password"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                    <path d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 9 5 9 7a9.8 9.8 0 01-3 4.2" />
                    <path d="M6.2 6.2C4.2 7.5 3 10 3 12c0 2 4 7 9 7a9 9 0 003-.5" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            <div className="text-right text-xs text-gray-600 mt-1 mb-6">
              Sudah Punya Akun?{" "}
              <a
                href="/logins"
                className="font-semibold text-black hover:underline"
              >
                Masuk
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-black text-sm font-bold rounded-xl shadow-md transition hover:brightness-95 disabled:opacity-60"
              style={{ backgroundColor: "#C4C956" }}
            >
              {loading ? "Memproses..." : "Daftar"}
            </button>
          </form>
        </div>

        <div className="relative w-72 h-72 sm:w-72 sm:h-72 md:w-80 md:h-80 flex-shrink-0">
          <Image
            src="/kutubukucuking.png"
            alt="Kucing kutu buku"
            fill
            sizes="(max-width: 640px) 256px, 320px"
            className="object-contain"
            priority
          />
        </div>

      </div>
    </div>
  );
}
