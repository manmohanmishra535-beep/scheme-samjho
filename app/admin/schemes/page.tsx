"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  FilePlus2,
  Loader2,
} from "lucide-react";

type AdminScheme = {
  id: string;
  name: string;
  slug: string;
  category: string;
  short_description: string;
  last_verified: string;
  official_url: string;
  created_at: string;
};

export default function ManageSchemesPage() {
  const [schemes, setSchemes] = useState<
    AdminScheme[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadSchemes() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/admin/schemes",
          {
            cache: "no-store",
          }
        );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.error ||
              "Unable to load schemes."
          );
        }

        setSchemes(
          result.schemes ?? []
        );
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    void loadSchemes();
  }, []);

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="border-b border-[#111827]/10 bg-[#FFFFFF]">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#111827]/10 text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
              aria-label="Back to admin"
            >
              <ArrowLeft size={18} />
            </Link>

            <div>
              <p className="text-xs font-bold tracking-wide text-[#2563EB]">
                ADMIN
              </p>

              <h1 className="text-xl font-bold text-[#111827]">
                Manage Schemes
              </h1>
            </div>
          </div>

          <Link
            href="/admin/schemes/new"
            className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-[#FFFFFF] transition hover:bg-[#111827]"
          >
            <FilePlus2 size={17} />
            <span className="hidden sm:inline">
              Add Scheme
            </span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-7">
          <h2 className="text-3xl font-bold text-[#111827]">
            All Schemes
          </h2>

          <p className="mt-2 text-sm text-[#111827]/70">
            Manage the schemes available on
            SchemeSamjho.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-48 items-center justify-center rounded-2xl border border-[#111827]/10 bg-[#FFFFFF]">
            <div className="flex items-center gap-3 text-sm font-semibold text-[#111827]">
              <Loader2
                size={20}
                className="animate-spin text-[#2563EB]"
              />
              Loading schemes...
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6">
            <h3 className="font-bold text-[#111827]">
              Unable to load schemes
            </h3>

            <p className="mt-2 text-sm text-[#111827]/70">
              {error}
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          schemes.length === 0 && (
            <div className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-10 text-center">
              <h3 className="text-xl font-bold text-[#111827]">
                No schemes yet
              </h3>

              <p className="mt-2 text-sm text-[#111827]/70">
                Add your first scheme to the
                database.
              </p>

              <Link
                href="/admin/schemes/new"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-[#FFFFFF]"
              >
                <FilePlus2 size={17} />
                Add First Scheme
              </Link>
            </div>
          )}

        {/* Scheme table */}
        {!loading &&
          !error &&
          schemes.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-[#111827]/10 bg-[#FFFFFF]">
              {/* Desktop table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-[#111827]/10 bg-[#F9FAFB]">
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#111827]">
                        Scheme
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#111827]">
                        Category
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#111827]">
                        Verified
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-[#111827]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {schemes.map(
                      (scheme) => (
                        <tr
                          key={scheme.id}
                          className="border-b border-[#111827]/10 last:border-0"
                        >
                          <td className="px-6 py-5">
                            <div>
                              <p className="font-bold text-[#111827]">
                                {scheme.name}
                              </p>

                              <p className="mt-1 text-xs text-[#111827]/60">
                                /{scheme.slug}
                              </p>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <span className="text-sm font-semibold text-[#111827]">
                              {scheme.category}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <span className="text-sm text-[#111827]/70">
                              {scheme.last_verified}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/schemes/${scheme.slug}`}
                                target="_blank"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#111827]/10 text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
                                title="View scheme"
                              >
                                <ExternalLink
                                  size={16}
                                />
                              </Link>

                              <Link
                                href={`/admin/schemes/${scheme.id}/edit`}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-[#FFFFFF] transition hover:bg-[#111827]"
                                title="Edit scheme"
                              >
                                <Edit
                                  size={16}
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="divide-y divide-[#111827]/10 md:hidden">
                {schemes.map(
                  (scheme) => (
                    <div
                      key={scheme.id}
                      className="p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-[#111827]">
                            {scheme.name}
                          </h3>

                          <p className="mt-1 text-xs text-[#111827]/60">
                            {scheme.category}
                          </p>
                        </div>

                        <span className="text-xs font-semibold text-[#16A34A]">
                          Verified
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-[#111827]/70">
                        {scheme.short_description}
                      </p>

                      <div className="mt-4 flex gap-2">
                        <Link
                          href={`/schemes/${scheme.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-2 rounded-lg border border-[#111827]/10 px-3 py-2 text-sm font-semibold text-[#111827]"
                        >
                          <ExternalLink
                            size={15}
                          />
                          View
                        </Link>

                        <Link
                          href={`/admin/schemes/${scheme.id}/edit`}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-3 py-2 text-sm font-semibold text-[#FFFFFF]"
                        >
                          <Edit size={15} />
                          Edit
                        </Link>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
      </div>
    </main>
  );
}