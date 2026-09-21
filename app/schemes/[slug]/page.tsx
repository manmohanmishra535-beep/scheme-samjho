import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileText,
  Info,
  ShieldCheck,
} from "lucide-react";

import { schemes, type Scheme } from "../../../data/schemes";
import FavoriteButton from "../../../Components/FavoriteButton";

type ExplainerPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type Faq = {
  question: string;
  answer: string;
};

export function generateStaticParams() {
  return schemes.map((scheme) => ({
    slug: scheme.slug,
  }));
}

export async function generateMetadata({
  params,
}: ExplainerPageProps) {
  const { slug } = await params;

  const scheme = schemes.find(
    (item) => item.slug === slug
  );

  if (!scheme) {
    return {
      title: "Explainer Not Found",
    };
  }

  return {
    title: `${scheme.name} Explained Simply`,
    description: `Understand ${scheme.name}, including its benefits, eligibility, documents and application information in simple language.`,
  };
}

export default async function ExplainerDetailPage({
  params,
}: ExplainerPageProps) {
  const { slug } = await params;

  const scheme = schemes.find(
    (item) => item.slug === slug
  );

  if (!scheme) {
    notFound();
  }

  const relatedSchemes = schemes
    .filter(
      (item) =>
        item.slug !== scheme.slug &&
        item.category === scheme.category
    )
    .slice(0, 3);

  const faqs = getFaqs(scheme);

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      {/* ===================================================
          HERO
          =================================================== */}

      <section className="bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          {/* Breadcrumb */}

          <div className="flex flex-wrap items-center gap-2 text-sm text-[#FFFFFF]/60">
            <Link
              href="/explainers"
              className="transition hover:text-[#FFFFFF]"
            >
              Explainers
            </Link>

            <span>/</span>

            <span className="text-[#FFFFFF]/85">
              {scheme.name}
            </span>
          </div>

          {/* Category */}

          <div className="mt-8">
            <span className="inline-flex items-center rounded-full border border-[#FFFFFF]/20 px-4 py-2 text-sm font-bold text-[#FFFFFF]">
              {scheme.category}
            </span>
          </div>

          {/* Title */}

          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.06] tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl">
            {scheme.name}
            <br />
            <span className="text-[#2563EB]">
              explained simply.
            </span>
          </h1>

          {/* Description */}

          <p className="mt-6 max-w-3xl text-base leading-7 text-[#FFFFFF]/75 sm:text-lg">
            {scheme.shortDescription}
          </p>

          {/* Actions */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <FavoriteButton
              slug={scheme.slug}
            />

            <Link
              href={`/schemes/${scheme.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#FFFFFF]/25 px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#111827]"
            >
              View full scheme details
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================
          MAIN CONTENT
          =================================================== */}

      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_320px] lg:px-10">
          {/* =================================================
              ARTICLE
              ================================================= */}

          <article className="min-w-0">
            {/* Intro */}

            <div className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/10">
                  <Info
                    size={21}
                    className="text-[#2563EB]"
                  />
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

            {/* What is it? */}

            <section className="mt-10">
              <SectionHeading>
                What is {scheme.name}?
              </SectionHeading>

              <p className="mt-4 text-base leading-8 text-[#111827]/70">
                {scheme.description}
              </p>
            </section>

            {/* Why */}

            <section className="mt-10">
              <SectionHeading>
                Why does this scheme exist?
              </SectionHeading>

              <p className="mt-4 text-base leading-8 text-[#111827]/70">
                The scheme is designed to provide
                support to people who fall within its
                defined beneficiary group. The exact
                purpose, benefits and conditions depend
                on the official scheme guidelines.
              </p>
            </section>

            {/* Who is it for? */}

            <section className="mt-10">
              <SectionHeading>
                Who is it for?
              </SectionHeading>

              <p className="mt-4 text-base leading-8 text-[#111827]/70">
                {scheme.eligibilitySummary}
              </p>

              {scheme.occupations.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-bold text-[#111827]">
                    Relevant occupations or
                    beneficiary groups
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {scheme.occupations.map(
                      (occupation) => (
                        <span
                          key={occupation}
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

            {/* Benefits */}

            <section
              id="benefits"
              className="mt-10 scroll-mt-28"
            >
              <SectionHeading>
                What are the benefits?
              </SectionHeading>

              <div className="mt-5 space-y-3">
                {scheme.benefits.map(
                  (benefit) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-3 rounded-xl border border-[#111827]/10 p-4"
                    >
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-[#16A34A]"
                      />

                      <p className="text-sm leading-6 text-[#111827]/70">
                        {benefit}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Eligibility */}

            <section
              id="eligibility"
              className="mt-10 scroll-mt-28"
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
                      scheme.minAge != null
                        ? `${scheme.minAge} years`
                        : "No specific age shown"
                    }
                  />

                  <InfoCard
                    label="Maximum age"
                    value={
                      scheme.maxAge != null
                        ? `${scheme.maxAge} years`
                        : "No specific age shown"
                    }
                  />

                  <InfoCard
                    label="Income limit"
                    value={
                      scheme.maxIncome != null
                        ? `₹${scheme.maxIncome.toLocaleString(
                            "en-IN"
                          )}`
                        : "See scheme rules"
                    }
                  />

                  <InfoCard
                    label="Category"
                    value={scheme.category}
                  />
                </div>
              </div>
            </section>

            {/* Exclusions */}

            {scheme.exclusions.length > 0 && (
              <section className="mt-10">
                <SectionHeading>
                  Who may not qualify?
                </SectionHeading>

                <div className="mt-5 space-y-3">
                  {scheme.exclusions.map(
                    (exclusion) => (
                      <div
                        key={exclusion}
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

            {/* Documents */}

            <section
              id="documents"
              className="mt-10 scroll-mt-28"
            >
              <SectionHeading>
                Documents you may need
              </SectionHeading>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {scheme.documents.map(
                  (document) => (
                    <div
                      key={document}
                      className="flex items-start gap-3 rounded-xl border border-[#111827]/10 p-4"
                    >
                      <FileText
                        size={19}
                        className="mt-0.5 shrink-0 text-[#2563EB]"
                      />

                      <span className="text-sm leading-6 text-[#111827]/70">
                        {document}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* How it works */}

            <section
              id="how-it-works"
              className="mt-10 scroll-mt-28"
            >
              <SectionHeading>
                How does it work?
              </SectionHeading>

              <div className="mt-6 space-y-5">
                <Step
                  number="01"
                  title="Check the eligibility"
                  description="Review the official eligibility conditions and compare them with your situation."
                />

                <Step
                  number="02"
                  title="Prepare the documents"
                  description="Keep the identity, bank, income, land, occupation or other documents required by the scheme ready."
                />

                <Step
                  number="03"
                  title="Apply through the official process"
                  description="Use the official government portal, department, centre or other authorised channel specified for the scheme."
                />

                <Step
                  number="04"
                  title="Complete verification"
                  description="The concerned authority may verify your information before approving the benefit."
                />

                <Step
                  number="05"
                  title="Receive the benefit"
                  description="If approved, the applicable benefit is provided according to the official scheme rules."
                />
              </div>
            </section>

            {/* How to apply */}

            <section className="mt-10">
              <SectionHeading>
                How to apply
              </SectionHeading>

              <div className="mt-5 rounded-2xl bg-[#111827] p-6 sm:p-8">
                <p className="text-sm leading-7 text-[#FFFFFF]/70">
                  Application procedures can change
                  depending on the scheme and
                  government department. Always use
                  the official source below for the
                  current application process.
                </p>

                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#FFFFFF] hover:text-[#111827]"
                >
                  Visit official source
                  <ExternalLink size={17} />
                </a>
              </div>
            </section>

            {/* FAQs */}

            <section
              id="faqs"
              className="mt-10 scroll-mt-28"
            >
              <SectionHeading>
                Frequently asked questions
              </SectionHeading>

              <div className="mt-5 space-y-3">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-xl border border-[#111827]/10"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-[#111827]">
                      <span>{faq.question}</span>

                      <ChevronDown
                        size={18}
                        className="shrink-0 transition-transform group-open:rotate-180"
                      />
                    </summary>

                    <div className="border-t border-[#111827]/10 px-5 py-4">
                      <p className="text-sm leading-6 text-[#111827]/65">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Disclaimer */}

            <div className="mt-10 rounded-2xl border border-[#111827]/10 bg-[#111827]/5 p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-[#16A34A]"
                />

                <div>
                  <h2 className="text-sm font-extrabold text-[#111827]">
                    Important
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#111827]/65">
                    SchemeSamjho is an informational
                    platform. Eligibility results and
                    explanations are preliminary and
                    should not be treated as official
                    government decisions. Always verify
                    current eligibility, benefits,
                    documents and application procedures
                    through the official government
                    source.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* =================================================
              SIDEBAR
              ================================================= */}

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-[#2563EB]">
                Quick information
              </p>

              <h2 className="mt-2 text-xl font-extrabold text-[#111827]">
                {scheme.name}
              </h2>

              <div className="mt-6 space-y-4">
                <SidebarItem
                  label="Category"
                  value={scheme.category}
                />

                <SidebarItem
                  label="Minimum age"
                  value={
                    scheme.minAge != null
                      ? `${scheme.minAge} years`
                      : "Not specified"
                  }
                />

                <SidebarItem
                  label="Maximum age"
                  value={
                    scheme.maxAge != null
                      ? `${scheme.maxAge} years`
                      : "Not specified"
                  }
                />

                <SidebarItem
                  label="Income"
                  value={
                    scheme.maxIncome != null
                      ? `₹${scheme.maxIncome.toLocaleString(
                          "en-IN"
                        )}`
                      : "See rules"
                  }
                />

                <SidebarItem
                  label="Last verified"
                  value={scheme.lastVerified}
                />
              </div>

              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
              >
                Official source
                <ExternalLink size={16} />
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
                  className="block py-1 font-semibold text-[#111827]/65 hover:text-[#2563EB]"
                >
                  Benefits
                </a>

                <a
                  href="#eligibility"
                  className="block py-1 font-semibold text-[#111827]/65 hover:text-[#2563EB]"
                >
                  Eligibility
                </a>

                <a
                  href="#documents"
                  className="block py-1 font-semibold text-[#111827]/65 hover:text-[#2563EB]"
                >
                  Documents
                </a>

                <a
                  href="#how-it-works"
                  className="block py-1 font-semibold text-[#111827]/65 hover:text-[#2563EB]"
                >
                  How it works
                </a>

                <a
                  href="#faqs"
                  className="block py-1 font-semibold text-[#111827]/65 hover:text-[#2563EB]"
                >
                  FAQs
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ===================================================
          RELATED SCHEMES
          =================================================== */}

      {relatedSchemes.length > 0 && (
        <section className="border-t border-[#111827]/10 bg-[#111827]/5">
          <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
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
                className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#111827]"
              >
                Browse all schemes
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relatedSchemes.map(
                (relatedScheme) => (
                  <Link
                    key={relatedScheme.slug}
                    href={`/explainers/${relatedScheme.slug}`}
                    className="group rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6 transition hover:-translate-y-1 hover:border-[#2563EB]/30"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-[#16A34A]">
                      {relatedScheme.category}
                    </p>

                    <h3 className="mt-2 text-xl font-extrabold text-[#111827]">
                      {relatedScheme.name}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#111827]/60">
                      {relatedScheme.shortDescription}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] group-hover:text-[#111827]">
                      Read explainer
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===================================================
          BOTTOM CTA
          =================================================== */}

      <section className="bg-[#FFFFFF]">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 rounded-2xl bg-[#111827] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xl font-extrabold text-[#FFFFFF]">
                Want to check whether this scheme
                may fit you?
              </p>

              <p className="mt-2 text-sm leading-6 text-[#FFFFFF]/65">
                Use the SchemeSamjho preliminary
                eligibility checker to explore
                relevant schemes.
              </p>
            </div>

            <Link
              href="/eligibility"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#FFFFFF] hover:text-[#111827]"
            >
              Check eligibility
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   COMPONENTS
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

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-xs font-extrabold text-[#FFFFFF]">
        {number}
      </div>

      <div>
        <h3 className="text-base font-extrabold text-[#111827]">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-[#111827]/60">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   FAQS
   ========================================================= */

function getFaqs(scheme: Scheme): Faq[] {
  return [
    {
      question: `What is ${scheme.name}?`,
      answer: scheme.description,
    },
    {
      question: `Who can benefit from ${scheme.name}?`,
      answer: scheme.eligibilitySummary,
    },
    {
      question: "What documents may be required?",
      answer:
        scheme.documents.length > 0
          ? `The documents may include: ${scheme.documents.join(
              ", "
            )}. Requirements can vary, so verify the current list through the official source.`
          : "Document requirements should be verified through the official scheme source.",
    },
    {
      question: "How can I apply?",
      answer:
        "Application procedures depend on the scheme and the responsible government department. Use the official source linked on this page to check the current application process.",
    },
    {
      question:
        "Is the information on SchemeSamjho official?",
      answer:
        "No. SchemeSamjho is an informational platform. The official government website or department remains the authoritative source for eligibility, benefits, documents and application decisions.",
    },
  ];
}