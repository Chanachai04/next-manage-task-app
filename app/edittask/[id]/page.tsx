"use client";

import Image from "next/image";
import Task from "@/assets/task.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useParams } from "next/navigation"; // เปลี่ยนจาก "next/router" เป็น "next/navigation"

export default function Page() {
  const router = useRouter();
  const id = useParams().id; // ดึง id จากพารามิเตอร์ของ URL

  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [is_completed, setIsCompleted] = useState<boolean>(false);
  const [image_file, setImageFile] = useState<File | null>(null);
  const [preview_file, setPreviewFile] = useState<string>("");
  const [old_image_file, setOldImageFile] = useState<string>("");

  // ดึงข้อมูลงานเก่าจากฐานข้อมูลมาแสดง ตาม id ที่ส่งมา
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("task_tb").select("*").eq("id", id).single();

      if (error) {
        alert("พบปัญหาในการดึงข้อมูลงานเก่า");
        console.log(error.message);
        return;
      }

      // กรณีดึงข้อมูลสำเร็จ ให้นำข้อมูลมาแสดงในฟอร์ม
      if (data) {
        setTitle(data.title);
        setDetail(data.detail);
        setIsCompleted(data.is_completed);
        setPreviewFile(data.image_url);
        setOldImageFile(data.image_url);
      }
    };
    fetchData();
  }, [id]);

  const handleSelectImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setPreviewFile(URL.createObjectURL(file as Blob));
    }
  };

  // บันทึกและแก้ไขข้อมูลฐานข้อมูลที่ supabase
  const handleUploadAndUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // อัพเดตรูปภาพใหม่ไปยัง Supabase Storage
    let image_url = preview_file || "";
    if (image_file) {
      // ลบรูปภาพเก่าออกจาก Supabase Storage
      if (old_image_file !== "") {
        const image_name = old_image_file.split("/").pop(); // ดึงชื่อไฟล์จาก URL

        const { data, error } = await supabase.storage.from("task_bk").remove([image_name as string]); // ลบรูปภาพ
        if (error) {
          alert("พบปัญหาในการลบรูปภาพ ออกจาก Storage");
          console.log(error.message);
          return;
        }
      }
      const new_image_file_name = `${Date.now()}-${image_file.name}`;

      // อัปโหลดรูปภาพไปยัง Supabase Storage
      const { data, error } = await supabase.storage.from("task_bk").upload(new_image_file_name, image_file);
      if (error) {
        alert("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
        console.log(error.message);
        return;
      } else {
        // get url ของรูปภาพที่อัปโหลด
        const { data, error } = supabase.storage.from("task_bk").getPublicUrl(new_image_file_name);
        image_url = data.publicUrl;
      }
    }
    // แก้ไขข้อมูลในตาราง task_tb
    const { data, error } = await supabase
      .from("task_tb")
      .update({
        title: title,
        detail: detail,
        is_completed: is_completed,
        image_url: image_url,
        update_at: new Date().toISOString,
      })
      .eq("id", id);

    if (error) {
      alert("เกิดข้อผิดพลาดในการบันทึกการแก้ไขข้อมูล");
      console.log(error.message);
      return;
    } else {
      alert("บันทึกแก้ไขข้อมูลเรียบร้อย");
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
    <main className="w-10/12 mx-auto">
      <div className="flex flex-col justify-center items-center mt-20">
        <Image src={Task} alt="Task" width={150} height={150} />
        <h1 className="text-2xl font-bold mt-10">Manage Task App</h1>
        <h1 className="text-2xl font-bold">บันทึกงานที่ต้องทำ</h1>
      </div>

      <div className="mt-10 flex flex-col border border-gray-300 p-5 rounded-2xl">
        <h1 className="text-center text-xl font-bold">แก้ไขงานเก่า</h1>
        <form onSubmit={handleUploadAndUpdate}>
          <div className="flex flex-col mt-5">
            <label className="text-lg font-bold" htmlFor="title">
              งานที่ทำ
            </label>
            <input
              id="title"
              type="text"
              className="border border-gray-300 rounded-lg p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-5">
            <label className="text-lg font-bold" htmlFor="image_url">
              อัปโหลดรูปภาพ
            </label>
            <input id="fileInput" type="file" className="hidden" accept="image/*" onChange={handleSelectImagePreview} />
            <label
              htmlFor="fileInput"
              className="bg-blue-500 rounded-lg p-2 text-white cursor-pointer w-20 text-center"
            >
              เลือกรูป
            </label>
            {preview_file && (
              <div className="mt-3">
                <Image src={preview_file} alt="preview" width={100} height={100} />
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
              value={is_completed ? "1" : "0"}
              onChange={(e) => setIsCompleted(e.target.value === "1")}
            >
              <option value="0">ยังไม่เสร็จสิ้น</option>
              <option value="1">เสร็จสิ้น</option>
            </select>
          </div>
          <div className="flex flex-col mt-5">
            <button type="submit" className="bg-green-500 rounded-lg p-2 text-white">
              บันทึกแก้ไขงาน
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
