import Link from "next/link";
import { notFound } from "next/navigation";
import { schemes } from "../../../data/schemes";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return schemes.map((scheme) => ({
    slug: scheme.slug,
  }));
}

function formatIncome(amount?: number) {
  if (!amount) return "Depends on scheme rules";
  return `₹${amount.toLocaleString("en-IN")} per year`;
}

function formatAge(minAge?: number, maxAge?: number) {
  if (minAge && maxAge) return `${minAge}–${maxAge} years`;
  if (minAge) return `${minAge}+ years`;
  if (maxAge) return `Up to ${maxAge} years`;
  return "Depends on scheme rules";
}

export default async function ExplainerDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const scheme = schemes.find((item) => item.slug === slug);

  if (!scheme) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-700">
            Home
          </Link>

          <span>/</span>

          <Link href="/explainers" className="hover:text-blue-700">
            Explainers
          </Link>

          <span>/</span>

          <span className="text-slate-700">{scheme.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-6 text-white shadow-xl sm:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
              {scheme.category}
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              {scheme.name}
            </h1>

            <p className="mt-5 text-base leading-7 text-blue-50 sm:text-lg">
              {scheme.shortDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/schemes/${scheme.slug}`}
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
              >
                View Scheme Details
              </Link>

              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Official Source ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Article */}
          <article className="space-y-6">
            {/* What is this scheme? */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                What is {scheme.name}?
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {scheme.description}
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                This explainer is designed to help you understand the scheme
                before you visit the official website or start an application.
              </p>
            </section>

            {/* Who can benefit */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Who can benefit?
              </h2>

              <p className="mt-3 text-slate-600">
                The following are the main eligibility factors currently
                associated with this scheme:
              </p>

              <ul className="mt-5 space-y-3">
                {scheme.eligibilitySummary.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                      ✓
                    </span>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm leading-6 text-amber-800">
                  <strong>Important:</strong> This is only a simple guide.
                  Final eligibility depends on the official scheme rules,
                  verification process, and your individual circumstances.
                </p>
              </div>
            </section>

            {/* Benefits */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                What are the benefits?
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {scheme.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex gap-3">
                      <span className="text-lg text-green-600">✓</span>

                      <p className="text-sm leading-6 text-slate-700">
                        {benefit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Documents */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Documents you may need
              </h2>

              <p className="mt-3 text-slate-600">
                Keep the following documents or information ready where
                applicable:
              </p>

              <ul className="mt-5 space-y-3">
                {scheme.documents.map((document) => (
                  <li
                    key={document}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <span className="mt-0.5 text-blue-600">•</span>
                    <span>{document}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Things to know */}
            {scheme.exclusions && scheme.exclusions.length > 0 && (
              <section className="rounded-2xl border border-red-100 bg-red-50 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  Things that may exclude you
                </h2>

                <p className="mt-3 text-slate-600">
                  Some people or situations may not qualify under the
                  applicable rules.
                </p>

                <ul className="mt-5 space-y-3">
                  {scheme.exclusions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                    >
                      <span className="mt-1 text-red-600">!</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* How to proceed */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                What should you do next?
              </h2>

              <div className="mt-6 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                    1
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Check your basic eligibility
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Use SchemeSamjho&apos;s preliminary eligibility checker
                      to see which schemes may be relevant to your profile.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                    2
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Read the official requirements
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Government rules can change, so always confirm the latest
                      requirements from the official source.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                    3
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Apply through the official channel
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Use the official website, portal, bank, department, or
                      other channel specified by the government.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/eligibility"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Check Eligibility
                </Link>

                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Visit Official Website ↗
                </a>
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-5">
              {/* Quick summary */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">
                  Quick Summary
                </h2>

                <div className="mt-5 divide-y divide-slate-100">
                  <div className="py-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Category
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {scheme.category}
                    </p>
                  </div>

                  <div className="py-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Age
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {formatAge(scheme.minAge, scheme.maxAge)}
                    </p>
                  </div>

                  <div className="py-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Income
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {formatIncome(scheme.maxIncome)}
                    </p>
                  </div>

                  <div className="py-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Occupations
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-800">
                      {scheme.occupations.join(", ")}
                    </p>
                  </div>

                  <div className="py-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Last reviewed
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {scheme.lastVerified}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
                <h2 className="text-lg font-bold">
                  Not sure if this scheme is for you?
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Answer a few simple questions and get a preliminary list of
                  schemes that may match your profile.
                </p>

                <Link
                  href="/eligibility"
                  className="mt-5 block rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Check My Eligibility
                </Link>
              </div>

              {/* Official source */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Official source
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Always verify the latest eligibility, benefits, documents,
                  and application process with the official government source.
                </p>

                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:underline"
                >
                  Open Official Source ↗
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Want to explore more government schemes?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Browse schemes by category or use the eligibility checker to find
            schemes that may be relevant to you.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/schemes"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Schemes
            </Link>

            <Link
              href="/compare"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Compare Schemes
            </Link>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-xs leading-5 text-slate-500">
            SchemeSamjho is an independent informational platform. It is not a
            government website. Information can change, so please verify
            details with the official source before applying.
          </p>
        </div>
      </section>
    </main>
  );
}