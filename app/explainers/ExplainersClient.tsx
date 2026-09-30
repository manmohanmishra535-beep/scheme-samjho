"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,nex
  CheckCircle2,
  Search,
  ShieldCheck,
} from "lucide-react";

import type { Scheme } from "../../data/schemes";

type ExplainersClientProps = {
  schemes: Scheme[];
};

export default function ExplainersClient({
  schemes,
}: ExplainersClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(schemes.map((scheme) => scheme.category))
      ),
    ];
  }, [schemes]);

  const filteredSchemes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return schemes.filter((scheme) => {
      const matchesCategory =
        category === "All" ||
        scheme.category === category;

      if (!query) {
        return matchesCategory;
      }

      const searchableText = [
        scheme.name,
        scheme.slug,
        scheme.category,
        scheme.shortDescription,
        scheme.description,
        scheme.eligibilitySummary,
        ...scheme.benefits,
        ...scheme.occupations,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        searchableText.includes(query)
      );
    });
  }, [schemes, search, category]);

  return (
    <div className="min-h-screen bg-white text-[#111827]">
      {/* HERO */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-[#2563EB]">
              <BookOpen className="h-4 w-4" />
              Scheme Explainers
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
              Government schemes explained simply
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
              Understand what a scheme does, who it is for,
              what benefits it provides, which documents you may
              need and how to get started.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="bg-gray-50 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="grid gap-4 md:grid-cols-[1fr_240px]">
              <div>
                <label
                  htmlFor="explainer-search"
                  className="mb-2 block text-sm font-bold text-[#111827]"
                >
                  Search explainers
                </label>

                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    id="explainer-search"
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search by scheme name, benefit or occupation..."
                    className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 text-sm font-medium text-[#111827] outline-none transition placeholder:text-gray-400 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="explainer-category"
                  className="mb-2 block text-sm font-bold text-[#111827]"
                >
                  Category
                </label>

                <select
                  id="explainer-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium text-[#111827] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLAINERS */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#2563EB]">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-[#111827] sm:text-4xl">
                Scheme explainers
              </h2>
            </div>

            <p className="text-sm font-semibold text-gray-500">
              {filteredSchemes.length}{" "}
              {filteredSchemes.length === 1
                ? "explainer"
                : "explainers"}
            </p>
          </div>

          {filteredSchemes.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-gray-400" />

              <h3 className="mt-4 text-xl font-black text-[#111827]">
                No explainers found
              </h3>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-600">
                Try a different search term or select another
                category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#2563EB] px-5 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSchemes.map((scheme) => (
                <article
                  key={scheme.slug}
                  className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >
                  {/* CATEGORY */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2563EB]">
                      {scheme.category}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#16A34A]" />
                      Verified
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-5 text-xl font-black leading-7 text-[#111827]">
                    {scheme.name}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                    {scheme.shortDescription}
                  </p>

                  {/* WHAT YOU WILL LEARN */}
                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      In this explainer
                    </p>

                    <ul className="mt-3 space-y-2">
                      <li className="flex gap-2 text-sm leading-5 text-gray-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />
                        Benefits and key features
                      </li>

                      <li className="flex gap-2 text-sm leading-5 text-gray-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />
                        Eligibility requirements
                      </li>

                      <li className="flex gap-2 text-sm leading-5 text-gray-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />
                        Documents and application information
                      </li>
                    </ul>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-auto pt-6">
                    <div className="mb-5 border-t border-gray-100 pt-4">
                      <p className="text-xs text-gray-500">
                        Last verified:{" "}
                        <span className="font-semibold text-gray-700">
                          {scheme.lastVerified}
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/explainers/${scheme.slug}`}
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
                    >
                      Read Explainer
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-gray-50 py-14">
        <div className="mx-auto max-w-5xl px-6 text-center sm:px-8">
          <h2 className="text-3xl font-black tracking-tight text-[#111827]">
            Not sure which schemes you may qualify for?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Use the eligibility checker for a preliminary
            comparison based on your basic details.
          </p>

          <Link
            href="/eligibility"
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-[#2563EB] px-6 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
          >
            Check Eligibility
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}