import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50 text-5xl">
          🔎
        </div>

        {/* Error */}
        <p className="mt-8 text-7xl font-extrabold tracking-tight text-blue-700">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Scheme not found
        </h1>

        <p className="mx-auto mt-4 max-w-md leading-7 text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Don&apos;t worry — there are plenty of schemes to explore.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            Go to Home
          </Link>

          <Link
            href="/schemes"
            className="rounded-xl border border-blue-200 bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Explore Schemes
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-10 border-t pt-8">
          <p className="text-sm font-semibold text-gray-700">
            You can also try
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/eligibility"
              className="text-blue-700 hover:underline"
            >
              Check Eligibility
            </Link>

            <Link
              href="/compare"
              className="text-blue-700 hover:underline"
            >
              Compare Schemes
            </Link>

            <Link
              href="/explainers"
              className="text-blue-700 hover:underline"
            >
              Read Explainers
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}