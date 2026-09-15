import Link from "next/link";

export const metadata = {
  title: "About Us | SchemeSamjho",
  description:
    "Learn what SchemeSamjho is, how we explain government schemes, and why official government sources remain the final authority.",
};

const principles = [
  {
    icon: "🗣️",
    title: "Simple language",
    description:
      "Government scheme information can be difficult to understand. We turn complicated information into clearer, easier-to-read explanations.",
  },
  {
    icon: "🔎",
    title: "Easy discovery",
    description:
      "Search and browse schemes by category, occupation, benefits, and other useful keywords.",
  },
  {
    icon: "📋",
    title: "Useful details",
    description:
      "Each scheme page highlights benefits, eligibility factors, documents, exclusions, and official sources.",
  },
  {
    icon: "🔗",
    title: "Official verification",
    description:
      "We provide official source links so you can verify the latest information before applying.",
  },
];

const steps = [
  {
    number: "1",
    title: "Find",
    description:
      "Search for a government scheme or browse schemes by category.",
  },
  {
    number: "2",
    title: "Understand",
    description:
      "Read a simple explanation of benefits, eligibility, documents, and important conditions.",
  },
  {
    number: "3",
    title: "Verify",
    description:
      "Visit the relevant official government source for the latest rules and application process.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              About SchemeSamjho
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Government schemes, made easier to understand.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              SchemeSamjho is an independent information platform designed to
              help people understand Indian government schemes without having
              to navigate complicated terminology first.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT WE DO
      ====================================================== */}
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              What we do
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              We explain. We don't make government decisions.
            </h2>

            <div className="mt-5 space-y-4 text-slate-600">
              <p className="leading-7">
                Government schemes can provide important support for farmers,
                students, workers, businesses, women, families, and many other
                groups. However, finding the right scheme and understanding its
                conditions is not always easy.
              </p>

              <p className="leading-7">
                SchemeSamjho brings useful scheme information together in one
                place and presents it in simpler language.
              </p>

              <p className="leading-7">
                Our goal is to help you understand a scheme before you decide
                whether to explore or apply for it.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-7">
            <div className="text-3xl">🎯</div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Our goal
            </h3>

            <p className="mt-3 leading-7 text-slate-700">
              Make government scheme information easier to discover,
              understand, compare, and verify.
            </p>

            <div className="mt-6 rounded-2xl bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">
                The simple rule we follow
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Understand the information on SchemeSamjho first, then verify
                the latest details on the official government source.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRINCIPLES
      ====================================================== */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
          <div className="text-center">
            <p className="text-sm font-semibold text-blue-600">
              What you can expect
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Built around clarity and transparency
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              We focus on making scheme information easier to use while being
              clear about the limits of our platform.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-3xl">{principle.icon}</div>

                <h3 className="mt-5 font-bold text-slate-900">
                  {principle.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="text-center">
          <p className="text-sm font-semibold text-blue-600">
            How SchemeSamjho works
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Find → Understand → Verify
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                {step.number}
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          OFFICIAL SOURCES
      ====================================================== */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-green-600">
                Official sources matter
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                SchemeSamjho is a guide, not the final authority.
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Government scheme rules, benefits, eligibility conditions,
                deadlines, and application processes can change. That's why
                every scheme page provides an official source link whenever
                available.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                Before applying, always confirm the latest requirements through
                the relevant government department, portal, or authorised
                channel.
              </p>
            </div>

            <div className="rounded-2xl border border-green-200 bg-green-50 p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                  ✓
                </span>

                <h3 className="font-bold text-green-950">
                  Important distinction
                </h3>
              </div>

              <ul className="mt-5 space-y-3 text-sm leading-6 text-green-900">
                <li>✓ SchemeSamjho explains information.</li>
                <li>✓ Official government websites publish official rules.</li>
                <li>✓ Government authorities decide final eligibility.</li>
                <li>✓ Applications should be made through authorised channels.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ELIGIBILITY CHECKER
      ====================================================== */}
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="rounded-3xl bg-slate-900 p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-blue-300">
                Preliminary eligibility checker
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                Find schemes that may match your profile.
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Our checker uses the information available in SchemeSamjho's
                scheme data to provide a preliminary match. It does not replace
                official government eligibility verification.
              </p>
            </div>

            <Link
              href="/eligibility"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Check Eligibility →
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          NOT GOVERNMENT
      ====================================================== */}
      <section className="border-t border-slate-200 bg-amber-50">
        <div className="mx-auto max-w-4xl px-6 py-10 text-center">
          <div className="text-2xl">⚠️</div>

          <h2 className="mt-3 text-xl font-bold text-amber-950">
            SchemeSamjho is not a government website
          </h2>

          <p className="mt-3 text-sm leading-6 text-amber-900">
            SchemeSamjho is an independent informational platform. It is not
            affiliated with, operated by, or an official representative of the
            Government of India or any state government.
          </p>

          <Link
            href="/disclaimer"
            className="mt-4 inline-flex text-sm font-semibold text-amber-900 underline underline-offset-4 hover:text-amber-950"
          >
            Read our full disclaimer →
          </Link>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Ready to explore?
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
            Browse government schemes or check which ones may be relevant to
            your profile.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/schemes"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Schemes
            </Link>

            <Link
              href="/eligibility"
              className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}