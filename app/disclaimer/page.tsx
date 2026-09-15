import Link from "next/link";

export const metadata = {
  title: "Disclaimer | SchemeSamjho",
  description: "Disclaimer for SchemeSamjho.",
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            SchemeSamjho
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
            Disclaimer
          </h1>

          <p className="mt-4 text-sm text-gray-500">
            Last updated: September 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl border bg-white p-6 shadow-sm md:p-10">
          {/* Main notice */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-xl font-bold text-gray-900">
              Important Notice
            </h2>

            <p className="mt-3 leading-7 text-gray-700">
              SchemeSamjho is an independent information platform. It is not
              an official website of the Government of India, any State
              Government, or any government department.
            </p>
          </div>

          <div className="mt-10 space-y-10">
            {/* 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                1. Information Purpose
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                The information available on SchemeSamjho is provided for
                general informational and educational purposes. Our goal is to
                make government scheme information easier to understand.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                We do not provide government services, approve applications,
                issue benefits, or make official eligibility decisions.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                2. Eligibility Checker
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                SchemeSamjho may provide an eligibility checker that compares
                information entered by a user with the scheme information
                available in our database.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                The result is only a preliminary indication. It should not be
                considered an official determination that you are eligible or
                ineligible for a government scheme.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Final eligibility is determined by the relevant government
                authority according to the current rules and verification
                process.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                3. Scheme Information Can Change
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Government schemes may change over time. Eligibility
                requirements, benefits, income limits, documents, deadlines,
                application procedures, and other conditions may be updated by
                the relevant authorities.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Although we aim to keep information useful and accurate, we
                cannot guarantee that every piece of information is complete,
                current, or error-free at all times.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                4. Always Verify Official Information
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Before making a decision or submitting an application, users
                should verify the latest information through the relevant
                official government website or department.
              </p>

              <div className="mt-5 rounded-2xl border bg-gray-50 p-5">
                <p className="text-sm font-semibold text-gray-900">
                  A simple rule:
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Use SchemeSamjho to understand a scheme. Use the official
                  government source to verify it and apply.
                </p>
              </div>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                5. External Links
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                SchemeSamjho may provide links to external websites, including
                official government portals.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                We do not control external websites and are not responsible for
                their content, availability, privacy practices, or policies.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                6. No Government Affiliation
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                SchemeSamjho does not claim to represent any government
                authority. The use of government scheme names, logos, or
                references on the website does not imply government
                endorsement, partnership, or affiliation.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                7. No Guarantee of Benefits
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Information on SchemeSamjho should not be interpreted as a
                guarantee that a user will receive a subsidy, financial
                assistance, insurance benefit, loan, pension, scholarship, or
                any other government benefit.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Approval depends on the rules, verification, documentation, and
                decisions of the relevant authority.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                8. Limitation of Responsibility
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Users are responsible for independently verifying information
                before relying on it for applications, financial decisions, or
                other important decisions.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                SchemeSamjho should not be treated as a substitute for official
                government guidance or professional advice where such advice
                is required.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                9. Changes to This Disclaimer
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                We may update this Disclaimer as the SchemeSamjho website and
                its features develop. Changes will be reflected on this page.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                10. Contact Us
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                If you find information that appears incorrect or outdated,
                please contact us and provide the relevant scheme and details.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
              >
                Contact SchemeSamjho
              </Link>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}