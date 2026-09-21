import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomeCTA() {
  return (
    <section className="bg-[#FFFFFF] py-20">
      <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#16A34A] text-[#FFFFFF]">
          <CheckCircle2 size={27} />
        </div>

        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
          Not sure which schemes may be relevant?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#111827]/70 sm:text-lg">
          Use the eligibility checker to get a preliminary view based on
          the information you provide.
        </p>

        <Link
          href="/eligibility"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#111827] px-7 py-4 text-base font-bold text-[#FFFFFF] transition hover:bg-[#2563EB]"
        >
          Check Eligibility
          <ArrowRight size={18} />
        </Link>

      </div>
    </section>
  );
}