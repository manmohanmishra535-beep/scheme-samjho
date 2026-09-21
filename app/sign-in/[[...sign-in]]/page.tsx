"use client";

import { useState } from "react";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import {
  ArrowLeft,
  ArrowRight,
  CircleAlert,
  CircleCheck,
  LoaderCircle,
  Mail,
  ShieldCheck,
} from "lucide-react";

type Step = "email" | "code";

export default function SignInPage() {
  const {
    signIn,
    fetchStatus,
  } = useSignIn();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [step, setStep] =
    useState<Step>("email");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const loading =
    fetchStatus === "fetching" ||
    submitting;

  /*
   * --------------------------------
   * Clear messages
   * --------------------------------
   */
  function clearMessages() {
    setError("");
    setSuccess("");
  }

  /*
   * --------------------------------
   * Get Clerk error message
   * --------------------------------
   */
  function getErrorMessage(
    error: unknown
  ): string {
    if (
      error &&
      typeof error === "object" &&
      "message" in error
    ) {
      const message =
        (error as {
          message?: unknown;
        }).message;

      if (
        typeof message === "string" &&
        message.trim()
      ) {
        return message;
      }
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Something went wrong. Please try again.";
  }

  /*
   * --------------------------------
   * Start email sign in
   * --------------------------------
   */
  async function handleEmailSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    clearMessages();

    const cleanEmail =
      email.trim();

    if (!cleanEmail) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    if (!signIn) {
      setError(
        "Authentication is still loading. Please try again."
      );
      return;
    }

    setSubmitting(true);

    try {
      /*
       * Create sign-in attempt
       */
      const {
        error: createError,
      } = await signIn.create({
        identifier: cleanEmail,
      });

      if (createError) {
        setError(
          getErrorMessage(createError)
        );
        return;
      }

      /*
       * Send email verification code
       */
      const {
        error: sendError,
      } =
        await signIn.emailCode.sendCode();

      if (sendError) {
        setError(
          getErrorMessage(sendError)
        );
        return;
      }

      setStep("code");

      setSuccess(
        `A verification code was sent to ${cleanEmail}.`
      );
    } catch (error) {
      console.error(
        "Sign-in error:",
        error
      );

      setError(
        getErrorMessage(error)
      );
    } finally {
      setSubmitting(false);
    }
  }

  /*
   * --------------------------------
   * Verify email code
   * --------------------------------
   */
  async function handleVerify(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    clearMessages();

    const cleanCode =
      code.trim();

    if (!cleanCode) {
      setError(
        "Please enter the verification code."
      );
      return;
    }

    if (!signIn) {
      setError(
        "Authentication is still loading. Please try again."
      );
      return;
    }

    setSubmitting(true);

    try {
      const {
        error: verifyError,
      } =
        await signIn.emailCode.verifyCode({
          code: cleanCode,
        });

      /*
       * Important:
       * Clerk can return an error when the
       * email does not belong to an account.
       */
      if (verifyError) {
        setError(
          getErrorMessage(verifyError)
        );
        return;
      }

      /*
       * Successful sign in
       */
      if (
        signIn.status ===
        "complete"
      ) {
        await signIn.finalize({
          navigate: async ({
            session,
            decorateUrl,
          }) => {
            /*
             * Handle Clerk session tasks
             */
            if (session?.currentTask) {
              console.log(
                "Pending Clerk session task:",
                session.currentTask
              );
              return;
            }

            const url =
              decorateUrl("/");

            if (
              url.startsWith("http")
            ) {
              window.location.href =
                url;
            } else {
              window.location.href =
                url;
            }
          },
        });

        return;
      }

      /*
       * MFA
       */
      if (
        signIn.status ===
        "needs_second_factor"
      ) {
        setError(
          "Your account requires an additional verification step."
        );
        return;
      }

      /*
       * Other incomplete states
       */
      setError(
        "Your sign-in requires another verification step."
      );
    } catch (error) {
      console.error(
        "Verification error:",
        error
      );

      setError(
        getErrorMessage(error)
      );
    } finally {
      setSubmitting(false);
    }
  }

  /*
   * --------------------------------
   * Resend code
   * --------------------------------
   */
  async function resendCode() {
    clearMessages();

    if (!signIn) {
      setError(
        "Authentication is still loading. Please try again."
      );
      return;
    }

    setSubmitting(true);

    try {
      const {
        error: resendError,
      } =
        await signIn.emailCode.sendCode();

      if (resendError) {
        setError(
          getErrorMessage(resendError)
        );
        return;
      }

      setSuccess(
        "A new verification code has been sent."
      );
    } catch (error) {
      console.error(
        "Resend error:",
        error
      );

      setError(
        getErrorMessage(error)
      );
    } finally {
      setSubmitting(false);
    }
  }

  /*
   * --------------------------------
   * Google
   * --------------------------------
   */
  async function handleGoogle() {
    clearMessages();

    if (!signIn) {
      setError(
        "Authentication is still loading. Please try again."
      );
      return;
    }

    setSubmitting(true);

    try {
      const {
        error: googleError,
      } = await signIn.sso({
        strategy: "oauth_google",
        redirectCallbackUrl:
          "/sso-callback",
        redirectUrl: "/",
      });

      if (googleError) {
        setError(
          getErrorMessage(googleError)
        );
        setSubmitting(false);
      }
    } catch (error) {
      console.error(
        "Google sign-in error:",
        error
      );

      setError(
        getErrorMessage(error)
      );

      setSubmitting(false);
    }
  }

  /*
   * --------------------------------
   * Change email
   * --------------------------------
   */
  function changeEmail() {
    setStep("email");
    setCode("");
    clearMessages();
  }

  /*
   * --------------------------------
   * UI
   * --------------------------------
   */
  return (
    <main className="min-h-screen bg-[#FFFFFF]">

      {/* =================================
          MAIN
      ================================== */}
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#111827] px-4 py-12 sm:px-6">

        <div className="w-full max-w-md">

          {/* Card */}
          <div className="overflow-hidden rounded-3xl border border-[#FFFFFF]/10 bg-[#FFFFFF] shadow-2xl">

            {/* Brand */}
            <div className="px-6 pb-8 pt-8 sm:px-8">

              {/* Logo */}
              <div className="text-center">

                <Link
                  href="/"
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB] text-xl font-black text-[#FFFFFF]"
                  aria-label="SchemeSamjho home"
                >
                  S
                </Link>

                <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[#111827]">
                  {step === "email"
                    ? "Welcome back"
                    : "Check your email"}
                </h1>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#111827]/60">
                  {step === "email"
                    ? "Sign in to save government schemes and access your SchemeSamjho account."
                    : `Enter the verification code sent to ${email}.`}
                </p>

              </div>

              {/* =================================
                  EMAIL STEP
              ================================== */}
              {step === "email" && (
                <div className="mt-8">

                  {/* Google */}
                  <button
                    type="button"
                    onClick={
                      handleGoogle
                    }
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#111827]/15 bg-[#FFFFFF] px-4 py-3.5 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:bg-[#111827]/5 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? (
                      <LoaderCircle
                        size={18}
                        className="animate-spin"
                      />
                    ) : (
                      <span className="flex h-5 w-5 items-center justify-center font-bold">
                        G
                      </span>
                    )}

                    {submitting
                      ? "Connecting..."
                      : "Continue with Google"}
                  </button>

                  {/* Divider */}
                  <div className="my-6 flex items-center gap-3">

                    <div className="h-px flex-1 bg-[#111827]/10" />

                    <span className="text-xs font-bold uppercase tracking-wider text-[#111827]/40">
                      or
                    </span>

                    <div className="h-px flex-1 bg-[#111827]/10" />

                  </div>

                  {/* Email form */}
                  <form
                    onSubmit={
                      handleEmailSubmit
                    }
                  >

                    <label
                      htmlFor="sign-in-email"
                      className="mb-2 block text-sm font-bold text-[#111827]"
                    >
                      Email address
                    </label>

                    <div className="relative">

                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#111827]/40"
                      />

                      <input
                        id="sign-in-email"
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(
                            event.target.value
                          );
                          clearMessages();
                        }}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        disabled={loading}
                        className="w-full rounded-xl border border-[#111827]/15 bg-[#FFFFFF] py-3.5 pl-11 pr-4 text-sm text-[#111827] outline-none transition placeholder:text-[#111827]/40 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 disabled:bg-[#111827]/5"
                      />

                    </div>

                    {/* Error */}
                    {error && (
                      <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-[#111827] p-3.5 text-sm leading-5 text-[#FFFFFF]">
                        <CircleAlert
                          size={18}
                          className="mt-0.5 shrink-0"
                        />

                        <span>
                          {error}
                        </span>
                      </div>
                    )}

                    {/* Continue */}
                    <button
                      type="submit"
                      disabled={
                        loading ||
                        !email.trim()
                      }
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-3.5 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <LoaderCircle
                            size={17}
                            className="animate-spin"
                          />
                          Please wait...
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight
                            size={17}
                          />
                        </>
                      )}
                    </button>

                  </form>

                </div>
              )}

              {/* =================================
                  OTP STEP
              ================================== */}
              {step === "code" && (
                <div className="mt-8">

                  {/* Back */}
                  <button
                    type="button"
                    onClick={
                      changeEmail
                    }
                    disabled={loading}
                    className="mb-5 flex items-center gap-2 text-sm font-bold text-[#111827] transition hover:text-[#2563EB] disabled:opacity-50"
                  >
                    <ArrowLeft
                      size={16}
                    />

                    Change email
                  </button>

                  {/* Email box */}
                  <div className="rounded-2xl border border-[#2563EB]/20 bg-[#2563EB]/5 p-4">

                    <div className="flex gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-[#FFFFFF]">
                        <Mail
                          size={18}
                        />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#111827]">
                          Verification code sent
                        </p>

                        <p className="mt-1 break-all text-xs leading-5 text-[#111827]/60">
                          {email}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* OTP form */}
                  <form
                    onSubmit={
                      handleVerify
                    }
                    className="mt-6"
                  >

                    <label
                      htmlFor="sign-in-code"
                      className="mb-2 block text-sm font-bold text-[#111827]"
                    >
                      Verification code
                    </label>

                    <input
                      id="sign-in-code"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      value={code}
                      onChange={(event) => {
                        const value =
                          event.target.value
                            .replace(
                              /\D/g,
                              ""
                            )
                            .slice(
                              0,
                              6
                            );

                        setCode(value);
                        clearMessages();
                      }}
                      placeholder="000000"
                      required
                      disabled={loading}
                      autoFocus
                      className="w-full rounded-xl border border-[#111827]/15 bg-[#FFFFFF] px-4 py-4 text-center font-mono text-2xl font-bold tracking-[0.35em] text-[#111827] outline-none transition placeholder:tracking-normal placeholder:text-sm placeholder:text-[#111827]/30 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 disabled:bg-[#111827]/5"
                    />

                    {/* Error */}
                    {error && (
                      <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-[#111827] p-3.5 text-sm leading-5 text-[#FFFFFF]">
                        <CircleAlert
                          size={18}
                          className="mt-0.5 shrink-0"
                        />

                        <span>
                          {error}
                        </span>
                      </div>
                    )}

                    {/* Success */}
                    {success &&
                      !error && (
                        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#16A34A]/20 bg-[#16A34A]/10 p-3.5 text-sm leading-5 text-[#111827]">
                          <CircleCheck
                            size={18}
                            className="mt-0.5 shrink-0 text-[#16A34A]"
                          />

                          <span>
                            {success}
                          </span>
                        </div>
                      )}

                    {/* Verify */}
                    <button
                      type="submit"
                      disabled={
                        loading ||
                        code.length !== 6
                      }
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-3.5 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <LoaderCircle
                            size={17}
                            className="animate-spin"
                          />

                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify & Continue
                          <ArrowRight
                            size={17}
                          />
                        </>
                      )}
                    </button>

                  </form>

                  {/* Resend */}
                  <button
                    type="button"
                    onClick={
                      resendCode
                    }
                    disabled={loading}
                    className="mt-5 w-full text-center text-sm font-bold text-[#2563EB] transition hover:text-[#111827] disabled:opacity-50"
                  >
                    Resend verification code
                  </button>

                </div>
              )}

              {/* =================================
                  SIGN UP
              ================================== */}
              {step === "email" && (
                <div className="mt-7 border-t border-[#111827]/10 pt-5 text-center">

                  <p className="text-sm text-[#111827]/60">
                    Do not have an account?{" "}

                    <Link
                      href="/sign-up"
                      className="font-bold text-[#2563EB] transition hover:text-[#111827]"
                    >
                      Create one
                    </Link>
                  </p>

                </div>
              )}

              {/* Security */}
              <div className="mt-7 flex flex-col items-center justify-center">

                <div className="flex items-center gap-2 text-xs font-semibold text-[#111827]/50">
                  <ShieldCheck
                    size={15}
                  />

                  <span>
                    Your authentication is securely handled by Clerk
                  </span>
                </div>

                <Link
                  href="/"
                  className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111827]/30"
                >
                  SchemeSamjho
                </Link>

              </div>

            </div>

          </div>

          {/* Back home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm font-semibold text-[#FFFFFF]/70 transition hover:text-[#FFFFFF]"
            >
              ← Back to SchemeSamjho
            </Link>
          </div>

        </div>

      </section>

    </main>
  );
}