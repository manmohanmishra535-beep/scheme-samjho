"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useUser } from "@clerk/nextjs";

import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  FileText,
  Search,
  ShieldCheck,
} from "lucide-react";

import { schemes } from "../../data/schemes";
import { useSavedSchemes } from "../../lib/useSavedSchemes";

export default function DashboardPage() {
  const { user } = useUser();

  const {
    savedSlugs,
    loading: loadingSaved,
    error,
  } = useSavedSchemes();

  /*
   * Convert saved scheme slugs into
   * complete scheme objects.
   */
  const savedSchemes = useMemo(() => {
    return (savedSlugs ?? [])
      .map((slug) =>
        schemes.find(
          (scheme) => scheme.slug === slug
        )
      )
      .filter(
        (scheme) => scheme !== undefined
      );
  }, [savedSlugs]);

  const firstName =
    user?.firstName ||
    user?.username ||
    "there";

  /*
   * Loading state
   */
  if (loadingSaved) {
    return (
      <main className="min-h-screen bg-[#FFFFFF]">
        <section className="bg-[#111827]">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
            <div className="max-w-3xl">
              <div className="h-4 w-28 animate-pulse rounded bg-[#FFFFFF]/20" />

              <div className="mt-4 h-12 w-full max-w-xl animate-pulse rounded bg-[#FFFFFF]/20" />

              <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded bg-[#FFFFFF]/10" />
            </div>
          </div>
        </section>

        <section className="bg-[#FFFFFF] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-5 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-52 animate-pulse rounded-2xl border border-[#111827]/10 bg-[#FFFFFF]"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFFFF]">

      {/* =================================
          HERO
      ================================== */}
      <section className="bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFFFFF]/20 px-4 py-2 text-sm font-semibold text-[#FFFFFF]">
              <ShieldCheck
                size={16}
                className="text-[#16A34A]"
              />

              My SchemeSamjho
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl">
              Welcome, {firstName}.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#FFFFFF]/70 sm:text-lg">
              Manage the government schemes you have saved and
              continue exploring benefits that may be relevant to you.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/schemes"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#FFFFFF] hover:text-[#111827]"
              >
                <Search size={17} />
                Explore Schemes
              </Link>

              <Link
                href="/eligibility"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#FFFFFF]/30 px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#FFFFFF] hover:text-[#111827]"
              >
                Check Eligibility
                <ArrowRight size={17} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =================================
          DASHBOARD CONTENT
      ================================== */}
      <section className="bg-[#FFFFFF] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

          {/* Error */}
          {error && (
            <div className="mb-8 flex items-start gap-3 rounded-2xl border border-[#111827]/10 bg-[#111827] p-4">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-[#FFFFFF]"
              />

              <div>
                <p className="text-sm font-bold text-[#FFFFFF]">
                  Saved schemes could not be loaded
                </p>

                <p className="mt-1 text-sm leading-6 text-[#FFFFFF]/70">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* =================================
              QUICK STATS
          ================================== */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]">
                  <Bookmark
                    size={21}
                    className="text-[#FFFFFF]"
                  />
                </div>

                <div>
                  <p className="text-2xl font-extrabold text-[#111827]">
                    {savedSchemes.length}
                  </p>

                  <p className="text-sm font-semibold text-[#111827]/60">
                    Saved schemes
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#16A34A]">
                  <CheckCircle2
                    size={21}
                    className="text-[#FFFFFF]"
                  />
                </div>

                <div>
                  <p className="text-2xl font-extrabold text-[#111827]">
                    Simple
                  </p>

                  <p className="text-sm font-semibold text-[#111827]/60">
                    Scheme explanations
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-5 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#111827]">
                  <FileText
                    size={21}
                    className="text-[#FFFFFF]"
                  />
                </div>

                <div>
                  <p className="text-2xl font-extrabold text-[#111827]">
                    Free
                  </p>

                  <p className="text-sm font-semibold text-[#111827]/60">
                    Scheme discovery
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* =================================
              SAVED SCHEMES
          ================================== */}
          <div className="mt-12">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <p className="text-sm font-bold text-[#2563EB]">
                  Your collection
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[#111827] sm:text-3xl">
                  Saved schemes
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#111827]/60 sm:text-base">
                  Schemes you save from SchemeSamjho appear here.
                </p>
              </div>

              <Link
                href="/saved"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition hover:text-[#111827]"
              >
                View all saved
                <ArrowRight size={16} />
              </Link>

            </div>

            {/* Empty state */}
            {savedSchemes.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] px-6 py-12 text-center sm:px-10">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2563EB]">
                  <Bookmark
                    size={28}
                    className="text-[#FFFFFF]"
                  />
                </div>

                <h3 className="mt-6 text-2xl font-extrabold text-[#111827]">
                  No saved schemes yet
                </h3>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#111827]/60 sm:text-base">
                  When you find a government scheme you want to
                  revisit, save it and it will appear here.
                </p>

                <Link
                  href="/schemes"
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
                >
                  <Search size={17} />
                  Browse Schemes
                </Link>

              </div>
            ) : (

              /* Saved cards */
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                {savedSchemes
                  .slice(0, 6)
                  .map((scheme) => (
                    <article
                      key={scheme.slug}
                      className="flex h-full flex-col rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-5 transition hover:border-[#2563EB]/40"
                    >

                      {/* Icon */}
                      <div className="flex items-start justify-between gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]">
                          <Bookmark
                            size={21}
                            className="text-[#FFFFFF]"
                          />
                        </div>

                        <span className="rounded-full border border-[#16A34A]/30 px-3 py-1 text-xs font-bold text-[#16A34A]">
                          Saved
                        </span>

                      </div>

                      {/* Content */}
                      <div className="mt-5 flex-1">

                        <p className="text-xs font-bold uppercase tracking-wide text-[#16A34A]">
                          {scheme.category}
                        </p>

                        <h3 className="mt-2 text-xl font-extrabold leading-7 text-[#111827]">
                          {scheme.name}
                        </h3>

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#111827]/60">
                          {scheme.shortDescription}
                        </p>

                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex flex-col gap-2 sm:flex-row">

                        <Link
                          href={`/schemes/${scheme.slug}`}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
                        >
                          View Scheme
                          <ArrowRight size={15} />
                        </Link>

                        <Link
                          href={`/explainers/${scheme.slug}`}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#111827]/10 px-4 py-3 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
                        >
                          <FileText size={15} />
                          Explainer
                        </Link>

                      </div>

                    </article>
                  ))}

              </div>
            )}

            {/* More saved schemes */}
            {savedSchemes.length > 6 && (
              <div className="mt-8 text-center">
                <Link
                  href="/saved"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#111827]/15 px-5 py-3 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
                >
                  View all {savedSchemes.length} saved schemes
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}

          </div>

          {/* =================================
              QUICK ACTIONS
          ================================== */}
          <div className="mt-14">

            <div>
              <p className="text-sm font-bold text-[#2563EB]">
                Continue exploring
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-[#111827] sm:text-3xl">
                Useful tools
              </h2>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-3">

              {/* Browse */}
              <Link
                href="/schemes"
                className="group rounded-2xl border border-[#111827]/10 p-6 transition hover:border-[#2563EB]/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]">
                  <Search
                    size={21}
                    className="text-[#FFFFFF]"
                  />
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-[#111827]">
                  Browse schemes
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#111827]/60">
                  Search and filter government schemes by category,
                  occupation and other available information.
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                  Explore
                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>

              {/* Eligibility */}
              <Link
                href="/eligibility"
                className="group rounded-2xl border border-[#111827]/10 p-6 transition hover:border-[#2563EB]/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#16A34A]">
                  <CheckCircle2
                    size={21}
                    className="text-[#FFFFFF]"
                  />
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-[#111827]">
                  Check eligibility
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#111827]/60">
                  Provide basic information to see which schemes may
                  match your circumstances.
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                  Check now
                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>

              {/* Explainers */}
              <Link
                href="/explainers"
                className="group rounded-2xl border border-[#111827]/10 p-6 transition hover:border-[#2563EB]/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#111827]">
                  <FileText
                    size={21}
                    className="text-[#FFFFFF]"
                  />
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-[#111827]">
                  Read explainers
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#111827]/60">
                  Understand scheme benefits, eligibility, documents
                  and application information in simple language.
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                  Read more
                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>

            </div>
          </div>

          {/* =================================
              TRUST INFORMATION
          ================================== */}
          <div className="mt-14 rounded-2xl border border-[#111827]/10 bg-[#111827] p-6 sm:p-8">

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

              <div className="max-w-2xl">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={20}
                    className="text-[#16A34A]"
                  />

                  <p className="text-sm font-bold text-[#FFFFFF]">
                    About SchemeSamjho
                  </p>
                </div>

                <h2 className="mt-3 text-2xl font-extrabold text-[#FFFFFF]">
                  Simple information, official sources
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#FFFFFF]/70">
                  SchemeSamjho helps explain government schemes in
                  simpler language. Always check the official
                  government source for the latest eligibility rules,
                  documents and application requirements.
                </p>
              </div>

              <Link
                href="/disclaimer"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#FFFFFF] transition hover:text-[#16A34A]"
              >
                Read disclaimer
                <ExternalLink size={15} />
              </Link>

            </div>

          </div>

        </div>
      </section>
    </main>
  );
}