"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileText,
  GitCompareArrows,
  Info,
  Search,
} from "lucide-react";

import { schemes, type Scheme } from "../../data/schemes";

export default function ComparePage() {
  const [firstSlug, setFirstSlug] = useState("");
  const [secondSlug, setSecondSlug] = useState("");

  const firstScheme = useMemo(
    () => schemes.find((scheme) => scheme.slug === firstSlug),
    [firstSlug]
  );

  const secondScheme = useMemo(
    () => schemes.find((scheme) => scheme.slug === secondSlug),
    [secondSlug]
  );

  const canCompare = Boolean(firstScheme && secondScheme);

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#111827]">
      {/* HERO */}
      <section className="bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFFFFF]/20 px-4 py-2 text-sm font-semibold text-[#FFFFFF]">
              <GitCompareArrows size={16} />
              Scheme comparison
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.06] tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl">
              Compare government
              <br />
              schemes side by side.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#FFFFFF]/75 sm:text-lg">
              Compare benefits, eligibility, age requirements,
              documents and other important information in one
              place.
            </p>
          </div>
        </div>
      </section>

      {/* SELECTORS */}
      <section className="bg-[#FFFFFF]">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <SchemeSelector
              label="First scheme"
              value={firstSlug}
              onChange={setFirstSlug}
              excludeSlug={secondSlug}
            />

            <SchemeSelector
              label="Second scheme"
              value={secondSlug}
              onChange={setSecondSlug}
              excludeSlug={firstSlug}
            />
          </div>

          {/* INFO */}
          <div className="mt-6 rounded-2xl border border-[#111827]/10 bg-[#111827]/5 p-5">
            <div className="flex items-start gap-3">
              <Info
                size={20}
                className="mt-0.5 shrink-0 text-[#2563EB]"
              />

              <div>
                <p className="text-sm font-bold text-[#111827]">
                  Choose two schemes to compare
                </p>

                <p className="mt-1 text-sm leading-6 text-[#111827]/60">
                  Select any two available schemes above. The
                  comparison will appear automatically.
                </p>
              </div>
            </div>
          </div>

          {/* COMPARISON */}
          {canCompare && firstScheme && secondScheme && (
            <Comparison
              first={firstScheme}
              second={secondScheme}
            />
          )}

          {/* EMPTY STATE */}
          {!canCompare && (
            <div className="mt-12 rounded-2xl border border-dashed border-[#111827]/15 px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB]/10">
                <GitCompareArrows
                  size={26}
                  className="text-[#2563EB]"
                />
              </div>

              <h2 className="mt-5 text-2xl font-extrabold text-[#111827]">
                Your comparison will appear here
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#111827]/60">
                Select two government schemes above to see their
                information side by side.
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-[#111827] p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[#FFFFFF]">
                  Not sure which schemes may apply to you?
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#FFFFFF]/65">
                  Use the preliminary eligibility checker to
                  explore schemes based on your information.
                </p>
              </div>

              <Link
                href="/eligibility"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#FFFFFF] hover:text-[#111827]"
              >
                Check eligibility
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   SCHEME SELECTOR
   ============================================================ */

function SchemeSelector({
  label,
  value,
  onChange,
  excludeSlug,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  excludeSlug: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedScheme = schemes.find(
    (scheme) => scheme.slug === value
  );

  const filteredSchemes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return schemes.filter((scheme) => {
      if (scheme.slug === excludeSlug) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        scheme.name.toLowerCase().includes(query) ||
        scheme.slug.toLowerCase().includes(query) ||
        scheme.category.toLowerCase().includes(query) ||
        scheme.shortDescription
          .toLowerCase()
          .includes(query)
      );
    });
  }, [excludeSlug, search]);

  function handleSelect(slug: string) {
    onChange(slug);
    setOpen(false);
    setSearch("");
  }

  return (
    <div className="relative">
      <label className="text-sm font-bold text-[#111827]">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="mt-2 flex min-h-14 w-full items-center justify-between gap-4 rounded-xl border border-[#111827]/15 bg-[#FFFFFF] px-4 text-left transition hover:border-[#2563EB] focus:border-[#2563EB] focus:outline-none"
      >
        <div className="min-w-0">
          {selectedScheme ? (
            <>
              <p className="truncate text-sm font-bold text-[#111827]">
                {selectedScheme.name}
              </p>

              <p className="mt-1 truncate text-xs text-[#111827]/50">
                {selectedScheme.category}
              </p>
            </>
          ) : (
            <p className="text-sm text-[#111827]/45">
              Select a scheme
            </p>
          )}
        </div>

        <ChevronDown
          size={19}
          className={`shrink-0 text-[#111827]/50 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[82px] z-30 overflow-hidden rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] shadow-xl">
          {/* SEARCH */}
          <div className="border-b border-[#111827]/10 p-3">
            <div className="relative">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#111827]/35"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                autoFocus
                placeholder="Search schemes..."
                aria-label={`Search ${label.toLowerCase()}`}
                className="h-11 w-full rounded-lg border border-[#111827]/10 bg-[#FFFFFF] pl-10 pr-3 text-sm text-[#111827] outline-none placeholder:text-[#111827]/40 focus:border-[#2563EB]"
              />
            </div>
          </div>

          {/* OPTIONS */}
          <div
            className="max-h-72 overflow-y-auto p-2"
            role="listbox"
          >
            {filteredSchemes.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm font-semibold text-[#111827]">
                  No schemes found
                </p>

                <p className="mt-1 text-xs text-[#111827]/50">
                  Try a different search.
                </p>
              </div>
            ) : (
              filteredSchemes.map((scheme) => (
                <button
                  key={scheme.slug}
                  type="button"
                  role="option"
                  aria-selected={value === scheme.slug}
                  onClick={() => handleSelect(scheme.slug)}
                  className={`w-full rounded-xl px-4 py-3 text-left transition hover:bg-[#2563EB]/10 ${
                    value === scheme.slug
                      ? "bg-[#2563EB]/10"
                      : ""
                  }`}
                >
                  <p className="text-sm font-bold text-[#111827]">
                    {scheme.name}
                  </p>

                  <p className="mt-1 text-xs text-[#111827]/50">
                    {scheme.category}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   COMPARISON
   ============================================================ */

function Comparison({
  first,
  second,
}: {
  first: Scheme;
  second: Scheme;
}) {
  return (
    <section className="mt-12">
      {/* HEADERS */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SchemeHeader scheme={first} />
        <SchemeHeader scheme={second} />
      </div>

      {/* TABLE */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-[#111827]/10">
        <ComparisonRow
          label="Category"
          first={first.category}
          second={second.category}
        />

        <ComparisonRow
          label="Description"
          first={first.shortDescription}
          second={second.shortDescription}
        />

        <ComparisonListRow
          label="Benefits"
          first={first.benefits}
          second={second.benefits}
        />

        <ComparisonRow
          label="Eligibility"
          first={first.eligibilitySummary}
          second={second.eligibilitySummary}
        />

        <ComparisonRow
          label="Minimum age"
          first={formatAge(first.minAge)}
          second={formatAge(second.minAge)}
        />

        <ComparisonRow
          label="Maximum age"
          first={formatAge(first.maxAge)}
          second={formatAge(second.maxAge)}
        />

        <ComparisonRow
          label="Income limit"
          first={formatIncome(first.maxIncome)}
          second={formatIncome(second.maxIncome)}
        />

        <ComparisonListRow
          label="Occupations / groups"
          first={first.occupations}
          second={second.occupations}
        />

        <ComparisonListRow
          label="Documents"
          first={first.documents}
          second={second.documents}
        />

        <ComparisonListRow
          label="Exclusions"
          first={first.exclusions}
          second={second.exclusions}
        />

        <ComparisonRow
          label="Last verified"
          first={first.lastVerified}
          second={second.lastVerified}
        />
      </div>

      {/* OFFICIAL SOURCES */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <OfficialSource scheme={first} />
        <OfficialSource scheme={second} />
      </div>
    </section>
  );
}

/* ============================================================
   SCHEME HEADER
   ============================================================ */

function SchemeHeader({
  scheme,
}: {
  scheme: Scheme;
}) {
  return (
    <div className="rounded-2xl bg-[#111827] p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-[#16A34A]">
            {scheme.category}
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[#FFFFFF]">
            {scheme.name}
          </h2>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-[#FFFFFF]">
          <GitCompareArrows size={19} />
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-[#FFFFFF]/65">
        {scheme.shortDescription}
      </p>

      <Link
        href={`/schemes/${scheme.slug}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#FFFFFF] transition hover:text-[#2563EB]"
      >
        View scheme
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

/* ============================================================
   COMPARISON ROW
   ============================================================ */

function ComparisonRow({
  label,
  first,
  second,
}: {
  label: string;
  first: string;
  second: string;
}) {
  return (
    <div className="grid border-b border-[#111827]/10 last:border-b-0 lg:grid-cols-[190px_1fr_1fr]">
      <div className="bg-[#111827]/5 px-5 py-4 lg:border-r lg:border-[#111827]/10">
        <p className="text-sm font-extrabold text-[#111827]">
          {label}
        </p>
      </div>

      <div className="border-t border-[#111827]/10 px-5 py-4 lg:border-t-0 lg:border-r lg:border-[#111827]/10">
        <p className="text-sm leading-6 text-[#111827]/70">
          {first}
        </p>
      </div>

      <div className="border-t border-[#111827]/10 px-5 py-4 lg:border-t-0">
        <p className="text-sm leading-6 text-[#111827]/70">
          {second}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   LIST COMPARISON ROW
   ============================================================ */

function ComparisonListRow({
  label,
  first,
  second,
}: {
  label: string;
  first: string[];
  second: string[];
}) {
  return (
    <div className="grid border-b border-[#111827]/10 last:border-b-0 lg:grid-cols-[190px_1fr_1fr]">
      <div className="bg-[#111827]/5 px-5 py-4 lg:border-r lg:border-[#111827]/10">
        <p className="text-sm font-extrabold text-[#111827]">
          {label}
        </p>
      </div>

      <ListCell items={first} />

      <ListCell items={second} border />
    </div>
  );
}

/* ============================================================
   LIST CELL
   ============================================================ */

function ListCell({
  items,
  border = false,
}: {
  items: string[];
  border?: boolean;
}) {
  return (
    <div
      className={`border-t border-[#111827]/10 px-5 py-4 lg:border-t-0 ${
        border
          ? "lg:border-l lg:border-[#111827]/10"
          : "lg:border-r lg:border-[#111827]/10"
      }`}
    >
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2"
            >
              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-[#16A34A]"
              />

              <span className="text-sm leading-6 text-[#111827]/70">
                {item}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[#111827]/45">
          Not specified
        </p>
      )}
    </div>
  );
}

/* ============================================================
   OFFICIAL SOURCE
   ============================================================ */

function OfficialSource({
  scheme,
}: {
  scheme: Scheme;
}) {
  return (
    <div className="rounded-2xl border border-[#111827]/10 p-6">
      <div className="flex items-start gap-3">
        <FileText
          size={20}
          className="mt-0.5 shrink-0 text-[#2563EB]"
        />

        <div>
          <p className="text-sm font-extrabold text-[#111827]">
            Official source
          </p>

          <p className="mt-1 text-xs leading-5 text-[#111827]/50">
            Verify current information through the official
            government source.
          </p>
        </div>
      </div>

      <a
        href={scheme.officialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition hover:text-[#111827]"
      >
        Visit official website
        <ExternalLink size={15} />
      </a>
    </div>
  );
}

/* ============================================================
   HELPERS
   ============================================================ */

function formatAge(
  age: number | null | undefined
): string {
  if (age == null) {
    return "Not specified";
  }

  return `${age} years`;
}

function formatIncome(
  income: number | null | undefined
): string {
  if (income == null) {
    return "See scheme rules";
  }

  return `₹${income.toLocaleString("en-IN")}`;
}