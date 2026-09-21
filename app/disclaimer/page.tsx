import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Disclaimer",
  description:
    "Read the SchemeSamjho disclaimer about government scheme information, eligibility and application guidance.",
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF]">

      {/* Hero */}
      <section className="bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFFFFF]/20 px-4 py-2 text-sm font-semibold text-[#FFFFFF]">
              <AlertCircle size={16} />
              Important information
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.06] tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl">
              SchemeSamjho
              <br />
              disclaimer.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#FFFFFF]/75 sm:text-lg">
              Please read this information before relying on
              any scheme details, eligibility information or
              application guidance provided on this website.
            </p>

            <p className="mt-5 text-sm font-semibold text-[#FFFFFF]/55">
              Last updated: September 2026
            </p>

          </div>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">

          {/* Main notice */}
          <div className="rounded-2xl border border-[#111827]/10 bg-[#111827] p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <ShieldCheck
                size={24}
                className="mt-0.5 shrink-0 text-[#16A34A]"
              />

              <div>

                <h2 className="text-xl font-extrabold text-[#FFFFFF]">
                  SchemeSamjho is an informational platform
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#FFFFFF]/65">
                  SchemeSamjho explains government schemes in
                  simpler language to help users understand
                  benefits, eligibility, documents and general
                  application information.
                </p>

                <p className="mt-3 text-sm leading-7 text-[#FFFFFF]/65">
                  The website is not a government department,
                  government portal or official government
                  authority.
                </p>

              </div>

            </div>

          </div>

          {/* Sections */}
          <div className="mt-10 space-y-10">

            {/* 01 */}
            <DisclaimerSection
              number="01"
              title="Information is provided for general guidance"
            >
              <p>
                Information published on SchemeSamjho is intended
                to help users understand government schemes in
                simpler terms.
              </p>

              <p>
                The information should not be treated as an
                official government decision, notification,
                approval or legal determination.
              </p>
            </DisclaimerSection>

            {/* 02 */}
            <DisclaimerSection
              number="02"
              title="Official sources take priority"
            >
              <p>
                Government schemes may have detailed rules,
                notifications, deadlines, conditions and
                procedures that can change over time.
              </p>

              <p>
                Users should verify current information through
                the relevant official government website,
                department, notification or authorised channel
                before taking action.
              </p>

              <div className="mt-5 rounded-xl border border-[#111827]/10 bg-[#111827]/5 p-5">

                <div className="flex items-start gap-3">

                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-[#16A34A]"
                  />

                  <p className="text-sm leading-6 text-[#111827]/65">
                    When SchemeSamjho provides an official source
                    link, use that source to verify the latest
                    scheme information.
                  </p>

                </div>

              </div>
            </DisclaimerSection>

            {/* 03 */}
            <DisclaimerSection
              number="03"
              title="Eligibility information"
            >
              <p>
                SchemeSamjho may provide preliminary eligibility
                information based on the scheme data available
                on the platform.
              </p>

              <p>
                A result shown by the SchemeSamjho eligibility
                checker does not mean that a government
                department has approved or rejected your
                eligibility.
              </p>

              <p>
                Final eligibility depends on the applicable
                official rules and verification process.
              </p>
            </DisclaimerSection>

            {/* 04 */}
            <DisclaimerSection
              number="04"
              title="Benefits and financial information"
            >
              <p>
                Benefits, financial assistance, subsidies,
                coverage and other scheme details may depend on
                specific conditions and eligibility requirements.
              </p>

              <p>
                Amounts and benefits displayed on SchemeSamjho
                should be verified through the relevant official
                source before making financial or other decisions.
              </p>
            </DisclaimerSection>

            {/* 05 */}
            <DisclaimerSection
              number="05"
              title="Documents and application procedures"
            >
              <p>
                Document lists and application instructions shown
                on SchemeSamjho are provided as general guidance.
              </p>

              <p>
                The exact documents, forms, verification
                requirements, application channels and procedures
                may vary according to the applicable government
                rules.
              </p>

              <p>
                Always check the current requirements before
                submitting an application.
              </p>
            </DisclaimerSection>

            {/* 06 */}
            <DisclaimerSection
              number="06"
              title="No guarantee of approval"
            >
              <p>
                Information on SchemeSamjho does not guarantee
                that an application will be accepted or that a
                benefit will be provided.
              </p>

              <p>
                Approval, rejection, verification and benefit
                delivery are determined by the relevant
                government authority according to its applicable
                rules and procedures.
              </p>
            </DisclaimerSection>

            {/* 07 */}
            <DisclaimerSection
              number="07"
              title="Information may change"
            >
              <p>
                Government schemes can change because of new
                notifications, amendments, budget decisions,
                administrative changes or updated procedures.
              </p>

              <p>
                Although SchemeSamjho may display a last verified
                date for scheme information, users should still
                verify important details through the current
                official source.
              </p>
            </DisclaimerSection>

            {/* 08 */}
            <DisclaimerSection
              number="08"
              title="External websites"
            >
              <p>
                SchemeSamjho may link to government websites and
                other external websites for additional
                information.
              </p>

              <p>
                SchemeSamjho does not control the content,
                availability or policies of external websites.
              </p>

              <a
                href="https://www.myscheme.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#111827]"
              >
                Visit myScheme
                <ExternalLink size={15} />
              </a>

            </DisclaimerSection>

            {/* 09 */}
            <DisclaimerSection
              number="09"
              title="No professional advice"
            >
              <p>
                Content on SchemeSamjho is not intended to
                replace legal, financial, tax, professional or
                government advice.
              </p>

              <p>
                If your situation requires professional advice,
                consult the appropriate qualified professional or
                government authority.
              </p>
            </DisclaimerSection>

            {/* 10 */}
            <DisclaimerSection
              number="10"
              title="Accuracy and completeness"
            >
              <p>
                SchemeSamjho aims to present information clearly
                and accurately, but the website cannot guarantee
                that every piece of information is complete,
                current or error-free at all times.
              </p>

              <p>
                Users should independently verify important
                information before relying on it.
              </p>
            </DisclaimerSection>

            {/* 11 */}
            <DisclaimerSection
              number="11"
              title="Contact and corrections"
            >
              <p>
                If you find information that appears outdated,
                incomplete or incorrect, you can contact
                SchemeSamjho and provide the relevant details.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
              >
                Contact us
                <ArrowRight size={17} />
              </Link>
            </DisclaimerSection>

          </div>

          {/* Final notice */}
          <div className="mt-12 rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <FileText
                size={22}
                className="mt-0.5 shrink-0 text-[#2563EB]"
              />

              <div>

                <h2 className="text-xl font-extrabold text-[#111827]">
                  Before you apply
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#111827]/65">
                  Use SchemeSamjho to understand a scheme,
                  then verify the current eligibility,
                  documents, benefits, deadlines and application
                  process through the official government source.
                </p>

              </div>

            </div>

          </div>

          {/* CTA */}
          <div className="mt-10 rounded-2xl bg-[#111827] p-6 sm:p-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm font-bold text-[#16A34A]">
                  Continue exploring
                </p>

                <h2 className="mt-2 text-xl font-extrabold text-[#FFFFFF]">
                  Explore government schemes
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#FFFFFF]/60">
                  Discover schemes and read simple explanations
                  before checking the official source.
                </p>

              </div>

              <Link
                href="/schemes"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#FFFFFF] hover:text-[#111827]"
              >
                Browse schemes
                <ArrowRight size={17} />
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* Footer navigation */}
      <section className="border-t border-[#111827]/10 bg-[#111827]/5">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">

          <div>

            <p className="text-sm font-bold text-[#2563EB]">
              SchemeSamjho
            </p>

            <p className="mt-1 text-sm text-[#111827]/60">
              Government schemes explained simply.
            </p>

          </div>

          <div className="flex flex-wrap gap-5">

            <Link
              href="/privacy"
              className="text-sm font-semibold text-[#111827]/60 transition hover:text-[#2563EB]"
            >
              Privacy
            </Link>

            <Link
              href="/contact"
              className="text-sm font-semibold text-[#111827]/60 transition hover:text-[#2563EB]"
            >
              Contact
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition hover:text-[#111827]"
            >
              Home
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Disclaimer Section                                                         */
/* -------------------------------------------------------------------------- */

function DisclaimerSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>

      <div className="flex items-start gap-4">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2563EB] text-xs font-extrabold text-[#FFFFFF]">
          {number}
        </div>

        <div className="min-w-0 flex-1">

          <h2 className="text-2xl font-extrabold tracking-tight text-[#111827]">
            {title}
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-[#111827]/65">
            {children}
          </div>

        </div>

      </div>

    </section>
  );
}