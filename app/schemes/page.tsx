"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Filter,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { schemes, type Scheme } from "../../data/schemes";
import FavoriteButton from "../../Components/FavoriteButton";

/* =========================================================
   PAGE
========================================================= */

export default function SchemesPage() {
  return <SchemesPageContent />;
}

/* =========================================================
   MAIN PAGE
========================================================= */

function SchemesPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /* =======================================================
     URL FILTERS
  ====================================================== */

  const occupationFromUrl =
    searchParams.get("occupation") || "";

  const categoryFromUrl =
    searchParams.get("category") || "";

  /* =======================================================
     LOCAL STATE
  ====================================================== */

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [occupation, setOccupation] = useState("");

  const [income, setIncome] = useState("");

  const [filtersOpen, setFiltersOpen] =
    useState(false);

  const [visibleCount, setVisibleCount] =
    useState(9);

  /* =======================================================
     CATEGORY OPTIONS
  ====================================================== */

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        schemes
          .map((scheme) => scheme.category)
          .filter(Boolean)
      )
    ).sort();
  }, []);

  /* =======================================================
     OCCUPATION OPTIONS
  ====================================================== */

  const occupations = useMemo(() => {
    return Array.from(
      new Set(
        schemes
          .flatMap((scheme) => scheme.occupations)
          .filter(Boolean)
      )
    ).sort();
  }, []);

  /* =======================================================
     FILTERED SCHEMES
  ====================================================== */

  const filteredSchemes = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return schemes.filter((scheme) => {
      /* ---------------------------------------------------
         SEARCH
      --------------------------------------------------- */

      const matchesSearch =
        !normalizedSearch ||
        scheme.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        scheme.slug
          .toLowerCase()
          .includes(normalizedSearch) ||
        scheme.category
          .toLowerCase()
          .includes(normalizedSearch) ||
        scheme.shortDescription
          .toLowerCase()
          .includes(normalizedSearch) ||
        scheme.description
          .toLowerCase()
          .includes(normalizedSearch) ||
        scheme.occupations.some((item) =>
          item
            .toLowerCase()
            .includes(normalizedSearch)
        ) ||
        scheme.benefits.some((item) =>
          item
            .toLowerCase()
            .includes(normalizedSearch)
        );

      /* ---------------------------------------------------
         MANUAL CATEGORY FILTER
      --------------------------------------------------- */

      const matchesCategory =
        !category ||
        scheme.category === category;

      /* ---------------------------------------------------
         MANUAL OCCUPATION FILTER
      --------------------------------------------------- */

      const matchesOccupation =
        !occupation ||
        scheme.occupations.includes(
          occupation
        );

      /* ---------------------------------------------------
         URL OCCUPATION FILTER
         
         Example:
         /schemes?occupation=Farmer
      --------------------------------------------------- */

      const matchesUrlOccupation =
        !occupationFromUrl ||
        scheme.occupations.includes(
          occupationFromUrl
        );

      /* ---------------------------------------------------
         URL CATEGORY FILTER
         
         Homepage categories use friendly names:
         
         Farmers
         Students
         Healthcare
         Women
         Jobs & Skills
         Business
      --------------------------------------------------- */

      const categoryMatchesHomepageFilter =
        matchesHomepageCategory(
          scheme,
          categoryFromUrl
        );

      /* ---------------------------------------------------
         INCOME FILTER
      --------------------------------------------------- */

      const matchesIncome =
        matchesIncomeFilter(
          scheme,
          income
        );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesOccupation &&
        matchesUrlOccupation &&
        categoryMatchesHomepageFilter &&
        matchesIncome
      );
    });
  }, [
    search,
    category,
    occupation,
    income,
    occupationFromUrl,
    categoryFromUrl,
  ]);

  /* =======================================================
     VISIBLE RESULTS
  ====================================================== */

  const visibleSchemes =
    filteredSchemes.slice(
      0,
      visibleCount
    );

  const hasMore =
    visibleCount <
    filteredSchemes.length;

  /* =======================================================
     ACTIVE FILTER COUNT
  ====================================================== */

  const activeFilterCount = [
    category,
    occupation,
    income,
    categoryFromUrl,
    occupationFromUrl,
  ].filter(Boolean).length;

  /* =======================================================
     CLEAR FILTERS
  ====================================================== */

  function clearFilters() {
    setSearch("");
    setCategory("");
    setOccupation("");
    setIncome("");
    setVisibleCount(9);

    router.push(pathname);
  }

  /* =======================================================
     LOAD MORE
  ====================================================== */

  function loadMore() {
    setVisibleCount(
      (current) => current + 9
    );
  }

  /* =======================================================
     PAGE
  ====================================================== */

  return (
    <main className="min-h-screen bg-[#FFFFFF]">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">

          <div className="max-w-4xl">

            {/* Label */}

            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFFFFF]/20 px-4 py-2 text-sm font-semibold text-[#FFFFFF]">
              <ShieldCheck
                size={15}
                className="text-[#16A34A]"
              />

              Government schemes guide
            </div>

            {/* Heading */}

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-[56px]">
              Explore government schemes
              made easier to understand.
            </h1>

            {/* Description */}

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#FFFFFF]/80 sm:text-lg">
              Search schemes, filter them by
              category or occupation, and
              understand benefits, eligibility,
              documents and application information
              in simple language.
            </p>

          </div>
        </div>
      </section>

      {/* =================================================
          SEARCH AND FILTERS
      ================================================= */}

      <section className="border-b border-[#111827]/10 bg-[#FFFFFF]">
        <div className="mx-auto max-w-7xl px-6 py-7 sm:px-8 lg:px-10">

          {/* Search */}

          <div className="relative">

            <Search
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#111827]/50"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(
                  event.target.value
                );
                setVisibleCount(9);
              }}
              placeholder="Search schemes by name, benefit, category or occupation..."
              className="h-14 w-full rounded-xl border border-[#111827]/15 bg-[#FFFFFF] pl-12 pr-12 text-[15px] font-medium text-[#111827] outline-none transition placeholder:text-[#111827]/45 focus:border-[#2563EB]"
            />

            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setSearch("");
                  setVisibleCount(9);
                }}
                className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-[#111827]/50 transition hover:text-[#2563EB]"
              >
                <X size={18} />
              </button>
            )}

          </div>

          {/* Toolbar */}

          <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            <button
              type="button"
              onClick={() =>
                setFiltersOpen(
                  (current) => !current
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#111827]/15 px-5 py-3 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              <SlidersHorizontal size={17} />

              Filters

              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2563EB] px-1.5 text-xs font-bold text-[#FFFFFF]">
                  {activeFilterCount}
                </span>
              )}

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  filtersOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            <div className="flex items-center justify-between gap-4">

              <p className="text-sm font-semibold text-[#111827]/65">
                {filteredSchemes.length}{" "}
                {filteredSchemes.length === 1
                  ? "scheme"
                  : "schemes"}{" "}
                found
              </p>

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-bold text-[#2563EB] transition hover:text-[#111827]"
                >
                  Clear filters
                </button>
              )}

            </div>
          </div>

          {/* =================================================
              FILTER PANEL
          ================================================= */}

          {filtersOpen && (
            <div className="mt-5 rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-5">

              <div className="grid gap-5 md:grid-cols-3">

                {/* Category */}

                <FilterSelect
                  label="Category"
                  value={category}
                  onChange={(value) => {
                    setCategory(value);
                    setVisibleCount(9);
                  }}
                  options={categories}
                  placeholder="All categories"
                />

                {/* Occupation */}

                <FilterSelect
                  label="Occupation"
                  value={occupation}
                  onChange={(value) => {
                    setOccupation(value);
                    setVisibleCount(9);
                  }}
                  options={occupations}
                  placeholder="All occupations"
                />

                {/* Income */}

                <div>
                  <label
                    htmlFor="income-filter"
                    className="mb-2 block text-sm font-bold text-[#111827]"
                  >
                    Maximum annual income
                  </label>

                  <select
                    id="income-filter"
                    value={income}
                    onChange={(event) => {
                      setIncome(
                        event.target.value
                      );
                      setVisibleCount(9);
                    }}
                    className="h-11 w-full rounded-xl border border-[#111827]/15 bg-[#FFFFFF] px-3 text-sm font-semibold text-[#111827] outline-none focus:border-[#2563EB]"
                  >
                    <option value="">
                      Any income
                    </option>

                    <option value="under-1">
                      Up to ₹1 lakh
                    </option>

                    <option value="1-3">
                      ₹1–3 lakh
                    </option>

                    <option value="3-5">
                      ₹3–5 lakh
                    </option>

                    <option value="5-plus">
                      Above ₹5 lakh
                    </option>
                  </select>
                </div>

              </div>

              {/* URL filters */}

              {(categoryFromUrl ||
                occupationFromUrl) && (
                <div className="mt-5 border-t border-[#111827]/10 pt-5">

                  <p className="text-xs font-bold uppercase tracking-wide text-[#111827]/50">
                    Homepage filter
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">

                    {categoryFromUrl && (
                      <FilterTag
                        label={categoryFromUrl}
                        onRemove={() =>
                          removeUrlFilter(
                            router,
                            pathname,
                            searchParams,
                            "category"
                          )
                        }
                      />
                    )}

                    {occupationFromUrl && (
                      <FilterTag
                        label={occupationFromUrl}
                        onRemove={() =>
                          removeUrlFilter(
                            router,
                            pathname,
                            searchParams,
                            "occupation"
                          )
                        }
                      />
                    )}

                  </div>
                </div>
              )}

              {/* Manual filters */}

              {category ||
                occupation ||
                income ? (
                <div className="mt-5 border-t border-[#111827]/10 pt-5">

                  <p className="text-xs font-bold uppercase tracking-wide text-[#111827]/50">
                    Selected filters
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">

                    {category && (
                      <FilterTag
                        label={category}
                        onRemove={() =>
                          setCategory("")
                        }
                      />
                    )}

                    {occupation && (
                      <FilterTag
                        label={occupation}
                        onRemove={() =>
                          setOccupation("")
                        }
                      />
                    )}

                    {income && (
                      <FilterTag
                        label={formatIncomeFilter(
                          income
                        )}
                        onRemove={() =>
                          setIncome("")
                        }
                      />
                    )}

                  </div>
                </div>
              ) : null}

            </div>
          )}
        </div>
      </section>

      {/* =================================================
          RESULTS
      ================================================= */}

      <section className="bg-[#F9FAFB]">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">

          {/* Result heading */}

          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                Browse schemes
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl">
                Government schemes
              </h2>
            </div>

            <p className="text-sm font-semibold text-[#111827]/55">
              Showing{" "}
              {Math.min(
                visibleCount,
                filteredSchemes.length
              )}{" "}
              of {filteredSchemes.length}
            </p>

          </div>

          {/* No results */}

          {filteredSchemes.length === 0 ? (
            <EmptyResults
              search={search}
              onClear={clearFilters}
            />
          ) : (
            <>
              {/* Cards */}

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                {visibleSchemes.map(
                  (scheme) => (
                    <SchemeCard
                      key={scheme.slug}
                      scheme={scheme}
                    />
                  )
                )}

              </div>

              {/* Load more */}

              {hasMore && (
                <div className="mt-10 flex justify-center">

                  <button
                    type="button"
                    onClick={loadMore}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#111827]/15 bg-[#FFFFFF] px-6 py-3 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
                  >
                    Load more schemes
                    <ChevronDown size={17} />
                  </button>

                </div>
              )}

              {!hasMore &&
                filteredSchemes.length > 9 && (
                  <p className="mt-10 text-center text-sm font-semibold text-[#111827]/50">
                    You are viewing all matching
                    schemes.
                  </p>
                )}
            </>
          )}

        </div>
      </section>

      {/* =================================================
          ELIGIBILITY CTA
      ================================================= */}

      <section className="bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">

          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-2 text-sm font-bold text-[#16A34A]">
                <Check size={17} />

                Need help finding relevant schemes?
              </div>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#FFFFFF]">
                Check your eligibility
              </h2>

              <p className="mt-3 text-base leading-7 text-[#FFFFFF]/75">
                Answer a few basic questions and
                get preliminary scheme matches
                based on the information you provide.
              </p>

            </div>

            <Link
              href="/eligibility"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3.5 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#FFFFFF] hover:text-[#111827]"
            >
              Check Eligibility
              <ArrowRight size={17} />
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}

/* =========================================================
   HOMEPAGE CATEGORY MATCHING
========================================================= */

function matchesHomepageCategory(
  scheme: Scheme,
  requestedCategory: string
): boolean {
  if (!requestedCategory) {
    return true;
  }

  const requested =
    requestedCategory
      .toLowerCase()
      .trim();

  const schemeCategory =
    scheme.category
      .toLowerCase()
      .trim();

  const occupations =
    scheme.occupations.map((item) =>
      item.toLowerCase().trim()
    );

  /* Farmers */

  if (requested === "farmers") {
    return occupations.includes("farmer");
  }

  /* Students */

  if (requested === "students") {
    return occupations.includes("student");
  }

  /* Healthcare */

  if (requested === "healthcare") {
    return (
      schemeCategory.includes("health") ||
      occupations.some((item) =>
        item.includes("health")
      )
    );
  }

  /* Women */

  if (requested === "women") {
    return (
      occupations.includes("woman") ||
      occupations.includes("women")
    );
  }

  /* Jobs & Skills */

  if (requested === "jobs & skills") {
    return (
      schemeCategory.includes("skill") ||
      schemeCategory.includes("employment") ||
      schemeCategory.includes("job") ||
      occupations.includes("job seeker") ||
      occupations.includes("worker")
    );
  }

  /* Business */

  if (requested === "business") {
    return (
      schemeCategory.includes("business") ||
      schemeCategory.includes("enterprise") ||
      occupations.includes("business owner") ||
      occupations.includes("self employed")
    );
  }

  /* Regular category */

  return schemeCategory === requested;
}

/* =========================================================
   INCOME MATCHING
========================================================= */

function matchesIncomeFilter(
  scheme: Scheme,
  income: string
): boolean {
  if (!income) {
    return true;
  }

  /*
   * A missing maxIncome should not automatically
   * exclude a scheme.
   */

  if (scheme.maxIncome == null) {
    return true;
  }

  if (income === "under-1") {
    return scheme.maxIncome <= 100000;
  }

  if (income === "1-3") {
    return (
      scheme.maxIncome > 100000 &&
      scheme.maxIncome <= 300000
    );
  }

  if (income === "3-5") {
    return (
      scheme.maxIncome > 300000 &&
      scheme.maxIncome <= 500000
    );
  }

  if (income === "5-plus") {
    return scheme.maxIncome > 500000;
  }

  return true;
}

/* =========================================================
   FORMAT INCOME
========================================================= */

function formatIncomeFilter(
  income: string
): string {
  if (income === "under-1") {
    return "Up to ₹1 lakh";
  }

  if (income === "1-3") {
    return "₹1–3 lakh";
  }

  if (income === "3-5") {
    return "₹3–5 lakh";
  }

  if (income === "5-plus") {
    return "Above ₹5 lakh";
  }

  return income;
}

/* =========================================================
   REMOVE URL FILTER
========================================================= */

function removeUrlFilter(
  router: ReturnType<typeof useRouter>,
  pathname: string,
  searchParams: ReturnType<typeof useSearchParams>,
  key: string
) {
  const params = new URLSearchParams(
    searchParams.toString()
  );

  params.delete(key);

  const query = params.toString();

  router.push(
    query
      ? `${pathname}?${query}`
      : pathname
  );
}

/* =========================================================
   SCHEME CARD
========================================================= */

function SchemeCard({
  scheme,
}: {
  scheme: Scheme;
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6 transition hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-md">

      {/* Header */}

      <div className="flex items-start justify-between gap-4">

        <span className="inline-flex rounded-full bg-[#2563EB]/10 px-3 py-1 text-xs font-bold text-[#2563EB]">
          {scheme.category}
        </span>

        <FavoriteButton
          slug={scheme.slug}
        />

      </div>

      {/* Title */}

      <h3 className="mt-5 text-xl font-extrabold leading-tight text-[#111827]">
        {scheme.name}
      </h3>

      {/* Description */}

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#111827]/65">
        {scheme.shortDescription}
      </p>

      {/* Benefits */}

      {scheme.benefits.length > 0 && (
        <div className="mt-5">

          <p className="text-xs font-bold uppercase tracking-wide text-[#111827]/50">
            Key benefits
          </p>

          <ul className="mt-3 space-y-2">

            {scheme.benefits
              .slice(0, 2)
              .map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2 text-sm leading-5 text-[#111827]/75"
                >
                  <Check
                    size={15}
                    className="mt-0.5 shrink-0 text-[#16A34A]"
                  />

                  <span>{benefit}</span>
                </li>
              ))}

          </ul>

        </div>
      )}

      {/* Footer */}

      <div className="mt-auto pt-6">

        <Link
          href={`/schemes/${scheme.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition hover:text-[#111827]"
        >
          View scheme

          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>

      </div>

    </article>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-bold text-[#111827]">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-11 w-full rounded-xl border border-[#111827]/15 bg-[#FFFFFF] px-3 text-sm font-semibold text-[#111827] outline-none focus:border-[#2563EB]"
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

    </div>
  );
}

/* =========================================================
   FILTER TAG
========================================================= */

function FilterTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 rounded-full bg-[#2563EB]/10 px-3 py-1.5 text-xs font-bold text-[#2563EB] transition hover:bg-[#2563EB] hover:text-[#FFFFFF]"
    >
      {label}

      <X size={13} />
    </button>
  );
}

/* =========================================================
   EMPTY RESULTS
========================================================= */

function EmptyResults({
  search,
  onClear,
}: {
  search: string;
  onClear: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] px-6 py-14 text-center">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
        <Search size={22} />
      </div>

      <h3 className="mt-5 text-xl font-extrabold text-[#111827]">
        No schemes found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#111827]/60">
        {search
          ? `We couldn't find a scheme matching "${search}". Try another search or clear your filters.`
          : "Try changing your filters to find more government schemes."}
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
      >
        <Filter size={16} />

        Clear filters
      </button>

    </div>
  );
}