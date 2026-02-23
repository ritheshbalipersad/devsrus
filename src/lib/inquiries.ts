import { promises as fs } from "fs";
import path from "path";

export type InquiryReply = {
  message: string;
  sentAt: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "replied";
  createdAt: string;
  repliedAt?: string;
  replies?: InquiryReply[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readInquiries(): Promise<Inquiry[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(INQUIRIES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function getInquiries(): Promise<Inquiry[]> {
  const inquiries = await readInquiries();
  return inquiries.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getInquiryById(id: string): Promise<Inquiry | null> {
  const inquiries = await readInquiries();
  return inquiries.find((i) => i.id === id) ?? null;
}

export async function addInquiry(
  inquiry: Omit<Inquiry, "id" | "status" | "createdAt">
): Promise<Inquiry> {
  const { v4: uuid } = await import("uuid");
  const inquiries = await readInquiries();
  const newInquiry: Inquiry = {
    ...inquiry,
    id: uuid(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  inquiries.push(newInquiry);
  await ensureDataDir();
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
  return newInquiry;
}

export async function markInquiryReplied(id: string): Promise<boolean> {
  const inquiries = await readInquiries();
  const idx = inquiries.findIndex((i) => i.id === id);
  if (idx === -1) return false;
  inquiries[idx].status = "replied";
  inquiries[idx].repliedAt = new Date().toISOString();
  await ensureDataDir();
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
  return true;
}

export async function addReplyToInquiry(
  id: string,
  message: string
): Promise<boolean> {
  const inquiries = await readInquiries();
  const idx = inquiries.findIndex((i) => i.id === id);
  if (idx === -1) return false;
  const reply: InquiryReply = {
    message: message.trim(),
    sentAt: new Date().toISOString(),
  };
  const inquiry = inquiries[idx];
  inquiry.replies = inquiry.replies ?? [];
  inquiry.replies.push(reply);
  inquiry.status = "replied";
  inquiry.repliedAt = reply.sentAt;
  await ensureDataDir();
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
  return true;
}
