export default function Services() {
  const services = [
    {
      title: "Process automation",
      description:
        "Replace manual, repetitive tasks with workflows that run automatically. From approval chains to data sync—we build it so your team can focus on high-value work.",
      highlights: ["Workflow design", "Integration with existing tools", "Reporting dashboards"],
    },
    {
      title: "Spreadsheet replacement",
      description:
        "Custom applications that replace Excel and Google Sheets for inventory, orders, scheduling, and more. Data stays secure, searchable, and easy to share.",
      highlights: ["Custom dashboards", "Role-based access", "Export & reporting"],
    },
    {
      title: "Paperwork digitization",
      description:
        "Turn forms, checklists, and documents into digital experiences. Collect data, route for approval, and store everything in one place.",
      highlights: ["Digital forms", "E-signatures", "Document management"],
    },
  ];

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Our services
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          We build software tailored to small and medium enterprises. No cookie-cutter solutions—just what you need.
        </p>

        <ul className="mt-12 space-y-12">
          {services.map((s, i) => (
            <li
              key={s.title}
              className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6 sm:p-8"
            >
              <span className="text-sm font-medium text-cyan-400">
                Service {i + 1}
              </span>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {s.title}
              </h2>
              <p className="mt-4 text-slate-400">{s.description}</p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {s.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-lg bg-slate-700/50 px-4 py-2 text-sm text-slate-300"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-16 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-8 text-center">
          <h3 className="text-xl font-semibold text-white">
            Not sure which service fits?
          </h3>
          <p className="mt-2 text-slate-300">
            Tell us about your process or problem. We&apos;ll recommend the best approach.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-cyan-400"
          >
            Get in touch
          </a>
        </div>
      </div>
    </div>
  );
}
