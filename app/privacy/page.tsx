import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Lock,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Learn how SchemeSamjho handles information when you use the website.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF]">

      {/* Hero */}
      <section className="bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFFFFF]/20 px-4 py-2 text-sm font-semibold text-[#FFFFFF]">
              <Lock size={16} />
              Privacy Policy
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.06] tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl">
              Your privacy matters.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#FFFFFF]/75 sm:text-lg">
              This page explains, in simple language, how
              SchemeSamjho handles information when you use
              this website.
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

          {/* Introduction */}
          <div className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/10">
                <ShieldCheck
                  size={21}
                  className="text-[#2563EB]"
                />
              </div>

              <div>

                <h2 className="text-xl font-extrabold text-[#111827]">
                  About this policy
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#111827]/65">
                  SchemeSamjho is an informational platform
                  that helps users understand government schemes
                  in simpler language. This Privacy Policy
                  describes the general approach to information
                  collected, used and stored through the website.
                </p>

              </div>

            </div>

          </div>

          {/* Policy sections */}
          <div className="mt-10 space-y-10">

            {/* 01 */}
            <PolicySection
              number="01"
              title="Information you provide"
            >
              <p>
                Depending on the features you use, you may
                provide information such as your email address
                when creating or using an account.
              </p>

              <p>
                Information entered into the eligibility
                checker may also be used to provide the
                requested preliminary scheme results.
              </p>

              <p>
                You should avoid entering unnecessary
                sensitive personal information into forms or
                fields that do not specifically request it.
              </p>
            </PolicySection>

            {/* 02 */}
            <PolicySection
              number="02"
              title="Account information"
            >
              <p>
                If you create an account, authentication may
                be handled through our authentication provider.
                Your account information is used to provide
                features such as signing in, saving schemes
                and accessing your account-related pages.
              </p>

              <p>
                If you use Google or another supported
                authentication method, information provided by
                that authentication service may be processed
                according to its own privacy policy as well.
              </p>
            </PolicySection>

            {/* 03 */}
            <PolicySection
              number="03"
              title="Saved schemes"
            >
              <p>
                When you save a government scheme while signed
                in, the website may store the saved scheme
                reference against your account so that it can
                be displayed again when you return.
              </p>

              <div className="mt-5 rounded-xl border border-[#111827]/10 bg-[#111827]/5 p-5">

                <div className="flex items-start gap-3">

                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-[#16A34A]"
                  />

                  <p className="text-sm leading-6 text-[#111827]/65">
                    Saved schemes are intended to make it easier
                    to return to information you have already
                    chosen to keep.
                  </p>

                </div>

              </div>
            </PolicySection>

            {/* 04 */}
            <PolicySection
              number="04"
              title="Eligibility checker"
            >
              <p>
                SchemeSamjho may use the information you enter
                into the eligibility checker to compare your
                answers with the scheme information available
                on the platform.
              </p>

              <p>
                Eligibility results are preliminary. They do
                not constitute an official government
                eligibility decision.
              </p>

              <p>
                Always verify your eligibility and the latest
                requirements with the relevant official
                government department or portal before applying.
              </p>
            </PolicySection>

            {/* 05 */}
            <PolicySection
              number="05"
              title="Website usage information"
            >
              <p>
                Like many websites, technical information may
                be processed to operate, secure and improve the
                website. This can include information such as
                browser type, device information, approximate
                usage information and technical error details.
              </p>

              <p>
                Such information may be provided directly by
                your browser or by services used to operate the
                website.
              </p>
            </PolicySection>

            {/* 06 */}
            <PolicySection
              number="06"
              title="Cookies and similar technologies"
            >
              <p>
                SchemeSamjho or services used by the website may
                use cookies or similar technologies where
                necessary for features such as authentication,
                session management, security or website
                functionality.
              </p>

              <p>
                Your browser may provide controls for managing
                cookies. Disabling certain cookies may affect
                some website functionality.
              </p>
            </PolicySection>

            {/* 07 */}
            <PolicySection
              number="07"
              title="How information may be used"
            >
              <p>
                Information may be used for purposes such as:
              </p>

              <ul className="mt-4 space-y-3">

                <PolicyListItem>
                  Providing and maintaining website features.
                </PolicyListItem>

                <PolicyListItem>
                  Managing user accounts and authentication.
                </PolicyListItem>

                <PolicyListItem>
                  Saving and displaying schemes selected by
                  signed-in users.
                </PolicyListItem>

                <PolicyListItem>
                  Responding to contact or support requests.
                </PolicyListItem>

                <PolicyListItem>
                  Improving website reliability, security and
                  usability.
                </PolicyListItem>

              </ul>
            </PolicySection>

            {/* 08 */}
            <PolicySection
              number="08"
              title="Third-party services"
            >
              <p>
                Some SchemeSamjho features may depend on
                third-party services for authentication,
                hosting, databases, analytics, communication or
                other technical functions.
              </p>

              <p>
                Those services may process information according
                to their own terms and privacy policies. Where
                appropriate, users should review the privacy
                information provided by those services.
              </p>
            </PolicySection>

            {/* 09 */}
            <PolicySection
              number="09"
              title="Government and official sources"
            >
              <p>
                SchemeSamjho links to official government
                websites and sources to help users verify scheme
                information.
              </p>

              <p>
                When you leave SchemeSamjho and visit an external
                government website, that website privacy policy,
                terms and data practices apply.
              </p>
            </PolicySection>

            {/* 10 */}
            <PolicySection
              number="10"
              title="Data security"
            >
              <p>
                Reasonable technical and organisational measures
                may be used to protect information handled by
                the website and its service providers.
              </p>

              <p>
                However, no internet transmission or electronic
                storage system can be guaranteed to be completely
                secure.
              </p>
            </PolicySection>

            {/* 11 */}
            <PolicySection
              number="11"
              title="Data retention"
            >
              <p>
                Information may be retained for as long as
                reasonably necessary to provide the relevant
                service, maintain an account, meet operational
                requirements or comply with applicable
                obligations.
              </p>
            </PolicySection>

            {/* 12 */}
            <PolicySection
              number="12"
              title="Children privacy"
            >
              <p>
                SchemeSamjho is an informational website and is
                not specifically designed to collect personal
                information from children.
              </p>

              <p>
                If you believe that personal information has
                been provided by a child without appropriate
                permission, please contact us so the situation
                can be reviewed.
              </p>
            </PolicySection>

            {/* 13 */}
            <PolicySection
              number="13"
              title="Changes to this policy"
            >
              <p>
                This Privacy Policy may be updated when the
                website, its features or its information
                practices change.
              </p>

              <p>
                The updated version will be published on this
                page with a revised update date.
              </p>
            </PolicySection>

            {/* 14 */}
            <PolicySection
              number="14"
              title="Contact"
            >
              <p>
                If you have a privacy-related question or want
                to contact SchemeSamjho about information handled
                through the website, you can contact us through
                the contact page.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
              >
                Contact SchemeSamjho
                <ArrowRight size={17} />
              </Link>

            </PolicySection>

          </div>

          {/* Important note */}
          <div className="mt-12 rounded-2xl bg-[#111827] p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <FileText
                size={22}
                className="mt-0.5 shrink-0 text-[#16A34A]"
              />

              <div>

                <h2 className="text-lg font-extrabold text-[#FFFFFF]">
                  Important
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#FFFFFF]/65">
                  This Privacy Policy is intended to explain
                  SchemeSamjho website practices in clear
                  language. It is not a substitute for legal
                  advice. If the website services or data
                  practices change, this policy should be
                  updated accordingly.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Bottom navigation */}
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

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition hover:text-[#111827]"
          >
            Back to homepage
            <ArrowRight size={16} />
          </Link>

        </div>

      </section>

    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Policy Section                                                             */
/* -------------------------------------------------------------------------- */

function PolicySection({
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

/* -------------------------------------------------------------------------- */
/* Policy List Item                                                           */
/* -------------------------------------------------------------------------- */

function PolicyListItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">

      <CheckCircle2
        size={18}
        className="mt-1 shrink-0 text-[#16A34A]"
      />

      <span>{children}</span>

    </li>
  );
}