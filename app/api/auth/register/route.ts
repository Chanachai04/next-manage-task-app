import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullname, email, password, gender, user_image_url } = body;

    // Validate inputs
    if (!fullname || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("user_tb")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const { data, error } = await supabase
      .from("user_tb")
      .insert([
        {
          fullname,
          email,
          password: hashedPassword,
          gender: gender || null,
          user_image_url: user_image_url || null,
        },
      ])
      .select("id, fullname, email, gender, user_image_url")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User created successfully", user: data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
