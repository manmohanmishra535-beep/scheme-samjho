"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

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
      /* Search */
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

      /* Category */
      const matchesCategory =
        category === "All" ||
        scheme.category === category;

      /* Occupation */
      const matchesOccupation = occupationMatches(
        scheme.occupations,
        occupation
      );

      /* Income */
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

  const hasMore = visibleCount < filteredSchemes.length;

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
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Government Schemes
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Explore government schemes
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Search and filter government schemes by category,
              occupation, income and keywords. Understand the
              benefits, eligibility and documents before visiting
              the official source.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400">
              🔎
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setVisibleCount(INITIAL_VISIBLE);
              }}
              placeholder="Search schemes, pension, farmer, student..."
              className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Mobile filter button */}
          <div className="mt-4 md:hidden">
            <button
              type="button"
              onClick={() => setShowFilters((current) => !current)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
              {activeFilterCount > 0 &&
                ` (${activeFilterCount})`}
            </button>
          </div>

          {/* Filters */}
          <div
            className={`mt-5 ${
              showFilters ? "block" : "hidden"
            } md:block`}
          >
            {/* Categories */}
            <div>
              <p className="mb-3 text-sm font-semibold text-gray-800">
                Category
              </p>

              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleCategoryChange(item)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      category === item
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Select filters */}
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="occupation"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Occupation
                </label>

                <select
                  id="occupation"
                  value={occupation}
                  onChange={(event) =>
                    handleOccupationChange(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {occupations.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="income"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Income filter
                </label>

                <select
                  id="income"
                  value={income}
                  onChange={(event) =>
                    handleIncomeChange(event.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
            </div>

            {/* Active filters */}
            {(activeFilterCount > 0 || search.trim()) && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {search.trim() && (
                  <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                    Search: {search}
                  </span>
                )}

                {category !== "All" && (
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                    Category: {category}
                  </span>
                )}

                {occupation !== "All" && (
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                    Occupation: {occupation}
                  </span>
                )}

                {income !== "" && (
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                    Income:{" "}
                    {incomeOptions.find(
                      (item) => item.value === income
                    )?.label}
                  </span>
                )}

                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-2 py-1.5 text-xs font-semibold text-red-600 hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Available schemes
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Showing {visibleSchemes.length} of{" "}
              {filteredSchemes.length} matching schemes
            </p>
          </div>

          {filteredSchemes.length > 0 && (
            <Link
              href="/eligibility"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Not sure which scheme? Check eligibility →
            </Link>
          )}
        </div>

        {filteredSchemes.length === 0 ? (
          <div className="mt-8 rounded-2xl border bg-white px-6 py-14 text-center shadow-sm">
            <div className="text-4xl">🔎</div>

            <h3 className="mt-4 text-xl font-bold text-gray-900">
              No schemes found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
              Try a different search term or remove one of the
              filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visibleSchemes.map((scheme) => (
                <article
                  key={scheme.slug}
                  className="flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {scheme.category}
                    </span>

                    <FavoriteButton slug={scheme.slug} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-gray-900">
                    {scheme.name}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                    {scheme.shortDescription}
                  </p>

                  <div className="mt-5 space-y-2 border-t pt-4">
                    <div className="flex justify-between gap-3 text-sm">
                      <span className="text-gray-500">
                        Age
                      </span>

                      <span className="text-right font-medium text-gray-800">
                        {scheme.minAge !== undefined &&
                        scheme.maxAge !== undefined
                          ? `${scheme.minAge}–${scheme.maxAge}`
                          : scheme.minAge !== undefined
                            ? `${scheme.minAge}+`
                            : scheme.maxAge !== undefined
                              ? `Up to ${scheme.maxAge}`
                              : "See rules"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3 text-sm">
                      <span className="text-gray-500">
                        Income
                      </span>

                      <span className="text-right font-medium text-gray-800">
                        {scheme.maxIncome !== undefined
                          ? `₹${scheme.maxIncome.toLocaleString(
                              "en-IN"
                            )}`
                          : "See official rules"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3 text-sm">
                      <span className="text-gray-500">
                        Benefits
                      </span>

                      <span className="font-medium text-gray-800">
                        {scheme.benefits.length}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <Link
                      href={`/schemes/${scheme.slug}`}
                      className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Scheme
                    </Link>

                    <Link
                      href={`/explainers/${scheme.slug}`}
                      className="rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
                    >
                      Explain
                    </Link>
                  </div>

                  <div className="mt-4 text-xs text-gray-400">
                    Last reviewed: {scheme.lastVerified}
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
                  className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition hover:border-blue-400 hover:text-blue-600"
                >
                  Load More Schemes
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Eligibility CTA */}
      <section className="bg-blue-700">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-white">
                Not sure which schemes may apply to you?
              </h2>

              <p className="mt-3 leading-7 text-blue-100">
                Answer a few simple questions about your age,
                occupation, income and state to see schemes that
                may match your profile.
              </p>
            </div>

            <Link
              href="/eligibility"
              className="shrink-0 rounded-xl bg-white px-6 py-3 text-center text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 text-center sm:px-6">
          <p className="text-xs leading-5 text-gray-500">
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
        <main className="min-h-screen bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-gray-500">
              Loading schemes...
            </p>
          </div>
        </main>
      }
    >
      <SchemesPageContent />
    </Suspense>
  );
}