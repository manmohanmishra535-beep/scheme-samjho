"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  UserButton,
  Show,
  SignInButton,
} from "@clerk/nextjs";

import { useSavedSchemes } from "../lib/useSavedSchemes";

const mainLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/schemes",
    label: "Schemes",
  },
  {
    href: "/eligibility",
    label: "Check Eligibility",
  },
  {
    href: "/saved",
    label: "Saved",
  },
];

const moreLinks = [
  {
    href: "/compare",
    label: "Compare",
  },
  {
    href: "/explainers",
    label: "Explainers",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [moreOpen, setMoreOpen] =
    useState(false);

  const moreRef =
    useRef<HTMLDivElement>(null);

  const {
    savedCount,
    loading: savedLoading,
  } = useSavedSchemes();

  /*
   * Close More dropdown when clicking outside.
   */
  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        moreRef.current &&
        !moreRef.current.contains(
          event.target as Node
        )
      ) {
        setMoreOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
   * Close mobile menu when route changes.
   */
  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const moreActive = moreLinks.some(
    (link) => isActive(link.href)
  );

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* =================================================
              LOGO
          ================================================== */}

          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-950 text-lg font-black text-white">
              S
            </div>

            <div className="hidden sm:block">
              <p className="text-lg font-black tracking-tight text-gray-950">
                SchemeSamjho
              </p>

              <p className="text-xs font-medium text-gray-500">
                Government schemes, simply explained
              </p>
            </div>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <div className="hidden items-center gap-1 lg:flex">

            {mainLinks.map((link) => {
              const active =
                isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-gray-50 text-gray-950"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}

                    {/* SAVED COUNT */}

                    {link.href ===
                      "/saved" &&
                      !savedLoading && (
                        <span
                          className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-black ${
                            active
                              ? "bg-blue-100 text-blue-700"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {savedCount}
                        </span>
                      )}
                  </span>
                </Link>
              );
            })}

            {/* =================================================
                MORE DROPDOWN
            ================================================== */}

            <div
              ref={moreRef}
              className="relative"
            >
              <button
                type="button"
                onClick={() =>
                  setMoreOpen(
                    (current) => !current
                  )
                }
                aria-expanded={moreOpen}
                className={`flex items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  moreActive
                    ? "bg-gray-50 text-gray-950"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                }`}
              >
                More

                <ChevronDown
                  size={15}
                  className={`transition-transform ${
                    moreOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-gray-900/10">

                  {moreLinks.map(
                    (link) => {
                      const active =
                        isActive(
                          link.href
                        );

                      return (
                        <Link
                          key={
                            link.href
                          }
                          href={
                            link.href
                          }
                          className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                            active
                              ? "bg-gray-100 text-gray-950"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                          }`}
                        >
                          {
                            link.label
                          }
                        </Link>
                      );
                    }
                  )}

                </div>
              )}
            </div>
          </div>

          {/* =================================================
              DESKTOP ACCOUNT AREA
          ================================================== */}

          <div className="hidden items-center gap-3 lg:flex">

            <Show when="signed-in">
              <Link
                href="/dashboard"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-950"
              >
                Dashboard
              </Link>

              <Link
                href="/account"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-950"
              >
                Account
              </Link>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "h-10 w-10",
                  },
                }}
              />
            </Show>

            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-gray-50"
                >
                  Sign In
                </button>
              </SignInButton>
            </Show>

          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen(
                (current) => !current
              )
            }
            aria-label={
              mobileOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-gray-50 lg:hidden"
          >
            {mobileOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

        </div>

        {/* =================================================
            MOBILE NAVIGATION
        ================================================== */}

        {mobileOpen && (
          <div className="border-t border-gray-100 py-4 lg:hidden">

            <div className="space-y-1">

              {mainLinks.map((link) => {
                const active =
                  isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-gray-100 text-gray-950"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                    }`}
                  >
                    <span>
                      {link.label}
                    </span>

                    {link.href ===
                      "/saved" &&
                      !savedLoading && (
                        <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-black text-blue-600">
                          {savedCount}
                        </span>
                      )}
                  </Link>
                );
              })}

              {/* MOBILE MORE LINKS */}

              <div className="mt-2 border-t border-gray-100 pt-2">

                <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                  More
                </p>

                {moreLinks.map(
                  (link) => {
                    const active =
                      isActive(
                        link.href
                      );

                    return (
                      <Link
                        key={
                          link.href
                        }
                        href={
                          link.href
                        }
                        className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                          active
                            ? "bg-gray-100 text-gray-950"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                        }`}
                      >
                        {
                          link.label
                        }
                      </Link>
                    );
                  }
                )}

              </div>

              {/* MOBILE ACCOUNT */}

              <div className="mt-2 border-t border-gray-100 pt-2">

                <Show when="signed-in">

                  <Link
                    href="/dashboard"
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/account"
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                  >
                    Account
                  </Link>

                  <div className="px-4 py-3">
                    <UserButton />
                  </div>

                </Show>

                <Show when="signed-out">

                  <SignInButton mode="modal">
                    <button
                      type="button"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-bold text-gray-900 transition hover:bg-gray-50"
                    >
                      Sign In
                    </button>
                  </SignInButton>

                </Show>

              </div>

            </div>
          </div>
        )}

      </nav>
    </header>
  );
}