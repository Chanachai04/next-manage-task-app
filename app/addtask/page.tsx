"use client";

import Image from "next/image";
import Task from "./../../assets/task.png";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [is_completed, setIsCompleted] = useState<boolean>(false);
  const [image_file, setImageFile] = useState<File | null>(null);
  const [preview_file, setPreviewFile] = useState<string>("");

  const handleSelectImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setPreviewFile(URL.createObjectURL(file as Blob));
    }
  };

  const handleUploadAndSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("อัปโหลดรูปภาพและบันทึกข้อมูล ...");
  };

  return (
    <main className="w-10/12 mx-auto">
      <div className="flex flex-col justify-center items-center mt-20">
        <Image src={Task} alt="Task" width={150} height={150} />
        <h1 className="text-2xl font-bold mt-10">Manage Task App</h1>
        <h1 className="text-2xl font-bold">บันทึกงานที่ต้องทำ</h1>
      </div>

      <div className="mt-10 flex flex-col border border-gray-300 p-5 rounded-2xl">
        <h1 className="text-center text-xl font-bold">เพิ่มงานใหม่</h1>
        <form onSubmit={handleUploadAndSave}>
          <div className="flex flex-col mt-5">
            <label className="text-lg font-bold" htmlFor="title">
              งานที่ทำ
            </label>
            <input
              id="title"
              type="text"
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col mt-5">
            <label className="text-lg font-bold" htmlFor="detail">
              รายละเอียดงาน
            </label>
            <textarea
              id="detail"
              rows={5}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col mt-5">
            <label className="text-lg font-bold" htmlFor="image_url">
              อัปโหลดรูปภาพ
            </label>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleSelectImagePreview}
            />
            <label
              htmlFor="fileInput"
              className="bg-blue-500 rounded-lg p-2 text-white cursor-pointer w-20 text-center"
            >
              เลือกรูป
            </label>
            {preview_file && (
              <div className="mt-3">
                <Image
                  src={preview_file}
                  alt="preview"
                  width={100}
                  height={100}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col mt-5">
            <label htmlFor="status" className="text-lg font-bolg">
              สถานะงาน
            </label>
            <select
              id="status"
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="0">ยังไม่เสร็จสิ้น</option>
              <option value="1">เสร็จสิ้น</option>
            </select>
          </div>
          <div className="flex flex-col mt-5">
            <button
              type="submit"
              className="bg-green-500 rounded-lg p-2 text-white"
            >
              บันทึกเพิ่มงาน
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-10">
          <Link href={"/"} className="text-blue-500">
            กลับไปหน้าแรก
          </Link>
        </div>
      </div>
    </main>
  );
}
