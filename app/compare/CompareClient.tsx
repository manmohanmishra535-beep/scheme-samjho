"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  GitCompare,
  Search,
  X,
} from "lucide-react";

import type { Scheme } from "../../data/schemes";

type CompareClientProps = {
  schemes: Scheme[];
};

export default function CompareClient({
  schemes,
}: CompareClientProps) {
  const [firstSlug, setFirstSlug] =
    useState("");

  const [secondSlug, setSecondSlug] =
    useState("");

  const [search, setSearch] =
    useState("");

  const firstScheme = useMemo(
    () =>
      schemes.find(
        (scheme) =>
          scheme.slug === firstSlug
      ),
    [schemes, firstSlug]
  );

  const secondScheme = useMemo(
    () =>
      schemes.find(
        (scheme) =>
          scheme.slug === secondSlug
      ),
    [schemes, secondSlug]
  );

  const filteredSchemes = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return schemes;
    }

    return schemes.filter(
      (scheme) =>
        scheme.name
          .toLowerCase()
          .includes(query) ||
        scheme.category
          .toLowerCase()
          .includes(query)
    );
  }, [schemes, search]);

  function clearSelection(
    position: "first" | "second"
  ) {
    if (position === "first") {
      setFirstSlug("");
    } else {
      setSecondSlug("");
    }
  }

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#111827]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="border-b border-[#111827]/10 bg-[#F9FAFB]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="flex items-center gap-2 text-sm font-bold text-[#2563EB]">
            <GitCompare className="h-5 w-5" />
            Compare schemes
          </div>

          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Compare government
            <br />
            <span className="text-[#2563EB]">
              schemes side by side.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#111827]/65 sm:text-lg">
            Select two published schemes and compare
            their category, benefits, eligibility,
            age limits, income information and required
            documents.
          </p>
        </div>
      </section>

      {/* =====================================================
          SELECT SCHEMES
      ===================================================== */}

      <section>
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-14 lg:px-10">
          <div className="grid gap-5 lg:grid-cols-2">
            <SchemeSelector
              label="First scheme"
              value={firstSlug}
              onChange={setFirstSlug}
              schemes={filteredSchemes}
              excludeSlug={secondSlug}
            />

            <SchemeSelector
              label="Second scheme"
              value={secondSlug}
              onChange={setSecondSlug}
              schemes={filteredSchemes}
              excludeSlug={firstSlug}
            />
          </div>

          {/* Search */}
          <div className="mt-5 rounded-2xl border border-[#111827]/10 bg-white p-5">
            <label
              htmlFor="compare-search"
              className="mb-2 block text-sm font-bold text-[#111827]"
            >
              Search schemes
            </label>

            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111827]/40" />

              <input
                id="compare-search"
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search by scheme name or category..."
                className="h-11 w-full rounded-xl border border-[#111827]/15 bg-white pl-11 pr-4 text-sm font-medium text-[#111827] outline-none transition placeholder:text-[#111827]/40 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
              />
            </div>
          </div>

          {/* =================================================
              COMPARISON
          ================================================= */}

          {firstScheme &&
          secondScheme ? (
            <ComparisonTable
              firstScheme={firstScheme}
              secondScheme={secondScheme}
              clearSelection={clearSelection}
            />
          ) : (
            <div className="mt-6 rounded-2xl border border-[#111827]/10 bg-white px-6 py-16 text-center">
              <GitCompare className="mx-auto h-10 w-10 text-[#2563EB]" />

              <h2 className="mt-4 text-xl font-black text-[#111827]">
                Select two schemes to compare
              </h2>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#111827]/60">
                Choose one scheme in each selector
                above to see their information side
                by side.
              </p>
            </div>
          )}

          {/* =================================================
              EMPTY DATABASE
          ================================================= */}

          {schemes.length === 0 && (
            <div className="mt-6 rounded-2xl border border-[#111827]/10 bg-white p-10 text-center">
              <h2 className="text-xl font-black text-[#111827]">
                No published schemes available
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#111827]/60">
                Published schemes will appear here when
                they are available.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   SELECTOR
========================================================= */

function SchemeSelector({
  label,
  value,
  onChange,
  schemes,
  excludeSlug,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  schemes: Scheme[];
  excludeSlug: string;
}) {
  return (
    <div className="rounded-2xl border border-[#111827]/10 bg-white p-5">
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-bold text-[#111827]"
      >
        {label}
      </label>

      <select
        id={label}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-11 w-full rounded-xl border border-[#111827]/15 bg-white px-4 text-sm font-medium text-[#111827] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
      >
        <option value="">
          Select a scheme
        </option>

        {schemes
          .filter(
            (scheme) =>
              scheme.slug !==
              excludeSlug
          )
          .map((scheme) => (
            <option
              key={scheme.slug}
              value={scheme.slug}
            >
              {scheme.name}
            </option>
          ))}
      </select>
    </div>
  );
}

/* =========================================================
   COMPARISON TABLE
========================================================= */

function ComparisonTable({
  firstScheme,
  secondScheme,
  clearSelection,
}: {
  firstScheme: Scheme;
  secondScheme: Scheme;
  clearSelection: (
    position: "first" | "second"
  ) => void;
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[#111827]/10 bg-white">
      {/* Headers */}
      <div className="grid border-b border-[#111827]/10 md:grid-cols-3">
        <div className="hidden bg-[#F9FAFB] p-5 md:block">
          <p className="text-xs font-bold uppercase tracking-wide text-[#111827]/45">
            Compare
          </p>
        </div>

        <SchemeHeader
          scheme={firstScheme}
          position="first"
          clearSelection={clearSelection}
        />

        <SchemeHeader
          scheme={secondScheme}
          position="second"
          clearSelection={clearSelection}
        />
      </div>

      <CompareRow
        label="Category"
        first={firstScheme.category}
        second={secondScheme.category}
      />

      <CompareRow
        label="Minimum age"
        first={
          firstScheme.minAge != null
            ? `${firstScheme.minAge} years`
            : "Not specified"
        }
        second={
          secondScheme.minAge != null
            ? `${secondScheme.minAge} years`
            : "Not specified"
        }
      />

      <CompareRow
        label="Maximum age"
        first={
          firstScheme.maxAge != null
            ? `${firstScheme.maxAge} years`
            : "Not specified"
        }
        second={
          secondScheme.maxAge != null
            ? `${secondScheme.maxAge} years`
            : "Not specified"
        }
      />

      <CompareRow
        label="Income limit"
        first={
          firstScheme.maxIncome != null
            ? `₹${firstScheme.maxIncome.toLocaleString(
                "en-IN"
              )}`
            : "See scheme rules"
        }
        second={
          secondScheme.maxIncome != null
            ? `₹${secondScheme.maxIncome.toLocaleString(
                "en-IN"
              )}`
            : "See scheme rules"
        }
      />

      <CompareListRow
        label="Benefits"
        first={firstScheme.benefits}
        second={secondScheme.benefits}
      />

      <CompareListRow
        label="Documents"
        first={firstScheme.documents}
        second={secondScheme.documents}
      />

      <CompareListRow
        label="Occupations / groups"
        first={firstScheme.occupations}
        second={secondScheme.occupations}
      />

      <CompareListRow
        label="Exclusions"
        first={firstScheme.exclusions}
        second={secondScheme.exclusions}
      />

      {/* Eligibility */}
      <div className="grid border-b border-[#111827]/10 md:grid-cols-3">
        <CompareLabel label="Eligibility" />

        <div className="p-5">
          <p className="text-sm leading-6 text-[#111827]/70">
            {firstScheme.eligibilitySummary}
          </p>
        </div>

        <div className="border-t border-[#111827]/10 p-5 md:border-l md:border-t-0">
          <p className="text-sm leading-6 text-[#111827]/70">
            {secondScheme.eligibilitySummary}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="grid gap-3 p-5 sm:grid-cols-2">
        <Link
          href={`/schemes/${firstScheme.slug}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#111827]"
        >
          View {firstScheme.name}
          <ArrowRight className="h-4 w-4" />
        </Link>

        <Link
          href={`/schemes/${secondScheme.slug}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#111827]/15 px-5 py-3 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
        >
          View {secondScheme.name}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   SCHEME HEADER
========================================================= */

function SchemeHeader({
  scheme,
  position,
  clearSelection,
}: {
  scheme: Scheme;
  position: "first" | "second";
  clearSelection: (
    position: "first" | "second"
  ) => void;
}) {
  return (
    <div className="relative p-5">
      <button
        type="button"
        onClick={() =>
          clearSelection(position)
        }
        aria-label={`Remove ${scheme.name}`}
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-[#111827]/10 text-[#111827]/50 hover:border-[#111827] hover:text-[#111827]"
      >
        <X className="h-4 w-4" />
      </button>

      <p className="pr-10 text-xs font-bold uppercase tracking-wide text-[#16A34A]">
        {scheme.category}
      </p>

      <h2 className="mt-2 pr-8 text-lg font-black leading-6 text-[#111827]">
        {scheme.name}
      </h2>
    </div>
  );
}

/* =========================================================
   BASIC ROW
========================================================= */

function CompareRow({
  label,
  first,
  second,
}: {
  label: string;
  first: string;
  second: string;
}) {
  return (
    <div className="grid border-b border-[#111827]/10 md:grid-cols-3">
      <CompareLabel label={label} />

      <div className="p-5">
        <p className="text-sm font-semibold text-[#111827]/70">
          {first}
        </p>
      </div>

      <div className="border-t border-[#111827]/10 p-5 md:border-l md:border-t-0">
        <p className="text-sm font-semibold text-[#111827]/70">
          {second}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   LIST ROW
========================================================= */

function CompareListRow({
  label,
  first,
  second,
}: {
  label: string;
  first: string[];
  second: string[];
}) {
  return (
    <div className="grid border-b border-[#111827]/10 md:grid-cols-3">
      <CompareLabel label={label} />

      <ListContent items={first} />

      <div className="border-t border-[#111827]/10 md:border-l md:border-t-0">
        <ListContent items={second} />
      </div>
    </div>
  );
}

/* =========================================================
   LABEL
========================================================= */

function CompareLabel({
  label,
}: {
  label: string;
}) {
  return (
    <div className="bg-[#F9FAFB] p-5">
      <p className="text-xs font-black uppercase tracking-wide text-[#111827]/45">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   LIST
========================================================= */

function ListContent({
  items,
}: {
  items: string[];
}) {
  return (
    <div className="p-5">
      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex items-start gap-2 text-sm leading-6 text-[#111827]/70"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[#111827]/50">
          Not specified
        </p>
      )}
    </div>
  );
}