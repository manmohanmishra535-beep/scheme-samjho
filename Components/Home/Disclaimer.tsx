import { ShieldCheck } from "lucide-react";

export default function Disclaimer() {
  return (
    <section className="border-t border-[#111827]/10 bg-[#FFFFFF] py-8">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        <div className="flex flex-col gap-3 rounded-2xl border border-[#111827]/10 bg-[#111827]/5 p-5 sm:flex-row sm:items-start">

          <ShieldCheck
            size={20}
            className="mt-0.5 shrink-0 text-[#16A34A]"
          />

          <p className="text-xs leading-5 text-[#111827]/70">
            SchemeSamjho is an informational platform and is not an official
            government website. Always verify eligibility, benefits and
            application requirements through the relevant official
            government source before applying.
          </p>

        </div>

      </div>
    </section>
  );
}