"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Filter,
  Search,
  Sparkles,
  SlidersHorizontal,
  ShieldCheck,
  X,
} from "lucide-react";

import { schemes } from "../../data/schemes";
import FavoriteButton from "../../Components/FavoriteButton";

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

const occupations = [
  "All",
  "Farmer",
  "Business / Self-employed",
  "Employee",
  "Student",
  "Other",
];

const incomeOptions = [
  { label: "Any income", value: "" },
  { label: "Up to ₹1 lakh", value: "100000" },
  { label: "Up to ₹2 lakh", value: "200000" },
  { label: "Up to ₹5 lakh", value: "500000" },
  { label: "Up to ₹10 lakh", value: "1000000" },
];

const INITIAL_VISIBLE = 6;

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function occupationMatches(
  schemeOccupations: string[],
  selectedOccupation: string
) {
  if (selectedOccupation === "All") {
    return true;
  }

  const selected = normalize(selectedOccupation);

  return schemeOccupations.some((occupation) => {
    const current = normalize(occupation);

    if (selected === "farmer") {
      return (
        current.includes("farmer") ||
        current.includes("agriculture")
      );
    }

    if (selected === "business / self-employed") {
      return (
        current.includes("business") ||
        current.includes("self-employed") ||
        current.includes("self employed")
      );
    }

    if (selected === "employee") {
      return (
        current.includes("employee") ||
        current.includes("worker")
      );
    }

    if (selected === "student") {
      return current.includes("student");
    }

    if (selected === "other") {
      return (
        !current.includes("farmer") &&
        !current.includes("agriculture") &&
        !current.includes("business") &&
        !current.includes("self-employed") &&
        !current.includes("self employed") &&
        !current.includes("employee") &&
        !current.includes("worker") &&
        !current.includes("student")
      );
    }

    return current.includes(selected);
  });
}

function formatAge(
  minAge?: number,
  maxAge?: number
) {
  if (minAge !== undefined && maxAge !== undefined) {
    return `${minAge}–${maxAge}`;
  }

  if (minAge !== undefined) {
    return `${minAge}+`;
  }

  if (maxAge !== undefined) {
    return `Up to ${maxAge}`;
  }

  return "See rules";
}

function SchemesPageContent() {
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get("category") || "All";
  const urlSearch = searchParams.get("search") || "";

  const initialCategory = categories.includes(urlCategory)
    ? urlCategory
    : "All";

  const [search, setSearch] = useState(urlSearch);
  const [category, setCategory] = useState(initialCategory);
  const [occupation, setOccupation] = useState("All");
  const [income, setIncome] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] =
    useState(INITIAL_VISIBLE);

  const filteredSchemes = useMemo(() => {
    const query = normalize(search);

    return schemes.filter((scheme) => {
      const matchesSearch =
        !query ||
        normalize(scheme.name).includes(query) ||
        normalize(scheme.slug).includes(query) ||
        normalize(scheme.category).includes(query) ||
        normalize(scheme.shortDescription).includes(query) ||
        normalize(scheme.description).includes(query) ||
        scheme.occupations.some((item) =>
          normalize(item).includes(query)
        ) ||
        scheme.keywords.some((item) =>
          normalize(item).includes(query)
        ) ||
        scheme.benefits.some((item) =>
          normalize(item).includes(query)
        );

      const matchesCategory =
        category === "All" ||
        scheme.category === category;

      const matchesOccupation = occupationMatches(
        scheme.occupations,
        occupation
      );

      const selectedIncome =
        income === "" ? undefined : Number(income);

      const matchesIncome =
        selectedIncome === undefined ||
        scheme.maxIncome === undefined ||
        scheme.maxIncome <= selectedIncome;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesOccupation &&
        matchesIncome
      );
    });
  }, [search, category, occupation, income]);

  const visibleSchemes = filteredSchemes.slice(
    0,
    visibleCount
  );

  const hasMore =
    visibleCount < filteredSchemes.length;

  const activeFilterCount =
    (category !== "All" ? 1 : 0) +
    (occupation !== "All" ? 1 : 0) +
    (income !== "" ? 1 : 0);

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setOccupation("All");
    setIncome("");
    setVisibleCount(INITIAL_VISIBLE);
  }

  function handleCategoryChange(value: string) {
    setCategory(value);
    setVisibleCount(INITIAL_VISIBLE);
  }

  function handleOccupationChange(value: string) {
    setOccupation(value);
    setVisibleCount(INITIAL_VISIBLE);
  }

  function handleIncomeChange(value: string) {
    setIncome(value);
    setVisibleCount(INITIAL_VISIBLE);
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#091733]">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:45px_45px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">

          <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-center">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-blue-200">
                <Sparkles className="h-4 w-4" />
                Discover government schemes
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find schemes that may
                <span className="block bg-gradient-to-r from-blue-300 via-white to-amber-300 bg-clip-text text-transparent">
                  fit your needs.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Search government schemes by your needs, occupation,
                category or income. Understand the details before
                visiting the official source.
              </p>

              {/* Search */}
              <div className="mt-8 max-w-3xl">

                <div className="relative rounded-2xl bg-white p-1.5 shadow-2xl shadow-black/30">

                  <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setVisibleCount(INITIAL_VISIBLE);
                    }}
                    placeholder="Search farmer, student, pension, housing..."
                    className="h-14 w-full rounded-xl bg-white pl-12 pr-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                  />

                </div>

              </div>

              {/* Quick categories */}
              <div className="mt-5 flex flex-wrap gap-2">

                {["Farmers", "Students", "Healthcare", "Business"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleCategoryChange(item)}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                    >
                      {item}
                    </button>
                  )
                )}

              </div>

            </div>

            {/* Hero stats */}
            <div className="hidden lg:block">

              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur">

                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Explore smarter
                </p>

                <div className="mt-5 space-y-3">

                  <div className="rounded-2xl bg-white p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                        <Search className="h-5 w-5 text-blue-600" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-slate-900">
                          Search
                        </p>

                        <p className="text-xs text-slate-500">
                          Find by keyword
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                        <SlidersHorizontal className="h-5 w-5 text-violet-600" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-slate-900">
                          Filter
                        </p>

                        <p className="text-xs text-slate-500">
                          Narrow your options
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                        <ShieldCheck className="h-5 w-5 text-emerald-600" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-slate-900">
                          Verify
                        </p>

                        <p className="text-xs text-slate-500">
                          Check official sources
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          FILTER + RESULTS
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

          {/* =================================================
              DESKTOP SIDEBAR
          ================================================= */}
          <aside className="hidden lg:block">

            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-blue-600" />

                  <h2 className="font-black text-slate-900">
                    Filters
                  </h2>
                </div>

                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-blue-600 px-2 py-1 text-[10px] font-black text-white">
                    {activeFilterCount}
                  </span>
                )}

              </div>

              {/* Categories */}
              <div className="mt-6">

                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Category
                </p>

                <div className="mt-3 space-y-1">

                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        handleCategoryChange(item)
                      }
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                        category === item
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {item}

                      {category === item && (
                        <Check className="h-4 w-4" />
                      )}
                    </button>
                  ))}

                </div>

              </div>

              {/* Occupation */}
              <div className="mt-7 border-t border-slate-100 pt-6">

                <label
                  htmlFor="desktop-occupation"
                  className="text-xs font-black uppercase tracking-wider text-slate-400"
                >
                  Occupation
                </label>

                <div className="relative mt-3">

                  <select
                    id="desktop-occupation"
                    value={occupation}
                    onChange={(event) =>
                      handleOccupationChange(
                        event.target.value
                      )
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    {occupations.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                </div>

              </div>

              {/* Income */}
              <div className="mt-5">

                <label
                  htmlFor="desktop-income"
                  className="text-xs font-black uppercase tracking-wider text-slate-400"
                >
                  Annual income
                </label>

                <div className="relative mt-3">

                  <select
                    id="desktop-income"
                    value={income}
                    onChange={(event) =>
                      handleIncomeChange(event.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    {incomeOptions.map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                </div>

              </div>

              {(activeFilterCount > 0 || search.trim()) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-red-600 transition hover:bg-red-100"
                >
                  <X className="h-4 w-4" />
                  Clear all filters
                </button>
              )}

            </div>

          </aside>

          {/* =================================================
              RESULTS COLUMN
          ================================================= */}
          <div>

            {/* Mobile filter */}
            <div className="lg:hidden">

              <button
                type="button"
                onClick={() =>
                  setShowFilters((current) => !current)
                }
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-800 shadow-sm"
              >

                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-blue-600" />
                  Filters
                </span>

                <span className="flex items-center gap-2">

                  {activeFilterCount > 0 && (
                    <span className="rounded-full bg-blue-600 px-2 py-1 text-[10px] font-black text-white">
                      {activeFilterCount}
                    </span>
                  )}

                  <ChevronDown
                    className={`h-4 w-4 transition ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />

                </span>

              </button>

              {showFilters && (
                <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Category
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">

                    {categories.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          handleCategoryChange(item)
                        }
                        className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                          category === item
                            ? "bg-blue-600 text-white"
                            : "border border-slate-200 bg-white text-slate-600"
                        }`}
                      >
                        {item}
                      </button>
                    ))}

                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">

                    <select
                      value={occupation}
                      onChange={(event) =>
                        handleOccupationChange(
                          event.target.value
                        )
                      }
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700 outline-none"
                    >
                      {occupations.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <select
                      value={income}
                      onChange={(event) =>
                        handleIncomeChange(event.target.value)
                      }
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700 outline-none"
                    >
                      {incomeOptions.map((item) => (
                        <option
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </option>
                      ))}
                    </select>

                  </div>

                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-4 text-xs font-bold text-red-600"
                    >
                      Clear filters
                    </button>
                  )}

                </div>
              )}

            </div>

            {/* Results header */}
            <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end lg:mt-0">

              <div>

                <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                  Scheme directory
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                  Explore schemes
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {filteredSchemes.length}{" "}
                  {filteredSchemes.length === 1
                    ? "scheme"
                    : "schemes"}{" "}
                  match your current filters
                </p>

              </div>

              <Link
                href="/eligibility"
                className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                Not sure what to choose?
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

            {/* Active chips */}
            {(activeFilterCount > 0 || search.trim()) && (
              <div className="mt-5 flex flex-wrap gap-2">

                {search.trim() && (
                  <span className="flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-bold text-white">
                    Search: {search}

                    <button
                      type="button"
                      onClick={() => setSearch("")}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}

                {category !== "All" && (
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                    {category}
                  </span>
                )}

                {occupation !== "All" && (
                  <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                    {occupation}
                  </span>
                )}

                {income !== "" && (
                  <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                    {
                      incomeOptions.find(
                        (item) => item.value === income
                      )?.label
                    }
                  </span>
                )}

              </div>
            )}

            {/* Empty state */}
            {filteredSchemes.length === 0 ? (
              <div className="mt-7 rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                  <Search className="h-7 w-7 text-blue-600" />
                </div>

                <h3 className="mt-5 text-xl font-black text-slate-950">
                  No matching schemes
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Try another keyword or remove some filters to
                  see more schemes.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  Clear Filters
                </button>

              </div>
            ) : (
              <>
                {/* Scheme cards */}
                <div className="mt-7 grid gap-5 md:grid-cols-2">

                  {visibleSchemes.map((scheme, index) => (
                    <article
                      key={scheme.slug}
                      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                    >

                      {/* Top accent */}
                      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 opacity-0 transition group-hover:opacity-100" />

                      {/* Card header */}
                      <div className="flex items-start justify-between gap-3">

                        <div className="flex items-center gap-3">

                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                            {index % 3 === 0
                              ? "🇮🇳"
                              : index % 3 === 1
                                ? "✨"
                                : "🛡️"}
                          </div>

                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                              {scheme.category}
                            </span>

                            <p className="mt-0.5 text-xs text-slate-400">
                              Scheme
                            </p>
                          </div>

                        </div>

                        <FavoriteButton slug={scheme.slug} />

                      </div>

                      {/* Title */}
                      <h3 className="mt-6 text-xl font-black leading-7 text-slate-950 transition group-hover:text-blue-700">
                        {scheme.name}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                        {scheme.shortDescription}
                      </p>

                      {/* Facts */}
                      <div className="mt-6 grid grid-cols-2 gap-2">

                        <div className="rounded-2xl bg-slate-50 p-3.5">
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            Age
                          </p>

                          <p className="mt-1 text-sm font-black text-slate-800">
                            {formatAge(
                              scheme.minAge,
                              scheme.maxAge
                            )}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-3.5">
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            Income
                          </p>

                          <p className="mt-1 truncate text-sm font-black text-slate-800">
                            {scheme.maxIncome !== undefined
                              ? `₹${scheme.maxIncome.toLocaleString(
                                  "en-IN"
                                )}`
                              : "See rules"}
                          </p>
                        </div>

                      </div>

                      {/* Benefits preview */}
                      {scheme.benefits.length > 0 && (
                        <div className="mt-4 flex items-start gap-2 rounded-2xl bg-emerald-50/70 p-3.5">

                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                          <p className="line-clamp-2 text-xs font-semibold leading-5 text-emerald-800">
                            {scheme.benefits[0]}
                          </p>

                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-6 flex gap-2">

                        <Link
                          href={`/schemes/${scheme.slug}`}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                        >
                          View Scheme
                          <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                          href={`/explainers/${scheme.slug}`}
                          className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
                        >
                          Explainer
                        </Link>

                      </div>

                      {/* Footer */}
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

                        <span className="text-[11px] text-slate-400">
                          Reviewed {scheme.lastVerified}
                        </span>

                        <Link
                          href={`/schemes/${scheme.slug}`}
                          className="flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-blue-600"
                        >
                          Details
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Link>

                      </div>

                    </article>
                  ))}

                </div>

                {/* Load more */}
                {hasMore && (
                  <div className="mt-10 text-center">

                    <button
                      type="button"
                      onClick={() =>
                        setVisibleCount(
                          (current) => current + 6
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600 hover:shadow-md"
                    >
                      Load More Schemes
                      <ChevronDown className="h-4 w-4" />
                    </button>

                  </div>
                )}

              </>
            )}

          </div>
        </div>
      </section>

      {/* =====================================================
          ELIGIBILITY CTA
      ===================================================== */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#101b35]">

          <div className="relative p-8 sm:p-10 lg:p-12">

            <div className="absolute right-[-80px] top-[-100px] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_350px] lg:items-center">

              <div>

                <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-300">
                  <Sparkles className="h-4 w-4" />
                  Need a little help?
                </div>

                <h2 className="mt-5 max-w-2xl text-3xl font-black text-white sm:text-4xl">
                  Let your profile guide
                  <span className="text-amber-300">
                    {" "}your search.
                  </span>
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Answer a few questions about your age, occupation,
                  income and state to discover schemes that may match
                  your profile.
                </p>

                <Link
                  href="/eligibility"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-amber-300"
                >
                  Check My Eligibility
                  <ArrowRight className="h-4 w-4" />
                </Link>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">

                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Quick profile
                </p>

                <div className="mt-4 space-y-2">

                  {[
                    "Age",
                    "Occupation",
                    "Annual income",
                    "State",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3"
                    >

                      <div className="flex items-center gap-3">

                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-[10px] font-black text-slate-400">
                          {index + 1}
                        </span>

                        <span className="text-sm font-semibold text-slate-300">
                          {item}
                        </span>

                      </div>

                      <ChevronRight className="h-4 w-4 text-slate-500" />

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          DISCLAIMER
      ===================================================== */}
      <section className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-4xl px-4 py-9 text-center sm:px-6">

          <p className="text-xs leading-5 text-slate-500">
            <strong className="text-slate-700">
              Important:
            </strong>{" "}
            SchemeSamjho is an independent informational platform
            and is not affiliated with the Government of India or
            any state government. Scheme information can change.
            Eligibility information shown here is preliminary and
            should always be verified with the relevant official
            government source.
          </p>

        </div>

      </section>

    </main>
  );
}

export default function SchemesPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f7f9fc]">
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Loading schemes...
              </p>
            </div>
          </div>
        </main>
      }
    >
      <SchemesPageContent />
    </Suspense>
  );
}