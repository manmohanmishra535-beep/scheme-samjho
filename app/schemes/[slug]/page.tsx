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
} from "lucide-react";

import {
  getAllSchemes,
  getSchemeBySlug,
} from "../../../lib/schemes";

import FavoriteButton from "../../../Components/FavoriteButton";

type SchemeDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: SchemeDetailPageProps) {
  const { slug } = await params;

  const scheme =
    await getSchemeBySlug(slug);

  if (!scheme) {
    return {
      title:
        "Scheme Not Found | SchemeSamjho",
      description:
        "The requested government scheme could not be found.",
    };
  }

  return {
    title: `${scheme.name} — Eligibility, Benefits & Documents`,
    description:
      scheme.shortDescription,
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function SchemeDetailPage({
  params,
}: SchemeDetailPageProps) {
  const { slug } = await params;

  /*
   * IMPORTANT:
   * This comes from Supabase through getSchemeBySlug().
   *
   * Only published schemes are returned by the loader.
   */
  const scheme =
    await getSchemeBySlug(slug);

  if (!scheme) {
    notFound();
  }

  /*
   * Load published schemes for related schemes.
   */
  const allSchemes =
    await getAllSchemes();

  const relatedSchemes =
    allSchemes
      .filter(
        (item) =>
          item.slug !== scheme.slug &&
          item.category === scheme.category
      )
      .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#111827]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/60">
            <Link
              href="/schemes"
              className="transition hover:text-white"
            >
              Schemes
            </Link>

            <span>/</span>

            <span className="text-white/85">
              {scheme.name}
            </span>
          </div>

          {/* Category */}
          <div className="mt-7">
            <span className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white">
              {scheme.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {scheme.name}
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/70 sm:text-lg">
            {scheme.shortDescription}
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <FavoriteButton
              slug={scheme.slug}
            />

            <a
              href={scheme.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#111827]"
            >
              Official source
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1fr_320px] lg:px-10">
          {/* =================================================
              ARTICLE
          ================================================= */}

          <article className="min-w-0">
            {/* Intro */}
            <div className="rounded-2xl border border-[#111827]/10 bg-white p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/10">
                  <Info className="h-5 w-5 text-[#2563EB]" />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#2563EB]">
                    In simple words
                  </p>

                  <p className="mt-2 text-base leading-7 text-[#111827]/70">
                    {scheme.description}
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                ABOUT
            ================================================= */}

            <section className="mt-10">
              <SectionHeading>
                About {scheme.name}
              </SectionHeading>

              <div className="mt-4 space-y-4">
                {scheme.description
                  .split("\n")
                  .filter(Boolean)
                  .map(
                    (
                      paragraph,
                      index
                    ) => (
                      <p
                        key={`${scheme.slug}-description-${index}`}
                        className="text-base leading-8 text-[#111827]/70"
                      >
                        {paragraph}
                      </p>
                    )
                  )}
              </div>
            </section>

            {/* =================================================
                WHO IS IT FOR?
            ================================================= */}

            <section className="mt-10">
              <SectionHeading>
                Who is it for?
              </SectionHeading>

              <p className="mt-4 text-base leading-8 text-[#111827]/70">
                {scheme.eligibilitySummary}
              </p>

              {scheme.occupations.length >
                0 && (
                <div className="mt-6">
                  <p className="text-sm font-bold text-[#111827]">
                    Relevant occupations or
                    beneficiary groups
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {scheme.occupations.map(
                      (
                        occupation,
                        index
                      ) => (
                        <span
                          key={`${occupation}-${index}`}
                          className="rounded-lg border border-[#111827]/10 px-3 py-2 text-sm font-semibold text-[#111827]"
                        >
                          {occupation}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* =================================================
                BENEFITS
            ================================================= */}

            <section
              id="benefits"
              className="mt-10 scroll-mt-24"
            >
              <SectionHeading>
                Benefits
              </SectionHeading>

              {scheme.benefits.length >
              0 ? (
                <div className="mt-5 space-y-3">
                  {scheme.benefits.map(
                    (
                      benefit,
                      index
                    ) => (
                      <div
                        key={`${benefit}-${index}`}
                        className="flex items-start gap-3 rounded-xl border border-[#111827]/10 p-4"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#16A34A]" />

                        <p className="text-sm leading-6 text-[#111827]/70">
                          {benefit}
                        </p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="mt-4 text-sm text-[#111827]/60">
                  Benefit information is not
                  currently available.
                </p>
              )}
            </section>

            {/* =================================================
                ELIGIBILITY
            ================================================= */}

            <section
              id="eligibility"
              className="mt-10 scroll-mt-24"
            >
              <SectionHeading>
                Eligibility
              </SectionHeading>

              <div className="mt-5 rounded-2xl border border-[#111827]/10 p-6">
                <p className="text-base leading-7 text-[#111827]/70">
                  {scheme.eligibilitySummary}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <InfoCard
                    label="Minimum age"
                    value={
                      scheme.minAge !=
                      null
                        ? `${scheme.minAge} years`
                        : "Not specified"
                    }
                  />

                  <InfoCard
                    label="Maximum age"
                    value={
                      scheme.maxAge !=
                      null
                        ? `${scheme.maxAge} years`
                        : "Not specified"
                    }
                  />

                  <InfoCard
                    label="Income limit"
                    value={
                      scheme.maxIncome !=
                      null
                        ? `₹${scheme.maxIncome.toLocaleString(
                            "en-IN"
                          )}`
                        : "See scheme rules"
                    }
                  />

                  <InfoCard
                    label="Category"
                    value={
                      scheme.category
                    }
                  />
                </div>
              </div>
            </section>

            {/* =================================================
                EXCLUSIONS
            ================================================= */}

            {scheme.exclusions.length >
              0 && (
              <section className="mt-10">
                <SectionHeading>
                  Who may not qualify?
                </SectionHeading>

                <div className="mt-5 space-y-3">
                  {scheme.exclusions.map(
                    (
                      exclusion,
                      index
                    ) => (
                      <div
                        key={`${exclusion}-${index}`}
                        className="rounded-xl border border-[#111827]/10 bg-[#111827]/5 p-4"
                      >
                        <p className="text-sm leading-6 text-[#111827]/70">
                          {exclusion}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* =================================================
                DOCUMENTS
            ================================================= */}

            <section
              id="documents"
              className="mt-10 scroll-mt-24"
            >
              <SectionHeading>
                Documents you may need
              </SectionHeading>

              {scheme.documents.length >
              0 ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {scheme.documents.map(
                    (
                      document,
                      index
                    ) => (
                      <div
                        key={`${document}-${index}`}
                        className="flex items-start gap-3 rounded-xl border border-[#111827]/10 p-4"
                      >
                        <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]" />

                        <span className="text-sm leading-6 text-[#111827]/70">
                          {document}
                        </span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-[#111827]/60">
                  Check the official government
                  source for the current document
                  requirements.
                </p>
              )}
            </section>

            {/* =================================================
                HOW TO APPLY
            ================================================= */}

            <section
              id="how-to-apply"
              className="mt-10 scroll-mt-24"
            >
              <SectionHeading>
                How to apply
              </SectionHeading>

              <div className="mt-5 rounded-2xl bg-[#111827] p-6 sm:p-8">
                <p className="text-sm leading-7 text-white/70">
                  Application procedures may vary
                  depending on the scheme and the
                  responsible government department.
                  Always check the official source for
                  the current process.
                </p>

                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#111827]"
                >
                  Visit official source
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </section>

            {/* =================================================
                LAST VERIFIED
            ================================================= */}

            <section className="mt-10">
              <div className="rounded-2xl border border-[#111827]/10 bg-white p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#16A34A]" />

                  <div>
                    <p className="text-sm font-bold text-[#111827]">
                      Information verification
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#111827]/60">
                      Last verified:{" "}
                      <span className="font-bold text-[#111827]">
                        {
                          scheme.lastVerified
                        }
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                DISCLAIMER
            ================================================= */}

            <section className="mt-10">
              <div className="rounded-2xl border border-[#111827]/10 bg-[#111827]/5 p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#16A34A]" />

                  <div>
                    <h2 className="text-sm font-extrabold text-[#111827]">
                      Important
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#111827]/65">
                      SchemeSamjho is an
                      informational platform.
                      The information on this
                      page is intended to help
                      users understand a scheme
                      and should not be treated as
                      an official government
                      decision. Always verify
                      current eligibility, benefits,
                      documents and application
                      procedures through the official
                      government source.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </article>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-[#111827]/10 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-[#2563EB]">
                Quick information
              </p>

              <h2 className="mt-2 text-xl font-extrabold text-[#111827]">
                {scheme.name}
              </h2>

              <div className="mt-6 space-y-4">
                <SidebarItem
                  label="Category"
                  value={
                    scheme.category
                  }
                />

                <SidebarItem
                  label="Minimum age"
                  value={
                    scheme.minAge !=
                    null
                      ? `${scheme.minAge} years`
                      : "Not specified"
                  }
                />

                <SidebarItem
                  label="Maximum age"
                  value={
                    scheme.maxAge !=
                    null
                      ? `${scheme.maxAge} years`
                      : "Not specified"
                  }
                />

                <SidebarItem
                  label="Income"
                  value={
                    scheme.maxIncome !=
                    null
                      ? `₹${scheme.maxIncome.toLocaleString(
                          "en-IN"
                        )}`
                      : "See rules"
                  }
                />

                <SidebarItem
                  label="Last verified"
                  value={
                    scheme.lastVerified
                  }
                />
              </div>

              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#111827]"
              >
                Official source
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Page navigation */}
            <div className="mt-5 rounded-2xl border border-[#111827]/10 p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-[#111827]/45">
                On this page
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <a
                  href="#benefits"
                  className="block py-1 font-semibold text-[#111827]/65 transition hover:text-[#2563EB]"
                >
                  Benefits
                </a>

                <a
                  href="#eligibility"
                  className="block py-1 font-semibold text-[#111827]/65 transition hover:text-[#2563EB]"
                >
                  Eligibility
                </a>

                <a
                  href="#documents"
                  className="block py-1 font-semibold text-[#111827]/65 transition hover:text-[#2563EB]"
                >
                  Documents
                </a>

                <a
                  href="#how-to-apply"
                  className="block py-1 font-semibold text-[#111827]/65 transition hover:text-[#2563EB]"
                >
                  How to apply
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* =====================================================
          RELATED SCHEMES
      ===================================================== */}

      {relatedSchemes.length >
        0 && (
        <section className="border-t border-[#111827]/10 bg-[#111827]/5">
          <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold text-[#2563EB]">
                  Explore more
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-[#111827]">
                  Related schemes
                </h2>
              </div>

              <Link
                href="/schemes"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition hover:text-[#111827]"
              >
                Browse all schemes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relatedSchemes.map(
                (relatedScheme) => (
                  <Link
                    key={
                      relatedScheme.slug
                    }
                    href={`/schemes/${relatedScheme.slug}`}
                    className="group rounded-2xl border border-[#111827]/10 bg-white p-6 transition hover:-translate-y-1 hover:border-[#2563EB]/30"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-[#16A34A]">
                      {
                        relatedScheme.category
                      }
                    </p>

                    <h3 className="mt-2 text-xl font-extrabold text-[#111827]">
                      {
                        relatedScheme.name
                      }
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#111827]/60">
                      {
                        relatedScheme.shortDescription
                      }
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition group-hover:text-[#111827]">
                      View scheme
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 rounded-2xl bg-[#111827] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xl font-extrabold text-white">
                Want to explore your eligibility?
              </p>

              <p className="mt-2 text-sm leading-6 text-white/65">
                Use the preliminary eligibility
                checker to find schemes that may
                be relevant to you.
              </p>
            </div>

            <Link
              href="/eligibility"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#111827]"
            >
              Check eligibility
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl">
      {children}
    </h2>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#111827]/10 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[#111827]/45">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold text-[#111827]">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   SIDEBAR ITEM
========================================================= */

function SidebarItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#111827]/10 pb-4 last:border-b-0 last:pb-0">
      <span className="text-xs font-semibold text-[#111827]/45">
        {label}
      </span>

      <span className="text-right text-sm font-bold text-[#111827]">
        {value}
      </span>
    </div>
  );
}