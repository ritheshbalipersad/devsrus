import { NextRequest, NextResponse } from "next/server";
import { addInquiry } from "@/lib/inquiries";

async function sendEmail(inquiry: { name: string; email: string; subject: string; message: string }) {
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
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    replyTo: inquiry.email,
    subject: `[devsrus Contact] ${inquiry.subject}`,
    text: [
      `From: ${inquiry.name} <${inquiry.email}>`,
      `Subject: ${inquiry.subject}`,
      "",
      inquiry.message,
    ].join("\n"),
    html: `
      <p><strong>From:</strong> ${inquiry.name} &lt;${inquiry.email}&gt;</p>
      <p><strong>Subject:</strong> ${inquiry.subject}</p>
      <hr />
      <pre style="white-space: pre-wrap; font-family: sans-serif;">${inquiry.message}</pre>
    `,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    const inquiry = await addInquiry({
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject).trim(),
      message: String(message).trim(),
    });

    // Send email if SMTP is configured
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      await sendEmail(inquiry);
    }

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
