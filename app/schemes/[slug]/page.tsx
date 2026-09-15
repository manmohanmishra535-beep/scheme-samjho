import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";

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
      canonical: `https://schemesamjho.in/schemes/${scheme.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${scheme.name} — Eligibility, Benefits & Documents`,
      description: scheme.shortDescription,
      url: `https://schemesamjho.in/schemes/${scheme.slug}`,
      siteName: "SchemeSamjho",
    },
  };
}

function formatIncome(maxIncome?: number) {
  if (!maxIncome) {
    return "No simple income limit listed";
  }

  return `Up to ₹${maxIncome.toLocaleString("en-IN")} per year`;
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${scheme.name} — Eligibility, Benefits & Documents`,
    description: scheme.shortDescription,
    url: `https://schemesamjho.in/schemes/${scheme.slug}`,
    dateModified: scheme.lastVerified,
    publisher: {
      "@type": "Organization",
      name: "SchemeSamjho",
      url: "https://schemesamjho.in",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://schemesamjho.in/schemes/${scheme.slug}`,
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

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <section className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-gray-500">
              <Link
                href="/"
                className="transition hover:text-blue-600"
              >
                Home
              </Link>

              <span className="mx-2">/</span>

              <Link
                href="/schemes"
                className="transition hover:text-blue-600"
              >
                Schemes
              </Link>

              <span className="mx-2">/</span>

              <span className="text-gray-800">{scheme.name}</span>
            </nav>
          </div>
        </section>

        {/* Hero */}
        <section className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                    {scheme.category}
                  </span>

                  <span className="text-sm text-gray-500">
                    Last reviewed: {scheme.lastVerified}
                  </span>
                </div>

                <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  {scheme.name}
                </h1>

                <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
                  {scheme.shortDescription}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <FavoriteButton slug={scheme.slug} />

                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:border-blue-400 hover:text-blue-600"
                  >
                    Official Website ↗
                  </a>

                  <Link
                    href={`/explainers/${scheme.slug}`}
                    className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Read Simple Explainer
                  </Link>
                </div>
              </div>

              {/* Quick summary */}
              <div className="rounded-2xl border bg-gray-50 p-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Quick Summary
                </h2>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Age
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {formatAge(scheme.minAge, scheme.maxAge)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Income
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {formatIncome(scheme.maxIncome)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Occupations
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {formatOccupations(scheme.occupations)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Benefits
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {scheme.benefits.length} key benefits
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
            <div className="space-y-10">
              {/* About */}
              <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  About this scheme
                </h2>

                <p className="mt-4 leading-8 text-gray-600">
                  {scheme.description}
                </p>
              </section>

              {/* Benefits */}
              <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Key benefits
                </h2>

                <div className="mt-6 space-y-4">
                  {scheme.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-xl bg-gray-50 p-4"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                        ✓
                      </div>

                      <p className="leading-7 text-gray-700">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Eligibility */}
              <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Preliminary eligibility
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      These are general factors to help you understand whether
                      the scheme may apply to you.
                    </p>
                  </div>

                  <Link
                    href="/eligibility"
                    className="shrink-0 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                  >
                    Check My Eligibility
                  </Link>
                </div>

                <div className="mt-6 space-y-4">
                  {scheme.eligibilitySummary.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                    >
                      <span className="mt-1 text-blue-600">•</span>

                      <p className="leading-7 text-gray-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Documents */}
              <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Documents you may need
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Requirements can vary depending on the scheme and application
                  channel.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {scheme.documents.map((document, index) => (
                    <div
                      key={index}
                      className="rounded-xl border bg-gray-50 p-4"
                    >
                      <p className="text-sm font-medium text-gray-800">
                        {document}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Exclusions */}
              {scheme.exclusions && scheme.exclusions.length > 0 && (
                <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Important exclusions or conditions
                  </h2>

                  <div className="mt-5 space-y-3">
                    {scheme.exclusions.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <span className="font-bold text-amber-700">
                          !
                        </span>

                        <p className="leading-7 text-gray-700">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* How to proceed */}
              <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  How to proceed
                </h2>

                <div className="mt-6 space-y-5">
                  <div className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      1
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Review the eligibility
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Read the eligibility factors carefully and use our
                        preliminary checker if useful.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      2
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Prepare the required documents
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Keep the documents listed above ready, along with any
                        additional documents requested by the official portal.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      3
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Use the official source
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Applications, approvals and final eligibility decisions
                        are handled by the relevant government authority.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Visit Official Source ↗
                    </a>
                  </div>
                </div>
              </section>

              {/* Related topics */}
              {relatedSchemes.length > 0 && (
                <section>
                  <div className="mb-5">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Related schemes
                    </h2>

                    <p className="mt-2 text-gray-600">
                      You may also want to explore these schemes in the same
                      category.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-3">
                    {relatedSchemes.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/schemes/${related.slug}`}
                        className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                          {related.category}
                        </span>

                        <h3 className="mt-3 font-bold text-gray-900">
                          {related.name}
                        </h3>

                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                          {related.shortDescription}
                        </p>

                        <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                          View Scheme →
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              <div className="sticky top-6 space-y-5">
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                  <h2 className="font-bold text-gray-900">
                    Quick actions
                  </h2>

                  <div className="mt-4 space-y-3">
                    <Link
                      href="/eligibility"
                      className="block rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Check Eligibility
                    </Link>

                    <Link
                      href={`/explainers/${scheme.slug}`}
                      className="block rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-800 transition hover:border-blue-400 hover:text-blue-600"
                    >
                      Read Explainer
                    </Link>

                    <Link
                      href="/compare"
                      className="block rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-800 transition hover:border-blue-400 hover:text-blue-600"
                    >
                      Compare Schemes
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Official source
                  </p>

                  <h2 className="mt-2 font-bold text-gray-900">
                    Verify before applying
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Government rules, eligibility and application processes can
                    change. Always verify the latest information on the official
                    source.
                  </p>

                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Open official source ↗
                  </a>
                </div>

                <div className="rounded-2xl border bg-gray-100 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Last reviewed
                  </p>

                  <p className="mt-2 font-semibold text-gray-900">
                    {scheme.lastVerified}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    This date indicates when SchemeSamjho last reviewed the
                    information in its database.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="font-bold text-gray-900">
                Important disclaimer
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-700">
                SchemeSamjho is an independent information platform and is not
                affiliated with the Government of India or any government
                department. The information on this page is for general
                guidance only. Our eligibility information and checker are
                preliminary and do not guarantee eligibility, approval or
                benefits. Always verify the latest rules and application
                requirements with the relevant official government source.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Want to find other schemes?
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Explore more government schemes or use the preliminary eligibility
              checker to discover schemes that may be relevant to you.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/schemes"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Schemes
              </Link>

              <Link
                href="/eligibility"
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:border-blue-400 hover:text-blue-600"
              >
                Check Eligibility
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}