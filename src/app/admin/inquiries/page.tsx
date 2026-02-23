import { getInquiries } from "@/lib/inquiries";
import MarkRepliedButton from "./MarkRepliedButton";
import InquiryReplyForm from "./InquiryReplyForm";

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Inquiries</h1>
      <p className="mt-2 text-slate-400">
        Contact form submissions. Reply directly below or mark as replied.
      </p>

      {inquiries.length === 0 ? (
        <p className="mt-8 text-slate-400">No inquiries yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {inquiries.map((inquiry) => (
            <li
              key={inquiry.id}
              className={`rounded-2xl border p-6 ${
                inquiry.status === "new"
                  ? "border-orange-500/30 bg-orange-500/5"
                  : "border-slate-700/50 bg-slate-800/50"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-slate-500">
                      {new Date(inquiry.createdAt).toLocaleString()}
                    </span>
                    {inquiry.status === "new" && (
                      <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-xs font-medium text-orange-400">
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-semibold text-white">{inquiry.subject}</h3>
                  <p className="mt-1 text-slate-400">
                    From: {inquiry.name} &lt;
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="text-cyan-400 hover:underline"
                    >
                      {inquiry.email}
                    </a>
                    &gt;
                  </p>
                  <p className="mt-4 whitespace-pre-wrap text-slate-300">
                    {inquiry.message}
                  </p>
                  {inquiry.replies && inquiry.replies.length > 0 && (
                    <div className="mt-6 space-y-4">
                      <h4 className="text-sm font-medium text-cyan-400">
                        Your reply {inquiry.replies.length > 1 ? `(${inquiry.replies.length})` : ""}
                      </h4>
                      {inquiry.replies.map((reply, i) => (
                        <div
                          key={reply.sentAt + i}
                          className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-4"
                        >
                          <p className="text-xs text-slate-500">
                            {new Date(reply.sentAt).toLocaleString()}
                          </p>
                          <p className="mt-2 whitespace-pre-wrap text-slate-200">
                            {reply.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {inquiry.status === "new" && (
                  <MarkRepliedButton inquiryId={inquiry.id} />
                )}
              </div>
              <InquiryReplyForm inquiryId={inquiry.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
