"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Save user session (localStorage)
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Redirect to home or dashboard
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 selection:bg-blue-100 selection:text-blue-900">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-xl shadow-blue-900/5 mb-6 ring-1 ring-blue-50">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">ยินดีต้อนรับกลับมา</h1>
          <p className="text-slate-500">เข้าสู่ระบบเพื่อดำเนินการต่อ</p>
        </div>

        {/* Card Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 ring-1 ring-slate-100 p-8">
          {error && (
            <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm text-red-600 ring-1 ring-red-100 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">
                อีเมล
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900 transition-all duration-300 outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700" htmlFor="password">
                  รหัสผ่าน
                </label>
                <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  ลืมรหัสผ่าน?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900 transition-all duration-300 outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังเข้าสู่ระบบ...
                </>
              ) : (
                "เข้าสู่ระบบ"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              ยังไม่มีบัญชีใช่หรือไม่?{" "}
              <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                สร้างบัญชีใหม่
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
