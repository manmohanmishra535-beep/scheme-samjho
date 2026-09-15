"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
              Contact SchemeSamjho
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              We’d love to hear from you.
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Found something incorrect, have a suggestion, or simply want to
              get in touch? Send us a message.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact options */}
          <div className="space-y-5">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                💡
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                Suggestions
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Have an idea that could make SchemeSamjho easier or more useful?
                We’d like to hear it.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-xl">
                ⚠️
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                Report incorrect information
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Government scheme rules can change. Tell us if you find
                information that appears outdated or incorrect.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
                ✉️
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                General enquiries
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                For general questions about SchemeSamjho, use the contact form
                and we’ll review your message.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">
                    ✓
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-gray-900">
                    Message received
                  </h2>

                  <p className="mx-auto mt-3 max-w-md text-gray-600">
                    Thanks for getting in touch. This contact form is currently
                    a prototype, so no email has actually been sent.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Send us a message
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Please provide enough detail for us to understand your
                      question or feedback.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-medium text-gray-800"
                        >
                          Name
                        </label>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your name"
                          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-gray-800"
                        >
                          Email
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-2 block text-sm font-medium text-gray-800"
                      >
                        Subject
                      </label>

                      <select
                        id="subject"
                        name="subject"
                        required
                        defaultValue=""
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="" disabled>
                          Select a subject
                        </option>
                        <option value="suggestion">Suggestion</option>
                        <option value="incorrect-information">
                          Report incorrect information
                        </option>
                        <option value="general">General enquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium text-gray-800"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={7}
                        placeholder="Write your message here..."
                        className="w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                      <p className="text-sm leading-6 text-blue-900">
                        <strong>Important:</strong> SchemeSamjho is an
                        independent information platform. For official
                        applications, eligibility decisions, or complaints
                        about government services, please contact the relevant
                        government department or use the official scheme
                        website.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                    >
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Helpful links */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gray-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">
              Looking for something else?
            </h2>

            <p className="mt-2 text-gray-600">
              You may find what you need directly on one of these pages.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/schemes"
                className="rounded-xl border bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-blue-300 hover:text-blue-600"
              >
                Browse Schemes
              </Link>

              <Link
                href="/eligibility"
                className="rounded-xl border bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-blue-300 hover:text-blue-600"
              >
                Check Eligibility
              </Link>

              <Link
                href="/explainers"
                className="rounded-xl border bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-blue-300 hover:text-blue-600"
              >
                Read Explainers
              </Link>

              <Link
                href="/about"
                className="rounded-xl border bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-blue-300 hover:text-blue-600"
              >
                About SchemeSamjho
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prototype notice */}
      <section className="bg-gray-50 px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs leading-5 text-gray-500">
            Contact form prototype — messages are not currently connected to
            an email or backend service.
          </p>
        </div>
      </section>
    </main>
  );
}