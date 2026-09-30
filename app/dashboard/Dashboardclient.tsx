"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight,
  Bookmark,
  ExternalLink,
  Heart,
  Loader2,
  Search,
  ShieldCheck,
} from "lucide-react";

import type { Scheme } from "../../data/schemes";
import { useSavedSchemes } from "../../lib/useSavedSchemes";
import FavoriteButton from "../../Components/FavoriteButton";

type DashboardClientProps = {
  schemes: Scheme[];
};

export default function DashboardClient({
  schemes,
}: DashboardClientProps) {
  const {
    savedSlugs,
    loading: loadingSaved,
    error,
  } = useSavedSchemes();

  /*
   * Convert saved slugs into complete scheme objects.
   *
   * The schemes prop comes from getAllSchemes(), so schemes
   * created through the admin panel are also available here.
   */
  const savedSchemes = useMemo(() => {
    return (savedSlugs ?? [])
      .map((slug) =>
        schemes.find(
          (scheme) => scheme.slug === slug
        )
      )
      .filter(
        (scheme): scheme is Scheme =>
          scheme !== undefined
      );
  }, [savedSlugs, schemes]);

  const recentSavedSchemes = savedSchemes.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-[#111827]">
      {/* HERO */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-[#2563EB]">
              <ShieldCheck className="h-4 w-4" />
              Your Dashboard
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
              Your SchemeSamjho dashboard
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
              Quickly access your saved schemes and explore
              government schemes that may be relevant to you.
            </p>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="bg-gray-50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          {/* ERROR */}
          {error && (
            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-sm leading-6 text-gray-700">
                {error}
              </p>
            </div>
          )}

          {/* STATS */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Saved schemes
                  </p>

                  {loadingSaved ? (
                    <div className="mt-3">
                      <Loader2 className="h-6 w-6 animate-spin text-[#2563EB]" />
                    </div>
                  ) : (
                    <p className="mt-2 text-3xl font-black text-[#111827]">
                      {savedSchemes.length}
                    </p>
                  )}
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <Heart className="h-5 w-5 text-[#2563EB]" />
                </div>
              </div>

              <Link
                href="/saved"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#2563EB] hover:underline"
              >
                View saved schemes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Available schemes
                  </p>

                  <p className="mt-2 text-3xl font-black text-[#111827]">
                    {schemes.length}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                  <Bookmark className="h-5 w-5 text-[#16A34A]" />
                </div>
              </div>

              <Link
                href="/schemes"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#2563EB] hover:underline"
              >
                Browse schemes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Eligibility
                  </p>

                  <p className="mt-2 text-lg font-black text-[#111827]">
                    Find schemes
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <Search className="h-5 w-5 text-[#2563EB]" />
                </div>
              </div>

              <Link
                href="/eligibility"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#2563EB] hover:underline"
              >
                Check eligibility
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* SAVED SCHEMES */}
          <div className="mt-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-[#2563EB]">
                  Your collection
                </p>

                <h2 className="mt-2 text-2xl font-black text-[#111827] sm:text-3xl">
                  Recently saved schemes
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Quickly continue exploring schemes you saved.
                </p>
              </div>

              {savedSchemes.length > 0 && (
                <Link
                  href="/saved"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:underline"
                >
                  View all saved
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            {/* LOADING */}
            {loadingSaved && (
              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-10 text-center">
                <Loader2 className="mx-auto h-7 w-7 animate-spin text-[#2563EB]" />

                <p className="mt-3 text-sm font-semibold text-gray-600">
                  Loading saved schemes...
                </p>
              </div>
            )}

            {/* EMPTY */}
            {!loadingSaved &&
              savedSchemes.length === 0 && (
                <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                    <Heart className="h-7 w-7 text-[#2563EB]" />
                  </div>

                  <h3 className="mt-5 text-xl font-black text-[#111827]">
                    You have not saved any schemes yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-600">
                    Browse government schemes and use the heart
                    button to save the ones you want to revisit.
                  </p>

                  <Link
                    href="/schemes"
                    className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[#2563EB] px-5 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
                  >
                    Browse Schemes
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}

            {/* CARDS */}
            {!loadingSaved &&
              recentSavedSchemes.length > 0 && (
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {recentSavedSchemes.map((scheme) => (
                    <article
                      key={scheme.slug}
                      className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                    >
                      {/* TOP */}
                      <div className="flex items-start justify-between gap-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2563EB]">
                          {scheme.category}
                        </span>

                        <FavoriteButton
                          slug={scheme.slug}
                        />
                      </div>

                      {/* TITLE */}
                      <h3 className="mt-5 text-xl font-black leading-7 text-[#111827]">
                        {scheme.name}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                        {scheme.shortDescription}
                      </p>

                      {/* BENEFITS */}
                      {scheme.benefits.length > 0 && (
                        <div className="mt-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                            Key benefits
                          </p>

                          <ul className="mt-3 space-y-2">
                            {scheme.benefits
                              .slice(0, 2)
                              .map((benefit) => (
                                <li
                                  key={benefit}
                                  className="flex gap-2 text-sm leading-5 text-gray-700"
                                >
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16A34A]" />

                                  <span className="line-clamp-2">
                                    {benefit}
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      {/* FOOTER */}
                      <div className="mt-auto pt-6">
                        <div className="mb-4 border-t border-gray-100 pt-4">
                          <p className="text-xs text-gray-500">
                            Last verified:{" "}
                            <span className="font-semibold text-gray-700">
                              {scheme.lastVerified}
                            </span>
                          </p>
                        </div>

                        <Link
                          href={`/schemes/${scheme.slug}`}
                          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
                        >
                          View Scheme
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
          </div>

          {/* QUICK ACTIONS */}
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-black text-[#111827]">
                Quick actions
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Continue exploring SchemeSamjho.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <Link
                  href="/schemes"
                  className="group rounded-xl border border-gray-200 p-5 transition hover:border-blue-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <Search className="h-5 w-5 text-[#2563EB]" />
                  </div>

                  <h3 className="mt-4 text-lg font-black text-[#111827]">
                    Browse Schemes
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Explore available government schemes and
                    filter them by category and other details.
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#2563EB]">
                    Explore
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>

                <Link
                  href="/eligibility"
                  className="group rounded-xl border border-gray-200 p-5 transition hover:border-blue-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                    <ShieldCheck className="h-5 w-5 text-[#16A34A]" />
                  </div>

                  <h3 className="mt-4 text-lg font-black text-[#111827]">
                    Check Eligibility
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Enter your basic details and find schemes
                    whose listed requirements may match.
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#2563EB]">
                    Check now
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>

                <Link
                  href="/compare"
                  className="group rounded-xl border border-gray-200 p-5 transition hover:border-blue-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <Bookmark className="h-5 w-5 text-[#2563EB]" />
                  </div>

                  <h3 className="mt-4 text-lg font-black text-[#111827]">
                    Compare Schemes
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Compare up to three schemes side by side to
                    understand their differences.
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#2563EB]">
                    Compare
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            </div>
          </section>

          {/* OFFICIAL SOURCE NOTE */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex gap-3">
              <ExternalLink className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]" />

              <div>
                <h2 className="text-sm font-black text-[#111827]">
                  Verify before applying
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  SchemeSamjho provides information to help you
                  understand government schemes. Always verify
                  the latest eligibility requirements, documents
                  and application process on the relevant
                  official government source.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}