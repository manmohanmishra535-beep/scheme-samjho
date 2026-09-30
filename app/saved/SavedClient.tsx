"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight,
  ExternalLink,
  Heart,
  Loader2,
} from "lucide-react";

import type { Scheme } from "../../data/schemes";
import { useSavedSchemes } from "../../lib/useSavedSchemes";
import FavoriteButton from "../../Components/FavoriteButton";

type SavedClientProps = {
  schemes: Scheme[];
};

export default function SavedClient({
  schemes,
}: SavedClientProps) {
  const {
    savedSlugs,
    loading,
    error,
  } = useSavedSchemes();

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <section className="border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-[#2563EB]" />

              <p className="text-sm font-semibold text-gray-600">
                Loading your saved schemes...
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#111827]">
      {/* HERO */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-[#2563EB]">
              <Heart className="h-4 w-4" />
              Saved Schemes
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
              Your saved schemes
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
              Keep the government schemes you are interested
              in one place so you can review them later.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          {/* ERROR */}
          {error && (
            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-semibold text-gray-700">
                {error}
              </p>
            </div>
          )}

          {/* COUNT */}
          {savedSchemes.length > 0 && (
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#2563EB]">
                  {savedSchemes.length}{" "}
                  {savedSchemes.length === 1
                    ? "scheme"
                    : "schemes"}{" "}
                  saved
                </p>

                <h2 className="mt-1 text-2xl font-black text-[#111827] sm:text-3xl">
                  Your collection
                </h2>
              </div>
            </div>
          )}

          {/* EMPTY */}
          {savedSchemes.length === 0 && (
            <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                <Heart className="h-8 w-8 text-[#2563EB]" />
              </div>

              <h2 className="mt-6 text-2xl font-black text-[#111827]">
                No saved schemes yet
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                When you find a scheme you want to revisit,
                click the heart icon to save it here.
              </p>

              <Link
                href="/schemes"
                className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-[#2563EB] px-6 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
              >
                Browse Schemes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* SAVED CARDS */}
          {savedSchemes.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedSchemes.map((scheme) => (
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

                  {/* NAME */}
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
                          .slice(0, 3)
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

                  {/* META */}
                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <p className="text-xs leading-5 text-gray-500">
                      Last verified:{" "}
                      <span className="font-semibold text-gray-700">
                        {scheme.lastVerified}
                      </span>
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-auto pt-6">
                    <div className="grid gap-3">
                      <Link
                        href={`/schemes/${scheme.slug}`}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
                      >
                        View Scheme
                        <ArrowRight className="h-4 w-4" />
                      </Link>

                      <a
                        href={scheme.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
                      >
                        Official Source
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* BROWSE CTA */}
          {savedSchemes.length > 0 && (
            <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#111827] sm:text-2xl">
                    Looking for more schemes?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Browse the complete collection of schemes
                    available on SchemeSamjho.
                  </p>
                </div>

                <Link
                  href="/schemes"
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
                >
                  Browse Schemes
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {/* NOTE */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex gap-3">
              <Heart className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]" />

              <p className="text-sm leading-6 text-gray-600">
                Saved schemes are linked to your account. You
                can remove a scheme anytime using the heart
                button.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}