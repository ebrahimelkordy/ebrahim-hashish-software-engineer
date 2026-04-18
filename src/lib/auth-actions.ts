"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE_NAME = "session_auth";

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const validUser = process.env.ADMIN_USERNAME;
  const validPwd = process.env.ADMIN_PASSWORD;

  if (username === validUser && password === validPwd) {
    // Set a secure, HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, "active", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return { success: true };
  }

  return { success: false, error: "ACCESS_DENIED: Invalid Credentials" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/login");
}

export async function checkSession() {
  const cookieStore = await cookies();
  return cookieStore.has(SESSION_COOKIE_NAME);
}
