"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
  Search,
  X,
} from "lucide-react";

import { schemes } from "../../data/schemes";
import FavoriteButton from "../../Components/FavoriteButton";

const MAX_COMPARE = 3;

export default function ComparePage() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([
    "pm-kisan",
    "ayushman-bharat",
    "sukanya-samriddhi",
  ]);

  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const selectedSchemes = useMemo(
    () =>
      selectedSlugs
        .map((slug) => schemes.find((scheme) => scheme.slug === slug))
        .filter(Boolean),
    [selectedSlugs]
  );

  const filteredSchemes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return schemes;
    }

    return schemes.filter((scheme) => {
      return (
        scheme.name.toLowerCase().includes(query) ||
        scheme.category.toLowerCase().includes(query) ||
        scheme.shortDescription.toLowerCase().includes(query) ||
        scheme.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query)
        )
      );
    });
  }, [search]);

  const visibleSchemes = showAll
    ? filteredSchemes
    : filteredSchemes.slice(0, 8);

  function toggleScheme(slug: string) {
    setSelectedSlugs((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }

      if (current.length >= MAX_COMPARE) {
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

  function getAgeText(scheme: (typeof schemes)[number]) {
    if (
      scheme.minAge !== undefined &&
      scheme.maxAge !== undefined
    ) {
      return `${scheme.minAge}–${scheme.maxAge} years`;
    }

    if (scheme.minAge !== undefined) {
      return `${scheme.minAge}+ years`;
    }

    if (scheme.maxAge !== undefined) {
      return `Up to ${scheme.maxAge} years`;
    }

    return "Not specified";
  }

  function getIncomeText(scheme: (typeof schemes)[number]) {
    if (scheme.maxIncome !== undefined) {
      return `Up to ₹${scheme.maxIncome.toLocaleString("en-IN")} per year`;
    }

    return "No simple annual limit specified";
  }

  function getOccupationText(scheme: (typeof schemes)[number]) {
    if (!scheme.occupations?.length) {
      return "Not specified";
    }

    return scheme.occupations.join(", ");
  }

  function getStateText(scheme: (typeof schemes)[number]) {
    if (!scheme.states?.length) {
      return "Applicable across India";
    }

    return scheme.states.join(", ");
  }

  function getDocumentText(scheme: (typeof schemes)[number]) {
    if (!scheme.documents?.length) {
      return "Not specified";
    }

    return scheme.documents.join(", ");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-blue-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Scheme Comparison
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Compare government schemes
              <span className="block text-blue-400">
                side by side.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
              Compare benefits, eligibility information, documents,
              age criteria and other important details in one place.
            </p>
          </div>

          <div className="mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-2xl font-black">
                {selectedSchemes.length}/{MAX_COMPARE}
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Schemes selected
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-2xl font-black">
                {schemes.length}
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Schemes available
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-2xl font-black">
                1 view
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Key details compared
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SELECT SCHEMES */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Step 1
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
                Choose schemes to compare
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Select up to {MAX_COMPARE} schemes.
              </p>
            </div>

            <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700">
              {selectedSchemes.length} of {MAX_COMPARE} selected
            </div>
          </div>

          {/* Selected chips */}
          <div className="mt-7">
            {selectedSchemes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedSchemes.map((scheme) => (
                  <div
                    key={scheme!.slug}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700"
                  >
                    {scheme!.name}

                    <button
                      type="button"
                      onClick={() =>
                        removeScheme(scheme!.slug)
                      }
                      aria-label={`Remove ${scheme!.name}`}
                      className="rounded-full p-0.5 transition hover:bg-blue-100"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-5 py-6 text-center">
                <p className="font-semibold text-gray-700">
                  No schemes selected
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Select schemes below to start comparing.
                </p>
              </div>
            )}
          </div>

          {/* Search */}
          <div className="mt-8">
            <label
              htmlFor="scheme-search"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Search schemes
            </label>

            <div className="relative">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="scheme-search"
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by scheme name or category..."
                className="w-full rounded-2xl border border-gray-300 bg-white py-4 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Scheme cards */}
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {visibleSchemes.map((scheme) => {
              const isSelected = selectedSlugs.includes(
                scheme.slug
              );

              const limitReached =
                selectedSlugs.length >= MAX_COMPARE &&
                !isSelected;

              return (
                <button
                  key={scheme.slug}
                  type="button"
                  onClick={() => toggleScheme(scheme.slug)}
                  disabled={limitReached}
                  className={`group relative rounded-2xl border p-5 text-left transition ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/80 shadow-md shadow-blue-100"
                      : limitReached
                        ? "cursor-not-allowed border-gray-200 bg-gray-50 opacity-60"
                        : "border-gray-200 bg-white hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-gray-200/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                        {scheme.category}
                      </p>

                      <h3 className="mt-2 text-lg font-bold text-gray-950">
                        {scheme.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {scheme.shortDescription}
                      </p>
                    </div>

                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-300 bg-white text-transparent"
                      }`}
                    >
                      <Check size={16} strokeWidth={3} />
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gray-500">
                    <span>
                      {isSelected
                        ? "Selected"
                        : limitReached
                          ? "Remove a scheme to select"
                          : "Click to select"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredSchemes.length === 0 && (
            <div className="mt-7 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-12 text-center">
              <Search
                size={28}
                className="mx-auto text-gray-400"
              />
              <h3 className="mt-4 font-bold text-gray-900">
                No schemes found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try a different scheme name or category.
              </p>
            </div>
          )}

          {filteredSchemes.length > 8 && (
            <div className="mt-7 text-center">
              <button
                type="button"
                onClick={() => setShowAll((value) => !value)}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-800 transition hover:border-blue-300 hover:bg-blue-50"
              >
                {showAll ? "Show fewer schemes" : "Show all schemes"}
                <ChevronDown
                  size={17}
                  className={`transition ${
                    showAll ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Step 2
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
                Compare the selected schemes
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                Review the information side by side before visiting
                the official source for confirmation.
              </p>
            </div>

            {selectedSchemes.length > 0 && (
              <div className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200">
                {selectedSchemes.length} scheme
                {selectedSchemes.length !== 1 ? "s" : ""} selected
              </div>
            )}
          </div>

          {selectedSchemes.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Search size={25} />
              </div>

              <h3 className="mt-5 text-xl font-black text-gray-950">
                Select schemes to compare
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
                Choose at least one scheme from the section above.
                You can compare up to {MAX_COMPARE} schemes at a
                time.
              </p>
            </div>
          ) : (
            <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-900/5">
              {/* Scheme headers */}
              <div
                className="grid min-w-[900px]"
                style={{
                  gridTemplateColumns: `220px repeat(${selectedSchemes.length}, minmax(250px, 1fr))`,
                }}
              >
                <div className="border-b border-r border-gray-200 bg-gray-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Comparison
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gray-700">
                    Key information
                  </p>
                </div>

                {selectedSchemes.map((scheme) => (
                  <div
                    key={scheme!.slug}
                    className="relative border-b border-gray-200 p-5"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        removeScheme(scheme!.slug)
                      }
                      title={`Remove ${scheme!.name}`}
                      className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <X size={15} />
                    </button>

                    <p className="pr-10 text-xs font-bold uppercase tracking-wider text-blue-600">
                      {scheme!.category}
                    </p>

                    <h3 className="mt-2 pr-8 text-lg font-black leading-6 text-gray-950">
                      {scheme!.name}
                    </h3>

                    <div className="mt-4">
                      <FavoriteButton slug={scheme!.slug} />
                    </div>
                  </div>
                ))}

                {/* Category */}
                <CompareLabel label="Category" />

                {selectedSchemes.map((scheme) => (
                  <CompareValue key={scheme!.slug}>
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                      {scheme!.category}
                    </span>
                  </CompareValue>
                ))}

                {/* Description */}
                <CompareLabel label="About" />

                {selectedSchemes.map((scheme) => (
                  <CompareValue key={scheme!.slug}>
                    <p className="text-sm leading-6 text-gray-700">
                      {scheme!.description}
                    </p>
                  </CompareValue>
                ))}

                {/* Benefits */}
                <CompareLabel label="Benefits" />

                {selectedSchemes.map((scheme) => (
                  <CompareValue key={scheme!.slug}>
                    <ul className="space-y-2.5">
                      {scheme!.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start gap-2 text-sm leading-5 text-gray-700"
                        >
                          <Check
                            size={16}
                            className="mt-0.5 shrink-0 text-green-600"
                          />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CompareValue>
                ))}

                {/* Eligibility */}
                <CompareLabel label="Eligibility" />

                {selectedSchemes.map((scheme) => (
                  <CompareValue key={scheme!.slug}>
                    <ul className="space-y-2.5">
                      {scheme!.eligibilitySummary.map(
                        (item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm leading-5 text-gray-700"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                            <span>{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </CompareValue>
                ))}

                {/* Age */}
                <CompareLabel label="Age criteria" />

                {selectedSchemes.map((scheme) => (
                  <CompareValue key={scheme!.slug}>
                    <p className="text-sm font-semibold text-gray-800">
                      {getAgeText(scheme!)}
                    </p>
                  </CompareValue>
                ))}

                {/* Income */}
                <CompareLabel label="Income criteria" />

                {selectedSchemes.map((scheme) => (
                  <CompareValue key={scheme!.slug}>
                    <p className="text-sm leading-6 text-gray-700">
                      {getIncomeText(scheme!)}
                    </p>
                  </CompareValue>
                ))}

                {/* Occupation */}
                <CompareLabel label="Target occupation" />

                {selectedSchemes.map((scheme) => (
                  <CompareValue key={scheme!.slug}>
                    <p className="text-sm leading-6 text-gray-700">
                      {getOccupationText(scheme!)}
                    </p>
                  </CompareValue>
                ))}

                {/* Documents */}
                <CompareLabel label="Documents" />

                {selectedSchemes.map((scheme) => (
                  <CompareValue key={scheme!.slug}>
                    <ul className="space-y-2">
                      {scheme!.documents.map((document) => (
                        <li
                          key={document}
                          className="text-sm leading-5 text-gray-700"
                        >
                          • {document}
                        </li>
                      ))}
                    </ul>
                  </CompareValue>
                ))}

                {/* States */}
                <CompareLabel label="Geographic scope" />

                {selectedSchemes.map((scheme) => (
                  <CompareValue key={scheme!.slug}>
                    <p className="text-sm leading-6 text-gray-700">
                      {getStateText(scheme!)}
                    </p>
                  </CompareValue>
                ))}

                {/* Exclusions */}
                <CompareLabel label="Important exclusions" />

                {selectedSchemes.map((scheme) => (
                  <CompareValue key={scheme!.slug}>
                    {scheme!.exclusions?.length ? (
                      <ul className="space-y-2">
                        {scheme!.exclusions.map((item) => (
                          <li
                            key={item}
                            className="text-sm leading-5 text-gray-700"
                          >
                            • {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No exclusions listed in our current data.
                      </p>
                    )}
                  </CompareValue>
                ))}

                {/* Last verified */}
                <CompareLabel label="Last verified" />

                {selectedSchemes.map((scheme) => (
                  <CompareValue key={scheme!.slug}>
                    <p className="text-sm font-semibold text-gray-800">
                      {scheme!.lastVerified}
                    </p>
                  </CompareValue>
                ))}

                {/* Actions */}
                <CompareLabel label="Actions" />

                {selectedSchemes.map((scheme) => (
                  <CompareValue key={scheme!.slug}>
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/schemes/${scheme!.slug}`}
                        className="inline-flex w-fit items-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gray-800"
                      >
                        View Scheme
                        <ArrowRight size={15} />
                      </Link>

                      <a
                        href={scheme!.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      >
                        Official Source
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </CompareValue>
                ))}
              </div>
            </div>
          )}

          {/* Mobile horizontal-scroll hint */}
          {selectedSchemes.length > 0 && (
            <p className="mt-3 text-center text-xs text-gray-500 lg:hidden">
              Swipe horizontally to view all comparison columns.
            </p>
          )}
        </div>
      </section>

      {/* TRUST / DISCLAIMER */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Check size={19} />
              </div>

              <h3 className="mt-4 font-black text-gray-950">
                Information first
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Comparison information comes from the scheme data
                maintained by SchemeSamjho.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <ExternalLink size={18} />
              </div>

              <h3 className="mt-4 font-black text-gray-950">
                Check the official source
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Scheme rules, application processes and eligibility
                can change. Always confirm current details with the
                official source.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Search size={18} />
              </div>

              <h3 className="mt-4 font-black text-gray-950">
                Comparison is preliminary
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                This page helps you understand differences. It does
                not determine official eligibility or guarantee a
                benefit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CompareLabel({ label }: { label: string }) {
  return (
    <div className="border-b border-r border-gray-200 bg-gray-50 p-5">
      <p className="text-sm font-bold text-gray-800">
        {label}
      </p>
    </div>
  );
}

function CompareValue({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-200 p-5">
      {children}
    </div>
  );
}