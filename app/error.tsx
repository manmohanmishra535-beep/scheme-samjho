"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Home,
  RefreshCw,
  Search,
} from "lucide-react";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error("SchemeSamjho application error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#FFFFFF]">

      {/* Main error section */}
      <section className="bg-[#111827]">
        <div className="mx-auto flex min-h-[72vh] max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-10">

          <div className="w-full text-center">

            {/* Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#2563EB] text-[#FFFFFF]">
              <AlertTriangle size={36} />
            </div>

            {/* Error label */}
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-[#16A34A]">
              Something went wrong
            </p>

            {/* Heading */}
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#FFFFFF] sm:text-4xl lg:text-5xl">
              We could not load this page.
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#FFFFFF]/65 sm:text-lg">
              An unexpected error occurred while loading this
              page. You can try again or continue browsing
              SchemeSamjho.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() => {
                  reset();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#FFFFFF] hover:text-[#111827]"
              >
                <RefreshCw size={17} />
                Try again
              </button>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#FFFFFF]/25 px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#111827]"
              >
                <Home size={17} />
                Go to homepage
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* Helpful links */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">

          <div className="text-center">

            <p className="text-sm font-bold text-[#2563EB]">
              Continue browsing
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-[#111827] sm:text-3xl">
              Explore SchemeSamjho
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#111827]/60">
              You can continue to explore schemes, eligibility
              information and simple explainers.
            </p>

          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <QuickLink
              href="/schemes"
              title="Government Schemes"
              description="Browse available government schemes."
            />

            <QuickLink
              href="/eligibility"
              title="Eligibility"
              description="Explore schemes using the eligibility checker."
            />

            <QuickLink
              href="/explainers"
              title="Explainers"
              description="Understand schemes in simple language."
            />

            <QuickLink
              href="/compare"
              title="Compare"
              description="Compare two schemes side by side."
            />

          </div>

        </div>
      </section>

      {/* Bottom navigation */}
      <section className="border-t border-[#111827]/10 bg-[#111827]/5">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">

          <div>

            <p className="text-sm font-bold text-[#2563EB]">
              SchemeSamjho
            </p>

            <p className="mt-1 text-sm text-[#111827]/60">
              Government schemes explained simply.
            </p>

          </div>

          <div className="flex flex-wrap gap-5">

            <Link
              href="/schemes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#111827]/60 transition hover:text-[#2563EB]"
            >
              Schemes
              <Search size={15} />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition hover:text-[#111827]"
            >
              <ArrowLeft size={16} />
              Home
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Quick Link                                                                 */
/* -------------------------------------------------------------------------- */

function QuickLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-5 transition hover:-translate-y-1 hover:border-[#2563EB]/30"
    >

      <div className="flex items-center justify-between gap-4">

        <h3 className="text-base font-extrabold text-[#111827]">
          {title}
        </h3>

        <ArrowRight
          size={17}
          className="shrink-0 text-[#2563EB] transition-transform group-hover:translate-x-1"
        />

      </div>

      <p className="mt-2 text-sm leading-6 text-[#111827]/60">
        {description}
      </p>

    </Link>
  );
}