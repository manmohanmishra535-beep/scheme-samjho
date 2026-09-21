import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileText,
  Search,
  ShieldCheck,
  Target,
} from "lucide-react";

export const metadata = {
  title: "About SchemeSamjho",
  description:
    "Learn about SchemeSamjho, an informational platform that explains Indian government schemes in simple language.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF]">

      {/* Hero */}
      <section className="bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFFFFF]/20 px-4 py-2 text-sm font-semibold text-[#FFFFFF]">
              <BookOpen size={16} />
              About SchemeSamjho
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.06] tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl">
              Government schemes,
              <br />
              made easier to understand.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#FFFFFF]/75 sm:text-lg">
              SchemeSamjho helps people understand government schemes,
              benefits, eligibility requirements, documents and
              application information in simple language.
            </p>

          </div>

        </div>
      </section>

      {/* Introduction */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">

          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-start">

            <div>

              <p className="text-sm font-bold text-[#2563EB]">
                What we do
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
                Making scheme information easier to understand
              </h2>

              <div className="mt-6 space-y-5 text-base leading-8 text-[#111827]/65">

                <p>
                  Government schemes can provide important support,
                  but finding and understanding the right information
                  can sometimes be difficult.
                </p>

                <p>
                  SchemeSamjho presents scheme information in a
                  simpler format so that people can quickly understand
                  what a scheme is, who it is intended for, what
                  benefits are described, which documents may be
                  required and where to find the official application
                  information.
                </p>

                <p>
                  Our goal is not to replace government portals.
                  Instead, SchemeSamjho acts as an information and
                  discovery layer that helps users understand what
                  they should look for before visiting an official
                  source.
                </p>

              </div>

            </div>

            <div className="rounded-2xl bg-[#111827] p-6 sm:p-8">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]">
                <Target
                  size={23}
                  className="text-[#FFFFFF]"
                />
              </div>

              <h2 className="mt-6 text-xl font-extrabold text-[#FFFFFF]">
                Our purpose
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#FFFFFF]/65">
                Help people move from confusion to understanding
                when exploring government schemes.
              </p>

              <div className="mt-6 h-px bg-[#FFFFFF]/10" />

              <p className="mt-6 text-xs font-semibold leading-5 text-[#FFFFFF]/45">
                SchemeSamjho is an independent informational
                platform and is not a government department.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#111827]/5">

        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">

          <div className="max-w-2xl">

            <p className="text-sm font-bold text-[#2563EB]">
              How SchemeSamjho works
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
              Understand first. Verify officially. Apply through the
              right channel.
            </h2>

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <ProcessCard
              number="01"
              icon={<Search size={22} />}
              title="Discover"
              description="Browse or search schemes based on categories, occupations and other information."
            />

            <ProcessCard
              number="02"
              icon={<BookOpen size={22} />}
              title="Understand"
              description="Read simplified information about benefits, eligibility, documents and how a scheme works."
            />

            <ProcessCard
              number="03"
              icon={<ExternalLink size={22} />}
              title="Verify"
              description="Use the official government source to confirm current requirements and application procedures."
            />

          </div>

        </div>

      </section>

      {/* What users can find */}
      <section>

        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">

          <div className="max-w-2xl">

            <p className="text-sm font-bold text-[#2563EB]">
              What you can find
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
              Information organized around your questions
            </h2>

            <p className="mt-4 text-base leading-7 text-[#111827]/60">
              SchemeSamjho organizes commonly needed information
              into sections that are easier to scan and understand.
            </p>

          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <FeatureCard
              icon={<BookOpen size={21} />}
              title="Simple explanations"
              description="Understand the basic purpose and structure of a scheme without starting with complicated terminology."
            />

            <FeatureCard
              icon={<CheckCircle2 size={21} />}
              title="Eligibility"
              description="Review the eligibility information presented for a scheme before checking the official rules."
            />

            <FeatureCard
              icon={<FileText size={21} />}
              title="Documents"
              description="See the documents that may be relevant to the application process."
            />

            <FeatureCard
              icon={<Target size={21} />}
              title="Benefits"
              description="Understand the benefits or support described for eligible beneficiaries."
            />

            <FeatureCard
              icon={<Search size={21} />}
              title="Scheme discovery"
              description="Explore schemes through search, categories, filters and the preliminary eligibility tool."
            />

            <FeatureCard
              icon={<ExternalLink size={21} />}
              title="Official sources"
              description="Use links to official sources to verify current information and application procedures."
            />

          </div>

        </div>

      </section>

      {/* Trust / accuracy */}
      <section className="bg-[#111827]">

        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">

          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#16A34A]">
                <ShieldCheck
                  size={24}
                  className="text-[#FFFFFF]"
                />
              </div>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#FFFFFF] sm:text-4xl">
                Official sources remain the authority
              </h2>

              <p className="mt-4 text-base leading-7 text-[#FFFFFF]/65">
                SchemeSamjho simplifies information, but government
                departments and official portals remain the
                authoritative sources for current scheme rules,
                eligibility decisions and application procedures.
              </p>

            </div>

            <div className="rounded-2xl border border-[#FFFFFF]/10 p-6 sm:p-8">

              <TrustPoint>
                Information can change when government rules or
                procedures are updated.
              </TrustPoint>

              <TrustPoint>
                Eligibility shown on SchemeSamjho is intended as
                preliminary information.
              </TrustPoint>

              <TrustPoint>
                An official authority makes the final eligibility
                or application decision.
              </TrustPoint>

              <TrustPoint>
                Always check the official source before applying.
              </TrustPoint>

            </div>

          </div>

        </div>

      </section>

      {/* Official sources */}
      <section>

        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">

          <div className="text-center">

            <p className="text-sm font-bold text-[#2563EB]">
              Verify information
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#111827] sm:text-4xl">
              Use official government sources
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#111827]/60">
              Use official government portals to confirm the latest
              information before making an application or decision.
            </p>

          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">

            <OfficialSourceCard
              title="myScheme"
              description="Government scheme discovery and information portal."
              href="https://www.myscheme.gov.in/"
            />

            <OfficialSourceCard
              title="India.gov.in"
              description="National portal containing information about government services and schemes."
              href="https://www.india.gov.in/"
            />

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-[#FFFFFF]">

        <div className="mx-auto max-w-7xl px-6 pb-14 sm:px-8 sm:pb-16 lg:px-10">

          <div className="rounded-2xl bg-[#111827] p-6 sm:p-8 lg:p-10">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-2xl">

                <p className="text-2xl font-extrabold text-[#FFFFFF]">
                  Ready to explore government schemes?
                </p>

                <p className="mt-2 text-sm leading-6 text-[#FFFFFF]/65">
                  Browse schemes, read simple explainers or use the
                  preliminary eligibility checker.
                </p>

              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                <Link
                  href="/schemes"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#FFFFFF] hover:text-[#111827]"
                >
                  Explore schemes
                  <ArrowRight size={17} />
                </Link>

                <Link
                  href="/eligibility"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#FFFFFF]/20 px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#111827]"
                >
                  Check eligibility
                  <Search size={17} />
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Process Card                                                               */
/* -------------------------------------------------------------------------- */

function ProcessCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6">

      <div className="flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
          {icon}
        </div>

        <span className="text-sm font-extrabold text-[#111827]/20">
          {number}
        </span>

      </div>

      <h3 className="mt-6 text-xl font-extrabold text-[#111827]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#111827]/60">
        {description}
      </p>

    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Feature Card                                                               */
/* -------------------------------------------------------------------------- */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-[#111827]/10 p-6 transition hover:-translate-y-1 hover:border-[#2563EB]/30">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-extrabold text-[#111827]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#111827]/60">
        {description}
      </p>

    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Trust Point                                                                */
/* -------------------------------------------------------------------------- */

function TrustPoint({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-[#FFFFFF]/10 py-4 first:pt-0 last:border-b-0 last:pb-0">

      <CheckCircle2
        size={19}
        className="mt-0.5 shrink-0 text-[#16A34A]"
      />

      <p className="text-sm leading-6 text-[#FFFFFF]/70">
        {children}
      </p>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Official Source Card                                                       */
/* -------------------------------------------------------------------------- */

function OfficialSourceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="rounded-2xl border border-[#111827]/10 p-6">

      <div className="flex items-start justify-between gap-4">

        <div>

          <h3 className="text-xl font-extrabold text-[#111827]">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#111827]/60">
            {description}
          </p>

        </div>

        <ExternalLink
          size={20}
          className="shrink-0 text-[#2563EB]"
        />

      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#111827]"
      >
        Visit official website
        <ExternalLink size={15} />
      </a>

    </div>
  );
}