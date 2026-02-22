import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero - mobile-first, vibrant */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900/30 px-4 py-16 sm:px-6 sm:py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Automate your business.{" "}
            <span className="text-cyan-400">Replace the paperwork.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
            Custom software for small and medium enterprises. We build solutions that eliminate spreadsheets, digitize processes, and save you time.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-900 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Get in touch
            </Link>
            <Link
              href="/products"
              className="rounded-xl border border-slate-600 bg-slate-800/50 px-8 py-4 text-lg font-semibold text-white transition hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              View products
            </Link>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            What we do
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
            Tailored software that fits your business—not the other way around.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Replace spreadsheets",
                desc: "Custom apps that handle inventory, orders, and reporting without Excel.",
                icon: "📊",
              },
              {
                title: "Digitize paperwork",
                desc: "Forms, approvals, and documents—all in one place, accessible anywhere.",
                icon: "📄",
              },
              {
                title: "Automate processes",
                desc: "Workflows that run themselves so your team can focus on what matters.",
                icon: "⚡",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 transition hover:border-cyan-500/50 hover:bg-slate-800"
              >
                <span className="text-3xl" role="img" aria-hidden>{item.icon}</span>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="text-cyan-400 font-medium transition hover:text-cyan-300"
            >
              Explore all services →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-cyan-600/20 to-orange-500/20 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to simplify your business?
          </h2>
          <p className="mt-4 text-slate-300">
            Describe your challenge. We&apos;ll help you find the right solution.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-900 transition hover:bg-cyan-400"
          >
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
