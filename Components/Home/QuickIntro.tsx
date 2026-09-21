import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Search,
} from "lucide-react";

export default function QuickIntro() {
  return (
    <section className="bg-[#FFFFFF] py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left */}
          <div>

            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#2563EB]">
              SchemeSamjho
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
              Government schemes can be difficult to understand.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#111827]/70 sm:text-lg">
              SchemeSamjho brings important scheme information together and
              explains it in a way that is easier to read and understand.
            </p>

            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 text-base font-bold text-[#2563EB] transition hover:text-[#111827]"
            >
              Learn more about SchemeSamjho
              <ArrowRight size={17} />
            </Link>

          </div>

          {/* Right */}
          <div className="rounded-3xl border border-[#111827]/10 bg-[#FFFFFF] p-6 shadow-lg shadow-[#111827]/5 sm:p-8">

            <div className="grid gap-5 sm:grid-cols-2">

              {/* Discover */}
              <div className="rounded-2xl bg-[#2563EB]/10 p-5">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] text-[#FFFFFF]">
                  <Search size={20} />
                </div>

                <h3 className="text-lg font-bold text-[#111827]">
                  Discover
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#111827]/70">
                  Browse schemes based on your needs and category.
                </p>

              </div>

              {/* Understand */}
              <div className="rounded-2xl bg-[#16A34A]/10 p-5">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#16A34A] text-[#FFFFFF]">
                  <CheckCircle2 size={20} />
                </div>

                <h3 className="text-lg font-bold text-[#111827]">
                  Understand
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#111827]/70">
                  Read eligibility and benefits in simple language.
                </p>

              </div>

              {/* Prepare */}
              <div className="rounded-2xl bg-[#111827]/5 p-5">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#111827] text-[#FFFFFF]">
                  <FileText size={20} />
                </div>

                <h3 className="text-lg font-bold text-[#111827]">
                  Prepare
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#111827]/70">
                  Know what documents and information you may need.
                </p>

              </div>

              {/* Apply */}
              <div className="rounded-2xl bg-[#2563EB]/10 p-5">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] text-[#FFFFFF]">
                  <ArrowRight size={20} />
                </div>

                <h3 className="text-lg font-bold text-[#111827]">
                  Apply
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#111827]/70">
                  Follow the available application guidance and official
                  links.
                </p>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}