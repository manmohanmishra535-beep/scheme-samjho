import Link from "next/link";
import {
  ArrowRight,
  Search,
} from "lucide-react";

import { getAllSchemes } from "../../lib/schemes";

export const dynamic = "force-dynamic";

export default async function SchemesPage() {
  const schemes = await getAllSchemes();

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#111827]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="border-b border-[#111827]/10 bg-[#F9FAFB]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-20 lg:px-10">
          <p className="text-sm font-bold text-[#2563EB]">
            Government schemes
          </p>

          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Government schemes,
            <br />
            <span className="text-[#2563EB]">
              explained simply.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#111827]/65 sm:text-lg">
            Explore government schemes, benefits, eligibility,
            documents and application information in simple
            language.
          </p>
        </div>
      </section>

      {/* =====================================================
          SCHEMES
      ===================================================== */}

      <section>
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-14 lg:px-10">
          {/* Search-style header */}
          <div className="flex flex-col gap-4 rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/10">
                <Search className="h-5 w-5 text-[#2563EB]" />
              </div>

              <div>
                <h2 className="text-lg font-black text-[#111827]">
                  Browse schemes
                </h2>

                <p className="text-sm text-[#111827]/55">
                  {schemes.length} scheme
                  {schemes.length === 1
                    ? ""
                    : "s"}{" "}
                  available
                </p>
              </div>
            </div>
          </div>

          {/* No schemes */}
          {schemes.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-10 text-center">
              <h2 className="text-xl font-black">
                No published schemes found
              </h2>

              <p className="mt-2 text-sm text-[#111827]/60">
                No published scheme records are currently
                available.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {schemes.map((scheme) => (
                <article
                  key={scheme.slug}
                  className="group flex h-full flex-col rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6 transition hover:-translate-y-1 hover:border-[#2563EB]/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex rounded-full bg-[#2563EB]/10 px-3 py-1 text-xs font-bold text-[#2563EB]">
                      {scheme.category}
                    </span>
                  </div>

                  <h2 className="mt-5 text-xl font-black leading-7 text-[#111827]">
                    {scheme.name}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#111827]/60">
                    {scheme.shortDescription}
                  </p>

                  <div className="mt-6 border-t border-[#111827]/10 pt-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#111827]/40">
                      Eligibility
                    </p>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#111827]/65">
                      {scheme.eligibilitySummary}
                    </p>
                  </div>

                  <div className="mt-auto pt-6">
                    <Link
                      href={`/schemes/${scheme.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition group-hover:text-[#111827]"
                    >
                      View scheme
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}