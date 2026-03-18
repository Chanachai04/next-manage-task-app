"use client";
import Image from "next/image";
import Task from "./../../assets/task.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Task = {
  id: string;
  title: string;
  detail: string;
  is_completed: boolean;
  image_url: string;
  created_at: string;
  update_at: string;
};
export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  // ดึงข้อมูลจาก Supabase มาแสดง
  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("task_tb")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        alert("พบปัญหาในการใช้งาน ");
        return;
      }
      if (data) {
        setTasks(data as Task[]);
      }
    };

    fetchTasks();
  }, []);
  // ฟังก์ชันลบงาน
  const handleDeleteTaskClick = async (id: string, image_url: string) => {
    if (confirm("คุณต้องการลบงานนี้ใช่หรือไม่")) {
      // ลบรูปภาพออกจาก Supabase Storage
      if (image_url !== "") {
        const image_name = image_url.split("/").pop(); // ดึงชื่อไฟล์จาก URL

        const { data, error } = await supabase.storage
          .from("task_bk")
          .remove([image_name as string]); // ลบรูปภาพ
        if (error) {
          alert("พบปัญหาในการลบรูปภาพ ออกจาก Storage");
          console.log(error.message);
          return;
        }
      }

      // ลบข้อมูลออกจากตาราง task_tb
      const { data, error } = await supabase
        .from("task_tb")
        .delete()
        .eq("id", id);
      if (error) {
        alert("พบปัญหาในการลบข้อมูล");
        console.log(error.message);
        return;
      }

      // ลบข้อมูลใน state เพื่ออัปเดต UI
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };
  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Top Navigation / Header Panel */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-blue-50 p-2 rounded-xl group-hover:bg-blue-100 transition-colors">
              <Image src={Task} alt="Task Logo" width={32} height={32} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-950 leading-tight">
                Manage Task
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide">
                YOUR TASKS
              </p>
            </div>
          </Link>
          <Link
            href="/addtask"
            className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            เพิ่มงานใหม่
          </Link>
          <Link
            href="/addtask"
            className="sm:hidden bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              งานทั้งหมดของคุณ
            </h2>
            <p className="text-slate-500 mt-2 text-lg">
              รายการสิ่งที่คุณต้องทำทั้งหมดอยู่ที่นี่
            </p>
          </div>
          <div className="bg-blue-100/50 text-blue-800 px-4 py-2 rounded-lg font-semibold border border-blue-200 inline-block w-max">
            รวม {tasks.length} งาน
          </div>
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 flex flex-col items-center justify-center text-center shadow-sm mt-10">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <span className="text-4xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              ยังไม่มีงานใดๆ
            </h3>
            <p className="text-slate-500 mb-8 max-w-md">
              เริ่มต้นเพิ่มงานแรกของคุณ เพื่อจัดการสิ่งที่ต้องทำให้เป็นระเบียบ!
            </p>
            <Link
              href="/addtask"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              เพิ่มงานเลย
            </Link>
          </div>
        )}

        {/* Grid Layout for Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Card Header (Image or Placeholder) */}
              <div className="h-48 w-full bg-slate-100 relative overflow-hidden flex-shrink-0 border-b border-slate-100">
                {task.image_url ? (
                  <Image
                    src={task.image_url}
                    alt={task.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-gradient-to-br from-slate-50 to-slate-100">
                    <svg
                      className="w-12 h-12 mb-2 opacity-40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span className="text-sm font-medium tracking-wide">
                      ไม่มีรูปภาพประกอบ
                    </span>
                  </div>
                )}

                {/* Status Badge Overlaid on Image */}
                <div className="absolute top-4 right-4">
                  {task.is_completed ? (
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-full text-xs flex items-center shadow-lg backdrop-blur-md bg-opacity-95 border border-emerald-200">
                      <svg
                        className="w-3.5 h-3.5 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      เสร็จแล้ว
                    </span>
                  ) : (
                    <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1.5 rounded-full text-xs flex items-center shadow-lg backdrop-blur-md bg-opacity-95 border border-amber-200">
                      <svg
                        className="w-3.5 h-3.5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      กำลังทำ
                    </span>
                  )}
                </div>
              </div>

              {/* Content body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {task.title}
                </h3>
                <p className="text-slate-600 text-sm mb-5 line-clamp-3 flex-grow leading-relaxed">
                  {task.detail || (
                    <span className="italic text-slate-400">
                      ไม่มีรายละเอียดเพิ่มเติม
                    </span>
                  )}
                </p>

                {/* Meta details */}
                <div className="flex flex-col gap-1.5 text-xs text-slate-500 mb-6 font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>
                      เพิ่มเมื่อ:{" "}
                      {new Date(task.created_at).toLocaleString("th-TH", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                  {task.update_at && task.update_at !== task.created_at && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        ></path>
                      </svg>
                      <span>
                        แก้ไขล่าสุด:{" "}
                        {new Date(task.update_at).toLocaleString("th-TH", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                  <Link
                    href={"/edittask/" + task.id}
                    className="flex-1 bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 py-2.5 rounded-xl font-bold flex items-center justify-center transition-all shadow-sm gap-1.5 active:scale-95"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      ></path>
                    </svg>
                    แก้ไข
                  </Link>
                  <button
                    className="flex-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 py-2.5 rounded-xl font-bold flex items-center justify-center transition-all shadow-sm gap-1.5 active:scale-95"
                    onClick={() =>
                      handleDeleteTaskClick(task.id, task.image_url)
                    }
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                    ลบ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
