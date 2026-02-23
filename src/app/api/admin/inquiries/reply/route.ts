import { NextRequest, NextResponse } from "next/server";
import { getInquiryById, addReplyToInquiry } from "@/lib/inquiries";

async function sendReplyEmail(
  to: string,
  toName: string,
  originalSubject: string,
  replyMessage: string
) {
  const nodemailer = await import("nodemailer");

  const transporter = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    replyTo: process.env.SMTP_FROM || process.env.SMTP_USER,
    subject: `Re: ${originalSubject}`,
    text: replyMessage,
    html: `<pre style="white-space: pre-wrap; font-family: sans-serif;">${replyMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, message } = body;

    if (!id || !message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Inquiry id and reply message are required" },
        { status: 400 }
      );
    }

    const inquiry = await getInquiryById(String(id));
    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    const replyText = String(message).trim();
    if (!replyText) {
      return NextResponse.json(
        { error: "Reply message cannot be empty" },
        { status: 400 }
      );
    }

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      return NextResponse.json(
        { error: "Email is not configured. Set SMTP_* in .env.local" },
        { status: 500 }
      );
    }

    await sendReplyEmail(
      inquiry.email,
      inquiry.name,
      inquiry.subject,
      replyText
    );

    await addReplyToInquiry(inquiry.id, replyText);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reply error:", err);
    return NextResponse.json(
      { error: "Failed to send reply" },
      { status: 500 }
    );
  }
}
