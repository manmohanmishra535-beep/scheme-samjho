"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Show } from "@clerk/nextjs";

import AuthModal from "./AuthModal";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [moreOpen, setMoreOpen] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [authOpen, setAuthOpen] =
    useState(false);

  const navItem =
    "text-[16px] font-semibold text-[#111827] transition hover:text-[#2563EB]";

  function closeMenus() {
    setMoreOpen(false);
    setMobileOpen(false);
  }

  function openSignIn() {
    closeMenus();
    setAuthOpen(true);
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#111827]/10 bg-[#FFFFFF]">

        <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-6 lg:px-10">

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenus}
            className="flex items-center gap-3"
            aria-label="SchemeSamjho home"
          >

            <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#2563EB] text-2xl font-extrabold text-[#FFFFFF]">
              S
            </div>

            <div>

              <div className="text-[22px] font-extrabold tracking-tight text-[#111827]">
                Scheme
                <span className="text-[#2563EB]">
                  Samjho
                </span>
              </div>

              <div className="text-[12px] font-semibold tracking-wide text-[#111827]/60">
                GOVERNMENT SCHEMES, SIMPLIFIED
              </div>

            </div>

          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-9 lg:flex"
            aria-label="Main navigation"
          >

            <Link
              href="/schemes"
              className={navItem}
            >
              Schemes
            </Link>

            <Link
              href="/eligibility"
              className={navItem}
            >
              Eligibility
            </Link>

            <Link
              href="/explainers"
              className={navItem}
            >
              Explainers
            </Link>

            <Link
              href="/compare"
              className={navItem}
            >
              Compare
            </Link>

            {/* More */}
            <div className="relative">

              <button
                type="button"
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                onClick={() =>
                  setMoreOpen(
                    (current) => !current
                  )
                }
                className={`${navItem} flex items-center gap-1`}
              >

                More

                <ChevronDown
                  size={16}
                  strokeWidth={2.5}
                  className={`transition-transform ${
                    moreOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>

              {moreOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-10 w-48 rounded-xl border border-[#111827]/10 bg-[#FFFFFF] p-2 shadow-lg"
                >

                  <Link
                    href="/saved"
                    role="menuitem"
                    onClick={closeMenus}
                    className="block rounded-lg px-4 py-3 text-[15px] font-semibold text-[#111827] transition hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
                  >
                    Saved Schemes
                  </Link>

                  <Link
                    href="/about"
                    role="menuitem"
                    onClick={closeMenus}
                    className="block rounded-lg px-4 py-3 text-[15px] font-semibold text-[#111827] transition hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
                  >
                    About
                  </Link>

                  <Link
                    href="/contact"
                    role="menuitem"
                    onClick={closeMenus}
                    className="block rounded-lg px-4 py-3 text-[15px] font-semibold text-[#111827] transition hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
                  >
                    Contact
                  </Link>

                </div>
              )}

            </div>

          </nav>

          {/* Desktop Authentication */}
          <div className="hidden lg:block">

            <Show when="signed-out">

              <button
                type="button"
                onClick={openSignIn}
                className="rounded-xl bg-[#111827] px-6 py-3 text-[16px] font-semibold text-[#FFFFFF] transition hover:bg-[#2563EB]"
              >
                Sign In
              </button>

            </Show>

            <Show when="signed-in">

              <UserMenu />

            </Show>

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={
              mobileOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen(
                (current) => !current
              );

              setMoreOpen(false);
            }}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-[#111827] transition hover:bg-[#111827]/5 lg:hidden"
          >

            {mobileOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}

          </button>

        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-[#111827]/10 bg-[#FFFFFF] lg:hidden">

            <nav
              className="mx-auto max-w-[1400px] px-6 py-5"
              aria-label="Mobile navigation"
            >

              <div className="flex flex-col">

                <MobileLink
                  href="/schemes"
                  onClick={closeMenus}
                >
                  Schemes
                </MobileLink>

                <MobileLink
                  href="/eligibility"
                  onClick={closeMenus}
                >
                  Eligibility
                </MobileLink>

                <MobileLink
                  href="/explainers"
                  onClick={closeMenus}
                >
                  Explainers
                </MobileLink>

                <MobileLink
                  href="/compare"
                  onClick={closeMenus}
                >
                  Compare
                </MobileLink>

                {/* Mobile More */}
                <div className="mt-1">

                  <button
                    type="button"
                    onClick={() =>
                      setMoreOpen(
                        (current) =>
                          !current
                      )
                    }
                    aria-expanded={moreOpen}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[16px] font-semibold text-[#111827] transition hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
                  >

                    <span>More</span>

                    <ChevronDown
                      size={18}
                      strokeWidth={2.5}
                      className={`transition-transform ${
                        moreOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />

                  </button>

                  {moreOpen && (
                    <div className="ml-4 border-l-2 border-[#2563EB]/20 pl-3">

                      <MobileSubLink
                        href="/saved"
                        onClick={closeMenus}
                      >
                        Saved Schemes
                      </MobileSubLink>

                      <MobileSubLink
                        href="/about"
                        onClick={closeMenus}
                      >
                        About
                      </MobileSubLink>

                      <MobileSubLink
                        href="/contact"
                        onClick={closeMenus}
                      >
                        Contact
                      </MobileSubLink>

                    </div>
                  )}

                </div>

                {/* Mobile Authentication */}
                <div className="mt-4 border-t border-[#111827]/10 pt-4">

                  <Show when="signed-out">

                    <button
                      type="button"
                      onClick={openSignIn}
                      className="w-full rounded-xl bg-[#111827] px-5 py-3 text-[16px] font-semibold text-[#FFFFFF] transition hover:bg-[#2563EB]"
                    >
                      Sign In
                    </button>

                  </Show>

                  <Show when="signed-in">

                    <div className="flex justify-end">
                      <UserMenu />
                    </div>

                  </Show>

                </div>

              </div>

            </nav>

          </div>
        )}

      </header>

      {/* Authentication Modal */}
      <AuthModal
        open={authOpen}
        onClose={() =>
          setAuthOpen(false)
        }
        initialMode="sign-in"
      />
    </>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-xl px-4 py-3 text-[16px] font-semibold text-[#111827] transition hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
    >
      {children}
    </Link>
  );
}

function MobileSubLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-lg px-4 py-2.5 text-[15px] font-semibold text-[#111827] transition hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
    >
      {children}
    </Link>
  );
}