import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Search,
} from "lucide-react";

import { getAllSchemes } from "../../lib/schemes";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Scheme Explainers",
  description:
    "Understand Indian government schemes, eligibility, benefits, documents and application information in simple language.",
};

export default async function ExplainersPage() {
  const schemes = await getAllSchemes();

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#111827]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="border-b border-[#111827]/10 bg-[#F9FAFB]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="flex items-center gap-2 text-sm font-bold text-[#2563EB]">
            <BookOpen className="h-5 w-5" />
            Scheme explainers
          </div>

          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
            Government schemes
            <br />
            <span className="text-[#2563EB]">
              explained simply.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#111827]/65 sm:text-lg">
            Learn what a scheme does, who it is for,
            what benefits it provides, what documents
            may be needed and how the application
            process generally works.
          </p>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section>
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-14 lg:px-10">
          {/* Header */}
          <div className="flex flex-col gap-4 rounded-2xl border border-[#111827]/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/10">
                <Search className="h-5 w-5 text-[#2563EB]" />
              </div>

              <div>
                <h2 className="text-lg font-black text-[#111827]">
                  Browse explainers
                </h2>

                <p className="text-sm text-[#111827]/55">
                  {schemes.length} scheme
                  {schemes.length === 1 ? "" : "s"} available
                </p>
              </div>
            </div>
          </div>

          {/* Empty state */}
          {schemes.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-[#111827]/10 bg-white p-12 text-center">
              <BookOpen className="mx-auto h-10 w-10 text-[#2563EB]" />

              <h2 className="mt-4 text-xl font-black text-[#111827]">
                No published explainers available
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#111827]/60">
                Published scheme information will appear
                here when it is available.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {schemes.map((scheme) => (
                <article
                  key={scheme.slug}
                  className="group flex h-full flex-col rounded-2xl border border-[#111827]/10 bg-white p-6 transition hover:-translate-y-1 hover:border-[#2563EB]/30"
                >
                  {/* Category */}
                  <p className="text-xs font-bold uppercase tracking-wide text-[#16A34A]">
                    {scheme.category}
                  </p>

                  {/* Title */}
                  <h2 className="mt-3 text-xl font-black leading-7 text-[#111827]">
                    {scheme.name}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 line-clamp-4 text-sm leading-6 text-[#111827]/60">
                    {scheme.shortDescription}
                  </p>

                  {/* Eligibility */}
                  <div className="mt-5 border-t border-[#111827]/10 pt-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#111827]/40">
                      Who is it for?
                    </p>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#111827]/65">
                      {scheme.eligibilitySummary}
                    </p>
                  </div>

                  {/* Link */}
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/explainers/${scheme.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition group-hover:text-[#111827]"
                    >
                      Read explainer
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 rounded-2xl bg-[#111827] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xl font-extrabold text-white">
                Looking for schemes that may fit you?
              </p>

              <p className="mt-2 text-sm leading-6 text-white/65">
                Use the preliminary eligibility checker
                to explore relevant government schemes.
              </p>
            </div>

            <Link
              href="/eligibility"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#111827]"
            >
              Check eligibility
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}