"use client";

import Link from "next/link";
import { useState } from "react";

import { schemes, type Scheme } from "../../data/schemes";

function formatAge(minAge?: number, maxAge?: number) {
  if (minAge !== undefined && maxAge !== undefined) {
    return `${minAge}–${maxAge} years`;
  }

  if (minAge !== undefined) {
    return `${minAge}+ years`;
  }

  if (maxAge !== undefined) {
    return `Up to ${maxAge} years`;
  }

  return "Depends on scheme rules";
}

function formatIncome(maxIncome?: number) {
  if (maxIncome === undefined) {
    return "Depends on scheme rules";
  }

  return `Up to ₹${maxIncome.toLocaleString("en-IN")} per year`;
}

function ComparisonRow({
  label,
  values,
}: {
  label: string;
  values: React.ReactNode[];
}) {
  return (
    <div className="grid grid-cols-[180px_repeat(3,minmax(220px,1fr))] border-b last:border-b-0">
      <div className="bg-gray-50 p-4 text-sm font-semibold text-gray-700">
        {label}
      </div>

      {values.map((value, index) => (
        <div
          key={index}
          className="border-l p-4 text-sm leading-6 text-gray-600"
        >
          {value}
        </div>
      ))}
    </div>
  );
}

function SchemeSelector({
  scheme,
  selected,
  onToggle,
}: {
  scheme: Scheme;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full rounded-xl border p-4 text-left transition ${
        selected
          ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
          : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            {scheme.category}
          </p>

          <h3 className="mt-1 font-semibold text-gray-900">
            {scheme.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {scheme.shortDescription}
          </p>
        </div>

        <span
          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
            selected
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-300 text-transparent"
          }`}
        >
          ✓
        </span>
      </div>
    </button>
  );
}

export default function ComparePage() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const selectedSchemes = selectedSlugs
    .map((slug) => schemes.find((scheme) => scheme.slug === slug))
    .filter((scheme): scheme is Scheme => scheme !== undefined);

  const filteredSchemes = schemes.filter((scheme) => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return true;
    }

    return (
      scheme.name.toLowerCase().includes(query) ||
      scheme.category.toLowerCase().includes(query) ||
      scheme.shortDescription.toLowerCase().includes(query)
    );
  });

  function toggleScheme(slug: string) {
    setSelectedSlugs((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, slug];
    });
  }

  function removeScheme(slug: string) {
    setSelectedSlugs((current) =>
      current.filter((item) => item !== slug)
    );
  }

  function clearAll() {
    setSelectedSlugs([]);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Compare Schemes
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Compare government schemes side by side
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Select up to three schemes and compare their benefits,
            eligibility factors, documents, and other important details.
          </p>
        </div>
      </section>

      {/* Selector */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Select schemes
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose up to 3 schemes to compare.
              </p>
            </div>

            {selectedSchemes.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-sm font-semibold text-red-600 hover:text-red-700"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Selected chips */}
          {selectedSchemes.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {selectedSchemes.map((scheme) => (
                <button
                  key={scheme.slug}
                  type="button"
                  onClick={() => removeScheme(scheme.slug)}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                >
                  {scheme.name}
                  <span>×</span>
                </button>
              ))}
            </div>
          )}

          {/* Search */}
          <div className="mt-6">
            <label
              htmlFor="scheme-search"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Search schemes
            </label>

            <input
              id="scheme-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by scheme name or category..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Scheme list */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {filteredSchemes.map((scheme) => (
              <SchemeSelector
                key={scheme.slug}
                scheme={scheme}
                selected={selectedSlugs.includes(scheme.slug)}
                onToggle={() => toggleScheme(scheme.slug)}
              />
            ))}
          </div>

          {filteredSchemes.length === 0 && (
            <div className="py-10 text-center">
              <p className="font-semibold text-gray-900">
                No schemes found
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Try a different search term.
              </p>
            </div>
          )}

          {selectedSchemes.length >= 3 && (
            <p className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-center text-sm text-blue-700">
              You have selected the maximum of 3 schemes.
            </p>
          )}
        </div>
      </section>

      {/* Comparison */}
      {selectedSchemes.length > 0 ? (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Comparison
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Compare the selected schemes below.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
            <div className="min-w-[860px]">
              {/* Scheme names */}
              <div className="grid grid-cols-[180px_repeat(3,minmax(220px,1fr))] border-b bg-white">
                <div className="p-4" />

                {[0, 1, 2].map((index) => {
                  const scheme = selectedSchemes[index];

                  return (
                    <div
                      key={index}
                      className="border-l p-5"
                    >
                      {scheme ? (
                        <>
                          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                            {scheme.category}
                          </p>

                          <h3 className="mt-1 font-bold text-gray-900">
                            {scheme.name}
                          </h3>

                          <Link
                            href={`/schemes/${scheme.slug}`}
                            className="mt-3 inline-block text-sm font-semibold text-blue-700 hover:text-blue-800"
                          >
                            View details →
                          </Link>
                        </>
                      ) : (
                        <span className="text-sm text-gray-400">
                          Select another scheme
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <ComparisonRow
                label="About"
                values={[0, 1, 2].map((index) => {
                  const scheme = selectedSchemes[index];

                  return scheme ? scheme.description : "—";
                })}
              />

              <ComparisonRow
                label="Age"
                values={[0, 1, 2].map((index) => {
                  const scheme = selectedSchemes[index];

                  return scheme
                    ? formatAge(scheme.minAge, scheme.maxAge)
                    : "—";
                })}
              />

              <ComparisonRow
                label="Income"
                values={[0, 1, 2].map((index) => {
                  const scheme = selectedSchemes[index];

                  return scheme
                    ? formatIncome(scheme.maxIncome)
                    : "—";
                })}
              />

              <ComparisonRow
                label="Occupation"
                values={[0, 1, 2].map((index) => {
                  const scheme = selectedSchemes[index];

                  return scheme
                    ? scheme.occupations.join(", ")
                    : "—";
                })}
              />

              <ComparisonRow
                label="Key benefits"
                values={[0, 1, 2].map((index) => {
                  const scheme = selectedSchemes[index];

                  return scheme ? (
                    <ul className="list-disc space-y-1 pl-5">
                      {scheme.benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>
                  ) : (
                    "—"
                  );
                })}
              />

              <ComparisonRow
                label="Documents"
                values={[0, 1, 2].map((index) => {
                  const scheme = selectedSchemes[index];

                  return scheme ? (
                    <ul className="list-disc space-y-1 pl-5">
                      {scheme.documents.map((document) => (
                        <li key={document}>{document}</li>
                      ))}
                    </ul>
                  ) : (
                    "—"
                  );
                })}
              />

              <ComparisonRow
                label="Eligibility factors"
                values={[0, 1, 2].map((index) => {
                  const scheme = selectedSchemes[index];

                  return scheme ? (
                    <ul className="list-disc space-y-1 pl-5">
                      {scheme.eligibilitySummary.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    "—"
                  );
                })}
              />

              <ComparisonRow
                label="Exclusions"
                values={[0, 1, 2].map((index) => {
                  const scheme = selectedSchemes[index];

                  if (!scheme) {
                    return "—";
                  }

                  if (!scheme.exclusions?.length) {
                    return "No specific exclusions listed";
                  }

                  return (
                    <ul className="list-disc space-y-1 pl-5">
                      {scheme.exclusions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                })}
              />

              <ComparisonRow
                label="Last reviewed"
                values={[0, 1, 2].map((index) => {
                  const scheme = selectedSchemes[index];

                  return scheme ? scheme.lastVerified : "—";
                })}
              />

              <ComparisonRow
                label="Official source"
                values={[0, 1, 2].map((index) => {
                  const scheme = selectedSchemes[index];

                  return scheme ? (
                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-700 hover:text-blue-800"
                    >
                      Visit official website →
                    </a>
                  ) : (
                    "—"
                  );
                })}
              />
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
            <p className="text-sm leading-6 text-yellow-800">
              <strong>Important:</strong> SchemeSamjho is an
              independent information platform. The comparison is
              provided for understanding only. Rules, benefits,
              eligibility, and application requirements can change.
              Always verify the latest information with the official
              government source.
            </p>
          </div>
        </section>
      ) : (
        /* Empty state */
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <div className="rounded-2xl border border-dashed bg-white px-6 py-14 text-center">
            <div className="text-4xl">⚖️</div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Select schemes to compare
            </h2>

            <p className="mx-auto mt-2 max-w-lg leading-7 text-gray-600">
              Choose two or three schemes above to see their
              benefits, eligibility factors, documents, and other
              details side by side.
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Not sure which schemes fit you?
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
            Use our preliminary eligibility checker to find schemes
            that may match your profile.
          </p>

          <Link
            href="/eligibility"
            className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Check Eligibility →
          </Link>
        </div>
      </section>
    </main>
  );
}