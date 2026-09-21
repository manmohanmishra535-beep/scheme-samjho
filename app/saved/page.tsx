"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  ExternalLink,
  FileText,
  LogIn,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Show } from "@clerk/nextjs";

import { schemes } from "../../data/schemes";
import { useSavedSchemes } from "../../lib/useSavedSchemes";

export default function SavedSchemesPage() {
  const {
    savedSlugs,
    loading,
    saving,
    error,
    removeScheme,
  } = useSavedSchemes();

  const savedSchemes = savedSlugs
    .map((slug) =>
      schemes.find(
        (scheme) => scheme.slug === slug
      )
    )
    .filter(
      (
        scheme
      ): scheme is (typeof schemes)[number] =>
        scheme !== undefined
    );

  return (
    <main className="min-h-screen bg-[#FFFFFF]">

      {/* Hero */}
      <section className="bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFFFFF]/20 px-4 py-2 text-sm font-semibold text-[#FFFFFF]">
              <Bookmark size={16} />
              Your saved schemes
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.06] tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl">
              Keep useful schemes
              <br />
              in one place.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#FFFFFF]/75 sm:text-lg">
              Save schemes you want to review later and quickly
              return to their benefits, eligibility and application
              information.
            </p>

          </div>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">

          <Show when="signed-out">
            <SignedOutState />
          </Show>

          <Show when="signed-in">
            <SignedInContent
              savedSchemes={savedSchemes}
              savedCount={savedSlugs.length}
              loading={loading}
              saving={saving}
              error={error}
              onRemove={removeScheme}
            />
          </Show>

        </div>
      </section>

    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Signed Out                                                                 */
/* -------------------------------------------------------------------------- */

function SignedOutState() {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-[#111827]/10 bg-[#FFFFFF] px-6 py-12 text-center sm:px-10">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563EB]/10">
        <LogIn
          size={28}
          className="text-[#2563EB]"
        />
      </div>

      <h2 className="mt-6 text-2xl font-extrabold text-[#111827] sm:text-3xl">
        Sign in to save schemes
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#111827]/60">
        Create an account or sign in to keep your favourite
        government schemes available from your dashboard.
      </p>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

        <Link
          href="/sign-in"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
        >
          Sign in
          <ArrowRight size={17} />
        </Link>

        <Link
          href="/schemes"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#111827]/15 px-5 py-3 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
        >
          Browse schemes
          <Search size={17} />
        </Link>

      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Signed In                                                                  */
/* -------------------------------------------------------------------------- */

function SignedInContent({
  savedSchemes,
  savedCount,
  loading,
  saving,
  error,
  onRemove,
}: {
  savedSchemes: typeof schemes;
  savedCount: number;
  loading: boolean;
  saving: string | null;
  error: string;
  onRemove: (
    slug: string
  ) => Promise<boolean>;
}) {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="text-sm font-bold text-[#2563EB]">
            My collection
          </p>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
            Saved schemes
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#111827]/60">
            {loading
              ? "Loading your saved schemes..."
              : savedCount === 0
              ? "You have not saved any schemes yet."
              : `${savedCount} ${
                  savedCount === 1
                    ? "scheme"
                    : "schemes"
                } saved`}
          </p>

        </div>

        <Link
          href="/schemes"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition hover:text-[#111827]"
        >
          Find more schemes
          <ArrowRight size={17} />
        </Link>

      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-2xl border border-[#111827]/10 bg-[#111827]/5 p-5">

          <div className="flex items-start gap-3">

            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-[#16A34A]"
            />

            <p className="text-sm leading-6 text-[#111827]/70">
              {error}
            </p>

          </div>

        </div>
      )}

      {/* Loading */}
      {loading && <LoadingState />}

      {/* Empty */}
      {!loading && savedSchemes.length === 0 && (
        <EmptyState />
      )}

      {/* Cards */}
      {!loading && savedSchemes.length > 0 && (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {savedSchemes.map((scheme) => (
            <SavedSchemeCard
              key={scheme.slug}
              scheme={scheme}
              removing={saving === scheme.slug}
              onRemove={onRemove}
            />
          ))}

        </div>
      )}

      {/* Trust information */}
      {!loading && savedSchemes.length > 0 && (
        <div className="mt-12 rounded-2xl bg-[#111827] p-6 sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

            <ShieldCheck
              size={24}
              className="shrink-0 text-[#16A34A]"
            />

            <div>

              <h2 className="text-xl font-extrabold text-[#FFFFFF]">
                Keep official information in mind
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#FFFFFF]/65">
                Saved schemes are a convenience feature.
                Before applying, always verify the latest
                eligibility, documents, benefits and application
                process through the official government source.
              </p>

            </div>

          </div>

        </div>
      )}

    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Saved Card                                                                 */
/* -------------------------------------------------------------------------- */

function SavedSchemeCard({
  scheme,
  removing,
  onRemove,
}: {
  scheme: (typeof schemes)[number];
  removing: boolean;
  onRemove: (
    slug: string
  ) => Promise<boolean>;
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6 transition hover:-translate-y-1 hover:border-[#2563EB]/30">

      {/* Top */}
      <div className="flex items-start justify-between gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10">
          <Bookmark
            size={21}
            className="text-[#2563EB]"
            fill="currentColor"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            void onRemove(scheme.slug);
          }}
          disabled={removing}
          aria-label={`Remove ${scheme.name} from saved schemes`}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#111827]/40 transition hover:bg-[#111827] hover:text-[#FFFFFF] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={18} />
        </button>

      </div>

      {/* Content */}
      <div className="mt-5">

        <p className="text-xs font-bold uppercase tracking-wide text-[#16A34A]">
          {scheme.category}
        </p>

        <h3 className="mt-2 text-xl font-extrabold leading-7 text-[#111827]">
          {scheme.name}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#111827]/60">
          {scheme.shortDescription}
        </p>

      </div>

      {/* Quick facts */}
      <div className="mt-6 grid grid-cols-2 gap-3">

        <QuickFact
          label="Age"
          value={formatAge(
            scheme.minAge,
            scheme.maxAge
          )}
        />

        <QuickFact
          label="Income"
          value={formatIncome(
            scheme.maxIncome
          )}
        />

      </div>

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-2 pt-6">

        <Link
          href={`/schemes/${scheme.slug}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
        >
          View scheme
          <ArrowRight size={16} />
        </Link>

        <Link
          href={`/explainers/${scheme.slug}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#111827]/10 px-4 py-3 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
        >
          Read explainer
          <FileText size={16} />
        </Link>

        <a
          href={scheme.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-[#111827]/55 transition hover:text-[#2563EB]"
        >
          Official source
          <ExternalLink size={14} />
        </a>

      </div>

    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Quick Fact                                                                 */
/* -------------------------------------------------------------------------- */

function QuickFact({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#111827]/10 p-3">

      <p className="text-[11px] font-bold uppercase tracking-wide text-[#111827]/40">
        {label}
      </p>

      <p className="mt-1 text-xs font-bold leading-5 text-[#111827]">
        {value}
      </p>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Loading                                                                    */
/* -------------------------------------------------------------------------- */

function LoadingState() {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="rounded-2xl border border-[#111827]/10 p-6"
        >

          <div className="h-11 w-11 animate-pulse rounded-xl bg-[#111827]/10" />

          <div className="mt-5 h-3 w-20 animate-pulse rounded bg-[#111827]/10" />

          <div className="mt-3 h-6 w-3/4 animate-pulse rounded bg-[#111827]/10" />

          <div className="mt-3 h-4 w-full animate-pulse rounded bg-[#111827]/10" />

          <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-[#111827]/10" />

          <div className="mt-6 grid grid-cols-2 gap-3">

            <div className="h-16 animate-pulse rounded-xl bg-[#111827]/10" />

            <div className="h-16 animate-pulse rounded-xl bg-[#111827]/10" />

          </div>

        </div>
      ))}

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty State                                                                */
/* -------------------------------------------------------------------------- */

function EmptyState() {
  return (
    <div className="mt-10 rounded-3xl border border-dashed border-[#111827]/15 px-6 py-16 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563EB]/10">
        <Bookmark
          size={28}
          className="text-[#2563EB]"
        />
      </div>

      <h2 className="mt-6 text-2xl font-extrabold text-[#111827] sm:text-3xl">
        No saved schemes yet
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#111827]/60">
        When you find a scheme that you want to review later,
        save it and it will appear here.
      </p>

      <Link
        href="/schemes"
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
      >
        Explore schemes
        <ArrowRight size={17} />
      </Link>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Formatting                                                                 */
/* -------------------------------------------------------------------------- */

function formatAge(
  minAge: number | null | undefined,
  maxAge: number | null | undefined
): string {
  if (minAge != null && maxAge != null) {
    return `${minAge}–${maxAge} years`;
  }

  if (minAge != null) {
    return `${minAge}+ years`;
  }

  if (maxAge != null) {
    return `Up to ${maxAge} years`;
  }

  return "See rules";
}

function formatIncome(
  maxIncome: number | null | undefined
): string {
  if (maxIncome == null) {
    return "See rules";
  }

  return `₹${maxIncome.toLocaleString("en-IN")}`;
}