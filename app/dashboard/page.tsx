"use client";

import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import { schemes } from "../../data/schemes";
import { useSavedSchemes } from "../../lib/useSavedSchemes";

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const {
    savedSchemes,
    loading: loadingSaved,
    removeScheme,
  } = useSavedSchemes();

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2
            size={28}
            className="animate-spin text-blue-600"
          />
        </div>
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
            <ShieldCheck
              size={40}
              className="mx-auto text-blue-600"
            />

            <h1 className="mt-6 text-3xl font-black text-gray-950">
              Sign in to access your dashboard
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-600">
              Your dashboard contains your saved schemes and
              account shortcuts.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              Go to Homepage
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const firstName =
    user?.firstName ||
    user?.username ||
    "there";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-blue-200">
              <ShieldCheck size={15} />
              My SchemeSamjho
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              Welcome back,{" "}
              <span className="text-blue-400">
                {firstName}.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300">
              Find government schemes, check your basic
              eligibility, and keep useful schemes saved in
              one place.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="mb-7">
          <p className="text-sm font-semibold text-blue-600">
            Your account
          </p>

          <h2 className="mt-1 text-2xl font-black text-gray-950">
            Overview
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {/* Saved Schemes */}
          <Link
            href="/saved"
            className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Bookmark size={24} />
              </div>

              <ArrowRight
                size={18}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
              />
            </div>

            <p className="mt-5 text-sm font-medium text-gray-500">
              Saved Schemes
            </p>

            <p className="mt-1 text-xl font-black text-gray-950">
              {loadingSaved
                ? "Loading..."
                : savedSchemes.length === 0
                  ? "No schemes yet"
                  : `${savedSchemes.length} ${
                      savedSchemes.length === 1
                        ? "scheme"
                        : "schemes"
                    } saved`}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              View your collection
            </p>
          </Link>

          {/* Eligibility */}
          <Link
            href="/eligibility"
            className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={24} />
              </div>

              <ArrowRight
                size={18}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-emerald-600"
              />
            </div>

            <p className="mt-5 text-sm font-medium text-gray-500">
              Eligibility
            </p>

            <p className="mt-1 text-xl font-black text-gray-950">
              Check your profile
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Get a preliminary screening
            </p>
          </Link>

          {/* Account */}
          <Link
            href="/account"
            className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <Settings size={24} />
              </div>

              <ArrowRight
                size={18}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-violet-600"
              />
            </div>

            <p className="mt-5 text-sm font-medium text-gray-500">
              Account
            </p>

            <p className="mt-1 text-xl font-black text-gray-950">
              Manage profile
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Manage your account
            </p>
          </Link>
        </div>
      </section>

      {/* Recently Saved */}
      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Your collection
            </p>

            <h2 className="mt-1 text-2xl font-black text-gray-950">
              Recently saved
            </h2>
          </div>

          <Link
            href="/saved"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {loadingSaved ? (
          <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="text-center">
              <Loader2
                size={28}
                className="mx-auto animate-spin text-blue-600"
              />

              <p className="mt-3 text-sm text-gray-500">
                Loading your saved schemes...
              </p>
            </div>
          </div>
        ) : savedSchemes.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Bookmark size={26} />
            </div>

            <h3 className="mt-5 text-xl font-black text-gray-950">
              No saved schemes yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
              Explore government schemes and save the ones you
              want to come back to later.
            </p>

            <Link
              href="/schemes"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              Explore Schemes
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {savedSchemes.slice(0, 3).map((saved) => {
              const scheme = schemes.find(
                (item) => item.slug === saved.slug
              );

              if (!scheme) return null;

              return (
                <article
                  key={scheme.slug}
                  className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="h-1.5 bg-gradient-to-r from-blue-600 via-violet-500 to-emerald-500" />

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                        {scheme.category}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeScheme(scheme.slug)
                        }
                        disabled={removingScheme(
                          savedSchemes,
                          scheme.slug
                        )}
                        title="Remove saved scheme"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <h3 className="mt-5 text-lg font-black leading-tight text-gray-950">
                      {scheme.name}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {scheme.shortDescription}
                    </p>

                    <div className="mt-5 flex gap-2">
                      <Link
                        href={`/schemes/${scheme.slug}`}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gray-950 px-3 py-3 text-xs font-bold text-white transition hover:bg-gray-800"
                      >
                        View Scheme
                        <ArrowRight size={14} />
                      </Link>

                      <a
                        href={scheme.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Official source"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-blue-600"
                      >
                        <ExternalLink size={15} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Continue Exploring */}
      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-6 lg:px-8">
        <div className="mb-7">
          <p className="text-sm font-semibold text-blue-600">
            Continue exploring
          </p>

          <h2 className="mt-1 text-2xl font-black text-gray-950">
            Find more useful schemes
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <DashboardCard
            href="/schemes"
            icon={<Search size={24} />}
            title="Explore Schemes"
            description="Browse government schemes by category, occupation and other filters."
          />

          <DashboardCard
            href="/eligibility"
            icon={<CheckCircle2 size={24} />}
            title="Check Eligibility"
            description="Answer a few questions to get a preliminary scheme screening."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 p-7 text-white sm:p-10">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black sm:text-3xl">
                Understand schemes before you apply.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">
                Compare benefits, understand eligibility and find
                official sources for more information.
              </p>
            </div>

            <Link
              href="/schemes"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
            >
              Browse Schemes
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 rounded-3xl bg-gray-50 p-6 sm:p-8 md:flex-row md:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <ShieldCheck size={24} />
            </div>

            <div>
              <h3 className="font-bold text-gray-950">
                Information, not official approval
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                SchemeSamjho provides simplified information and
                preliminary eligibility screening. Always verify
                current requirements with the relevant government
                source before applying.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function removingScheme(
  savedSchemes: { slug: string }[],
  slug: string
) {
  return !savedSchemes.some(
    (scheme) => scheme.slug === slug
  );
}

function DashboardCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-black text-gray-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-1 text-sm font-bold text-blue-600">
        Open
        <ArrowRight
          size={15}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}