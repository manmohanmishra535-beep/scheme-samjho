import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Info,
  ShieldCheck,
  Users,
} from "lucide-react";

import FavoriteButton from "../../../Components/FavoriteButton";
import {
  getAllSchemes,
  getSchemeBySlug,
} from "../../../lib/schemes";

type SchemeDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const schemes = await getAllSchemes();

  return schemes.map((scheme) => ({
    slug: scheme.slug,
  }));
}

export async function generateMetadata({
  params,
}: SchemeDetailPageProps) {
  const { slug } = await params;
  const scheme = await getSchemeBySlug(slug);

  if (!scheme) {
    return {
      title: "Scheme Not Found",
    };
  }

  return {
    title: scheme.name,
    description: scheme.shortDescription,
    alternates: {
      canonical: `/schemes/${scheme.slug}`,
    },
  };
}

export default async function SchemeDetailPage({
  params,
}: SchemeDetailPageProps) {
  const { slug } = await params;

  const scheme = await getSchemeBySlug(slug);

  if (!scheme) {
    notFound();
  }

  const allSchemes = await getAllSchemes();

  const relatedSchemes = allSchemes
    .filter(
      (item) =>
        item.slug !== scheme.slug &&
        item.category === scheme.category
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-[#111827]">
      {/* HERO */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
          <Link
            href="/schemes"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to schemes
          </Link>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#2563EB]">
                {scheme.category}
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
                Last verified: {scheme.lastVerified}
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
                  {scheme.name}
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
                  {scheme.shortDescription}
                </p>
              </div>

              <FavoriteButton slug={scheme.slug} />
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/explainers/${scheme.slug}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
              >
                Understand This Scheme
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                Official Website
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:px-8 lg:grid-cols-[1fr_340px] lg:px-10">
          <main className="space-y-8">
            {/* ABOUT */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  <Info className="h-5 w-5 text-[#2563EB]" />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-[#111827]">
                    About this scheme
                  </h2>

                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
                    {scheme.description}
                  </p>
                </div>
              </div>
            </section>

            {/* BENEFITS */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-black text-[#111827]">
                Benefits
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {scheme.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex gap-3 rounded-xl border border-gray-200 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#16A34A]" />

                    <p className="text-sm leading-6 text-gray-700">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ELIGIBILITY */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
                  <Users className="h-5 w-5 text-[#16A34A]" />
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-black text-[#111827]">
                    Eligibility
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                    {scheme.eligibilitySummary}
                  </p>

                  {(scheme.minAge != null ||
                    scheme.maxAge != null) && (
                    <div className="mt-6 rounded-xl bg-gray-50 p-5">
                      <h3 className="text-sm font-bold text-[#111827]">
                        Age requirement
                      </h3>

                      <p className="mt-2 text-sm text-gray-600">
                        {scheme.minAge != null &&
                        scheme.maxAge != null
                          ? `${scheme.minAge} to ${scheme.maxAge} years`
                          : scheme.minAge != null
                          ? `${scheme.minAge} years or above`
                          : `Up to ${scheme.maxAge} years`}
                      </p>
                    </div>
                  )}

                  {scheme.maxIncome != null && (
                    <div className="mt-4 rounded-xl bg-gray-50 p-5">
                      <h3 className="text-sm font-bold text-[#111827]">
                        Income requirement
                      </h3>

                      <p className="mt-2 text-sm text-gray-600">
                        Maximum listed annual income:{" "}
                        <span className="font-bold text-[#111827]">
                          ₹
                          {scheme.maxIncome.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* OCCUPATIONS */}
            {scheme.occupations.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-black text-[#111827]">
                  Relevant occupations
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  {scheme.occupations.map((occupation) => (
                    <span
                      key={occupation}
                      className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700"
                    >
                      {occupation}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* DOCUMENTS */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  <FileText className="h-5 w-5 text-[#2563EB]" />
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-black text-[#111827]">
                    Documents you may need
                  </h2>

                  <ul className="mt-6 space-y-3">
                    {scheme.documents.map((document) => (
                      <li
                        key={document}
                        className="flex gap-3 text-sm leading-6 text-gray-700"
                      >
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#16A34A]" />
                        {document}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* EXCLUSIONS */}
            {scheme.exclusions.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-black text-[#111827]">
                  Important exclusions
                </h2>

                <ul className="mt-6 space-y-3">
                  {scheme.exclusions.map((exclusion) => (
                    <li
                      key={exclusion}
                      className="flex gap-3 text-sm leading-6 text-gray-700"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500" />
                      {exclusion}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* CTA */}
            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
              <h2 className="text-2xl font-black text-[#111827]">
                Not sure if you qualify?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                Use the SchemeSamjho eligibility checker for a
                preliminary comparison based on your basic
                details.
              </p>

              <Link
                href="/eligibility"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[#2563EB] px-5 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
              >
                Check My Eligibility
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </main>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black text-[#111827]">
                Quick information
              </h2>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Category
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#111827]">
                    {scheme.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Last verified
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#111827]">
                    {scheme.lastVerified}
                  </p>
                </div>

                {scheme.maxIncome != null && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      Income limit
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#111827]">
                      ₹
                      {scheme.maxIncome.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                )}
              </div>

              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                Visit Official Source
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* RELATED */}
            {relatedSchemes.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-black text-[#111827]">
                  Related schemes
                </h2>

                <div className="mt-5 space-y-4">
                  {relatedSchemes.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/schemes/${related.slug}`}
                      className="group block rounded-xl border border-gray-200 p-4 transition hover:border-blue-200"
                    >
                      <p className="text-sm font-bold leading-5 text-[#111827] group-hover:text-[#2563EB]">
                        {related.name}
                      </p>

                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                        {related.shortDescription}
                      </p>

                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#2563EB]">
                        View scheme
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* DISCLAIMER */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-[#2563EB]">
                Important
              </p>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                SchemeSamjho is an independent information
                platform. Always verify the latest eligibility,
                documents and application requirements on the
                official government source.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}