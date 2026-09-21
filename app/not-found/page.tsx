import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  FileQuestion,
  Home,
  Search,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FFFFFF]">

      {/* Main */}
      <section className="bg-[#111827]">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-10">

          <div className="w-full text-center">

            {/* Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#2563EB] text-[#FFFFFF]">
              <FileQuestion size={36} />
            </div>

            {/* 404 */}
            <p className="mt-8 text-7xl font-extrabold tracking-tight text-[#2563EB] sm:text-8xl">
              404
            </p>

            {/* Heading */}
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#FFFFFF] sm:text-4xl lg:text-5xl">
              Page not found
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#FFFFFF]/65 sm:text-lg">
              The page you are looking for may have been moved,
              removed or the address may be incorrect.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#FFFFFF] hover:text-[#111827]"
              >
                <Home size={17} />
                Go to homepage
              </Link>

              <Link
                href="/schemes"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#FFFFFF]/25 px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#111827]"
              >
                <Search size={17} />
                Browse schemes
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* Helpful links */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">

          <div className="text-center">

            <p className="text-sm font-bold text-[#2563EB]">
              Maybe you were looking for
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-[#111827] sm:text-3xl">
              Explore SchemeSamjho
            </h2>

          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <QuickLink
              href="/schemes"
              title="Government Schemes"
              description="Browse available schemes and explore their details."
            />

            <QuickLink
              href="/eligibility"
              title="Eligibility"
              description="Check schemes based on your basic information."
            />

            <QuickLink
              href="/explainers"
              title="Explainers"
              description="Understand schemes through simple explanations."
            />

            <QuickLink
              href="/compare"
              title="Compare"
              description="Compare two schemes side by side."
            />

          </div>

        </div>
      </section>

      {/* Bottom */}
      <section className="border-t border-[#111827]/10 bg-[#111827]/5">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">

          <div>

            <p className="text-sm font-bold text-[#2563EB]">
              SchemeSamjho
            </p>

            <p className="mt-1 text-sm text-[#111827]/60">
              Government schemes explained simply.
            </p>

          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition hover:text-[#111827]"
          >
            <ArrowLeft size={16} />
            Back to homepage
          </Link>

        </div>

      </section>

    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Quick Link                                                                 */
/* -------------------------------------------------------------------------- */

function QuickLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-5 transition hover:-translate-y-1 hover:border-[#2563EB]/30"
    >

      <div className="flex items-center justify-between gap-4">

        <h3 className="text-base font-extrabold text-[#111827]">
          {title}
        </h3>

        <ArrowRight
          size={17}
          className="shrink-0 text-[#2563EB] transition-transform group-hover:translate-x-1"
        />

      </div>

      <p className="mt-2 text-sm leading-6 text-[#111827]/60">
        {description}
      </p>

    </Link>
  );
}