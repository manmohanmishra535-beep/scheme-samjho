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
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { schemes } from "../../data/schemes";
import FavoriteButton from "../../Components/FavoriteButton";

/* =========================================================
   SCHEMESAMJHO COLOR SYSTEM

   BLUE  → #2563EB
   GREEN → #16A34A
   WHITE → #FFFFFF
   DARK  → #111827

   No purple
   No yellow
   No orange
   No red
   No gradients
   ========================================================= */

const categories = [
  "All",
  ...Array.from(
    new Set(schemes.map((scheme) => scheme.category))
  ).sort(),
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
  minAge?: number | null,
  maxAge?: number | null
) {
  if (minAge != null && maxAge != null) {
    return `${minAge}–${maxAge}`;
  }

  if (minAge != null) {
    return `${minAge}+`;
  }

  if (maxAge != null) {
    return `Up to ${maxAge}`;
  }

  return "See rules";
}

/* =========================================================
   MAIN PAGE CONTENT
   ========================================================= */

function SchemesPageContent() {
  const searchParams = useSearchParams();

  const urlCategory =
    searchParams.get("category") || "All";

  const urlSearch =
    searchParams.get("search") || "";

  const initialCategory = categories.includes(
    urlCategory
  )
    ? urlCategory
    : "All";

  const [search, setSearch] =
    useState(urlSearch);

  const [category, setCategory] =
    useState(initialCategory);

  const [occupation, setOccupation] =
    useState("All");

  const [income, setIncome] =
    useState("");

  const [showFilters, setShowFilters] =
    useState(false);

  const [visibleCount, setVisibleCount] =
    useState(INITIAL_VISIBLE);

  /* =======================================================
     FILTERING
     ======================================================= */

  const filteredSchemes = useMemo(() => {
    const query = normalize(search);

    return schemes.filter((scheme) => {
      const matchesSearch =
        !query ||
        normalize(scheme.name).includes(query) ||
        normalize(scheme.slug).includes(query) ||
        normalize(scheme.category).includes(query) ||
        normalize(
          scheme.shortDescription
        ).includes(query) ||
        normalize(
          scheme.description
        ).includes(query) ||
        scheme.occupations.some((item) =>
          normalize(item).includes(query)
        ) ||
        scheme.benefits.some((item) =>
          normalize(item).includes(query)
        );

      const matchesCategory =
        category === "All" ||
        scheme.category === category;

      const matchesOccupation =
        occupationMatches(
          scheme.occupations,
          occupation
        );

      const selectedIncome =
        income === ""
          ? undefined
          : Number(income);

      const matchesIncome =
        selectedIncome === undefined ||
        scheme.maxIncome == null ||
        scheme.maxIncome <= selectedIncome;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesOccupation &&
        matchesIncome
      );
    });
  }, [
    search,
    category,
    occupation,
    income,
  ]);

  const visibleSchemes =
    filteredSchemes.slice(
      0,
      visibleCount
    );

  const hasMore =
    visibleCount <
    filteredSchemes.length;

  const activeFilterCount =
    (category !== "All" ? 1 : 0) +
    (occupation !== "All" ? 1 : 0) +
    (income !== "" ? 1 : 0);

  /* =======================================================
     ACTIONS
     ======================================================= */

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setOccupation("All");
    setIncome("");
    setVisibleCount(
      INITIAL_VISIBLE
    );
  }

  function handleCategoryChange(
    value: string
  ) {
    setCategory(value);
    setVisibleCount(
      INITIAL_VISIBLE
    );
  }

  function handleOccupationChange(
    value: string
  ) {
    setOccupation(value);
    setVisibleCount(
      INITIAL_VISIBLE
    );
  }

  function handleIncomeChange(
    value: string
  ) {
    setIncome(value);
    setVisibleCount(
      INITIAL_VISIBLE
    );
  }

  /* =======================================================
     PAGE
     ======================================================= */

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#111827]">

      {/* ===================================================
          HERO
          =================================================== */}

      <section className="bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">

          <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:items-center">

            {/* Hero content */}

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#FFFFFF]/20 px-4 py-2 text-sm font-semibold text-[#FFFFFF]">
                <Search
                  className="h-4 w-4"
                />
                Discover government schemes
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl">
                Find schemes that may fit your needs.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#FFFFFF]/75 sm:text-lg">
                Search government schemes by your needs,
                occupation, category or income. Understand
                the details before visiting the official source.
              </p>

              {/* Search */}

              <div className="mt-7 max-w-3xl">

                <div className="relative rounded-xl bg-[#FFFFFF] p-1.5">

                  <Search
                    className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#111827]/45"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => {
                      setSearch(
                        event.target.value
                      );
                      setVisibleCount(
                        INITIAL_VISIBLE
                      );
                    }}
                    placeholder="Search farmer, student, pension, housing..."
                    className="h-12 w-full rounded-lg bg-[#FFFFFF] pl-12 pr-4 text-sm font-medium text-[#111827] outline-none placeholder:text-[#111827]/45"
                  />

                </div>
              </div>

              {/* Quick categories */}

              <div className="mt-4 flex flex-wrap gap-2">

                {[
                  "Farmers",
                  "Students",
                  "Healthcare",
                  "Business",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      handleCategoryChange(item)
                    }
                    className="rounded-full border border-[#FFFFFF]/20 px-4 py-2 text-sm font-semibold text-[#FFFFFF]/80 transition hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-[#FFFFFF]"
                  >
                    {item}
                  </button>
                ))}

              </div>

            </div>

            {/* Hero helper card */}

            <div className="hidden lg:block">

              <div className="rounded-2xl border border-[#FFFFFF]/15 bg-[#FFFFFF]/10 p-4">

                <p className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF]/60">
                  Explore smarter
                </p>

                <div className="mt-4 space-y-2.5">

                  {/* Search */}

                  <div className="rounded-xl bg-[#FFFFFF] p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB]/10">
                        <Search
                          className="h-5 w-5 text-[#2563EB]"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#111827]">
                          Search
                        </p>

                        <p className="text-xs text-[#111827]/55">
                          Find by keyword
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Filter */}

                  <div className="rounded-xl bg-[#FFFFFF] p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB]/10">
                        <SlidersHorizontal
                          className="h-5 w-5 text-[#2563EB]"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#111827]">
                          Filter
                        </p>

                        <p className="text-xs text-[#111827]/55">
                          Narrow your options
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Verify */}

                  <div className="rounded-xl bg-[#FFFFFF] p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#16A34A]/10">
                        <ShieldCheck
                          className="h-5 w-5 text-[#16A34A]"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#111827]">
                          Verify
                        </p>

                        <p className="text-xs text-[#111827]/55">
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

      {/* ===================================================
          FILTER + RESULTS
          =================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">

          {/* =================================================
              DESKTOP SIDEBAR
              ================================================= */}

          <aside className="hidden lg:block">

            <div className="sticky top-24 rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-5">

              {/* Filter heading */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <Filter
                    className="h-4 w-4 text-[#2563EB]"
                  />

                  <h2 className="text-base font-bold text-[#111827]">
                    Filters
                  </h2>

                </div>

                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-[#2563EB] px-2 py-1 text-[10px] font-bold text-[#FFFFFF]">
                    {activeFilterCount}
                  </span>
                )}

              </div>

              {/* Category */}

              <div className="mt-6">

                <p className="text-xs font-bold uppercase tracking-wider text-[#111827]/50">
                  Category
                </p>

                <div className="mt-3 space-y-1">

                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        handleCategoryChange(
                          item
                        )
                      }
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                        category === item
                          ? "bg-[#2563EB]/10 text-[#2563EB]"
                          : "text-[#111827]/70 hover:bg-[#111827]/5 hover:text-[#111827]"
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

              <div className="mt-6 border-t border-[#111827]/10 pt-5">

                <label
                  htmlFor="desktop-occupation"
                  className="text-xs font-bold uppercase tracking-wider text-[#111827]/50"
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
                    className="w-full appearance-none rounded-lg border border-[#111827]/15 bg-[#FFFFFF] px-3 py-2.5 pr-9 text-sm font-medium text-[#111827] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                  >
                    {occupations.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111827]/50" />

                </div>
              </div>

              {/* Income */}

              <div className="mt-5">

                <label
                  htmlFor="desktop-income"
                  className="text-xs font-bold uppercase tracking-wider text-[#111827]/50"
                >
                  Annual income
                </label>

                <div className="relative mt-3">

                  <select
                    id="desktop-income"
                    value={income}
                    onChange={(event) =>
                      handleIncomeChange(
                        event.target.value
                      )
                    }
                    className="w-full appearance-none rounded-lg border border-[#111827]/15 bg-[#FFFFFF] px-3 py-2.5 pr-9 text-sm font-medium text-[#111827] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                  >
                    {incomeOptions.map(
                      (item) => (
                        <option
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </option>
                      )
                    )}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111827]/50" />

                </div>
              </div>

              {/* Clear */}

              {(activeFilterCount > 0 ||
                search.trim()) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-[#111827]/15 px-4 py-2.5 text-xs font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
                >
                  <X className="h-4 w-4" />
                  Clear all filters
                </button>
              )}

            </div>
          </aside>

          {/* =================================================
              RESULTS
              ================================================= */}

          <div>

            {/* Mobile filters */}

            <div className="lg:hidden">

              <button
                type="button"
                onClick={() =>
                  setShowFilters(
                    (current) => !current
                  )
                }
                className="flex w-full items-center justify-between rounded-xl border border-[#111827]/10 bg-[#FFFFFF] px-4 py-3 text-sm font-bold text-[#111827]"
              >

                <span className="flex items-center gap-2">

                  <SlidersHorizontal
                    className="h-4 w-4 text-[#2563EB]"
                  />

                  Filters

                </span>

                <span className="flex items-center gap-2">

                  {activeFilterCount > 0 && (
                    <span className="rounded-full bg-[#2563EB] px-2 py-1 text-[10px] font-bold text-[#FFFFFF]">
                      {activeFilterCount}
                    </span>
                  )}

                  <ChevronDown
                    className={`h-4 w-4 transition ${
                      showFilters
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </span>

              </button>

              {showFilters && (
                <div className="mt-3 rounded-xl border border-[#111827]/10 bg-[#FFFFFF] p-5">

                  <p className="text-xs font-bold uppercase tracking-wider text-[#111827]/50">
                    Category
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">

                    {categories.map(
                      (item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            handleCategoryChange(
                              item
                            )
                          }
                          className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                            category === item
                              ? "bg-[#2563EB] text-[#FFFFFF]"
                              : "border border-[#111827]/15 bg-[#FFFFFF] text-[#111827]/70 hover:border-[#2563EB] hover:text-[#2563EB]"
                          }`}
                        >
                          {item}
                        </button>
                      )
                    )}

                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">

                    <select
                      value={occupation}
                      onChange={(event) =>
                        handleOccupationChange(
                          event.target.value
                        )
                      }
                      className="rounded-lg border border-[#111827]/15 bg-[#FFFFFF] px-3 py-2.5 text-sm font-medium text-[#111827] outline-none focus:border-[#2563EB]"
                    >
                      {occupations.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}
                    </select>

                    <select
                      value={income}
                      onChange={(event) =>
                        handleIncomeChange(
                          event.target.value
                        )
                      }
                      className="rounded-lg border border-[#111827]/15 bg-[#FFFFFF] px-3 py-2.5 text-sm font-medium text-[#111827] outline-none focus:border-[#2563EB]"
                    >
                      {incomeOptions.map(
                        (item) => (
                          <option
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </option>
                        )
                      )}
                    </select>

                  </div>

                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-4 text-xs font-bold text-[#2563EB]"
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

                <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  Scheme directory
                </p>

                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl">
                  Explore schemes
                </h2>

                <p className="mt-1 text-sm text-[#111827]/60">
                  {filteredSchemes.length}{" "}
                  {filteredSchemes.length === 1
                    ? "scheme"
                    : "schemes"}{" "}
                  match your current filters
                </p>

              </div>

              <Link
                href="/eligibility"
                className="inline-flex items-center gap-1 text-sm font-bold text-[#2563EB] transition hover:text-[#111827]"
              >
                Not sure what to choose?
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

            {/* Active filters */}

            {(activeFilterCount > 0 ||
              search.trim()) && (
              <div className="mt-4 flex flex-wrap gap-2">

                {search.trim() && (
                  <span className="flex items-center gap-1.5 rounded-full bg-[#111827] px-3 py-1.5 text-xs font-bold text-[#FFFFFF]">

                    Search: {search}

                    <button
                      type="button"
                      onClick={() =>
                        setSearch("")
                      }
                      aria-label="Clear search"
                    >
                      <X className="h-3 w-3" />
                    </button>

                  </span>
                )}

                {category !== "All" && (
                  <span className="rounded-full bg-[#2563EB]/10 px-3 py-1.5 text-xs font-bold text-[#2563EB]">
                    {category}
                  </span>
                )}

                {occupation !== "All" && (
                  <span className="rounded-full bg-[#16A34A]/10 px-3 py-1.5 text-xs font-bold text-[#16A34A]">
                    {occupation}
                  </span>
                )}

                {income !== "" && (
                  <span className="rounded-full bg-[#111827]/5 px-3 py-1.5 text-xs font-bold text-[#111827]">
                    {
                      incomeOptions.find(
                        (item) =>
                          item.value ===
                          income
                      )?.label
                    }
                  </span>
                )}

              </div>
            )}

            {/* =================================================
                EMPTY STATE
                ================================================= */}

            {filteredSchemes.length === 0 ? (
              <div className="mt-7 rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] px-6 py-14 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#2563EB]/10">
                  <Search className="h-6 w-6 text-[#2563EB]" />
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-[#111827]">
                  No matching schemes
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#111827]/60">
                  Try another keyword or remove some
                  filters to see more schemes.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
                >
                  Clear Filters
                </button>

              </div>
            ) : (
              <>

                {/* =================================================
                    SCHEME CARDS
                    ================================================= */}

                <div className="mt-7 grid gap-5 md:grid-cols-2">

                  {visibleSchemes.map(
                    (scheme) => (
                      <article
                        key={scheme.slug}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#2563EB]/40"
                      >

                        {/* Header */}

                        <div className="flex items-start justify-between gap-3">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                              <ShieldCheck className="h-5 w-5" />
                            </div>

                            <div>

                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
                                {scheme.category}
                              </span>

                              <p className="mt-0.5 text-xs text-[#111827]/50">
                                Government scheme
                              </p>

                            </div>

                          </div>

                          <FavoriteButton
                            slug={scheme.slug}
                          />

                        </div>

                        {/* Title */}

                        <h3 className="mt-5 text-xl font-extrabold leading-7 tracking-tight text-[#111827] transition group-hover:text-[#2563EB]">
                          {scheme.name}
                        </h3>

                        {/* Description */}

                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#111827]/65">
                          {scheme.shortDescription}
                        </p>

                        {/* Facts */}

                        <div className="mt-5 grid grid-cols-2 gap-2">

                          <div className="rounded-xl bg-[#111827]/5 p-3">

                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#111827]/50">
                              Age
                            </p>

                            <p className="mt-1 text-sm font-bold text-[#111827]">
                              {formatAge(
                                scheme.minAge,
                                scheme.maxAge
                              )}
                            </p>

                          </div>

                          <div className="rounded-xl bg-[#111827]/5 p-3">

                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#111827]/50">
                              Income
                            </p>

                            <p className="mt-1 truncate text-sm font-bold text-[#111827]">
                              {scheme.maxIncome != null
                                ? `₹${scheme.maxIncome.toLocaleString(
                                    "en-IN"
                                      )}`
                                     : "See rules"}
                            </p>

                          </div>

                        </div>

                        {/* Benefit */}

                        {scheme.benefits.length >
                          0 && (
                          <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#16A34A]/10 p-3">

                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />

                            <p className="line-clamp-2 text-xs font-semibold leading-5 text-[#16A34A]">
                              {
                                scheme
                                  .benefits[0]
                              }
                            </p>

                          </div>
                        )}

                        {/* Actions */}

                        <div className="mt-5 flex gap-2">

                          <Link
                            href={`/schemes/${scheme.slug}`}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
                          >
                            View Scheme
                            <ArrowRight className="h-4 w-4" />
                          </Link>

                          <Link
                            href={`/explainers/${scheme.slug}`}
                            className="flex items-center justify-center rounded-lg border border-[#111827]/15 px-4 py-2.5 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
                          >
                            Explainer
                          </Link>

                        </div>

                        {/* Footer */}

                        <div className="mt-4 flex items-center justify-between border-t border-[#111827]/10 pt-3">

                          <span className="text-[11px] text-[#111827]/50">
                            Reviewed{" "}
                            {scheme.lastVerified}
                          </span>

                          <Link
                            href={`/schemes/${scheme.slug}`}
                            className="flex items-center gap-1 text-xs font-bold text-[#111827]/50 transition hover:text-[#2563EB]"
                          >
                            Details
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Link>

                        </div>

                      </article>
                    )
                  )}

                </div>

                {/* =================================================
                    LOAD MORE
                    ================================================= */}

                {hasMore && (
                  <div className="mt-8 text-center">

                    <button
                      type="button"
                      onClick={() =>
                        setVisibleCount(
                          (current) =>
                            current + 6
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-[#111827]/15 bg-[#FFFFFF] px-6 py-3 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
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

      {/* ===================================================
          ELIGIBILITY CTA
          =================================================== */}

      <section className="px-6 pb-14 sm:px-8 lg:px-10">

        <div className="mx-auto max-w-7xl rounded-2xl bg-[#111827]">

          <div className="p-7 sm:p-9 lg:p-10">

            <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">

              {/* CTA text */}

              <div>

                <div className="inline-flex items-center gap-2 rounded-full bg-[#2563EB]/10 px-4 py-2 text-xs font-bold text-[#FFFFFF]">
                  <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
                  Need a little help?
                </div>

                <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-[#FFFFFF] sm:text-4xl">
                  Let your profile guide your search.
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#FFFFFF]/70 sm:text-base">
                  Answer a few questions about your age,
                  occupation, income and state to discover
                  schemes that may match your profile.
                </p>

                <Link
                  href="/eligibility"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#FFFFFF] hover:text-[#111827]"
                >
                  Check My Eligibility
                  <ArrowRight className="h-4 w-4" />
                </Link>

              </div>

              {/* Quick profile */}

              <div className="rounded-xl border border-[#FFFFFF]/15 bg-[#FFFFFF]/5 p-4">

                <p className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF]/50">
                  Quick profile
                </p>

                <div className="mt-3 space-y-2">

                  {[
                    "Age",
                    "Occupation",
                    "Annual income",
                    "State",
                  ].map(
                    (item, index) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-lg border border-[#FFFFFF]/10 px-3 py-2.5"
                      >

                        <div className="flex items-center gap-3">

                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFFFFF]/10 text-[10px] font-bold text-[#FFFFFF]/60">
                            {index + 1}
                          </span>

                          <span className="text-sm font-semibold text-[#FFFFFF]/75">
                            {item}
                          </span>

                        </div>

                        <ChevronRight className="h-4 w-4 text-[#FFFFFF]/45" />

                      </div>
                    )
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          DISCLAIMER
          =================================================== */}

      <section className="border-t border-[#111827]/10 bg-[#FFFFFF]">

        <div className="mx-auto max-w-4xl px-6 py-8 text-center sm:px-8">

          <p className="text-xs leading-5 text-[#111827]/55">

            <strong className="text-[#111827]">
              Important:
            </strong>{" "}

            SchemeSamjho is an independent informational
            platform and is not affiliated with the Government
            of India or any state government. Scheme information
            can change. Eligibility information shown here is
            preliminary and should always be verified with the
            relevant official government source.

          </p>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   PAGE WRAPPER
   ========================================================= */

export default function SchemesPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#FFFFFF]">

          <div className="flex min-h-[60vh] items-center justify-center">

            <div className="text-center">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#111827]/10 border-t-[#2563EB]" />

              <p className="mt-4 text-sm text-[#111827]/60">
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