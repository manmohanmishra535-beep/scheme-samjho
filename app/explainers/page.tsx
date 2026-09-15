"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { schemes } from "../../data/schemes";

const categories = [
  "All",
  "Farmers",
  "Artisans",
  "Healthcare",
  "Housing",
  "Savings",
  "Business",
  "Students",
  "Women",
  "Employment",
  "Finance",
  "Insurance",
];

export default function ExplainersPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredSchemes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return schemes.filter((scheme) => {
      const matchesCategory =
        category === "All" || scheme.category === category;

      const matchesSearch =
        !query ||
        scheme.name.toLowerCase().includes(query) ||
        scheme.shortDescription.toLowerCase().includes(query) ||
        scheme.category.toLowerCase().includes(query) ||
        scheme.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query)
        );

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              Simple government scheme guides
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Government schemes explained simply.
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Understand what a scheme is, who it is meant for, what benefits
              it provides, what documents you may need, and what to do next.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-2xl">
            <label
              htmlFor="explainer-search"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Search explainers
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔎
              </span>

              <input
                id="explainer-search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search PM-KISAN, pension, housing, insurance..."
                className="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => {
              const active = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explainers */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              {filteredSchemes.length}{" "}
              {filteredSchemes.length === 1 ? "explainer" : "explainers"}
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Explore scheme guides
            </h2>
          </div>

          {(search || category !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="text-sm font-semibold text-blue-700 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredSchemes.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="text-4xl">🔎</div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">
              No explainers found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
              Try a different search term or choose another category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Show All Explainers
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredSchemes.map((scheme) => (
              <article
                key={scheme.slug}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {scheme.category}
                  </span>

                  <span className="text-xs text-slate-400">
                    {scheme.lastVerified}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold leading-7 text-slate-900">
                  {scheme.name}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {scheme.shortDescription}
                </p>

                {/* Key facts */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">Age</p>
                    <p className="mt-1 text-xs font-semibold text-slate-700">
                      {scheme.minAge && scheme.maxAge
                        ? `${scheme.minAge}–${scheme.maxAge} yrs`
                        : scheme.minAge
                          ? `${scheme.minAge}+ yrs`
                          : "Scheme rules"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">Benefits</p>
                    <p className="mt-1 text-xs font-semibold text-slate-700">
                      {scheme.benefits.length} listed
                    </p>
                  </div>
                </div>

                {/* Keywords */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {scheme.keywords.slice(0, 3).map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-500"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-2">
                  <Link
                    href={`/explainers/${scheme.slug}`}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Read Explainer
                  </Link>

                  <Link
                    href={`/schemes/${scheme.slug}`}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* How explainers help */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-blue-600">
              Why use SchemeSamjho?
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Information without the government jargon.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Government scheme information can be difficult to understand.
              Our explainers break the information into practical sections so
              you can quickly understand whether a scheme may be relevant to
              you.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "📖",
                title: "Simple language",
                text: "Understand complicated scheme information in plain language.",
              },
              {
                icon: "👤",
                title: "Who can benefit",
                text: "See the main eligibility factors before going further.",
              },
              {
                icon: "📄",
                title: "Documents",
                text: "Know what documents or information you may need.",
              },
              {
                icon: "➡️",
                title: "Next steps",
                text: "Understand what you should check or do next.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="text-2xl">{item.icon}</div>

                <h3 className="mt-4 font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility CTA */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white">
                Not sure which schemes may apply to you?
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                Answer a few basic questions and get a preliminary list of
                schemes that may match your profile.
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

      {/* Disclaimer */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-8 text-center sm:px-6">
          <p className="text-xs leading-5 text-slate-500">
            SchemeSamjho is an independent informational platform and is not
            affiliated with the Government of India or any state government.
            Scheme information and eligibility rules may change. Always verify
            the latest details through the official government source before
            applying.
          </p>
        </div>
      </section>
    </main>
  );
}