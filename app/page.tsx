import Image from "next/image";
import Task from "../assets/task.png";
import Link from "next/link";
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col justify-center items-center p-4 sm:p-8 font-sans">
      <div className="max-w-3xl w-full flex flex-col items-center justify-center text-center animate-fade-in-up">
        {/* Logo with Glow Effect */}
        <div className="relative mb-8 group cursor-pointer">
          <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
          <div className="relative bg-white p-6 rounded-3xl shadow-xl shadow-blue-900/5 border border-blue-50 transform group-hover:-translate-y-2 transition-transform duration-300">
            <Image src={Task} alt="Task Logo" width={120} height={120} className="object-contain drop-shadow-md" priority />
          </div>
        </div>
        
        {/* Headings */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 tracking-tight mb-4">
          Manage Task App
        </h1>
        <p className="text-xl sm:text-2xl font-medium text-slate-600 mb-10 max-w-xl">
          บันทึกและจัดการงานที่ต้องทำของคุณได้อย่างมีประสิทธิภาพและสวยงาม
        </p>

        {/* Call to Action */}
        <Link
          href={"/alltask"}
          className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-blue-600 rounded-2xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95 overflow-hidden"
        >
          <span className="relative flex items-center text-lg">
            เข้าใช้งานระบบ
            <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
        </Link>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 w-full max-w-2xl text-left">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg shadow-blue-900/5 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 text-2xl shadow-inner">📝</div>
            <h3 className="font-bold text-blue-950 mb-1">จดบันทึกง่าย</h3>
            <p className="text-sm text-slate-500 tracking-wide">เพิ่มและแก้ไขงานได้อย่างรวดเร็ว ไม่ซับซ้อน</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg shadow-blue-900/5 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 text-2xl shadow-inner">🖼️</div>
            <h3 className="font-bold text-blue-950 mb-1">แนบรูปภาพได้</h3>
            <p className="text-sm text-slate-500 tracking-wide">อัปโหลดภาพประกอบงานให้ชัดเจนยิ่งขึ้น</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg shadow-blue-900/5 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 text-2xl shadow-inner">✅</div>
            <h3 className="font-bold text-blue-950 mb-1">ติดตามสถานะ</h3>
            <p className="text-sm text-slate-500 tracking-wide">แยกงานที่ทำเสร็จแล้วและยังไม่เสร็จออกจากกัน</p>
          </div>
        </div>
      </div>
    </main>
  );
}
