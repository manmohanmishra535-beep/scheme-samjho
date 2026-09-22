"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Show } from "@clerk/nextjs";

import AuthModal from "./AuthModal";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const pathname = usePathname();

  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  /* =====================================
     SHARED DESKTOP NAVIGATION STYLE
  ====================================== */

  const navItem =
    "relative inline-flex items-center text-[16px] font-bold leading-none text-[#111827] transition hover:text-[#2563EB]";

  /* =====================================
     CLOSE MENUS
  ====================================== */

  function closeMenus() {
    setMoreOpen(false);
    setMobileOpen(false);
  }

  /* =====================================
     OPEN SIGN IN
  ====================================== */

  function openSignIn() {
    closeMenus();
    setAuthOpen(true);
  }

  /* =====================================
     ACTIVE NAVIGATION
  ====================================== */

  function isActive(href: string) {
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  /* =====================================
     MORE ACTIVE STATE
  ====================================== */

  function isMoreActive() {
    return (
      pathname === "/saved" ||
      pathname.startsWith("/saved/") ||
      pathname === "/about" ||
      pathname.startsWith("/about/") ||
      pathname === "/contact" ||
      pathname.startsWith("/contact/")
    );
  }

  return (
    <>
      {/* =================================
          HEADER
      ================================== */}

      <header className="sticky top-0 z-50 border-b border-[#111827]/10 bg-[#FFFFFF]">
        <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-6 lg:px-10">

          {/* =================================
              LOGO
          ================================== */}

          <Link
            href="/"
            onClick={closeMenus}
            className="flex items-center gap-3"
            aria-label="SchemeSamjho home"
          >
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] text-2xl font-extrabold text-[#FFFFFF]">
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

          {/* =================================
              DESKTOP NAVIGATION
          ================================== */}

          <nav
            className="hidden items-center gap-9 lg:flex"
            aria-label="Main navigation"
          >
            {/* ===============================
                SCHEMES
            ================================ */}

            <Link
              href="/schemes"
              className={`${navItem} ${
                isActive("/schemes")
                  ? "after:absolute after:-bottom-[31px] after:left-0 after:right-0 after:h-[2px] after:bg-[#2563EB]"
                  : ""
              }`}
            >
              <span className="font-bold">
                Schemes
              </span>
            </Link>

            {/* ===============================
                ELIGIBILITY
            ================================ */}

            <Link
              href="/eligibility"
              className={`${navItem} ${
                isActive("/eligibility")
                  ? "after:absolute after:-bottom-[31px] after:left-0 after:right-0 after:h-[2px] after:bg-[#2563EB]"
                  : ""
              }`}
            >
              <span className="font-bold">
                Eligibility
              </span>
            </Link>

            {/* ===============================
                EXPLAINERS
            ================================ */}

            <Link
              href="/explainers"
              className={`${navItem} ${
                isActive("/explainers")
                  ? "after:absolute after:-bottom-[31px] after:left-0 after:right-0 after:h-[2px] after:bg-[#2563EB]"
                  : ""
              }`}
            >
              <span className="font-bold">
                Explainers
              </span>
            </Link>

            {/* ===============================
                COMPARE
            ================================ */}

            <Link
              href="/compare"
              className={`${navItem} ${
                isActive("/compare")
                  ? "after:absolute after:-bottom-[31px] after:left-0 after:right-0 after:h-[2px] after:bg-[#2563EB]"
                  : ""
              }`}
            >
              <span className="font-bold">
                Compare
              </span>
            </Link>

            {/* ===============================
                MORE
            ================================ */}

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
                className={`${navItem} appearance-none gap-1 border-0 bg-transparent p-0 ${
                  isMoreActive()
                    ? "after:absolute after:-bottom-[31px] after:left-0 after:right-0 after:h-[2px] after:bg-[#2563EB]"
                    : ""
                }`}
              >
                <span className="font-bold">
                  More
                </span>

                <ChevronDown
                  size={16}
                  strokeWidth={2.5}
                  className={`shrink-0 transition-transform ${
                    moreOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {/* =============================
                  MORE DROPDOWN
              ============================== */}

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

          {/* =================================
              DESKTOP AUTHENTICATION
          ================================== */}

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

          {/* =================================
              MOBILE MENU BUTTON
          ================================== */}

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

        {/* =================================
            MOBILE NAVIGATION
        ================================== */}

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
                  active={isActive("/schemes")}
                >
                  Schemes
                </MobileLink>

                {/* Eligibility */}

                <MobileLink
                  href="/eligibility"
                  onClick={closeMenus}
                  active={isActive("/eligibility")}
                >
                  Eligibility
                </MobileLink>

                {/* Explainers */}

                <MobileLink
                  href="/explainers"
                  onClick={closeMenus}
                  active={isActive("/explainers")}
                >
                  Explainers
                </MobileLink>

                {/* Compare */}

                <MobileLink
                  href="/compare"
                  onClick={closeMenus}
                  active={isActive("/compare")}
                >
                  Compare
                </MobileLink>

                {/* =================================
                    MOBILE MORE
                ================================== */}

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
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[16px] font-bold leading-none transition ${
                      isMoreActive()
                        ? "bg-[#2563EB]/10 text-[#2563EB]"
                        : "text-[#111827] hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
                    }`}
                  >
                    <span className="font-bold">
                      More
                    </span>

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

                  {/* Mobile More Links */}

                  {moreOpen && (
                    <div className="ml-4 border-l-2 border-[#2563EB]/20 pl-3">

                      <MobileSubLink
                        href="/saved"
                        onClick={closeMenus}
                        active={isActive("/saved")}
                      >
                        Saved Schemes
                      </MobileSubLink>

                      <MobileSubLink
                        href="/about"
                        onClick={closeMenus}
                        active={isActive("/about")}
                      >
                        About
                      </MobileSubLink>

                      <MobileSubLink
                        href="/contact"
                        onClick={closeMenus}
                        active={isActive("/contact")}
                      >
                        Contact
                      </MobileSubLink>

                    </div>
                  )}
                </div>

                {/* =================================
                    MOBILE AUTHENTICATION
                ================================== */}

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

      {/* =================================
          AUTHENTICATION MODAL
      ================================== */}

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

/* =====================================
   MOBILE PRIMARY LINK
===================================== */

function MobileLink({
  href,
  onClick,
  active,
  children,
}: {
  href: string;
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-xl px-4 py-3 text-[16px] font-bold leading-none transition ${
        active
          ? "bg-[#2563EB]/10 text-[#2563EB]"
          : "text-[#111827] hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
      }`}
    >
      {children}
    </Link>
  );
}

/* =====================================
   MOBILE SUB LINK
===================================== */

function MobileSubLink({
  href,
  onClick,
  active,
  children,
}: {
  href: string;
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block rounded-lg px-4 py-2.5 text-[15px] font-semibold leading-none transition ${
        active
          ? "bg-[#2563EB]/10 text-[#2563EB]"
          : "text-[#111827] hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
      }`}
    >
      {children}
    </Link>
  );
}