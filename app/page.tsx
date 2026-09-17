"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { schemes } from "../data/schemes";

const categories = [
  {
    name: "Farmers",
    icon: "🌾",
    label: "Agriculture",
    description: "Farming, income & rural support",
    color: "emerald",
    href: "Farmers",
  },
  {
    name: "Students",
    icon: "🎓",
    label: "Education",
    description: "Scholarships & education support",
    color: "violet",
    href: "Students",
  },
  {
    name: "Healthcare",
    icon: "🏥",
    label: "Health",
    description: "Medical coverage & support",
    color: "blue",
    href: "Healthcare",
  },
  {
    name: "Business",
    icon: "💼",
    label: "Business",
    description: "Loans & entrepreneurship",
    color: "amber",
    href: "Business",
  },
  {
    name: "Women",
    icon: "👩",
    label: "Women",
    description: "Women & maternity benefits",
    color: "rose",
    href: "Women",
  },
  {
    name: "Insurance",
    icon: "🛡️",
    label: "Protection",
    description: "Life & accident protection",
    color: "cyan",
    href: "Insurance",
  },
];

const popularSlugs = [
  "pm-kisan",
  "ayushman-bharat",
  "pm-vishwakarma",
  "pm-awas-yojana",
  "pm-mudra-yojana",
  "sukanya-samriddhi",
];

const colorStyles: Record<
  string,
  {
    bg: string;
    icon: string;
    text: string;
    hover: string;
  }
> = {
  emerald: {
    bg: "bg-emerald-50",
    icon: "bg-emerald-100",
    text: "text-emerald-700",
    hover: "group-hover:bg-emerald-100",
  },
  violet: {
    bg: "bg-violet-50",
    icon: "bg-violet-100",
    text: "text-violet-700",
    hover: "group-hover:bg-violet-100",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "bg-blue-100",
    text: "text-blue-700",
    hover: "group-hover:bg-blue-100",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "bg-amber-100",
    text: "text-amber-700",
    hover: "group-hover:bg-amber-100",
  },
  rose: {
    bg: "bg-rose-50",
    icon: "bg-rose-100",
    text: "text-rose-700",
    hover: "group-hover:bg-rose-100",
  },
  cyan: {
    bg: "bg-cyan-50",
    icon: "bg-cyan-100",
    text: "text-cyan-700",
    hover: "group-hover:bg-cyan-100",
  },
};

export default function HomePage() {
  const [search, setSearch] = useState("");

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return schemes
      .filter((scheme) => {
        const searchableText = [
          scheme.name,
          scheme.slug,
          scheme.category,
          scheme.shortDescription,
          scheme.description,
          ...scheme.occupations,
          ...scheme.keywords,
          ...scheme.benefits,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .slice(0, 6);
  }, [search]);

  const popularSchemes = popularSlugs
    .map((slug) => schemes.find((scheme) => scheme.slug === slug))
    .filter((scheme) => scheme !== undefined);

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#07152f]">

        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-blue-600/25 blur-[100px]" />
          <div className="absolute right-[-5%] top-[10%] h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[100px]" />
          <div className="absolute bottom-[-25%] left-[40%] h-[400px] w-[400px] rounded-full bg-amber-400/10 blur-[100px]" />

          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:45px_45px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">

            {/* HERO COPY */}
            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
                <span>🇮🇳</span>
                India's simple scheme discovery guide
              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[70px]">
                Government benefits
                <span className="block bg-gradient-to-r from-blue-300 via-white to-amber-300 bg-clip-text text-transparent">
                  made easier to discover.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Find schemes that may match your needs. Understand benefits,
                eligibility and documents in simple language.
              </p>

              {/* Search */}
              <div className="relative z-50 mt-8 max-w-2xl">

                <div className="relative rounded-2xl bg-white p-1.5 shadow-2xl shadow-black/30">

                  <Search className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search a scheme, benefit or need..."
                    className="h-14 w-full rounded-xl bg-white pl-14 pr-5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                  />

                  <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-400 sm:block">
                    Search
                  </div>
                </div>

                {/* Results */}
                {search.trim() && (
                  <div className="absolute left-0 right-0 top-[70px] overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-2xl">

                    {searchResults.length > 0 ? (
                      <>
                        <div className="border-b border-slate-100 px-5 py-3">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Matching schemes
                          </p>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto">
                          {searchResults.map((scheme) => (
                            <div
                              key={scheme.slug}
                              className="border-b border-slate-100 p-4 last:border-0 hover:bg-blue-50/50"
                            >
                              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="font-bold text-slate-900">
                                      {scheme.name}
                                    </h3>

                                    <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-700">
                                      {scheme.category}
                                    </span>
                                  </div>

                                  <p className="mt-1 text-sm text-slate-500">
                                    {scheme.shortDescription}
                                  </p>
                                </div>

                                <div className="flex shrink-0 gap-2">
                                  <Link
                                    href={`/schemes/${scheme.slug}`}
                                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700"
                                  >
                                    Details
                                  </Link>

                                  <Link
                                    href={`/explainers/${scheme.slug}`}
                                    className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white"
                                  >
                                    Explain
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Link
                          href={`/schemes?search=${encodeURIComponent(search)}`}
                          className="block border-t bg-slate-50 p-3 text-center text-sm font-bold text-blue-700"
                        >
                          See all matching schemes →
                        </Link>
                      </>
                    ) : (
                      <div className="p-8 text-center">
                        <Search className="mx-auto h-7 w-7 text-slate-300" />

                        <h3 className="mt-3 font-bold text-slate-900">
                          No matching scheme found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Try farmer, student, pension, housing or business.
                        </p>

                        <Link
                          href="/schemes"
                          className="mt-4 inline-flex rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white"
                        >
                          Browse all schemes
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                <Link
                  href="/schemes"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-400"
                >
                  Explore Schemes
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/eligibility"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-amber-950/20 transition hover:-translate-y-0.5 hover:bg-amber-300"
                >
                  Find Schemes for Me
                  <Sparkles className="h-4 w-4" />
                </Link>

              </div>

              {/* Mini trust */}
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" />
                  Simple language
                </span>

                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" />
                  Free to explore
                </span>

                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" />
                  Official sources
                </span>
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="relative hidden min-h-[500px] lg:block">

              {/* Large card */}
              <div className="absolute left-2 top-16 w-[390px] rotate-[-4deg] rounded-[30px] border border-white/10 bg-white p-6 shadow-2xl shadow-black/30">

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
                      🌾
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400">
                        Popular scheme
                      </p>

                      <p className="font-black text-slate-950">
                        PM-KISAN
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    Agriculture
                  </span>
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 p-5">

                  <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                    Understand simply
                  </p>

                  <h3 className="mt-2 text-xl font-black text-slate-950">
                    Financial support for eligible farmers.
                  </h3>

                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-white p-3">
                      <p className="text-[11px] text-slate-400">
                        Category
                      </p>
                      <p className="mt-1 text-sm font-bold">
                        Agriculture
                      </p>
                    </div>

                    <div className="rounded-xl bg-white p-3">
                      <p className="text-[11px] text-slate-400">
                        Verify
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-sm font-bold text-emerald-600">
                        <ShieldCheck className="h-4 w-4" />
                        Official
                      </p>
                    </div>

                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Find • Understand • Verify
                  </span>

                  <span className="flex items-center gap-1 text-sm font-bold text-blue-600">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>

              {/* Profile card */}
              <div className="absolute right-0 top-0 w-64 rounded-3xl border border-white/20 bg-white p-5 shadow-2xl">

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Smart discovery
                    </p>

                    <p className="font-black text-slate-950">
                      For your profile
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  {["Age", "Occupation", "Income", "State"].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3"
                    >
                      <span className="text-xs font-semibold text-slate-500">
                        {item}
                      </span>

                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </div>
                  ))}
                </div>

              </div>

              {/* Floating verification */}
              <div className="absolute bottom-12 right-3 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <p className="text-xs font-black text-slate-900">
                    Verify before applying
                  </p>

                  <p className="text-[11px] text-slate-500">
                    Official source matters
                  </p>
                </div>

              </div>

              <div className="absolute bottom-0 left-4 h-24 w-24 rounded-full bg-amber-400/20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORY DISCOVERY
      ========================================================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                Explore by need
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Where do you need support?
              </h2>
            </div>

            <Link
              href="/schemes"
              className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-blue-600"
            >
              See all
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">

            {categories.map((category) => {
              const style = colorStyles[category.color];

              return (
                <Link
                  key={category.name}
                  href={`/schemes?category=${encodeURIComponent(category.href)}`}
                  className="group rounded-2xl border border-slate-100 p-4 transition duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-lg"
                >

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.icon} text-2xl transition ${style.hover}`}
                  >
                    {category.icon}
                  </div>

                  <p className="mt-4 text-[11px] font-black uppercase tracking-wider text-slate-400">
                    {category.label}
                  </p>

                  <h3 className="mt-1 font-black text-slate-900">
                    {category.name}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                    {category.description}
                  </p>

                  <div className={`mt-3 text-xs font-bold ${style.text}`}>
                    Explore →
                  </div>

                </Link>
              );
            })}

          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED SCHEME
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="mb-8 flex items-end justify-between">

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-600">
              Featured
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              A closer look at popular schemes.
            </h2>
          </div>

          <Link
            href="/schemes"
            className="hidden items-center gap-1 text-sm font-bold text-blue-600 sm:flex"
          >
            Browse all
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

        {popularSchemes[0] && (
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-700 p-7 shadow-2xl shadow-blue-200 sm:p-10">

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_350px] lg:items-center">

              <div>

                <div className="flex items-center gap-3">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">
                    🌾
                  </div>

                  <div>
                    <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-slate-950">
                      FEATURED SCHEME
                    </span>

                    <p className="mt-2 text-sm font-semibold text-blue-100">
                      {popularSchemes[0].category}
                    </p>
                  </div>

                </div>

                <h3 className="mt-7 max-w-2xl text-3xl font-black text-white sm:text-5xl">
                  {popularSchemes[0].name}
                </h3>

                <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100">
                  {popularSchemes[0].shortDescription}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                  <Link
                    href={`/schemes/${popularSchemes[0].slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-blue-700 transition hover:bg-blue-50"
                  >
                    Understand this scheme
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href={`/explainers/${popularSchemes[0].slug}`}
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    Read explanation
                  </Link>

                </div>

              </div>

              {/* Highlight panel */}
              <div className="rounded-3xl bg-white/10 p-3 backdrop-blur">

                <div className="rounded-2xl bg-white p-5">

                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    At a glance
                  </p>

                  <div className="mt-5 space-y-3">

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">
                        Category
                      </p>

                      <p className="mt-1 font-black text-slate-900">
                        {popularSchemes[0].category}
                      </p>
                    </div>

                    <div className="rounded-xl bg-emerald-50 p-4">
                      <p className="text-xs text-emerald-600">
                        Information
                      </p>

                      <p className="mt-1 flex items-center gap-1.5 font-black text-emerald-700">
                        <ShieldCheck className="h-4 w-4" />
                        Reviewed
                      </p>
                    </div>

                    <div className="rounded-xl bg-amber-50 p-4">
                      <p className="text-xs text-amber-600">
                        Last reviewed
                      </p>

                      <p className="mt-1 font-black text-amber-800">
                        {popularSchemes[0].lastVerified}
                      </p>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        )}
      </section>

      {/* =========================================================
          POPULAR SCHEMES STRIP
      ========================================================= */}
      <section className="border-y border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between">

            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                More to explore
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                Popular schemes
              </h2>
            </div>

            <Link
              href="/schemes"
              className="flex items-center gap-1 text-sm font-bold text-blue-600"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">

            {popularSchemes.slice(1).map((scheme, index) => (
              <Link
                key={scheme.slug}
                href={`/schemes/${scheme.slug}`}
                className="group flex min-h-[190px] flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl"
              >

                <div className="flex items-center justify-between">

                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-blue-700 shadow-sm">
                    {scheme.category}
                  </span>

                  <span className="text-xs font-black text-slate-300">
                    {String(index + 2).padStart(2, "0")}
                  </span>

                </div>

                <h3 className="mt-5 text-lg font-black text-slate-950 transition group-hover:text-blue-700">
                  {scheme.name}
                </h3>

                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-slate-500">
                  {scheme.shortDescription}
                </p>

                <div className="mt-4 flex items-center justify-between">

                  <span className="text-xs text-slate-400">
                    Reviewed {scheme.lastVerified}
                  </span>

                  <span className="flex items-center gap-1 text-sm font-bold text-blue-600">
                    Explore
                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>

                </div>

              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* =========================================================
          ELIGIBILITY TOOL
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-[32px] bg-[#101b35] p-7 sm:p-10 lg:p-12">

          <div className="absolute right-[-80px] top-[-80px] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-[-100px] left-[25%] h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300">
                <Sparkles className="h-4 w-4" />
                Eligibility checker
              </div>

              <h2 className="mt-5 max-w-2xl text-3xl font-black text-white sm:text-5xl">
                Maybe there's a scheme
                <span className="text-amber-300"> for you.</span>
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-slate-300">
                Answer a few simple questions about yourself and discover
                schemes that may match your profile.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {["Age", "Occupation", "Income", "State"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Link
                href="/eligibility"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-amber-300"
              >
                Start Eligibility Check
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur">

              <div className="rounded-2xl bg-white p-5">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Your profile
                    </p>

                    <p className="mt-1 font-black text-slate-900">
                      Find possible matches
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </div>

                <div className="mt-5 space-y-2.5">

                  {["Age", "Occupation", "Annual income", "State"].map(
                    (item, index) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3.5"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-black text-slate-400 shadow-sm">
                            {index + 1}
                          </span>

                          <span className="text-sm font-semibold text-slate-600">
                            {item}
                          </span>
                        </div>

                        <ChevronRight className="h-4 w-4 text-slate-300" />
                      </div>
                    )
                  )}

                </div>

                <div className="mt-5 rounded-xl bg-blue-600 py-3.5 text-center text-sm font-black text-white">
                  Find Possible Matches
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

        <div className="text-center">

          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
            Simple process
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            From confusion to clarity.
          </h2>

        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">

          {[
            {
              number: "01",
              icon: "🔎",
              title: "Find",
              text: "Discover schemes based on your needs, category or profile.",
              bg: "bg-blue-50",
            },
            {
              number: "02",
              icon: "🧠",
              title: "Understand",
              text: "See benefits, eligibility and documents explained simply.",
              bg: "bg-violet-50",
            },
            {
              number: "03",
              icon: "🛡️",
              title: "Verify",
              text: "Use the relevant official government source before applying.",
              bg: "bg-emerald-50",
            },
          ].map((step) => (
            <div
              key={step.number}
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex items-center justify-between">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${step.bg} text-2xl`}
                >
                  {step.icon}
                </div>

                <span className="text-sm font-black text-slate-200">
                  {step.number}
                </span>

              </div>

              <h3 className="mt-7 text-xl font-black text-slate-950">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {step.text}
              </p>

            </div>
          ))}

        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-6 py-14 text-center shadow-2xl shadow-blue-200 sm:px-12">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl">
            🇮🇳
          </div>

          <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl">
            Your next scheme is waiting to be discovered.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Explore government schemes in simple language and find the
            information you need to take your next step.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/schemes"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-blue-700 hover:bg-blue-50"
            >
              Explore Schemes
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/eligibility"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-black text-white hover:bg-white/20"
            >
              Check Eligibility
              <Sparkles className="h-4 w-4" />
            </Link>

          </div>
        </div>
      </section>

      {/* =========================================================
          DISCLAIMER
      ========================================================= */}
      <section className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-4xl px-4 py-8 text-center sm:px-6">

          <p className="text-xs leading-5 text-slate-500">
            <strong className="text-slate-700">Important:</strong>{" "}
            SchemeSamjho is an independent informational platform and is not
            affiliated with the Government of India or any state government.
            Eligibility results are preliminary and are not official
            government decisions. Scheme information can change, so always
            verify the latest details through the relevant official source.
          </p>

        </div>
      </section>

    </main>
  );
}