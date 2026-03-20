# 📋 ระบบจัดการงาน (Manage Task App)

แอปพลิเคชันสำหรับจัดการงานรายวันของคุณ สร้างขึ้นด้วย Next.js และ Supabase ช่วยให้คุณติดตามงาน จัดการตารางเวลา และเพิ่มประสิทธิภาพการทำงานด้วยหน้าจอที่ใช้งานง่ายและสะอาดตา

<div align="center">
  <img width="800" alt="Overview" src="https://github.com/user-attachments/assets/9fee9496-4708-477e-ae3e-a66b96385d09" />
</div>

## ✨ ฟีเจอร์หลัก

- **ระบบบัญชีผู้ใช้**: สมัครสมาชิก, เข้าสู่ระบบ และระบบกู้คืนรหัสผ่านที่ปลอดภัย
- **จัดการงาน (Task Management)**: เพิ่ม, ดู, แก้ไข, และลบงานได้อย่างง่ายดาย
- **แก้ไขโปรไฟล์**: ผู้ใช้สามารถอัปโหลดรูปโปรไฟล์ของตัวเองได้
- **รองรับทุกขนาดหน้าจอ (Responsive)**: ออกแบบด้วย Tailwind CSS เพื่อให้ใช้งานได้ดีทั้งบนคอมพิวเตอร์และมือถือ
- **ดีไซน์ทันสมัย**: มาพร้อมกับโทนสีฟ้า-ขาวที่ดูสบายตา ตัวหนังสืออ่านง่าย และมีลูกเล่น Animation เล็กๆ น้อยๆ

## 🛠️ เครื่องมือที่ใช้ (Tech Stack)

- **Frontend**: [Next.js](https://nextjs.org/) (React Framework)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL & Storage)
- **Language**: TypeScript

## 📸 ภาพตัวอย่างหน้าจอ

### 🖥️ หน้าภาพรวม (Dashboard)
<div align="center">
  <img width="650" alt="Dashboard" src="https://github.com/user-attachments/assets/390338ae-78b3-4de0-83bb-d94dc552fda5" />
</div>

### 📝 หน้าสร้างงาน (Add Task)
<div align="center">
  <img width="650" alt="Add Task" src="https://github.com/user-attachments/assets/872b4320-842a-4330-8ebe-8a49d9c3e14d" />
</div>

### 🔐 หน้าเข้าสู่ระบบและสมัครสมาชิก
<div align="center" style="display: flex; justify-content: center; gap: 10px;">
  <img width="350" alt="Login" src="https://github.com/user-attachments/assets/5e728027-ddfb-4bd5-afda-7a346db6338d" />
  <img width="350" alt="Login" src="https://github.com/user-attachments/assets/f1eedb4b-43b2-459b-bab1-66573138b53e" />
</div>

### 🔍 ภาพหน้าจออื่นๆ
<details>
<summary><b>คลิกเพื่อดูภาพเพิ่มเติม</b></summary>
<br>
<div align="center">
  <img width="600" alt="View 3" src="https://github.com/user-attachments/assets/814a9c4a-a8ab-44e5-a899-52b24388ea39" />
  <br><br>
  <img width="600" alt="View 1" src="https://github.com/user-attachments/assets/b179a288-adc9-47ff-823e-93ed3dae7e2d" />
</div>
</details>

## 🚀 วิธีการติดตั้งและรันโปรเจกต์

### สิ่งที่ต้องมี
- Node.js (เวอร์ชัน 18 ขึ้นไป)
- npm หรือ yarn

### ขั้นตอนการติดตั้ง

1. **โคลนโปรเจกต์:**
   ```bash
   git clone https://github.com/your-username/next-manage-task-app.git
   cd next-manage-task-app
   ```

2. **ติดตั้ง Dependencies:**
   ```bash
   npm install
   ```

3. **ตั้งค่าตัวแปร Environment:**
   สร้างไฟล์ `.env.local` ในโฟลเดอร์หลักของโปรเจกต์ และใส่ค่า Supabase ของคุณลงไป:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **รันเซิร์ฟเวอร์จำลอง (Development Server):**
   ```bash
   npm run dev
   ```
   เปิดเว็บเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

## 🤝 การมีส่วนร่วมพัฒนาระบบ

ยินดีต้อนรับทุกการมีส่วนร่วมครับ! ไม่ว่าจะเป็นการแจ้งปัญหา (Issues) หรือเสนอแนะฟีเจอร์ใหม่ๆ 


