"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
            <AlertTriangle size={30} />
          </div>

          <p className="mt-7 text-sm font-bold uppercase tracking-wider text-blue-300">
            Something went wrong
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            We couldn't load this page
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-300">
            Something unexpected happened. You can try loading the
            page again or return to SchemeSamjho.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
            >
              <RefreshCw size={17} />
              Try Again
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <ArrowLeft size={17} />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}