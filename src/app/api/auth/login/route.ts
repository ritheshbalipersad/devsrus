import { NextRequest, NextResponse } from "next/server";
import {
  isAdminLogin,
  createSessionCookie,
  COOKIE_NAME,
} from "@/lib/auth";

const SESSION_HOURS = 24;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    if (!isAdminLogin(username, password)) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const secret = process.env.SMTP_PASS;
    if (!secret) {
      return NextResponse.json(
        { error: "Server auth not configured (SMTP_PASS)" },
        { status: 500 }
      );
    }

    const value = createSessionCookie(secret);
    const res = NextResponse.json({
      success: true,
      redirectTo: "/admin",
    });
    res.cookies.set(COOKIE_NAME, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_HOURS * 60 * 60,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
