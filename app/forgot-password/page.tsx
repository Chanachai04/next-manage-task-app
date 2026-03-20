"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "รีเซ็ตรหัสผ่านล้มเหลว");
      }

      setSuccess(true);
      // Wait for 3 seconds then redirect to login page
      setTimeout(() => {
        router.push("/login");
      }, 3000);
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">รีเซ็ตรหัสผ่าน</h1>
          <p className="text-slate-500">ป้อนอีเมลและตั้งรหัสผ่านใหม่ของคุณ</p>
        </div>

        {/* Card Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 ring-1 ring-slate-100 p-8">
          {error && (
            <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm text-red-600 ring-1 ring-red-100 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-6 rounded-2xl bg-green-50 p-4 text-sm text-green-700 ring-1 ring-green-100 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              รีเซ็ตรหัสผ่านสำเร็จ ระบบจะพากลับไปหน้าเข้าสู่ระบบ...
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">
                อีเมล
              </label>
              <input
                id="email"
                type="email"
                required
                disabled={success}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900 transition-all duration-300 outline-none disabled:opacity-50"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="newPassword">
                รหัสผ่านใหม่
              </label>
              <input
                id="newPassword"
                type="password"
                required
                minLength={6}
                disabled={success}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900 transition-all duration-300 outline-none disabled:opacity-50"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="confirmPassword">
                ยืนยันรหัสผ่านใหม่
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                minLength={6}
                disabled={success}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900 transition-all duration-300 outline-none disabled:opacity-50"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังรีเซ็ต...
                </>
              ) : (
                "รีเซ็ตรหัสผ่าน"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/login" className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors">
              &larr; กลับไปหน้าเข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
