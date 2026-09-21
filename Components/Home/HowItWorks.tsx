export default function HowItWorks() {
  return (
    <section className="bg-[#2563EB] py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        <div className="max-w-2xl">

          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#FFFFFF]/80">
            How it works
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#FFFFFF] sm:text-4xl">
            From discovery to understanding.
          </h2>

          <p className="mt-4 text-base leading-7 text-[#FFFFFF]/80">
            SchemeSamjho keeps the process simple so you can focus on
            understanding the information that matters to you.
          </p>

        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">

          {/* Step 1 */}
          <div className="rounded-2xl bg-[#FFFFFF] p-6">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111827] text-sm font-extrabold text-[#FFFFFF]">
              01
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-[#111827]">
              Search
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#111827]/70">
              Find government schemes by category or browse the available
              schemes.
            </p>

          </div>

          {/* Step 2 */}
          <div className="rounded-2xl bg-[#FFFFFF] p-6">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16A34A] text-sm font-extrabold text-[#FFFFFF]">
              02
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-[#111827]">
              Understand
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#111827]/70">
              Read benefits, eligibility, documents and other important
              information.
            </p>

          </div>

          {/* Step 3 */}
          <div className="rounded-2xl bg-[#FFFFFF] p-6">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-sm font-extrabold text-[#FFFFFF]">
              03
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-[#111827]">
              Take the next step
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#111827]/70">
              Use the available official resources and application
              information.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}