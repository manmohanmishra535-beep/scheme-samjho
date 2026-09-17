"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  Check,
  ExternalLink,
  Heart,
  Loader2,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";

import { schemes } from "../../data/schemes";
import { createClerkSupabaseClient } from "../../lib/supabase";

export default function SavedPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();

  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSavedSchemes() {
      if (!isLoaded) return;

      if (!isSignedIn || !user) {
        setSavedSlugs([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const supabase = createClerkSupabaseClient(getToken);

        const { data, error } = await supabase
          .from("saved_schemes")
          .select("scheme_slug, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error loading saved schemes:", error);
          setError("Unable to load your saved schemes.");
          return;
        }

        setSavedSlugs(
          (data ?? []).map((item) => item.scheme_slug)
        );
      } catch (err) {
        console.error("Error loading saved schemes:", err);
        setError("Something went wrong while loading your saved schemes.");
      } finally {
        setLoading(false);
      }
    }

    loadSavedSchemes();
  }, [isLoaded, isSignedIn, user, getToken]);

  async function removeScheme(slug: string) {
    if (!user || removing) return;

    try {
      setRemoving(slug);

      const supabase = createClerkSupabaseClient(getToken);

      const { error } = await supabase
        .from("saved_schemes")
        .delete()
        .eq("user_id", user.id)
        .eq("scheme_slug", slug);

      if (error) {
        console.error("Error removing saved scheme:", error);
        setError("Unable to remove this saved scheme.");
        return;
      }

      setSavedSlugs((current) =>
        current.filter((item) => item !== slug)
      );
    } catch (err) {
      console.error("Error removing saved scheme:", err);
      setError("Something went wrong while removing the scheme.");
    } finally {
      setRemoving(null);
    }
  }

  const savedSchemes = savedSlugs
    .map((slug) =>
      schemes.find((scheme) => scheme.slug === slug)
    )
    .filter((scheme) => scheme !== undefined);

  /*
   * Loading state
   */
  if (!isLoaded || loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="flex min-h-[360px] items-center justify-center rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Loader2
                  size={26}
                  className="animate-spin"
                />
              </div>

              <p className="mt-5 text-sm font-medium text-gray-600">
                Loading your saved schemes...
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /*
   * Signed-out state
   */
  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="relative overflow-hidden bg-[#07111f] text-white">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-5 py-20 text-center sm:px-6 lg:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <Heart
                size={30}
                className="text-blue-300"
              />
            </div>

            <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">
              Your saved schemes
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-300">
              Save useful government schemes and keep them organized
              in one place. Sign in to access your saved schemes
              whenever you need them.
            </p>

            <SignInButton mode="modal">
              <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-gray-950 transition hover:bg-gray-100">
                Sign In to Continue
                <ArrowRight size={17} />
              </button>
            </SignInButton>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-7 text-center shadow-sm">
            <Bookmark
              size={28}
              className="mx-auto text-blue-600"
            />

            <h2 className="mt-4 text-xl font-bold text-gray-950">
              Haven't found a scheme yet?
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Browse government schemes explained in simple language.
            </p>

            <Link
              href="/schemes"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Browse Schemes
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  /*
   * Error state
   */
  if (error) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="mx-auto max-w-3xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              !
            </div>

            <h1 className="mt-5 text-2xl font-black text-red-900">
              Something went wrong
            </h1>

            <p className="mt-2 text-sm text-red-700">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </section>
      </main>
    );
  }

  /*
   * Main page
   */
  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-blue-200">
                <Bookmark size={15} />
                My SchemeSamjho
              </div>

              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                Your saved
                <span className="block text-blue-400">
                  government schemes.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300">
                Keep the schemes that matter to you in one place.
                Your saved list is linked to your account, so you can
                access it again whenever you sign in.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
              <p className="text-xs font-medium text-gray-400">
                Saved schemes
              </p>

              <p className="mt-1 text-4xl font-black">
                {savedSchemes.length}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {savedSchemes.length === 1
                  ? "scheme in your list"
                  : "schemes in your list"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        {savedSchemes.length === 0 ? (
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:px-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                <Heart size={34} />
              </div>

              <h2 className="mt-7 text-3xl font-black text-gray-950">
                Your saved list is empty
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                When you find a government scheme that looks useful,
                click <strong>Save Scheme</strong>. It will appear here
                automatically.
              </p>

              <Link
                href="/schemes"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800"
              >
                Explore Schemes
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="border-t border-gray-100 bg-gray-50 px-6 py-7">
              <div className="mx-auto flex max-w-2xl flex-col gap-4 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-center">
                <div className="flex items-center justify-center gap-2">
                  <Check
                    size={17}
                    className="text-emerald-600"
                  />
                  Saved to your account
                </div>

                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck
                    size={17}
                    className="text-blue-600"
                  />
                  No localStorage
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* TOP BAR */}
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Your collection
                </p>

                <h2 className="mt-1 text-2xl font-black text-gray-950">
                  Saved schemes
                </h2>
              </div>

              <Link
                href="/schemes"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Find More Schemes
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* CARDS */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {savedSchemes.map((scheme) => (
                <article
                  key={scheme.slug}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* ACCENT */}
                  <div className="h-1.5 bg-gradient-to-r from-blue-600 via-violet-500 to-emerald-500" />

                  <div className="flex flex-1 flex-col p-6">
                    {/* TOP */}
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                        {scheme.category}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeScheme(scheme.slug)}
                        disabled={removing === scheme.slug}
                        title="Remove from saved schemes"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {removing === scheme.slug ? (
                          <Loader2
                            size={16}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>

                    {/* TITLE */}
                    <h3 className="mt-5 text-xl font-black leading-tight text-gray-950">
                      {scheme.name}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                      {scheme.shortDescription}
                    </p>

                    {/* FACTS */}
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                          Age
                        </p>

                        <p className="mt-1.5 text-sm font-bold text-gray-900">
                          {scheme.minAge !== undefined
                            ? scheme.maxAge !== undefined
                              ? `${scheme.minAge}–${scheme.maxAge} years`
                              : `${scheme.minAge}+ years`
                            : scheme.maxAge !== undefined
                              ? `Up to ${scheme.maxAge} years`
                              : "See rules"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                          Income
                        </p>

                        <p className="mt-1.5 text-sm font-bold text-gray-900">
                          {scheme.maxIncome !== undefined
                            ? `₹${scheme.maxIncome.toLocaleString(
                                "en-IN"
                              )}/yr`
                            : "See rules"}
                        </p>
                      </div>
                    </div>

                    {/* SAVED */}
                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-700">
                      <Heart
                        size={14}
                        className="fill-current"
                      />
                      Saved to your account
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <Link
                        href={`/schemes/${scheme.slug}`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
                      >
                        View Scheme
                        <ArrowRight size={15} />
                      </Link>

                      <Link
                        href={`/explainers/${scheme.slug}`}
                        className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        Explainer
                      </Link>
                    </div>

                    {/* OFFICIAL SOURCE */}
                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-500 transition hover:text-blue-600"
                    >
                      Official source
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {/* TRUST PANEL */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gray-50 p-6 sm:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h3 className="font-bold text-gray-950">
                  Your saved schemes are account-based
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  SchemeSamjho stores your saved scheme references in
                  your account database rather than relying on browser
                  local storage.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs leading-5 text-gray-500">
            SchemeSamjho is an independent informational platform.
            Saved schemes are for your convenience and do not indicate
            that you are officially eligible for any scheme. Always
            verify the latest requirements with the relevant government
            source.
          </p>
        </div>
      </section>
    </main>
  );
}