"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "",
    user_image_url: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let uploadedImageUrl = formData.user_image_url;

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `profiles/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("user_bk")
          .upload(filePath, imageFile);

        if (uploadError) {
          throw new Error(`อัปโหลดรูปภาพล้มเหลว: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from("user_bk")
          .getPublicUrl(filePath);

        uploadedImageUrl = publicUrl;
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, user_image_url: uploadedImageUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Redirect to login after successful registration
      router.push("/login");
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 selection:bg-blue-100 selection:text-blue-900 py-12">
      <div className="w-full max-w-lg animate-in fade-in zoom-in duration-500">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-xl shadow-blue-900/5 mb-6 ring-1 ring-blue-50">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">สร้างบัญชีใหม่</h1>
          <p className="text-slate-500">เข้าร่วมกับเราและเริ่มจัดการงานของคุณ</p>
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

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="fullname">
                ชื่อ - นามสกุล
              </label>
              <input
                id="fullname"
                type="text"
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900 transition-all duration-300 outline-none"
                placeholder="John Doe"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>

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
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="password">
                รหัสผ่าน
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900 transition-all duration-300 outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <p className="text-xs text-slate-500 mt-1 ml-1">ต้องมีความยาวอย่างน้อย 6 ตัวอักษร</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="gender">
                  เพศ (ไม่ระบุได้)
                </label>
                <select
                  id="gender"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900 transition-all duration-300 outline-none appearance-none"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">เลือกเพศ</option>
                  <option value="Male">ชาย</option>
                  <option value="Female">หญิง</option>
                  <option value="Other">อื่นๆ</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="user_image_url">
                  รูปโปรไฟล์ (ไม่ระบุได้)
                </label>
                <input
                  id="user_image_url"
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900 transition-all duration-300 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setImageFile(e.target.files[0]);
                    } else {
                      setImageFile(null);
                    }
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังสร้างบัญชี...
                </>
              ) : (
                "สร้างบัญชี"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              มีบัญชีอยู่แล้วใช่หรือไม่?{" "}
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
