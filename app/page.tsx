import Image from "next/image";
import Task from "../assets/task.png";
import Link from "next/link";
export default function HomePage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <Image src={Task} alt="Task" width={150} height={150} />
        <h1 className="text-2xl font-bold mt-10">Manage Task App</h1>
        <h1 className="text-2xl font-bold">บันทึกงานที่ต้องทำ</h1>
        <Link
          href={"/alltask"}
          className="bg-blue-500 text-white px-30 py-2 mt-5"
        >
          เข้าใช้งาน
        </Link>
      </div>
    </>
  );
}
