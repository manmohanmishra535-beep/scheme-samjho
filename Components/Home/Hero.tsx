import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#111827]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

        {/* =========================
            HERO BADGE
        ========================== */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FFFFFF]/20 px-4 py-2 text-sm font-semibold text-[#FFFFFF]">
          <Sparkles size={15} />
        India&apos;s simple scheme discovery guide
        </div>

        {/* =========================
            HERO HEADING
        ========================== */}
        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl">
          Government benefits made easier to discover.
        </h1>

        {/* =========================
            HERO DESCRIPTION
        ========================== */}
        <p className="mt-6 max-w-2xl text-base leading-7 text-[#FFFFFF]/80 sm:text-lg">
          Find government schemes that match your needs. Understand
          benefits, eligibility, documents and application information in
          simple language.
        </p>

        {/* =========================
            ACTION BUTTONS
        ========================== */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">

          {/* Explore Schemes */}
          <Link
            href="/schemes"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-[#FFFFFF] transition hover:bg-[#FFFFFF] hover:text-[#111827]"
          >
            Explore Schemes
            <ArrowRight size={17} />
          </Link>

          {/* Check Eligibility */}
          <Link
            href="/eligibility"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#FFFFFF] bg-[#FFFFFF] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-[#FFFFFF]"
          >
            Check Eligibility
            <Search size={17} />
          </Link>

        </div>

        {/* =========================
            TRUST POINTS
        ========================== */}
        <div className="mt-9 flex flex-col gap-3 text-sm font-semibold text-[#FFFFFF]/80 sm:flex-row sm:items-center sm:gap-7">

          {/* Simple explanations */}
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={17}
              className="text-[#16A34A]"
            />

            <span>
              Simple explanations
            </span>
          </div>

          {/* Information focused */}
          <div className="flex items-center gap-2">
            <ShieldCheck
              size={17}
              className="text-[#16A34A]"
            />

            <span>
              Information-focused
            </span>
          </div>

          {/* Application guidance */}
          <div className="flex items-center gap-2">
            <FileText
              size={17}
              className="text-[#16A34A]"
            />

            <span>
              Application guidance
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}