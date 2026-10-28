"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Login from "./Login";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fungsi saat tombol Masuk ditekan
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Sesuaikan URL endpoint backend Express kamu untuk login (misal: /api/auth/login)
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal masuk, periksa kembali email dan password.");
      }

      // Jika berhasil, simpan token atau data user ke localStorage / Cookie jika diperlukan
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert("Login berhasil!");
      router.push("/"); // Arahkan kembali ke halaman utama setelah sukses

    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan koneksi ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Login
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleLogin}
      loading={loading}
      error={error}
    />
  );
}