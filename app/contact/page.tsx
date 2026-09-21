import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  CheckCircle2,
  Mail,
  Search,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Contact SchemeSamjho",
  description:
    "Contact SchemeSamjho for feedback, corrections, suggestions and general questions about the platform.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF]">

      {/* Hero */}
      <section className="bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFFFFF]/20 px-4 py-2 text-sm font-semibold text-[#FFFFFF]">
              <MessageSquare size={16} />
              Contact SchemeSamjho
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.06] tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl">
              Have a question,
              <br />
              suggestion or correction?
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#FFFFFF]/75 sm:text-lg">
              We welcome feedback that can help make SchemeSamjho
              clearer and more useful.
            </p>

          </div>

        </div>
      </section>

      {/* Main */}
      <section>

        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">

          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">

            {/* Contact form */}
            <div className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6 sm:p-8">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/10">
                  <Mail
                    size={21}
                    className="text-[#2563EB]"
                  />
                </div>

                <div>

                  <h2 className="text-2xl font-extrabold text-[#111827]">
                    Send us a message
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#111827]/60">
                    Use the form below to share your feedback or
                    question.
                  </p>

                </div>

              </div>

              <form
                action="mailto:contact@schemesamjho.in"
                method="post"
                encType="text/plain"
                className="mt-8 space-y-5"
              >

                {/* Name */}
                <div>

                  <label
                    htmlFor="name"
                    className="text-sm font-bold text-[#111827]"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="Name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="mt-2 h-12 w-full rounded-xl border border-[#111827]/15 bg-[#FFFFFF] px-4 text-sm text-[#111827] outline-none placeholder:text-[#111827]/35 transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                  />

                </div>

                {/* Email */}
                <div>

                  <label
                    htmlFor="email"
                    className="text-sm font-bold text-[#111827]"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="Email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="mt-2 h-12 w-full rounded-xl border border-[#111827]/15 bg-[#FFFFFF] px-4 text-sm text-[#111827] outline-none placeholder:text-[#111827]/35 transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                  />

                </div>

                {/* Subject */}
                <div>

                  <label
                    htmlFor="subject"
                    className="text-sm font-bold text-[#111827]"
                  >
                    Subject
                  </label>

                  <select
                    id="subject"
                    name="Subject"
                    defaultValue=""
                    required
                    className="mt-2 h-12 w-full rounded-xl border border-[#111827]/15 bg-[#FFFFFF] px-4 text-sm text-[#111827] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                  >

                    <option
                      value=""
                      disabled
                    >
                      Select a topic
                    </option>

                    <option value="Feedback">
                      General feedback
                    </option>

                    <option value="Correction">
                      Report incorrect information
                    </option>

                    <option value="Suggestion">
                      Suggest a feature
                    </option>

                    <option value="Question">
                      General question
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

                {/* Message */}
                <div>

                  <label
                    htmlFor="message"
                    className="text-sm font-bold text-[#111827]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="Message"
                    rows={6}
                    placeholder="Write your message..."
                    required
                    className="mt-2 w-full resize-y rounded-xl border border-[#111827]/15 bg-[#FFFFFF] px-4 py-3 text-sm leading-6 text-[#111827] outline-none placeholder:text-[#111827]/35 transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                  />

                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3.5 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
                >
                  Send message
                  <ArrowRight size={17} />
                </button>

              </form>

            </div>

            {/* Information */}
            <div className="space-y-6">

              {/* Email */}
              <div className="rounded-2xl bg-[#111827] p-6 sm:p-8">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]">
                  <Mail
                    size={21}
                    className="text-[#FFFFFF]"
                  />
                </div>

                <h2 className="mt-6 text-xl font-extrabold text-[#FFFFFF]">
                  Email us
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#FFFFFF]/65">
                  For general questions, feedback or corrections,
                  you can contact us by email.
                </p>

                <a
                  href="mailto:contact@schemesamjho.in"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#FFFFFF] transition hover:text-[#2563EB]"
                >
                  contact@schemesamjho.in
                  <ArrowRight size={15} />
                </a>

              </div>

              {/* Corrections */}
              <div className="rounded-2xl border border-[#111827]/10 p-6 sm:p-8">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#16A34A]/10">
                  <CheckCircle2
                    size={21}
                    className="text-[#16A34A]"
                  />
                </div>

                <h2 className="mt-5 text-xl font-extrabold text-[#111827]">
                  Found incorrect information?
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#111827]/60">
                  Tell us which scheme or page contains the issue
                  and include the information you believe needs to
                  be corrected.
                </p>

              </div>

              {/* Important */}
              <div className="rounded-2xl border border-[#111827]/10 bg-[#111827]/5 p-6 sm:p-8">

                <div className="flex items-start gap-3">

                  <ShieldCheck
                    size={21}
                    className="mt-0.5 shrink-0 text-[#16A34A]"
                  />

                  <div>

                    <h2 className="text-sm font-extrabold text-[#111827]">
                      Important
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#111827]/60">
                      SchemeSamjho does not make government
                      eligibility decisions and cannot approve,
                      reject or process scheme applications.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Before contacting */}
      <section className="bg-[#111827]/5">

        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">

          <div className="text-center">

            <p className="text-sm font-bold text-[#2563EB]">
              You may find the answer here
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#111827]">
              Explore SchemeSamjho
            </h2>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            <ActionCard
              icon={<BookOpen size={21} />}
              title="Browse schemes"
              description="Explore government schemes by category and other available filters."
              href="/schemes"
            />

            <ActionCard
              icon={<Search size={21} />}
              title="Check eligibility"
              description="Use the preliminary eligibility tool to explore potentially relevant schemes."
              href="/eligibility"
            />

            <ActionCard
              icon={<FileText size={21} />}
              title="Read explainers"
              description="Learn about selected schemes through simple, structured explanations."
              href="/explainers"
            />

          </div>

        </div>

      </section>

      {/* Disclaimer */}
      <section>

        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">

          <div className="rounded-2xl border border-[#111827]/10 p-6">

            <p className="text-xs font-bold uppercase tracking-wide text-[#2563EB]">
              Note
            </p>

            <p className="mt-3 text-sm leading-6 text-[#111827]/60">
              For questions about a specific application, payment,
              beneficiary status or official eligibility decision,
              contact the relevant government department or use the
              official scheme portal. SchemeSamjho is an independent
              informational platform.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Action Card                                                                */
/* -------------------------------------------------------------------------- */

function ActionCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6 transition hover:-translate-y-1 hover:border-[#2563EB]/30"
    >

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-extrabold text-[#111827]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#111827]/60">
        {description}
      </p>

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition group-hover:text-[#111827]">
        Explore
        <ArrowRight size={16} />
      </span>

    </Link>
  );
}