"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { schemes } from "../../../../../data/schemes";

export default function EditSchemePage() {
  const params = useParams();

  const id =
    typeof params.id === "string"
      ? params.id
      : "";

  const scheme = useMemo(
    () =>
      schemes.find(
        (item) =>
          item.slug === id
      ),
    [id]
  );

  const [name, setName] = useState(
    scheme?.name ?? ""
  );

  const [category, setCategory] =
    useState(scheme?.category ?? "");

  const [description, setDescription] =
    useState(
      scheme?.description ?? ""
    );

  const [message, setMessage] =
    useState("");

  if (!scheme) {
    return (
      <main className="min-h-screen bg-[#F9FAFB]">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-10">

          <Link
            href="/admin/schemes"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB]"
          >
            <ArrowLeft size={17} />
            Back to schemes
          </Link>

          <div className="mt-8 rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-8">
            <h1 className="text-2xl font-extrabold text-[#111827]">
              Scheme not found
            </h1>

            <p className="mt-3 text-sm text-[#111827]/65">
              No scheme was found for this ID.
            </p>
          </div>

        </div>
      </main>
    );
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    /*
     * This page currently edits local scheme data only.
     * A database/API connection can be added later.
     */

    setMessage(
      "Changes are ready to be connected to your database."
    );
  }

  return (
    <main className="min-h-screen bg-[#F9FAFB]">

      {/* Header */}

      <section className="bg-[#111827]">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-10">

          <Link
            href="/admin/schemes"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#FFFFFF] transition hover:text-[#16A34A]"
          >
            <ArrowLeft size={17} />
            Back to schemes
          </Link>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.12em] text-[#16A34A]">
            Admin
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#FFFFFF]">
            Edit scheme
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-[#FFFFFF]/70">
            Update the basic information for this
            government scheme.
          </p>

        </div>
      </section>

      {/* Form */}

      <section>
        <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 lg:px-10">

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6 sm:p-8"
          >

            {/* Scheme name */}

            <div>
              <label
                htmlFor="scheme-name"
                className="mb-2 block text-sm font-bold text-[#111827]"
              >
                Scheme name
              </label>

              <input
                id="scheme-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                className="h-12 w-full rounded-xl border border-[#111827]/15 px-4 text-sm font-medium text-[#111827] outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Category */}

            <div className="mt-6">
              <label
                htmlFor="scheme-category"
                className="mb-2 block text-sm font-bold text-[#111827]"
              >
                Category
              </label>

              <input
                id="scheme-category"
                type="text"
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target.value
                  )
                }
                className="h-12 w-full rounded-xl border border-[#111827]/15 px-4 text-sm font-medium text-[#111827] outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Description */}

            <div className="mt-6">
              <label
                htmlFor="scheme-description"
                className="mb-2 block text-sm font-bold text-[#111827]"
              >
                Description
              </label>

              <textarea
                id="scheme-description"
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
                rows={7}
                className="w-full resize-y rounded-xl border border-[#111827]/15 px-4 py-3 text-sm font-medium leading-6 text-[#111827] outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Scheme information */}

            <div className="mt-6 rounded-xl border border-[#111827]/10 bg-[#F9FAFB] p-4">

              <p className="text-xs font-bold uppercase tracking-wide text-[#111827]/50">
                Scheme ID
              </p>

              <p className="mt-1 text-sm font-semibold text-[#111827]">
                {scheme.slug}
              </p>

            </div>

            {/* Message */}

            {message && (
              <div className="mt-6 rounded-xl border border-[#16A34A]/30 bg-[#16A34A]/10 px-4 py-3 text-sm font-semibold text-[#16A34A]">
                {message}
              </div>
            )}

            {/* Actions */}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <Link
                href="/admin/schemes"
                className="inline-flex items-center justify-center rounded-xl border border-[#111827]/15 px-5 py-3 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
              >
                <Save size={17} />
                Save changes
              </button>

            </div>

          </form>

        </div>
      </section>

    </main>
  );
}