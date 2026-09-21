import Link from "next/link";
import { ArrowRight } from "lucide-react";

const featuredSchemes = [
  {
    name: "PM-KISAN",
    category: "Farmers",
    description:
      "Understand the scheme, eligibility, benefits and application information in simple language.",
    color: "blue",
  },
  {
    name: "PM Vishwakarma",
    category: "Artisans & Craftspeople",
    description:
      "Explore support available for traditional artisans and craftspeople.",
    color: "green",
  },
  {
    name: "Ayushman Bharat",
    category: "Healthcare",
    description:
      "Learn about health coverage, eligibility and how to find relevant information.",
    color: "blue",
  },
];

export default function FeaturedSchemes() {
  return (
    <section className="bg-[#FFFFFF] py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div className="max-w-2xl">

            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#2563EB]">
              Featured schemes
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
              Start exploring popular schemes.
            </h2>

            <p className="mt-4 text-base leading-7 text-[#111827]/70">
              Get a quick overview before opening the complete scheme
              information.
            </p>

          </div>

          <Link
            href="/schemes"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#111827]"
          >
            View all schemes
            <ArrowRight size={17} />
          </Link>

        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">

          {featuredSchemes.map((scheme) => (
            <Link
              key={scheme.name}
              href="/schemes"
              className="group rounded-3xl border border-[#111827]/10 bg-[#FFFFFF] p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-xl hover:shadow-[#111827]/5"
            >

              <div className="flex items-center justify-between">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    scheme.color === "green"
                      ? "bg-[#16A34A]/10 text-[#16A34A]"
                      : "bg-[#2563EB]/10 text-[#2563EB]"
                  }`}
                >
                  {scheme.category}
                </span>

                <ArrowRight
                  size={18}
                  className="text-[#111827]/40 transition group-hover:translate-x-1 group-hover:text-[#2563EB]"
                />

              </div>

              <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-[#111827]">
                {scheme.name}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#111827]/70">
                {scheme.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                Explore scheme
                <ArrowRight size={16} />
              </div>

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}