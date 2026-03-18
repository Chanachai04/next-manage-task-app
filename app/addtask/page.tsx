"use client";

import Image from "next/image";
import Task from "./../../assets/task.png";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // เปลี่ยนจาก "next/router" เป็น "next/navigation"

export default function Page() {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [is_completed, setIsCompleted] = useState<boolean>(false);
  const [image_file, setImageFile] = useState<File | null>(null);
  const [preview_file, setPreviewFile] = useState<string>("");

  const router = useRouter();

  const handleSelectImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setPreviewFile(URL.createObjectURL(file as Blob));
    }
  };

  const handleUploadAndSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // บันทึกรูปภาพไปยัง Supabase Storage
    let image_url = "";
    if (image_file) {
      const new_image_file_name = `${Date.now()}-${image_file.name}`;

      // อัปโหลดรูปภาพไปยัง Supabase Storage
      const { data, error } = await supabase.storage.from("task_bk").upload(new_image_file_name, image_file);
      if (error) {
        alert("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
        console.log(error.message);
        return;
      } else {
        // get url ของรูปภาพที่อัปโหลด
        const { data } = supabase.storage.from("task_bk").getPublicUrl(new_image_file_name);
        image_url = data.publicUrl;
      }
    }

    // บันทึกข้อมูลงานลงในตาราง tasks
    const { data, error } = await supabase.from("task_tb").insert({
      title: title,
      detail: detail,
      is_completed: is_completed,
      image_url: image_url,
    });

    if (error) {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.log(error.message);
      return;
    } else {
      alert("บันทึกข้อมูลเรียบร้อย");
      setTitle("");
      setDetail("");
      setIsCompleted(false);
      setImageFile(null);
      setPreviewFile("");
      image_url = "";
      router.push("/alltask");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center font-sans tracking-wide">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="relative w-24 h-24 mb-6 rounded-full bg-white shadow-xl shadow-blue-500/10 flex items-center justify-center border border-blue-50">
            <Image src={Task} alt="Task" width={64} height={64} className="object-contain drop-shadow-sm" priority />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight mb-2">
            Manage Task App
          </h1>
          <p className="text-blue-600/80 font-medium text-lg">บันทึกงานที่ต้องทำ</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 border border-blue-100/50 overflow-hidden backdrop-blur-sm">
          <div className="px-6 py-8 sm:p-10">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-blue-50">
              <h2 className="text-2xl font-bold text-blue-900">เพิ่มงานใหม่</h2>
              <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">New Task</div>
            </div>

            <form onSubmit={handleUploadAndSave} className="space-y-6">
              {/* Title Input */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-bold text-blue-900 ml-1" htmlFor="title">
                  งานที่ทำ <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  placeholder="เช่น ทำรายงาน, ซื้อของ..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-blue-950 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none shadow-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Detail Input */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-bold text-blue-900 ml-1" htmlFor="detail">
                  รายละเอียดงาน
                </label>
                <textarea
                  id="detail"
                  rows={4}
                  placeholder="อธิบายรายละเอียดของงานนี้เพิ่มเติม..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-blue-950 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none shadow-sm resize-none"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-bold text-blue-900 ml-1">
                  รูปภาพประกอบ
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleSelectImagePreview}
                  />
                  <label
                    htmlFor="fileInput"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-xl cursor-pointer transition-colors duration-200 border border-blue-200/50 shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    อัปโหลดรูปภาพ
                  </label>
                  
                  {preview_file && (
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-blue-100 shadow-md">
                        <Image
                          src={preview_file}
                          alt="preview"
                          className="w-full h-full object-cover"
                          width={96}
                          height={96}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Select */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="status" className="text-sm font-bold text-blue-900 ml-1">
                  สถานะงาน
                </label>
                <div className="relative">
                  <select
                    id="status"
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-blue-950 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none shadow-sm cursor-pointer"
                    value={is_completed ? "1" : "0"}
                    onChange={(e) => setIsCompleted(e.target.value === "1")}
                  >
                    <option value="0">⏳ ยังไม่เสร็จสิ้น</option>
                    <option value="1">✅ เสร็จสิ้นแล้ว</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-blue-500">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-4 shadow-lg shadow-blue-500/30 transition-all duration-200 active:scale-[0.98] flex justify-center items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  บันทึกเพิ่มงาน
                </button>
              </div>
            </form>
          </div>
          
          {/* Footer Link */}
          <div className="bg-slate-50/50 px-6 py-6 border-t border-slate-100 sm:px-10 flex justify-center">
            <Link 
              href="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              กลับไปหน้าแรก
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
