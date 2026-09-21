import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileText,
  Info,
  ShieldCheck,
} from "lucide-react";

import {
  explainers,
  getExplainer,
} from "../../../data/explainers";

export function generateStaticParams() {
  return explainers.map((explainer) => ({
    slug: explainer.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const explainer = getExplainer(slug);

  if (!explainer) {
    return {
      title: "Explainer Not Found",
    };
  }

  return {
    title: explainer.title,
    description: explainer.summary,
  };
}

export default async function ExplainerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const explainer = getExplainer(slug);

  if (!explainer) {
    notFound();
  }

  const officialUrl =
    explainer.schemeSlug === "pm-kisan"
      ? "https://pmkisan.gov.in/"
      : explainer.schemeSlug === "pm-vishwakarma"
        ? "https://pmvishwakarma.gov.in/"
        : "https://pmjay.gov.in/";

  return (
    <main className="min-h-screen bg-[#FFFFFF]">

      {/* Hero */}
      <section className="bg-[#111827]">

        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">

          <Link
            href="/explainers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FFFFFF]/70 transition hover:text-[#FFFFFF]"
          >
            <ArrowLeft size={16} />
            Back to Explainers
          </Link>

          <div className="mt-8 max-w-4xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFFFFF]/20 px-4 py-2 text-sm font-semibold text-[#FFFFFF]">
              <BookOpen size={16} />
              {explainer.category}
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl">
              {explainer.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-[#FFFFFF]/75 sm:text-lg">
              {explainer.summary}
            </p>

          </div>

        </div>

      </section>

      {/* Content */}
      <section>

        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-10 lg:py-16">

          <article className="min-w-0">

            {/* What */}
            <section>
              <SectionTitle
                icon={<Info size={20} />}
                title="What is it?"
              />

              <p className="mt-4 text-base leading-8 text-[#111827]/70">
                {explainer.whatIsIt}
              </p>
            </section>

            {/* Why */}
            <section className="mt-12">

              <SectionTitle
                icon={<BookOpen size={20} />}
                title="Why does it exist?"
              />

              <p className="mt-4 text-base leading-8 text-[#111827]/70">
                {explainer.why}
              </p>

            </section>

            {/* Who */}
            <section className="mt-12">

              <SectionTitle
                icon={<CheckCircle2 size={20} />}
                title="Who is it for?"
              />

              <p className="mt-4 text-base leading-8 text-[#111827]/70">
                {explainer.who}
              </p>

            </section>

            {/* Benefits */}
            <section className="mt-12">

              <SectionTitle
                icon={<CheckCircle2 size={20} />}
                title="Benefits"
              />

              <div className="mt-5 space-y-3">

                {explainer.benefits.map(
                  (benefit) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-3 rounded-xl border border-[#111827]/10 p-4"
                    >

                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-[#16A34A]"
                      />

                      <p className="text-sm leading-6 text-[#111827]/75">
                        {benefit}
                      </p>

                    </div>
                  )
                )}

              </div>

            </section>

            {/* Eligibility */}
            <section className="mt-12">

              <SectionTitle
                icon={<ShieldCheck size={20} />}
                title="Eligibility"
              />

              <div className="mt-5 space-y-3">

                {explainer.eligibility.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >

                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-[#16A34A]"
                      />

                      <p className="text-sm leading-6 text-[#111827]/75">
                        {item}
                      </p>

                    </div>
                  )
                )}

              </div>

              <div className="mt-6 rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/10 p-5">

                <p className="text-sm leading-6 text-[#111827]/75">
                  This explanation is for general understanding.
                  Final eligibility is determined under the applicable
                  government rules and verification process.
                </p>

              </div>

            </section>

            {/* Documents */}
            <section className="mt-12">

              <SectionTitle
                icon={<FileText size={20} />}
                title="Documents you may need"
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                {explainer.documents.map(
                  (document) => (
                    <div
                      key={document}
                      className="rounded-xl border border-[#111827]/10 p-4"
                    >

                      <p className="text-sm font-semibold leading-6 text-[#111827]/75">
                        {document}
                      </p>

                    </div>
                  )
                )}

              </div>

            </section>

            {/* How it works */}
            <section className="mt-12">

              <SectionTitle
                icon={<ArrowRight size={20} />}
                title="How does it work?"
              />

              <div className="mt-6 space-y-4">

                {explainer.howItWorks.map(
                  (step, index) => (
                    <div
                      key={step}
                      className="flex items-start gap-4"
                    >

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-sm font-bold text-[#FFFFFF]">
                        {index + 1}
                      </div>

                      <p className="pt-1 text-sm leading-7 text-[#111827]/75">
                        {step}
                      </p>

                    </div>
                  )
                )}

              </div>

            </section>

            {/* Application */}
            <section className="mt-12">

              <SectionTitle
                icon={<FileText size={20} />}
                title="How to apply"
              />

              <p className="mt-4 text-base leading-8 text-[#111827]/70">
                {explainer.howToApply}
              </p>

              <a
                href={officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
              >
                Visit Official Website
                <ExternalLink size={16} />
              </a>

            </section>

            {/* FAQs */}
            <section className="mt-12">

              <SectionTitle
                icon={<Info size={20} />}
                title="Frequently asked questions"
              />

              <div className="mt-5 space-y-4">

                {explainer.faqs.map(
                  (faq) => (
                    <div
                      key={faq.question}
                      className="rounded-xl border border-[#111827]/10 p-5"
                    >

                      <h3 className="text-base font-extrabold text-[#111827]">
                        {faq.question}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#111827]/65">
                        {faq.answer}
                      </p>

                    </div>
                  )
                )}

              </div>

            </section>

            {/* Disclaimer */}
            <section className="mt-12 rounded-2xl bg-[#111827] p-6 sm:p-8">

              <h2 className="text-xl font-extrabold text-[#FFFFFF]">
                Important
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#FFFFFF]/70">
                SchemeSamjho is an information platform and is
                not a government department or official government
                portal. Scheme rules, eligibility conditions,
                documents and application processes can change.
                Always verify the latest information through the
                official source before applying.
              </p>

            </section>

          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">

            <div className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-5">

              <p className="text-xs font-bold uppercase tracking-wide text-[#2563EB]">
                On this page
              </p>

              <nav className="mt-4 space-y-1">

                {[
                  "What is it?",
                  "Why does it exist?",
                  "Who is it for?",
                  "Benefits",
                  "Eligibility",
                  "Documents",
                  "How does it work?",
                  "How to apply",
                  "FAQs",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-[#111827]/65"
                  >
                    {item}
                  </div>
                ))}

              </nav>

              <div className="mt-5 border-t border-[#111827]/10 pt-5">

                <p className="text-xs font-bold uppercase tracking-wide text-[#16A34A]">
                  Official source
                </p>

                <a
                  href={officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-2 text-sm font-bold text-[#2563EB] transition hover:text-[#111827]"
                >
                  Official Website
                  <ExternalLink size={15} />
                </a>

              </div>

            </div>

            <Link
              href="/eligibility"
              className="mt-5 flex items-center justify-between rounded-2xl bg-[#2563EB] p-5 text-[#FFFFFF] transition hover:bg-[#111827]"
            >

              <div>
                <p className="text-sm font-extrabold">
                  Check your eligibility
                </p>

                <p className="mt-1 text-xs leading-5 text-[#FFFFFF]/75">
                  Explore schemes using your basic information.
                </p>
              </div>

              <ArrowRight size={19} />

            </Link>

          </aside>

        </div>

      </section>

    </main>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
        {icon}
      </div>

      <h2 className="text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl">
        {title}
      </h2>

    </div>
  );
}