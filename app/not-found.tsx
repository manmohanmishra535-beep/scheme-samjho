import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  FileSearch,
  Home,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FFFFFF]">

      {/* Hero */}
      <section className="bg-[#111827]">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-10">

          <div className="w-full max-w-3xl">

            {/* Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563EB] text-[#FFFFFF]">
              <FileSearch size={30} />
            </div>

            {/* Error code */}
            <p className="mt-8 text-sm font-extrabold uppercase tracking-[0.18em] text-[#16A34A]">
              Error 404
            </p>

            {/* Heading */}
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.06] tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl">
              Page not found.
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#FFFFFF]/75 sm:text-lg">
              The page you are looking for does not exist,
              may have moved, or the address may be incorrect.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

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
                Browse schemes
                <ArrowRight size={17} />
              </Link>

            </div>

            {/* Back navigation */}
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#FFFFFF]/60 transition hover:text-[#FFFFFF]"
              >
                <ArrowLeft size={16} />
                Return to SchemeSamjho
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* Helpful links */}
      <section className="border-t border-[#111827]/10 bg-[#FFFFFF]">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">

          <div className="max-w-3xl">

            <p className="text-sm font-bold text-[#2563EB]">
              Try these pages
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-[#111827] sm:text-3xl">
              Find what you need
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              <Link
                href="/schemes"
                className="group rounded-2xl border border-[#111827]/10 p-5 transition hover:border-[#2563EB] hover:bg-[#2563EB]/5"
              >
                <h3 className="text-base font-extrabold text-[#111827]">
                  Schemes
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#111827]/60">
                  Browse government schemes and their
                  important information.
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                  Explore
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>

              <Link
                href="/eligibility"
                className="group rounded-2xl border border-[#111827]/10 p-5 transition hover:border-[#2563EB] hover:bg-[#2563EB]/5"
              >
                <h3 className="text-base font-extrabold text-[#111827]">
                  Eligibility
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#111827]/60">
                  Explore schemes based on your basic
                  information.
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                  Check eligibility
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>

              <Link
                href="/explainers"
                className="group rounded-2xl border border-[#111827]/10 p-5 transition hover:border-[#2563EB] hover:bg-[#2563EB]/5"
              >
                <h3 className="text-base font-extrabold text-[#111827]">
                  Explainers
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#111827]/60">
                  Understand government schemes in
                  simple language.
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                  Read explainers
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}