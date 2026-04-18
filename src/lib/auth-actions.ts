"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE_NAME = "session_auth";

export async function login(formData: FormData) {
  const username = (formData.get("username") as string || "").trim();
  const password = (formData.get("password") as string || "").trim();

  const validUser = (process.env.ADMIN_USERNAME || "").trim();
  const validPwd = (process.env.ADMIN_PASSWORD || "").trim();

  // Security Check: Ensure server is configured
  if (!validUser || !validPwd) {
    return { 
      success: false, 
      error: "SERVER_CONFIG_ERROR: Admin credentials are not set on the server. Please check Vercel environment variables." 
    };
  }

  if (username === validUser && password === validPwd) {
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
