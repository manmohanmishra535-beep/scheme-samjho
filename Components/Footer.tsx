import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-700"
            >
              SchemeSamjho
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-600">
              Government schemes explained in simple language.
              Understand benefits, eligibility, documents and
              application steps without complicated wording.
            </p>

            <p className="mt-4 text-xs leading-5 text-gray-500">
              SchemeSamjho is an independent information platform
              and is not affiliated with the Government of India.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Explore
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                href="/schemes"
                className="text-gray-600 hover:text-blue-700"
              >
                All Schemes
              </Link>

              <Link
                href="/eligibility"
                className="text-gray-600 hover:text-blue-700"
              >
                Check Eligibility
              </Link>

              <Link
                href="/compare"
                className="text-gray-600 hover:text-blue-700"
              >
                Compare Schemes
              </Link>

              <Link
                href="/explainers"
                className="text-gray-600 hover:text-blue-700"
              >
                Explainers
              </Link>

              <Link
                href="/saved"
                className="text-gray-600 hover:text-blue-700"
              >
                Saved Schemes
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Company
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                href="/about"
                className="text-gray-600 hover:text-blue-700"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="text-gray-600 hover:text-blue-700"
              >
                Contact Us
              </Link>

              <Link
                href="/privacy"
                className="text-gray-600 hover:text-blue-700"
              >
                Privacy Policy
              </Link>

              <Link
                href="/disclaimer"
                className="text-gray-600 hover:text-blue-700"
              >
                Disclaimer
              </Link>
            </div>
          </div>
        </div>

        {/* Important notice */}
        <div className="mt-10 rounded-2xl bg-gray-50 p-5">
          <p className="text-xs leading-6 text-gray-600">
            <strong className="text-gray-800">
              Important:
            </strong>{" "}
            Scheme information, eligibility rules, benefits,
            documents and application procedures can change.
            Always verify the latest information on the relevant
            official government website before applying.
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-3 border-t pt-6 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} SchemeSamjho. All rights
            reserved.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="hover:text-blue-700"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="hover:text-blue-700"
            >
              Contact
            </Link>

            <Link
              href="/privacy"
              className="hover:text-blue-700"
            >
              Privacy
            </Link>

            <Link
              href="/disclaimer"
              className="hover:text-blue-700"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}