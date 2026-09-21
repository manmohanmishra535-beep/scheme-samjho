import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  "Farmers",
  "Students",
  "Healthcare",
  "Women",
  "Jobs & Skills",
  "Business",
];

export default function Categories() {
  return (
    <section className="bg-[#111827] py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        <div className="max-w-2xl">

          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#2563EB]">
            Explore by category
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#FFFFFF] sm:text-4xl">
            Find schemes relevant to you.
          </h2>

          <p className="mt-4 text-base leading-7 text-[#FFFFFF]/70">
            Start with a category and explore government schemes available
            for different needs.
          </p>

        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category, index) => (
            <Link
              key={category}
              href={`/schemes?category=${encodeURIComponent(category)}`}
              className="group flex items-center justify-between rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-5 transition hover:-translate-y-1 hover:border-[#2563EB]"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-extrabold text-[#FFFFFF] ${
                    index % 2 === 0
                      ? "bg-[#2563EB]"
                      : "bg-[#16A34A]"
                  }`}
                >
                  {category.charAt(0)}
                </div>

                <span className="text-base font-bold text-[#111827]">
                  {category}
                </span>

              </div>

              <ArrowRight
                size={18}
                className="text-[#111827]/40 transition group-hover:translate-x-1 group-hover:text-[#2563EB]"
              />

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}