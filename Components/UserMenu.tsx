"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import {
  useClerk,
  useUser,
} from "@clerk/nextjs";

export default function UserMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const [open, setOpen] =
    useState(false);

  const [signingOut, setSigningOut] =
    useState(false);

  /*
   * ----------------------------------------
   * Don't render anything until Clerk
   * provides the authenticated user.
   * ----------------------------------------
   */
  if (!user) {
    return null;
  }

  /*
   * ----------------------------------------
   * User information
   * ----------------------------------------
   */
  const fullName =
    user.fullName ||
    user.firstName ||
    "User";

  const email =
    user.primaryEmailAddress
      ?.emailAddress || "";

  const imageUrl =
    user.imageUrl;

  const initial =
    fullName
      .trim()
      .charAt(0)
      .toUpperCase() || "U";

  /*
   * ----------------------------------------
   * Sign out
   * ----------------------------------------
   */
  async function handleSignOut() {
    if (signingOut) {
      return;
    }

    setSigningOut(true);

    try {
      await signOut({
        redirectUrl: "/",
      });
    } catch (error) {
      console.error(
        "Sign out error:",
        error
      );

      setSigningOut(false);
    }
  }

  return (
    <div className="relative">
      {/* =====================================
          USER BUTTON
      ====================================== */}
      <button
        type="button"
        onClick={() =>
          setOpen(
            (current) => !current
          )
        }
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open account menu"
        className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-[#111827]/5"
      >
        {/* Avatar */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={fullName}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2563EB] text-sm font-bold text-[#FFFFFF]">
            {initial}
          </div>
        )}

        {/* User information */}
        <div className="hidden max-w-[190px] text-left xl:block">
          <p className="truncate text-sm font-bold text-[#111827]">
            {fullName}
          </p>

          <p className="truncate text-xs text-[#111827]/50">
            {email}
          </p>
        </div>

        {/* Arrow */}
        <ChevronDown
          size={17}
          strokeWidth={2}
          className={`hidden text-[#111827]/50 transition-transform xl:block ${
            open
              ? "rotate-180"
              : ""
          }`}
        />
      </button>

      {/* =====================================
          CUSTOM USER DROPDOWN
      ====================================== */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[58px] z-[100] w-[300px] overflow-hidden rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] shadow-xl"
        >
          {/* =================================
              PROFILE HEADER
          ================================== */}
          <div className="border-b border-[#111827]/10 px-5 py-5">
            <div className="flex items-center gap-3">
              {/* Profile image */}
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={fullName}
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-base font-bold text-[#FFFFFF]">
                  {initial}
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#111827]">
                  {fullName}
                </p>

                <p className="mt-1 truncate text-xs text-[#111827]/50">
                  {email}
                </p>
              </div>
            </div>
          </div>

          {/* =================================
              MENU ITEMS
          ================================== */}
          <div className="p-2">
            {/* Dashboard */}
            <Link
              href="/dashboard"
              onClick={() =>
                setOpen(false)
              }
              role="menuitem"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
            >
              <User
                size={18}
                strokeWidth={2}
              />

              <span>
                My Dashboard
              </span>
            </Link>

            {/* Saved Schemes */}
            <Link
              href="/saved"
              onClick={() =>
                setOpen(false)
              }
              role="menuitem"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>

              <span>
                Saved Schemes
              </span>
            </Link>

            {/* About */}
            <Link
              href="/about"
              onClick={() =>
                setOpen(false)
              }
              role="menuitem"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
            >
              <Settings
                size={18}
                strokeWidth={2}
              />

              <span>
                About SchemeSamjho
              </span>
            </Link>
          </div>

          {/* =================================
              SIGN OUT
          ================================== */}
          <div className="border-t border-[#111827]/10 p-2">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              role="menuitem"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#111827] hover:text-[#FFFFFF] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut
                size={18}
                strokeWidth={2}
              />

              <span>
                {signingOut
                  ? "Signing out..."
                  : "Sign out"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}