"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFFFFF] px-6">
      <div className="w-full max-w-md text-center">
        <AuthenticateWithRedirectCallback />
      </div>
    </main>
  );
}