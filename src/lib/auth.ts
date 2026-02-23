import { createHmac } from "node:crypto";
import { COOKIE_NAME } from "./auth-constants";

const SESSION_HOURS = 24;

/** Create a signed session cookie value (use in Node/API route only). */
export function createSessionCookie(secret: string): string {
  const expiry = String(Date.now() + SESSION_HOURS * 60 * 60 * 1000);
  const signature = createHmac("sha256", secret)
    .update(expiry)
    .digest("base64url");
  return `${expiry}.${signature}`;
}

export function getAdminCredentials() {
  const password = process.env.SMTP_PASS;
  return { username: "admin", password: password ?? "" };
}

export function isAdminLogin(username: string, password: string): boolean {
  const { username: expectedUser, password: expectedPass } =
    getAdminCredentials();
  return (
    expectedPass.length > 0 &&
    username === expectedUser &&
    password === expectedPass
  );
}

export { COOKIE_NAME } from "./auth-constants";
