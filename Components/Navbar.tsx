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
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const navItem =
    "inline-flex items-center text-[16px] font-bold leading-none text-[#111827] transition hover:text-[#2563EB]";

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
      {/* =========================
          HEADER
      ========================== */}
      <header className="sticky top-0 z-50 border-b border-[#111827]/10 bg-[#FFFFFF]">
        <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-6 lg:px-10">

          {/* =========================
              LOGO
          ========================== */}
          <Link
            href="/"
            onClick={closeMenus}
            className="flex items-center gap-3"
            aria-label="SchemeSamjho home"
          >
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#2563EB] text-2xl font-extrabold text-[#FFFFFF]">
              S
            </div>

            <div>
              <div className="text-[22px] font-extrabold leading-tight tracking-tight text-[#111827]">
                Scheme
                <span className="text-[#2563EB]">
                  Samjho
                </span>
              </div>

              <div className="text-[12px] font-semibold leading-tight tracking-wide text-[#111827]/60">
                GOVERNMENT SCHEMES, SIMPLIFIED
              </div>
            </div>
          </Link>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}
          <nav
            className="hidden items-center gap-9 lg:flex"
            aria-label="Main navigation"
          >
            {/* Schemes */}
            <Link
              href="/schemes"
              className={navItem}
            >
              Schemes
            </Link>

            {/* Eligibility */}
            <Link
              href="/eligibility"
              className={navItem}
            >
              Eligibility
            </Link>

            {/* Explainers */}
            <Link
              href="/explainers"
              className={navItem}
            >
              Explainers
            </Link>

            {/* Compare */}
            <Link
              href="/compare"
              className={navItem}
            >
              Compare
            </Link>

            {/* =========================
                MORE DROPDOWN
            ========================== */}
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
                className="inline-flex appearance-none items-center gap-1 border-0 bg-transparent p-0 text-[#111827] transition hover:text-[#2563EB]"
                style={{
                  fontFamily:
                    "Arial, Helvetica, sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "1",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "Arial, Helvetica, sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "1",
                  }}
                >
                  More
                </span>

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

          {/* =========================
              DESKTOP AUTHENTICATION
          ========================== */}
          <div className="hidden lg:block">
            <Show when="signed-out">
              <button
                type="button"
                onClick={openSignIn}
                className="rounded-xl bg-[#111827] px-6 py-3 text-[16px] font-semibold leading-none text-[#FFFFFF] transition hover:bg-[#2563EB]"
              >
                Sign In
              </button>
            </Show>

            <Show when="signed-in">
              <UserMenu />
            </Show>
          </div>

          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}
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

        {/* =========================
            MOBILE NAVIGATION
        ========================== */}
        {mobileOpen && (
          <div className="border-t border-[#111827]/10 bg-[#FFFFFF] lg:hidden">
            <nav
              className="mx-auto max-w-[1400px] px-6 py-5"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col">

                {/* Schemes */}
                <MobileLink
                  href="/schemes"
                  onClick={closeMenus}
                >
                  Schemes
                </MobileLink>

                {/* Eligibility */}
                <MobileLink
                  href="/eligibility"
                  onClick={closeMenus}
                >
                  Eligibility
                </MobileLink>

                {/* Explainers */}
                <MobileLink
                  href="/explainers"
                  onClick={closeMenus}
                >
                  Explainers
                </MobileLink>

                {/* Compare */}
                <MobileLink
                  href="/compare"
                  onClick={closeMenus}
                >
                  Compare
                </MobileLink>

                {/* =========================
                    MOBILE MORE
                ========================== */}
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
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[16px] font-bold leading-none text-[#111827] transition hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
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

                {/* =========================
                    MOBILE AUTHENTICATION
                ========================== */}
                <div className="mt-4 border-t border-[#111827]/10 pt-4">
                  <Show when="signed-out">
                    <button
                      type="button"
                      onClick={openSignIn}
                      className="w-full rounded-xl bg-[#111827] px-5 py-3 text-[16px] font-semibold leading-none text-[#FFFFFF] transition hover:bg-[#2563EB]"
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

      {/* =========================
          AUTHENTICATION MODAL
      ========================== */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode="sign-in"
      />
    </>
  );
}

/* =====================================
   MOBILE PRIMARY NAVIGATION LINK
===================================== */

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
      className="rounded-xl px-4 py-3 text-[16px] font-bold leading-none text-[#111827] transition hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
    >
      {children}
    </Link>
  );
}

/* =====================================
   MOBILE SUB NAVIGATION LINK
===================================== */

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
      className="block rounded-lg px-4 py-2.5 text-[15px] font-semibold leading-none text-[#111827] transition hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
    >
      {children}
    </Link>
  );
}