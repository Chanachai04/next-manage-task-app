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
      const { data, error } = await supabase.from("task_tb").select("*").order("created_at", { ascending: false });
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

        const { data, error } = await supabase.storage.from("task_bk").remove([image_name as string]); // ลบรูปภาพ
        if (error) {
          alert("พบปัญหาในการลบรูปภาพ ออกจาก Storage");
          console.log(error.message);
          return;
        }
      }

      // ลบข้อมูลออกจากตาราง task_tb
      const { data, error } = await supabase.from("task_tb").delete().eq("id", id);
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
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center mt-20">
        <Image src={Task} alt="Task" width={150} height={150} />
        <h1 className="text-2xl font-bold mt-10">Manage Task App</h1>
        <h1 className="text-2xl font-bold">บันทึกงานที่ต้องทำ</h1>
      </div>
      <div className="flex justify-end">
        <Link href={"/addtask"} className="bg-blue-500 hover:bg-blue-700 px-5 py-2 text-white rounded pointer">
          เพิ่มงาน
        </Link>
      </div>
      <div className="flex justify-center text-center">
        <table className="border text-sm">
          <thead className="border">
            <tr>
              <th className="border p-2">รูป</th>
              <th className="border p-2">งานที่ต้องทำ</th>
              <th className="border p-2">รายละเอียด</th>
              <th className="border p-2">สถานะ</th>
              <th className="border p-2">วันที่เพิ่ม</th>
              <th className="border p-2">งานที่แก้ไข</th>
              <th className="border p-2">action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              return (
                <tr key={task.id}>
                  <td className="border p-2">
                    {task.image_url ? (
                      <Image
                        src={task.image_url}
                        alt={`logo`} // More descriptive alt text
                        width={50}
                        height={50}
                        style={{ objectFit: "cover", borderRadius: "4px" }} // Optional styling
                      />
                    ) : (
                      "."
                    )}
                  </td>
                  <td className="border p-2">{task.title}</td>
                  <td className="border p-2">{task.detail}</td>
                  <td className="border p-2">
                    {task.is_completed ? (
                      <span className="text-green-500">เสร็จสิ้น</span>
                    ) : (
                      <span className="text-red-500">ยังไม่เสร็จสิ้น</span>
                    )}
                  </td>
                  <td className="border p-2">{new Date(task.created_at).toLocaleString()}</td>
                  <td className="border p-2">{new Date(task.update_at).toLocaleString()}</td>
                  <td className="border p-2 ">
                    <Link href={"/edittask/" + task.id} className="mr-2 text-green-500">
                      แก้ไข
                    </Link>
                    <button
                      className="cursor-pointer text-red-500"
                      onClick={() => handleDeleteTaskClick(task.id, task.image_url)}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-10">
        <Link href={"/"} className="text-blue-500">
          กลับไปหน้าแรก
        </Link>
      </div>
    </div>
  );
}
