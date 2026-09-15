"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { schemes } from "../../data/schemes";

const STORAGE_KEY = "schemesamjho-favorites";

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

function formatIncome(amount?: number) {
  if (!amount) return "Scheme rules";

  return `₹${amount.toLocaleString("en-IN")}/year`;
}

function getSavedSlugs(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function SavedPage() {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setSavedSlugs(getSavedSlugs());
    setLoading(false);

    const handleFavoritesChanged = () => {
      setSavedSlugs(getSavedSlugs());
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setSavedSlugs(getSavedSlugs());
      }
    };

    window.addEventListener(
      "favoritesChanged",
      handleFavoritesChanged
    );

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(
        "favoritesChanged",
        handleFavoritesChanged
      );

      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const savedSchemes = useMemo(() => {
    return savedSlugs
      .map((slug) =>
        schemes.find((scheme) => scheme.slug === slug)
      )
      .filter((scheme) => scheme !== undefined);
  }, [savedSlugs]);

  const filteredSchemes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return savedSchemes.filter((scheme) => {
      const matchesSearch =
        !query ||
        scheme.name.toLowerCase().includes(query) ||
        scheme.shortDescription.toLowerCase().includes(query) ||
        scheme.category.toLowerCase().includes(query) ||
        scheme.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query)
        );

      const matchesCategory =
        category === "All" || scheme.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [savedSchemes, search, category]);

  function removeScheme(slug: string) {
    const updated = savedSlugs.filter((item) => item !== slug);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSavedSlugs(updated);

    window.dispatchEvent(new Event("favoritesChanged"));
  }

  function clearAll() {
    localStorage.removeItem(STORAGE_KEY);
    setSavedSlugs([]);
    setShowClearConfirm(false);

    window.dispatchEvent(new Event("favoritesChanged"));
  }

  const hasFilters = search.trim() !== "" || category !== "All";

  function clearFilters() {
    setSearch("");
    setCategory("All");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                ❤️ Your collection
              </div>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
                Saved schemes
              </h1>

              <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
                Keep useful government schemes in one place so you can come
                back to them later.
              </p>
            </div>

            {!loading && savedSchemes.length > 0 && (
              <div className="rounded-2xl bg-slate-100 px-5 py-4 text-center">
                <p className="text-2xl font-bold text-slate-900">
                  {savedSchemes.length}
                </p>

                <p className="text-xs font-medium text-slate-500">
                  {savedSchemes.length === 1
                    ? "saved scheme"
                    : "saved schemes"}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Loading */}
      {loading ? (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>
        </section>
      ) : savedSchemes.length === 0 ? (
        /* Empty state */
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
              ♡
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              You haven&apos;t saved any schemes yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
              When you find a scheme you want to remember, click
              <strong> Save Scheme</strong>. It will appear here.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/schemes"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Explore Schemes
              </Link>

              <Link
                href="/eligibility"
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Check Eligibility
              </Link>
            </div>

            <p className="mx-auto mt-8 max-w-md text-xs leading-5 text-slate-400">
              Saved schemes are stored locally in this browser. They are not
              submitted to the government or used as an application.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* Toolbar */}
          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="relative max-w-xl">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      🔎
                    </span>

                    <input
                      type="text"
                      value={search}
                      onChange={(event) =>
                        setSearch(event.target.value)
                      }
                      placeholder="Search your saved schemes..."
                      className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`rounded-full px-3 py-2 text-xs font-medium transition ${
                        category === item
                          ? "bg-blue-600 text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-slate-500">
                  Showing{" "}
                  <strong className="text-slate-700">
                    {filteredSchemes.length}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-slate-700">
                    {savedSchemes.length}
                  </strong>{" "}
                  saved schemes
                </p>

                <div className="flex gap-3">
                  {hasFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-sm font-semibold text-blue-700 hover:underline"
                    >
                      Clear filters
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(true)}
                    className="text-sm font-semibold text-red-600 hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Cards */}
          <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            {filteredSchemes.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
                <div className="text-4xl">🔎</div>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  No saved schemes match your filters
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Try another search or category.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredSchemes.map((scheme) => (
                  <article
                    key={scheme.slug}
                    className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {scheme.category}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeScheme(scheme.slug)}
                        aria-label={`Remove ${scheme.name} from saved schemes`}
                        className="rounded-lg px-2 py-1 text-lg leading-none text-red-500 transition hover:bg-red-50"
                        title="Remove from saved"
                      >
                        ♥
                      </button>
                    </div>

                    <h2 className="mt-5 text-xl font-bold leading-7 text-slate-900">
                      {scheme.name}
                    </h2>

                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                      {scheme.shortDescription}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                          Age
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-700">
                          {scheme.minAge && scheme.maxAge
                            ? `${scheme.minAge}–${scheme.maxAge} yrs`
                            : scheme.minAge
                              ? `${scheme.minAge}+ yrs`
                              : "Scheme rules"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                          Income
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-700">
                          {formatIncome(scheme.maxIncome)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-slate-100 p-3">
                      <p className="text-xs font-medium text-slate-400">
                        Key benefit
                      </p>

                      <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-700">
                        {scheme.benefits[0]}
                      </p>
                    </div>

                    <div className="mt-6 flex gap-2">
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
            )}
          </section>

          {/* Bottom CTA */}
          <section className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-blue-600 p-8 sm:p-10">
                <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
                  <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold text-white">
                      Looking for more schemes?
                    </h2>

                    <p className="mt-3 leading-7 text-blue-100">
                      Explore the complete scheme directory or check which
                      schemes may match your profile.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/schemes"
                      className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                    >
                      Browse Schemes
                    </Link>

                    <Link
                      href="/eligibility"
                      className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20"
                    >
                      Check Eligibility
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Clear confirmation */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900">
              Clear all saved schemes?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This will remove all saved schemes from this browser. You can
              always save them again later.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={clearAll}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-8 text-center sm:px-6">
          <p className="text-xs leading-5 text-slate-500">
            Saved schemes are stored locally in your browser. SchemeSamjho
            does not submit your saved list to any government department.
            Scheme information can change, so verify the latest details with
            the official source before applying.
          </p>
        </div>
      </section>
    </main>
  );
}