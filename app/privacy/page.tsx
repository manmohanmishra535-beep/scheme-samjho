import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | SchemeSamjho",
  description: "Privacy Policy for SchemeSamjho.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            SchemeSamjho
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-gray-500">
            Last updated: September 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl border bg-white p-6 shadow-sm md:p-10">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900">
              1. Introduction
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Welcome to SchemeSamjho. SchemeSamjho is an independent
              information platform designed to make government scheme
              information easier to discover and understand.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              This Privacy Policy explains what information may be collected
              when you use our website and how that information is handled.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-gray-900">
              2. Information We Collect
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              SchemeSamjho is designed to minimize the amount of personal
              information required to use the website.
            </p>

            <h3 className="mt-6 text-lg font-bold text-gray-900">
              Information you provide
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              If you use our contact form, you may provide information such as
              your name, email address, subject, and message.
            </p>

            <h3 className="mt-6 text-lg font-bold text-gray-900">
              Saved schemes
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Schemes saved using the Save Scheme feature are currently stored
              locally in your browser using browser storage. This information
              is not currently sent to our server.
            </p>

            <h3 className="mt-6 text-lg font-bold text-gray-900">
              Eligibility information
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Information entered into the eligibility checker is used to
              provide a preliminary result. In the current version of
              SchemeSamjho, this information is processed within the website
              and is not intended to be submitted as an official government
              application.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-gray-900">
              3. How We Use Information
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Information provided through the website may be used to:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
              <li>Respond to enquiries and feedback.</li>
              <li>Improve the website and its features.</li>
              <li>Review reports about potentially incorrect information.</li>
              <li>Improve the overall user experience.</li>
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-gray-900">
              4. Cookies and Local Storage
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              SchemeSamjho may use browser technologies such as local storage
              to provide features such as saving schemes.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Browser storage can be cleared through your browser settings.
              Clearing browser data may remove schemes you previously saved.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-gray-900">
              5. Third-Party Websites
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              SchemeSamjho may provide links to official government websites
              and other external websites. When you leave SchemeSamjho and
              visit another website, that website&apos;s own privacy policy and
              terms may apply.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              We recommend reviewing the privacy practices of external
              websites before providing them with personal information.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-gray-900">
              6. Data Security
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We aim to use reasonable measures to protect information handled
              through the website. However, no internet-based service can
              guarantee absolute security.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-gray-900">
              7. Children&apos;s Privacy
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              SchemeSamjho is an informational website intended for a general
              audience. We do not knowingly seek to collect personal
              information from children.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-gray-900">
              8. Changes to This Policy
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              This Privacy Policy may be updated as SchemeSamjho develops new
              features or changes how information is handled. Any updated
              version will be published on this page.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-gray-900">
              9. Contact
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If you have questions about this Privacy Policy, you can contact
              us through the SchemeSamjho contact page.
            </p>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
              >
                Contact Us
              </Link>
            </div>

            <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm leading-6 text-gray-700">
                <strong>Important:</strong> This page is a general privacy
                policy template for the SchemeSamjho project. Before launching
                the website publicly, it should be reviewed and adapted to the
                actual data collection, analytics, hosting, contact-form
                provider, cookies, and other services used by the production
                website.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}