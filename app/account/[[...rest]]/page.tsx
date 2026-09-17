"use client";

import { UserProfile, SignInButton, useAuth } from "@clerk/nextjs";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function AccountPage() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-5">
          <p className="text-sm font-medium text-gray-500">
            Loading account...
          </p>
        </div>
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="relative overflow-hidden bg-[#07111f] text-white">
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 lg:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <ShieldCheck size={30} className="text-blue-300" />
            </div>

            <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">
              Your account
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-300">
              Sign in to manage your profile and access your
              SchemeSamjho account features.
            </p>

            <SignInButton mode="modal">
              <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-gray-950 transition hover:bg-gray-100">
                Sign In
                <ArrowRight size={17} />
              </button>
            </SignInButton>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
            Account Settings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
            Manage your profile, sign-in methods and account settings.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <UserProfile />
        </div>
      </div>
    </main>
  );
}