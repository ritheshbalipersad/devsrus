import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth-constants";

/** Encode ArrayBuffer to base64url (Edge-safe). */
function arrayBufferToBase64url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function verifySession(cookieValue: string, secret: string): Promise<boolean> {
  const dot = cookieValue.indexOf(".");
  if (dot === -1) return false;
  const expiryStr = cookieValue.slice(0, dot);
  const signatureB64 = cookieValue.slice(dot + 1);
  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || expiry <= Date.now()) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(expiryStr)
  );

  const expectedSig = arrayBufferToBase64url(sig);
  if (expectedSig.length !== signatureB64.length) return false;
  let same = true;
  for (let i = 0; i < expectedSig.length; i++) {
    if (expectedSig[i] !== signatureB64[i]) same = false;
  }
  return same;
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Allow login page and login API
  if (path === "/admin/login" || path === "/api/auth/login") {
    const cookie = req.cookies.get(COOKIE_NAME)?.value;
    const secret = process.env.SMTP_PASS;
    if (path === "/admin/login" && cookie && secret) {
      const verified = await verifySession(cookie, secret);
      if (verified) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }
    return NextResponse.next();
  }

  // Protect /admin (except login, already handled)
  if (path.startsWith("/admin")) {
    const cookie = req.cookies.get(COOKIE_NAME)?.value;
    const secret = process.env.SMTP_PASS;
    if (!secret) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    if (!cookie) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    const verified = await verifySession(cookie, secret);
    if (!verified) {
      const res = NextResponse.redirect(new URL("/admin/login", req.url));
      res.cookies.delete(COOKIE_NAME);
      return res;
    }
    return NextResponse.next();
  }

  // Protect /api/admin
  if (path.startsWith("/api/admin")) {
    const cookie = req.cookies.get(COOKIE_NAME)?.value;
    const secret = process.env.SMTP_PASS;
    if (!secret || !cookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const verified = await verifySession(cookie, secret);
    if (!verified) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)", "/api/admin/:path*", "/admin/login", "/api/auth/login"],
};
