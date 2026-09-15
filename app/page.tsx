"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { schemes } from "../data/schemes";

const categories = [
  {
    name: "Farmers",
    icon: "🌾",
    description: "Support for farmers and agriculture",
  },
  {
    name: "Healthcare",
    icon: "🏥",
    description: "Health coverage and medical support",
  },
  {
    name: "Students",
    icon: "🎓",
    description: "Scholarships and education support",
  },
  {
    name: "Business",
    icon: "💼",
    description: "Loans and business support",
  },
  {
    name: "Women",
    icon: "👩",
    description: "Women and maternity benefits",
  },
  {
    name: "Insurance",
    icon: "🛡️",
    description: "Life and accident protection",
  },
];

const popularSlugs = [
  "pm-kisan",
  "ayushman-bharat",
  "pm-vishwakarma",
  "pm-awas-yojana",
  "pm-mudra-yojana",
  "sukanya-samriddhi",
];

export default function HomePage() {
  const [search, setSearch] = useState("");

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return schemes
      .filter((scheme) => {
        const searchableText = [
          scheme.name,
          scheme.slug,
          scheme.category,
          scheme.shortDescription,
          scheme.description,
          ...scheme.occupations,
          ...scheme.keywords,
          ...scheme.benefits,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .slice(0, 6);
  }, [search]);

  const popularSchemes = popularSlugs
    .map((slug) => schemes.find((scheme) => scheme.slug === slug))
    .filter((scheme) => scheme !== undefined);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative z-20 bg-white">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              🇮🇳 Government schemes, made simpler
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Find government schemes
              <span className="block text-blue-600">
                you may be eligible for.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Understand government schemes, benefits, eligibility,
              documents, and next steps — all explained in simple language.
            </p>

            {/* =================================================
                SEARCH
            ================================================= */}
            <div className="relative z-50 mx-auto mt-8 max-w-2xl text-left">
              <div className="relative">
                <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                  🔎
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search PM-KISAN, pension, housing, insurance..."
                  className="w-full rounded-2xl border border-slate-300 bg-white py-5 pl-14 pr-5 text-sm text-slate-900 shadow-lg outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* =================================================
                  SEARCH RESULTS
              ================================================= */}
              {search.trim() && (
                <div className="absolute left-0 right-0 top-full z-[100] mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="border-b border-slate-100 px-5 py-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Matching schemes
                        </p>
                      </div>

                      <div className="max-h-[420px] overflow-y-auto">
                        {searchResults.map((scheme) => (
                          <div
                            key={scheme.slug}
                            className="border-b border-slate-100 p-4 last:border-b-0 hover:bg-slate-50"
                          >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="font-semibold text-slate-900">
                                    {scheme.name}
                                  </h3>

                                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700">
                                    {scheme.category}
                                  </span>
                                </div>

                                <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                                  {scheme.shortDescription}
                                </p>
                              </div>

                              <div className="flex shrink-0 gap-2">
                                <Link
                                  href={`/schemes/${scheme.slug}`}
                                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-white"
                                >
                                  Details
                                </Link>

                                <Link
                                  href={`/explainers/${scheme.slug}`}
                                  className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                                >
                                  Explain
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-slate-100 bg-slate-50 p-3 text-center">
                        <Link
                          href={`/schemes?search=${encodeURIComponent(
                            search
                          )}`}
                          className="text-sm font-semibold text-blue-700 hover:underline"
                        >
                          See all matching schemes →
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="px-5 py-8 text-center">
                      <div className="text-3xl">🔎</div>

                      <h3 className="mt-3 font-semibold text-slate-900">
                        No matching scheme found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Try farmer, pension, student, housing, business,
                        insurance, or another keyword.
                      </p>

                      <Link
                        href="/schemes"
                        className="mt-4 inline-flex rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Browse All Schemes
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Search by scheme name, category, occupation, benefit, or keyword.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORIES
      ===================================================== */}
      <section className="relative z-0 mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold text-blue-600">
            Explore by category
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            What are you looking for?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Start with a category to discover government schemes relevant to
            your needs.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/schemes?category=${encodeURIComponent(
                category.name
              )}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl transition group-hover:bg-blue-100">
                  {category.icon}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          POPULAR SCHEMES
      ===================================================== */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Popular schemes
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Start with these schemes
              </h2>

              <p className="mt-3 text-slate-600">
                Quick guides to some of the most searched schemes.
              </p>
            </div>

            <Link
              href="/schemes"
              className="text-sm font-semibold text-blue-700 hover:underline"
            >
              View all schemes →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {popularSchemes.map((scheme) => (
              <article
                key={scheme.slug}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {scheme.category}
                  </span>

                  <span className="text-xs text-slate-400">
                    Reviewed {scheme.lastVerified}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {scheme.name}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {scheme.shortDescription}
                </p>

                <div className="mt-5 flex gap-2">
                  <Link
                    href={`/schemes/${scheme.slug}`}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    View Scheme
                  </Link>

                  <Link
                    href={`/explainers/${scheme.slug}`}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Explain
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold text-blue-600">
            How SchemeSamjho works
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Find, understand, then verify.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              number: "1",
              title: "Find a scheme",
              text: "Search by name, category, occupation, or use our eligibility checker.",
            },
            {
              number: "2",
              title: "Understand it",
              text: "Read simple explanations about benefits, eligibility, documents, and exclusions.",
            },
            {
              number: "3",
              title: "Verify officially",
              text: "Use the official government source before making an application or decision.",
            },
          ].map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                {step.number}
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          ELIGIBILITY CTA
      ===================================================== */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-blue-300">
                Not sure where to start?
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                Check which schemes may match your profile.
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                Answer a few simple questions about your age, occupation,
                income, and state to get a preliminary list of relevant
                schemes.
              </p>
            </div>

            <Link
              href="/eligibility"
              className="shrink-0 rounded-xl bg-white px-6 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Check My Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST
      ===================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-2xl">🗣️</div>

              <h3 className="mt-4 font-bold text-slate-900">
                Simple language
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                We explain schemes without unnecessary government jargon.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-2xl">🔎</div>

              <h3 className="mt-4 font-bold text-slate-900">
                Transparent information
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Scheme pages show when information was last reviewed and link
                to official sources.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-2xl">🏛️</div>

              <h3 className="mt-4 font-bold text-slate-900">
                Official verification
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                We help you understand a scheme, but official government
                sources remain the final authority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DISCLAIMER
      ===================================================== */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-8 text-center sm:px-6">
          <p className="text-xs leading-5 text-slate-500">
            <strong className="text-slate-700">Important:</strong>{" "}
            SchemeSamjho is an independent informational platform and is not
            affiliated with the Government of India or any state government.
            Eligibility results are preliminary and are not official
            government decisions. Scheme information can change, so always
            verify the latest details through the relevant official source.
          </p>
        </div>
      </section>
    </main>
  );
}