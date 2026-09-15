"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "schemesamjho-favorites";

const mainLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Schemes",
    href: "/schemes",
  },
  {
    label: "Check Eligibility",
    href: "/eligibility",
  },
  {
    label: "Saved",
    href: "/saved",
  },
];

const moreLinks = [
  {
    label: "Compare Schemes",
    href: "/compare",
    description: "Compare up to 3 schemes",
  },
  {
    label: "Explainers",
    href: "/explainers",
    description: "Simple scheme guides",
  },
  {
    label: "About Us",
    href: "/about",
    description: "About SchemeSamjho",
  },
  {
    label: "Contact Us",
    href: "/contact",
    description: "Get in touch",
  },
];

function getSavedCount() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return 0;
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

export default function Navbar() {
  const pathname = usePathname() ?? "/";

  const [savedCount, setSavedCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    setSavedCount(getSavedCount());

    const updateSavedCount = () => {
      setSavedCount(getSavedCount());
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        updateSavedCount();
      }
    };

    window.addEventListener("favoritesChanged", updateSavedCount);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(
        "favoritesChanged",
        updateSavedCount
      );

      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const moreIsActive = moreLinks.some((link) =>
    isActive(link.href)
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="SchemeSamjho home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-lg text-white shadow-sm">
              🇮🇳
            </span>

            <div className="leading-tight">
              <p className="text-base font-bold tracking-tight text-slate-900">
                SchemeSamjho
              </p>

              <p className="hidden text-[10px] font-medium text-slate-400 sm:block">
                Government schemes, simplified
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {mainLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}

                    {link.href === "/saved" && savedCount > 0 && (
                      <span
                        className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                          active
                            ? "bg-blue-600 text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {savedCount > 99 ? "99+" : savedCount}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}

            {/* More */}
            <div
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMoreOpen((value) => !value)}
                aria-expanded={moreOpen}
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  moreIsActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                More

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className={`transition-transform ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25-4.51a.75.75 0 01-1.08 1.04l-4.25 4.51a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {moreOpen && (
                <div className="absolute right-0 top-full w-72 pt-2">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                    {moreLinks.map((link) => {
                      const active = isActive(link.href);

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block rounded-xl px-4 py-3 transition ${
                            active
                              ? "bg-blue-50"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <p
                            className={`text-sm font-semibold ${
                              active
                                ? "text-blue-700"
                                : "text-slate-800"
                            }`}
                          >
                            {link.label}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {link.description}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={mobileOpen}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          >
            {mobileOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-slate-100 py-3 md:hidden">
            <nav className="space-y-1">
              {mainLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.label}</span>

                    {link.href === "/saved" &&
                      savedCount > 0 && (
                        <span
                          className={`flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold ${
                            active
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {savedCount > 99 ? "99+" : savedCount}
                        </span>
                      )}
                  </Link>
                );
              })}

              <div className="my-2 border-t border-slate-100" />

              <p className="px-4 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                More
              </p>

              {moreLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-xl px-4 py-3 transition ${
                      active
                        ? "bg-blue-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <p
                      className={`text-sm font-semibold ${
                        active
                          ? "text-blue-700"
                          : "text-slate-700"
                      }`}
                    >
                      {link.label}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {link.description}
                    </p>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}