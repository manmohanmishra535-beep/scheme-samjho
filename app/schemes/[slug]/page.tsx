import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  ExternalLink,
  FileText,
  Heart,
  Info,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { schemes } from "../../../data/schemes";
import FavoriteButton from "../../../Components/FavoriteButton";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return schemes.map((scheme) => ({
    slug: scheme.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const scheme = schemes.find((item) => item.slug === slug);

  if (!scheme) {
    return {
      title: "Scheme Not Found | SchemeSamjho",
      description: "The requested government scheme could not be found.",
    };
  }

  const canonicalUrl = `https://schemesamjho.in/schemes/${scheme.slug}`;

  return {
    title: `${scheme.name} — Eligibility, Benefits & Documents`,
    description: `${scheme.shortDescription} Learn about eligibility, benefits, documents and how to proceed.`,
    keywords: [
      scheme.name,
      "government scheme",
      "government scheme eligibility",
      "government scheme benefits",
      "government scheme documents",
      "government schemes India",
      "sarkari yojana",
      ...scheme.keywords,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title: `${scheme.name} — Eligibility, Benefits & Documents`,
      description: scheme.shortDescription,
      url: canonicalUrl,
      siteName: "SchemeSamjho",
    },
  };
}

function formatIncome(maxIncome?: number) {
  if (!maxIncome) {
    return "No simple income limit listed";
  }

  return `Up to ₹${maxIncome.toLocaleString("en-IN")} / year`;
}

function formatAge(minAge?: number, maxAge?: number) {
  if (minAge && maxAge) {
    return `${minAge}–${maxAge} years`;
  }

  if (minAge) {
    return `${minAge}+ years`;
  }

  if (maxAge) {
    return `Up to ${maxAge} years`;
  }

  return "Depends on scheme rules";
}

function formatOccupations(occupations: string[]) {
  if (occupations.length === 0) {
    return "Depends on scheme rules";
  }

  return occupations.join(", ");
}

export default async function SchemePage({ params }: PageProps) {
  const { slug } = await params;

  const scheme = schemes.find((item) => item.slug === slug);

  if (!scheme) {
    notFound();
  }

  const canonicalUrl = `https://schemesamjho.in/schemes/${scheme.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${scheme.name} — Eligibility, Benefits & Documents`,
    description: scheme.shortDescription,
    url: canonicalUrl,
    dateModified: scheme.lastVerified,
    publisher: {
      "@type": "Organization",
      name: "SchemeSamjho",
      url: "https://schemesamjho.in",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  const relatedSchemes = schemes
    .filter(
      (item) =>
        item.slug !== scheme.slug && item.category === scheme.category
    )
    .slice(0, 3);

  return (
    <>
      <Script
        id={`scheme-structured-data-${scheme.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="min-h-screen bg-[#f7f9fc] text-slate-950">

        {/* =====================================================
            BREADCRUMB
        ===================================================== */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 overflow-hidden text-sm">
              <Link
                href="/"
                className="shrink-0 font-medium text-slate-400 transition hover:text-blue-600"
              >
                Home
              </Link>

              <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />

              <Link
                href="/schemes"
                className="shrink-0 font-medium text-slate-400 transition hover:text-blue-600"
              >
                Schemes
              </Link>

              <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />

              <span className="truncate font-semibold text-slate-700">
                {scheme.name}
              </span>
            </nav>
          </div>
        </div>

        {/* =====================================================
            HERO
        ===================================================== */}
        <section className="relative overflow-hidden bg-[#091733]">

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="absolute bottom-[-150px] left-1/3 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

            <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">

              {/* Hero content */}
              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <span className="rounded-full bg-blue-500/15 px-4 py-2 text-xs font-black uppercase tracking-wider text-blue-300">
                    {scheme.category}
                  </span>

                  <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Reviewed {scheme.lastVerified}
                  </span>

                </div>

                <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {scheme.name}
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
                  {scheme.shortDescription}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">

                  <FavoriteButton slug={scheme.slug} />

                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Official Source
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  <Link
                    href={`/explainers/${scheme.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-50"
                  >
                    Simple Explainer
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                </div>

              </div>

              {/* Hero summary card */}
              <div className="rounded-[28px] border border-white/10 bg-white/10 p-2 shadow-2xl backdrop-blur">

                <div className="rounded-[22px] bg-white p-6">

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Scheme at a glance
                      </p>

                      <p className="mt-1 text-lg font-black text-slate-950">
                        Quick information
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Age
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        {formatAge(scheme.minAge, scheme.maxAge)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-blue-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-blue-500">
                        Income
                      </p>

                      <p className="mt-1 font-bold text-blue-900">
                        {formatIncome(scheme.maxIncome)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-emerald-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">
                        Benefits
                      </p>

                      <p className="mt-1 font-bold text-emerald-900">
                        {scheme.benefits.length} key benefits
                      </p>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            QUICK FACTS
        ===================================================== */}
        <section className="relative z-10 mx-auto -mt-7 max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 sm:grid-cols-2 lg:grid-cols-4">

            <div className="border-b p-5 sm:border-r lg:border-b-0">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-400">
                    Who may qualify
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {formatOccupations(scheme.occupations)}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b p-5 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                  <Heart className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-400">
                    Benefits
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {scheme.benefits.length} listed benefits
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b p-5 sm:border-r lg:border-b-0">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
                  <FileText className="h-5 w-5 text-violet-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-400">
                    Documents
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {scheme.documents.length} listed documents
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                  <Clock3 className="h-5 w-5 text-amber-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-400">
                    Information
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    Reviewed {scheme.lastVerified}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[1fr_310px]">

            {/* MAIN COLUMN */}
            <div className="space-y-8">

              {/* About */}
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
                    <Info className="h-5 w-5 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                      Understand the scheme
                    </p>

                    <h2 className="mt-1 text-2xl font-black text-slate-950">
                      What is this scheme?
                    </h2>
                  </div>

                </div>

                <p className="mt-6 text-base leading-8 text-slate-600">
                  {scheme.description}
                </p>

              </section>

              {/* Benefits */}
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-emerald-600">
                    What you may receive
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-slate-950">
                    Key benefits
                  </h2>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">

                  {scheme.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:border-emerald-200 hover:bg-emerald-50/40"
                    >

                      <div className="flex gap-4">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                          <Check className="h-5 w-5" />
                        </div>

                        <p className="text-sm font-semibold leading-6 text-slate-700">
                          {benefit}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

              </section>

              {/* Eligibility */}
              <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                        Before you apply
                      </p>

                      <h2 className="mt-1 text-2xl font-black text-slate-950">
                        Preliminary eligibility
                      </h2>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                        These factors can help you understand whether the
                        scheme may be relevant to you.
                      </p>
                    </div>

                    <Link
                      href="/eligibility"
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                    >
                      Check My Eligibility
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                  </div>

                </div>

                <div className="p-6 sm:p-8">

                  <div className="space-y-3">

                    {scheme.eligibilitySummary.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                      >

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-black text-blue-700">
                          {index + 1}
                        </div>

                        <p className="text-sm leading-7 text-slate-700">
                          {item}
                        </p>

                      </div>
                    ))}

                  </div>

                  <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">

                    <div className="flex gap-3">

                      <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                      <p className="text-xs leading-5 text-amber-900">
                        This is a preliminary guide only. Final eligibility is
                        determined according to the applicable official scheme
                        rules and government authority.
                      </p>

                    </div>

                  </div>

                </div>

              </section>

              {/* Documents */}
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
                    <FileText className="h-5 w-5 text-violet-600" />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-violet-600">
                      Prepare ahead
                    </p>

                    <h2 className="mt-1 text-2xl font-black text-slate-950">
                      Documents you may need
                    </h2>
                  </div>

                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Requirements can vary depending on the scheme and application
                  channel.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">

                  {scheme.documents.map((document, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-violet-200"
                    >

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                        <FileText className="h-4 w-4 text-violet-600" />
                      </div>

                      <p className="text-sm font-semibold text-slate-700">
                        {document}
                      </p>

                    </div>
                  ))}

                </div>

              </section>

              {/* Exclusions */}
              {scheme.exclusions && scheme.exclusions.length > 0 && (
                <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">

                  <div className="flex gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100">
                      <Info className="h-5 w-5 text-amber-700" />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-amber-700">
                        Important
                      </p>

                      <h2 className="mt-1 text-2xl font-black text-slate-950">
                        Exclusions & conditions
                      </h2>
                    </div>

                  </div>

                  <div className="mt-6 space-y-3">

                    {scheme.exclusions.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-3 rounded-2xl bg-white/70 p-4"
                      >
                        <span className="font-black text-amber-700">!</span>

                        <p className="text-sm leading-6 text-slate-700">
                          {item}
                        </p>
                      </div>
                    ))}

                  </div>

                </section>
              )}

              {/* Application journey */}
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                  Next steps
                </p>

                <h2 className="mt-1 text-2xl font-black text-slate-950">
                  How to proceed
                </h2>

                <div className="relative mt-8">

                  <div className="absolute left-[18px] top-4 hidden h-[calc(100%-40px)] w-px bg-slate-200 sm:block" />

                  <div className="space-y-7">

                    {[
                      {
                        number: "01",
                        title: "Review the eligibility",
                        description:
                          "Read the eligibility factors carefully and use the preliminary checker if useful.",
                      },
                      {
                        number: "02",
                        title: "Prepare your documents",
                        description:
                          "Keep the listed documents ready and check whether the official portal asks for anything additional.",
                      },
                      {
                        number: "03",
                        title: "Visit the official source",
                        description:
                          "Use the relevant government website or authority for the actual application process.",
                      },
                    ].map((step) => (
                      <div
                        key={step.number}
                        className="relative flex gap-5"
                      >

                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white shadow-lg shadow-blue-200">
                          {step.number}
                        </div>

                        <div className="pt-1">

                          <h3 className="font-black text-slate-900">
                            {step.title}
                          </h3>

                          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                            {step.description}
                          </p>

                        </div>

                      </div>
                    ))}

                  </div>

                </div>

                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                >
                  Visit Official Source
                  <ExternalLink className="h-4 w-4" />
                </a>

              </section>

              {/* Related */}
              {relatedSchemes.length > 0 && (
                <section>

                  <div className="mb-6">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Keep exploring
                    </p>

                    <h2 className="mt-1 text-2xl font-black text-slate-950">
                      Related schemes
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Other schemes in the same category.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">

                    {relatedSchemes.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/schemes/${related.slug}`}
                        className="group rounded-3xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                      >

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-700">
                          {related.category}
                        </span>

                        <h3 className="mt-5 font-black leading-6 text-slate-900 transition group-hover:text-blue-700">
                          {related.name}
                        </h3>

                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                          {related.shortDescription}
                        </p>

                        <div className="mt-5 flex items-center gap-1 text-sm font-bold text-blue-600">
                          View Scheme
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </div>

                      </Link>
                    ))}

                  </div>

                </section>
              )}

            </div>

            {/* =================================================
                SIDEBAR
            ================================================= */}
            <aside>

              <div className="sticky top-24 space-y-5">

                {/* Action card */}
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/40">

                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Take the next step
                  </p>

                  <h2 className="mt-2 text-xl font-black text-slate-950">
                    What would you like to do?
                  </h2>

                  <div className="mt-5 space-y-3">

                    <Link
                      href="/eligibility"
                      className="flex items-center justify-between rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-black text-white transition hover:bg-blue-700"
                    >
                      Check Eligibility
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href={`/explainers/${scheme.slug}`}
                      className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
                    >
                      Read Simple Explainer
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href="/compare"
                      className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
                    >
                      Compare Schemes
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                  </div>

                </div>

                {/* Official source */}
                <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  </div>

                  <h2 className="mt-4 font-black text-slate-950">
                    Verify before applying
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Rules and application requirements can change. Always
                    verify the latest information with the official source.
                  </p>

                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-black text-emerald-700"
                  >
                    Open official source
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                </div>

                {/* Reviewed card */}
                <div className="rounded-3xl border border-slate-200 bg-white p-5">

                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    SchemeSamjho information
                  </p>

                  <div className="mt-4 flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                      <Clock3 className="h-5 w-5 text-blue-600" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Last reviewed
                      </p>

                      <p className="text-sm font-black text-slate-900">
                        {scheme.lastVerified}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </aside>

          </div>
        </section>

        {/* =====================================================
            DISCLAIMER
        ===================================================== */}
        <section className="border-t border-slate-200 bg-white">

          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-7">

              <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                  <Info className="h-5 w-5 text-amber-700" />
                </div>

                <div>

                  <h2 className="font-black text-slate-900">
                    Important disclaimer
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    SchemeSamjho is an independent information platform and
                    is not affiliated with the Government of India or any
                    government department. Information on this page is for
                    general guidance only. Eligibility information and the
                    checker are preliminary and do not guarantee eligibility,
                    approval or benefits. Always verify the latest rules and
                    application requirements with the relevant official
                    government source.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}
        <section className="bg-[#f7f9fc] px-4 py-16 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-center shadow-2xl shadow-blue-200 sm:p-12">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl">
              🇮🇳
            </div>

            <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
              Explore more government schemes
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
              Discover other schemes, compare options and use the preliminary
              eligibility checker to find schemes that may be relevant to you.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/schemes"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-blue-700 transition hover:bg-blue-50"
              >
                Explore Schemes
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/eligibility"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/20"
              >
                Check Eligibility
                <Sparkles className="h-4 w-4" />
              </Link>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}