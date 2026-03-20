import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, newPassword } = body;

    // Validate inputs
    if (!email || !newPassword) {
      return NextResponse.json(
        { error: "อีเมลและรหัสผ่านใหม่จำเป็นต้องกรอก" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร" },
        { status: 400 }
      );
    }

    // Check if user exists
    const { data: existingUser } = await supabase
      .from("user_tb")
      .select("id")
      .eq("email", email)
      .single();

    if (!existingUser) {
      return NextResponse.json(
        { error: "ไม่พบบัญชีผู้ใช้งานที่ใช้อีเมลนี้" },
        { status: 404 }
      );
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password in Supabase
    const { error: updateError } = await supabase
      .from("user_tb")
      .update({ password: hashedPassword })
      .eq("email", email);

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return NextResponse.json(
        { error: "อัปเดตรหัสผ่านล้มเหลว" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "รีเซ็ตรหัสผ่านเรียบร้อยแล้ว" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset Password API error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดของเซิร์ฟเวอร์" },
      { status: 500 }
    );
  }
}
