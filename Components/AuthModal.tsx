"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useSignIn,
  useSignUp,
} from "@clerk/nextjs";

import {
  ArrowRight,
  Mail,
  X,
} from "lucide-react";

type AuthMode = "sign-in" | "sign-up";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
};

export default function AuthModal({
  open,
  onClose,
  initialMode = "sign-in",
}: AuthModalProps) {
  const router = useRouter();

  const {
    signIn,
    fetchStatus: signInFetchStatus,
  } = useSignIn();

  const {
    signUp,
    fetchStatus: signUpFetchStatus,
  } = useSignUp();

  const [mode, setMode] =
    useState<AuthMode>(initialMode);

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const authLoading =
    loading ||
    signInFetchStatus === "fetching" ||
    signUpFetchStatus === "fetching";

  /* =========================================================
     ESCAPE KEY
     ========================================================= */

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (
        event.key === "Escape" &&
        !authLoading
      ) {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, authLoading, onClose]);

  /* =========================================================
     CLOSE MODAL
     ========================================================= */

  function handleClose() {
    if (authLoading) {
      return;
    }

    setEmail("");
    setError("");
    setMode(initialMode);
    onClose();
  }

  /* =========================================================
     SWITCH AUTH MODE
     ========================================================= */

  function handleModeSwitch() {
    if (authLoading) {
      return;
    }

    setMode((currentMode) =>
      currentMode === "sign-in"
        ? "sign-up"
        : "sign-in"
    );

    setEmail("");
    setError("");
  }

  /* =========================================================
     GOOGLE SIGN IN
     ========================================================= */

  async function handleGoogleSignIn() {
    if (!signIn || authLoading) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      await signIn.sso({
        strategy: "oauth_google",
        redirectCallbackUrl:
          "/sso-callback",
        redirectUrl: "/",
      });
    } catch (error) {
      console.error(
        "Google sign-in error:",
        error
      );

      setError(
        "Unable to continue with Google. Please try again."
      );

      setLoading(false);
    }
  }

  /* =========================================================
     EMAIL AUTHENTICATION
     ========================================================= */

  async function handleEmailContinue() {
    if (authLoading) {
      return;
    }

    const trimmedEmail =
      email.trim();

    if (!trimmedEmail) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    if (
      !trimmedEmail.includes("@") ||
      !trimmedEmail.includes(".")
    ) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      /* =====================================================
         SIGN IN
         ===================================================== */

      if (mode === "sign-in") {
        if (!signIn) {
          setError(
            "Authentication is not ready yet."
          );
          return;
        }

        const result =
          await signIn.create({
            identifier: trimmedEmail,
          });

        if (result.error) {
          setError(
            result.error.message ||
              "Unable to start sign in."
          );
          return;
        }

        const codeResult =
          await signIn.emailCode.sendCode();

        if (codeResult.error) {
          setError(
            codeResult.error.message ||
              "Unable to send verification code."
          );
          return;
        }

        handleClose();

        router.push("/sign-in");

        return;
      }

      /* =====================================================
         SIGN UP
         ===================================================== */

      if (!signUp) {
        setError(
          "Authentication is not ready yet."
        );
        return;
      }

      const result =
        await signUp.create({
          emailAddress: trimmedEmail,
        });

      if (result.error) {
        setError(
          result.error.message ||
            "Unable to start sign up."
        );
        return;
      }

      const codeResult =
        await signUp.verifications.sendEmailCode();

      if (codeResult.error) {
        setError(
          codeResult.error.message ||
            "Unable to send verification code."
        );
        return;
      }

      handleClose();

      router.push("/sign-up");
    } catch (error) {
      console.error(
        "Email authentication error:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     CLOSED STATE
     ========================================================= */

  if (!open) {
    return null;
  }

  /* =========================================================
     UI
     ========================================================= */

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111827]/70 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      {/* ===================================================
          BACKDROP
          =================================================== */}

      <button
        type="button"
        aria-label="Close authentication dialog"
        onClick={handleClose}
        disabled={authLoading}
        className="absolute inset-0 cursor-default disabled:cursor-not-allowed"
      />

      {/* ===================================================
          MODAL
          =================================================== */}

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-[#FFFFFF] p-6 shadow-2xl sm:p-8">
        {/* =================================================
            CLOSE BUTTON
            ================================================= */}

        <button
          type="button"
          onClick={handleClose}
          disabled={authLoading}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg text-[#111827]/50 transition hover:bg-[#111827]/5 hover:text-[#111827] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X size={20} />
        </button>

        {/* =================================================
            LOGO
            ================================================= */}

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] text-xl font-extrabold text-[#FFFFFF]">
            S
          </div>

          <div>
            <p className="text-lg font-extrabold text-[#111827]">
              Scheme
              <span className="text-[#2563EB]">
                Samjho
              </span>
            </p>

            <p className="text-xs text-[#111827]/50">
              Government schemes, simplified
            </p>
          </div>
        </div>

        {/* =================================================
            HEADING
            ================================================= */}

        <div className="mt-8">
          <h2
            id="auth-modal-title"
            className="text-2xl font-extrabold text-[#111827]"
          >
            {mode === "sign-in"
              ? "Welcome back"
              : "Create your account"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#111827]/60">
            {mode === "sign-in"
              ? "Sign in to save schemes and access your dashboard."
              : "Create an account to save schemes and access your dashboard."}
          </p>
        </div>

        {/* =================================================
            GOOGLE
            ================================================= */}

        <button
          type="button"
          onClick={() => {
            void handleGoogleSignIn();
          }}
          disabled={authLoading}
          className="mt-7 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#111827]/15 bg-[#FFFFFF] text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:bg-[#2563EB]/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <GoogleIcon />

          Continue with Google
        </button>

        {/* =================================================
            DIVIDER
            ================================================= */}

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#111827]/10" />

          <span className="text-xs font-bold text-[#111827]/40">
            OR
          </span>

          <div className="h-px flex-1 bg-[#111827]/10" />
        </div>

        {/* =================================================
            EMAIL LABEL
            ================================================= */}

        <label
          htmlFor="auth-email"
          className="text-sm font-bold text-[#111827]"
        >
          Email address
        </label>

        {/* =================================================
            EMAIL INPUT
            ================================================= */}

        <div className="relative mt-2">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#111827]/35"
          />

          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(
                event.target.value
              );
              setError("");
            }}
            onKeyDown={(event) => {
              if (
                event.key === "Enter"
              ) {
                void handleEmailContinue();
              }
            }}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={authLoading}
            className="h-12 w-full rounded-xl border border-[#111827]/15 bg-[#FFFFFF] pl-11 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#111827]/35 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {/* =================================================
            CONTINUE BUTTON
            ================================================= */}

        <button
          type="button"
          onClick={() => {
            void handleEmailContinue();
          }}
          disabled={
            authLoading ||
            !email.trim()
          }
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {authLoading
            ? "Please wait..."
            : "Continue"}

          {!authLoading && (
            <ArrowRight size={17} />
          )}
        </button>

        {/* =================================================
            ERROR
            ================================================= */}

        {error && (
          <div className="mt-4 rounded-xl border border-[#111827]/10 bg-[#111827]/5 p-3">
            <p
              className="text-sm leading-5 text-[#111827]/75"
              role="alert"
            >
              {error}
            </p>
          </div>
        )}

        {/* =================================================
            SWITCH MODE
            ================================================= */}

        <p className="mt-6 text-center text-sm text-[#111827]/55">
          {mode === "sign-in"
            ? "Do not have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={handleModeSwitch}
            disabled={authLoading}
            className="ml-1 font-bold text-[#2563EB] hover:text-[#111827] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {mode === "sign-in"
              ? "Create one"
              : "Sign in"}
          </button>
        </p>

        {/* =================================================
            DISCLAIMER
            ================================================= */}

        <p className="mt-6 text-center text-xs leading-5 text-[#111827]/40">
          SchemeSamjho is an informational
          platform. Always verify scheme
          information through official
          government sources.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   GOOGLE ICON
   ========================================================= */

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.78-.07-1.53-.22-2.27H12v4.3h5.22a4.47 4.47 0 0 1-1.94 2.93v2.45h3.14c1.84-1.69 2.93-4.18 2.93-7.41Z"
      />

      <path
        fill="#34A853"
        d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.75Z"
      />

      <path
        fill="#FBBC05"
        d="M6.54 13.84a5.86 5.86 0 0 1 0-3.68V7.63H3.3a9.75 9.75 0 0 0 0 8.74l3.24-2.53Z"
      />

      <path
        fill="#EA4335"
        d="M12 6.13c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.84 3.2 14.63 2.25 12 2.25A9.75 9.75 0 0 0 3.3 7.63l3.24 2.53C7.31 7.85 9.46 6.13 12 6.13Z"
      />
    </svg>
  );
}