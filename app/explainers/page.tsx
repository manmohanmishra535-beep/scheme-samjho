"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Search,
  ShieldCheck,
} from "lucide-react";

import { schemes } from "../../data/schemes";
import FavoriteButton from "../../Components/FavoriteButton";

export default function ExplainersPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(schemes.map((scheme) => scheme.category))
      ).sort(),
    ],
    []
  );

  const filteredSchemes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return schemes.filter((scheme) => {
      const matchesSearch =
        !query ||
        scheme.name.toLowerCase().includes(query) ||
        scheme.category.toLowerCase().includes(query) ||
        scheme.shortDescription
          .toLowerCase()
          .includes(query) ||
        scheme.description
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        category === "All" ||
        scheme.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]">
            <BookOpen
              size={23}
              className="text-[#FFFFFF]"
            />
          </div>

          <p className="mt-6 text-sm font-bold text-[#16A34A]">
            Scheme explainers
          </p>

          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl">
            Government schemes,
            <br />
            <span className="text-[#2563EB]">
              explained simply.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#FFFFFF]/70 sm:text-lg">
            Understand what a scheme does, who it is for,
            what benefits it provides, what documents you
            may need and how to find the official
            application process.
          </p>
        </div>
      </section>

      {/* =====================================================
          SEARCH + CATEGORY FILTER
          ===================================================== */}

      <section className="border-b border-[#111827]/10 bg-[#FFFFFF]">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search */}

            <div className="relative flex-1">
              <Search
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#111827]/45"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search schemes or topics..."
                aria-label="Search schemes or topics"
                className="w-full rounded-xl border border-[#111827]/15 bg-[#FFFFFF] py-3 pl-11 pr-4 text-sm font-medium text-[#111827] outline-none transition placeholder:text-[#111827]/40 focus:border-[#2563EB]"
              />
            </div>

            {/* Categories */}

            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((item) => {
                const active = category === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`whitespace-nowrap rounded-xl border px-4 py-3 text-sm font-bold transition ${
                      active
                        ? "border-[#2563EB] bg-[#2563EB] text-[#FFFFFF]"
                        : "border-[#111827]/10 bg-[#FFFFFF] text-[#111827] hover:border-[#2563EB] hover:text-[#2563EB]"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPLAINER LIST
          ===================================================== */}

      <section className="bg-[#FFFFFF]">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
          {/* Heading */}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-[#2563EB]">
                Simple guides
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827]">
                Explore explainers
              </h2>
            </div>

            <p className="text-sm font-semibold text-[#111827]/50">
              {filteredSchemes.length}{" "}
              {filteredSchemes.length === 1
                ? "scheme"
                : "schemes"}
            </p>
          </div>

          {/* Cards */}

          {filteredSchemes.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredSchemes.map((scheme) => (
                <article
                  key={scheme.slug}
                  className="group flex h-full flex-col rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6 transition hover:-translate-y-1 hover:border-[#2563EB]/30"
                >
                  {/* Card top */}

                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full border border-[#111827]/10 px-3 py-1 text-xs font-bold text-[#2563EB]">
                      {scheme.category}
                    </span>

                    {/* Fixed FavoriteButton */}
                    <FavoriteButton slug={scheme.slug} />
                  </div>

                  {/* Title */}

                  <h3 className="mt-5 text-xl font-extrabold leading-snug text-[#111827]">
                    {scheme.name}
                  </h3>

                  {/* Description */}

                  <p className="mt-3 flex-1 text-sm leading-6 text-[#111827]/60">
                    {scheme.shortDescription}
                  </p>

                  {/* Benefits preview */}

                  {scheme.benefits.length > 0 && (
                    <div className="mt-5 rounded-xl bg-[#111827]/5 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#16A34A]">
                        Key benefit
                      </p>

                      <p className="mt-1 text-sm font-semibold leading-6 text-[#111827]">
                        {scheme.benefits[0]}
                      </p>
                    </div>
                  )}

                  {/* Actions */}

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <Link
                      href={`/explainers/${scheme.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition group-hover:text-[#111827]"
                    >
                      Read explainer
                      <ArrowRight size={16} />
                    </Link>

                    <Link
                      href={`/schemes/${scheme.slug}`}
                      className="text-xs font-bold text-[#111827]/50 transition hover:text-[#2563EB]"
                    >
                      Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty state */

            <div className="mt-8 rounded-2xl border border-[#111827]/10 p-10 text-center">
              <Search
                size={28}
                className="mx-auto text-[#111827]/35"
              />

              <h3 className="mt-4 text-xl font-extrabold text-[#111827]">
                No explainers found
              </h3>

              <p className="mt-2 text-sm text-[#111827]/60">
                Try another search term or select a
                different category.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          TRUST SECTION
          ===================================================== */}

      <section className="border-t border-[#111827]/10 bg-[#111827]/5">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <ShieldCheck
              size={22}
              className="shrink-0 text-[#16A34A]"
            />

            <div>
              <h2 className="text-base font-extrabold text-[#111827]">
                Use official sources for final decisions
              </h2>

              <p className="mt-1 max-w-3xl text-sm leading-6 text-[#111827]/60">
                SchemeSamjho provides simplified
                informational explanations. Always verify
                current eligibility, benefits, documents and
                application procedures through the official
                government source.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
          ===================================================== */}

      <section className="bg-[#FFFFFF]">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
          <div className="rounded-2xl bg-[#111827] p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#FFFFFF]">
                Not sure which scheme may fit you?
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#FFFFFF]/65">
                Use the preliminary eligibility checker
                to explore schemes based on your basic
                information.
              </p>
            </div>

            <Link
              href="/eligibility"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#FFFFFF] hover:text-[#111827] lg:mt-0"
            >
              Check eligibility
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}