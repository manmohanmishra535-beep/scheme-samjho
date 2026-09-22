"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Save,
} from "lucide-react";

type SchemeForm = {
  name: string;
  slug: string;
  category: string;
  short_description: string;
  description: string;
  benefits: string;
  documents: string;
  occupations: string;
  exclusions: string;
  min_age: string;
  max_age: string;
  max_income: string;
  eligibility_summary: string;
  last_verified: string;
  official_url: string;
};

const initialForm: SchemeForm = {
  name: "",
  slug: "",
  category: "",
  short_description: "",
  description: "",
  benefits: "",
  documents: "",
  occupations: "",
  exclusions: "",
  min_age: "",
  max_age: "",
  max_income: "",
  eligibility_summary: "",
  last_verified: "",
  official_url: "",
};

export default function AddSchemePage() {
  const router = useRouter();

  const [form, setForm] =
    useState<SchemeForm>(initialForm);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  function update(
    field: keyof SchemeForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleNameChange(value: string) {
    setForm((current) => ({
      ...current,
      name: value,
      slug:
        current.slug === "" ||
        current.slug ===
          generateSlug(current.name)
          ? generateSlug(value)
          : current.slug,
    }));
  }

  async function saveScheme(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        "/api/admin/schemes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            slug: form.slug.trim(),
            category: form.category.trim(),

            short_description:
              form.short_description.trim(),

            description:
              form.description.trim(),

            benefits: form.benefits
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),

            documents: form.documents
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),

            occupations: form.occupations
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),

            exclusions: form.exclusions
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),

            min_age:
              form.min_age === ""
                ? null
                : Number(form.min_age),

            max_age:
              form.max_age === ""
                ? null
                : Number(form.max_age),

            max_income:
              form.max_income === ""
                ? null
                : Number(form.max_income),

            eligibility_summary:
              form.eligibility_summary.trim(),

            last_verified:
              form.last_verified.trim(),

            official_url:
              form.official_url.trim(),
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Unable to create scheme."
        );
      }

      router.push("/admin/schemes");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="border-b border-[#111827]/10 bg-[#FFFFFF]">
        <div className="mx-auto flex min-h-20 max-w-5xl items-center gap-4 px-6">
          <Link
            href="/admin/schemes"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#111827]/10 text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
            aria-label="Back to schemes"
          >
            <ArrowLeft size={18} />
          </Link>

          <div>
            <p className="text-xs font-bold tracking-wide text-[#2563EB]">
              ADMIN
            </p>

            <h1 className="text-xl font-bold text-[#111827]">
              Add New Scheme
            </h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Intro */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#111827]">
            Add Government Scheme
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#111827]/70">
            Add accurate scheme information using
            the official government source.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-[#111827]/10 bg-[#FFFFFF] p-4">
            <p className="text-sm font-semibold text-[#111827]">
              {error}
            </p>
          </div>
        )}

        <form
          onSubmit={saveScheme}
          className="space-y-6"
        >
          {/* Basic Information */}
          <section className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6">
            <h3 className="text-xl font-bold text-[#111827]">
              Basic Information
            </h3>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field
                label="Scheme Name"
                value={form.name}
                onChange={handleNameChange}
                placeholder="PM-KISAN"
                required
              />

              <Field
                label="Slug"
                value={form.slug}
                onChange={(value) =>
                  update("slug", value)
                }
                placeholder="pm-kisan"
                required
              />

              <Field
                label="Category"
                value={form.category}
                onChange={(value) =>
                  update("category", value)
                }
                placeholder="Agriculture"
                required
              />

              <Field
                label="Last Verified"
                value={form.last_verified}
                onChange={(value) =>
                  update(
                    "last_verified",
                    value
                  )
                }
                placeholder="September 2026"
                required
              />
            </div>

            <TextArea
              label="Short Description"
              value={form.short_description}
              onChange={(value) =>
                update(
                  "short_description",
                  value
                )
              }
              placeholder="A short explanation of the scheme."
              required
            />

            <TextArea
              label="Full Description"
              value={form.description}
              onChange={(value) =>
                update(
                  "description",
                  value
                )
              }
              placeholder="Explain the scheme in simple language."
              required
            />
          </section>

          {/* Benefits */}
          <section className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6">
            <h3 className="text-xl font-bold text-[#111827]">
              Benefits
            </h3>

            <TextArea
              label="Benefits — one per line"
              value={form.benefits}
              onChange={(value) =>
                update("benefits", value)
              }
              placeholder={`Financial assistance
Training support
Insurance coverage`}
            />
          </section>

          {/* Eligibility */}
          <section className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6">
            <h3 className="text-xl font-bold text-[#111827]">
              Eligibility
            </h3>

            <TextArea
              label="Eligibility Summary"
              value={
                form.eligibility_summary
              }
              onChange={(value) =>
                update(
                  "eligibility_summary",
                  value
                )
              }
              placeholder="Explain who can apply for this scheme."
              required
            />

            <TextArea
              label="Exclusions — one per line"
              value={form.exclusions}
              onChange={(value) =>
                update(
                  "exclusions",
                  value
                )
              }
              placeholder={`People who are not eligible
Specific excluded categories`}
            />
          </section>

          {/* Age and Income */}
          <section className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6">
            <h3 className="text-xl font-bold text-[#111827]">
              Age & Income
            </h3>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <Field
                label="Minimum Age"
                type="number"
                value={form.min_age}
                onChange={(value) =>
                  update(
                    "min_age",
                    value
                  )
                }
                placeholder="18"
              />

              <Field
                label="Maximum Age"
                type="number"
                value={form.max_age}
                onChange={(value) =>
                  update(
                    "max_age",
                    value
                  )
                }
                placeholder="60"
              />

              <Field
                label="Maximum Income"
                type="number"
                value={form.max_income}
                onChange={(value) =>
                  update(
                    "max_income",
                    value
                  )
                }
                placeholder="500000"
              />
            </div>

            <p className="mt-3 text-xs leading-5 text-[#111827]/60">
              Leave these fields empty when the
              scheme does not have a simple
              applicable limit.
            </p>
          </section>

          {/* Occupation */}
          <section className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6">
            <h3 className="text-xl font-bold text-[#111827]">
              Occupations
            </h3>

            <Field
              label="Occupations — comma separated"
              value={form.occupations}
              onChange={(value) =>
                update(
                  "occupations",
                  value
                )
              }
              placeholder="Farmer, Worker, Artisan"
            />
          </section>

          {/* Documents */}
          <section className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6">
            <h3 className="text-xl font-bold text-[#111827]">
              Required Documents
            </h3>

            <TextArea
              label="Documents — one per line"
              value={form.documents}
              onChange={(value) =>
                update(
                  "documents",
                  value
                )
              }
              placeholder={`Aadhaar Card
Bank account details
Income certificate`}
            />
          </section>

          {/* Official Source */}
          <section className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6">
            <h3 className="text-xl font-bold text-[#111827]">
              Official Source
            </h3>

            <Field
              label="Official Website URL"
              value={form.official_url}
              onChange={(value) =>
                update(
                  "official_url",
                  value
                )
              }
              placeholder="https://..."
              required
            />
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/schemes"
              className="inline-flex items-center justify-center rounded-lg border border-[#111827]/10 bg-[#FFFFFF] px-6 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-[#FFFFFF] transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />

              {saving
                ? "Saving..."
                : "Save Scheme"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

/* =====================================
   INPUT
===================================== */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#111827]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-lg border border-[#111827]/15 bg-[#FFFFFF] px-4 py-3 text-sm text-[#111827] outline-none transition placeholder:text-[#111827]/40 focus:border-[#2563EB]"
      />
    </div>
  );
}

/* =====================================
   TEXTAREA
===================================== */

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="mt-5">
      <label className="mb-2 block text-sm font-semibold text-[#111827]">
        {label}
      </label>

      <textarea
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        rows={5}
        className="w-full resize-y rounded-lg border border-[#111827]/15 bg-[#FFFFFF] px-4 py-3 text-sm leading-6 text-[#111827] outline-none transition placeholder:text-[#111827]/40 focus:border-[#2563EB]"
      />
    </div>
  );
}