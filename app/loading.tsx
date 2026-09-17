export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-[#07111f]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-pulse">
            <div className="h-6 w-32 rounded-full bg-white/10" />

            <div className="mt-6 h-12 w-full max-w-xl rounded-xl bg-white/10" />

            <div className="mt-4 h-5 w-full max-w-lg rounded-lg bg-white/10" />
            <div className="mt-2 h-5 w-4/5 max-w-lg rounded-lg bg-white/10" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="h-4 w-24 rounded bg-gray-200" />

              <div className="mt-5 h-6 w-3/4 rounded bg-gray-200" />

              <div className="mt-4 h-4 w-full rounded bg-gray-100" />
              <div className="mt-2 h-4 w-5/6 rounded bg-gray-100" />

              <div className="mt-7 h-10 w-32 rounded-xl bg-gray-200" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}