import Link from "next/link";
import {
  ArrowRight,
  FilePlus2,
  LayoutDashboard,
} from "lucide-react";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <header className="border-b border-[#111827]/10 bg-[#FFFFFF]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <div>
            <p className="text-sm font-bold text-[#2563EB]">
              SCHEMESAMJHO
            </p>

            <h1 className="text-2xl font-bold text-[#111827]">
              Admin Panel
            </h1>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-[#111827]/10 bg-[#FFFFFF] px-4 py-2.5 text-sm font-semibold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
          >
            View Website
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-8">
          <p className="text-sm font-bold text-[#16A34A]">
            ADMINISTRATION
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#111827]">
            Manage Government Schemes
          </h2>

          <p className="mt-2 max-w-2xl text-base leading-7 text-[#111827]/70">
            Add and manage the government schemes
            available on SchemeSamjho.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <AdminCard
            href="/admin/schemes"
            icon={<LayoutDashboard size={22} />}
            title="Manage Schemes"
            description="View and manage existing schemes."
          />

          <AdminCard
            href="/admin/schemes/new"
            icon={<FilePlus2 size={22} />}
            title="Add Scheme"
            description="Add a new government scheme."
          />
        </div>
      </div>
    </main>
  );
}

function AdminCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] p-6 transition hover:border-[#2563EB] hover:shadow-md"
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] text-[#FFFFFF]">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-[#111827]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#111827]/70">
        {description}
      </p>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
        Open
        <ArrowRight size={15} />
      </div>
    </Link>
  );
}