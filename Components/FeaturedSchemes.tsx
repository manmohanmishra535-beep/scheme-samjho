import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { schemes } from "../data/schemes";
import FavoriteButton from "./FavoriteButton";

export default function FeaturedSchemes() {
  const featuredSchemes = schemes.slice(0, 6);

  return (
    <section className="bg-[#F9FAFB]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">

        {/* Heading */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
              Featured schemes
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
              Start with popular schemes
            </h2>

            <p className="mt-4 text-base leading-7 text-[#111827]/70 sm:text-lg">
              Explore some government schemes and understand
              their benefits, eligibility and application
              information.
            </p>
          </div>

          <Link
            href="/schemes"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#2563EB] transition hover:text-[#111827]"
          >
            View all schemes
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Scheme Cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredSchemes.map((scheme) => (
            <article
              key={scheme.slug}
              className="group flex h-full flex-col rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6 transition hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-md"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex rounded-full bg-[#2563EB]/10 px-3 py-1 text-xs font-bold text-[#2563EB]">
                  {scheme.category}
                </span>

                <FavoriteButton
                  slug={scheme.slug}
                />
              </div>

              {/* Title */}
              <h3 className="mt-5 text-xl font-extrabold leading-tight text-[#111827]">
                {scheme.name}
              </h3>

              {/* Description */}
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#111827]/65">
                {scheme.shortDescription}
              </p>

              {/* Benefits */}
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wide text-[#111827]/50">
                  Key benefits
                </p>

                <ul className="mt-3 space-y-2">
                  {scheme.benefits
                    .slice(0, 2)
                    .map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2 text-sm leading-5 text-[#111827]/75"
                      >
                        <CheckCircle2
                          size={15}
                          className="mt-0.5 shrink-0 text-[#16A34A]"
                        />

                        <span>{benefit}</span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* View Link */}
              <div className="mt-auto pt-6">
                <Link
                  href={`/schemes/${scheme.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] transition hover:text-[#111827]"
                >
                  View scheme

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}