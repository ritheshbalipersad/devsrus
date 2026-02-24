module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/lib/inquiries.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addInquiry",
    ()=>addInquiry,
    "getInquiries",
    ()=>getInquiries,
    "markInquiryReplied",
    ()=>markInquiryReplied
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const DATA_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "data");
const INQUIRIES_FILE = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DATA_DIR, "inquiries.json");
async function ensureDataDir() {
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].mkdir(DATA_DIR, {
        recursive: true
    });
}
async function readInquiries() {
    try {
        await ensureDataDir();
        const data = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(INQUIRIES_FILE, "utf-8");
        return JSON.parse(data);
    } catch  {
        return [];
    }
}
async function getInquiries() {
    const inquiries = await readInquiries();
    return inquiries.sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
async function addInquiry(inquiry) {
    const { v4: uuid } = await __turbopack_context__.A("[project]/node_modules/uuid/dist-node/index.js [app-route] (ecmascript, async loader)");
    const inquiries = await readInquiries();
    const newInquiry = {
        ...inquiry,
        id: uuid(),
        status: "new",
        createdAt: new Date().toISOString()
    };
    inquiries.push(newInquiry);
    await ensureDataDir();
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
    return newInquiry;
}
async function markInquiryReplied(id) {
    const inquiries = await readInquiries();
    const idx = inquiries.findIndex((i)=>i.id === id);
    if (idx === -1) return false;
    inquiries[idx].status = "replied";
    inquiries[idx].repliedAt = new Date().toISOString();
    await ensureDataDir();
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
    return true;
}
}),
"[project]/src/app/api/contact/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$inquiries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/inquiries.ts [app-route] (ecmascript)");
;
;
async function sendEmail(inquiry) {
    const nodemailer = await __turbopack_context__.A("[project]/node_modules/nodemailer/lib/nodemailer.js [app-route] (ecmascript, async loader)");
    const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
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
            inquiry.message
        ].join("\n"),
        html: `
      <p><strong>From:</strong> ${inquiry.name} &lt;${inquiry.email}&gt;</p>
      <p><strong>Subject:</strong> ${inquiry.subject}</p>
      <hr />
      <pre style="white-space: pre-wrap; font-family: sans-serif;">${inquiry.message}</pre>
    `
    });
}
async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;
        if (!name || !email || !subject || !message) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Name, email, subject, and message are required"
            }, {
                status: 400
            });
        }
        const inquiry = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$inquiries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addInquiry"])({
            name: String(name).trim(),
            email: String(email).trim(),
            subject: String(subject).trim(),
            message: String(message).trim()
        });
        // Send email if SMTP is configured
        if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
            await sendEmail(inquiry);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            id: inquiry.id
        });
    } catch (err) {
        console.error("Contact API error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to send message"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__48e778c8._.js.map