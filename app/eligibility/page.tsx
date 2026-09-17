"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Info,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { schemes, type Scheme } from "../../data/schemes";
import FavoriteButton from "../../Components/FavoriteButton";

type ConditionStatus = "match" | "no-match" | "verify";

type Condition = {
  name: string;
  status: ConditionStatus;
  message: string;
};

type ResultStatus = "basic-match" | "verify" | "limited";

type Result = {
  scheme: Scheme;
  score: number;
  matchedConditions: number;
  verificationCount: number;
  failedConditions: number;
  totalConditions: number;
  reasons: string[];
  warnings: string[];
  conditions: Condition[];
  status: ResultStatus;
};

const occupations = [
  "Farmer",
  "Student",
  "Woman",
  "Artisan",
  "Business Owner",
  "Worker",
  "Self Employed",
  "Senior Citizen",
  "Job Seeker",
  "Other",
];

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
];

function getConditionIcon(status: ConditionStatus) {
  if (status === "match") {
    return (
      <CheckCircle2
        size={18}
        className="text-emerald-600"
      />
    );
  }

  if (status === "no-match") {
    return (
      <XCircle
        size={18}
        className="text-red-600"
      />
    );
  }

  return (
    <Info
      size={18}
      className="text-amber-600"
    />
  );
}

function getConditionStyles(status: ConditionStatus) {
  if (status === "match") {
    return "border-emerald-100 bg-emerald-50";
  }

  if (status === "no-match") {
    return "border-red-100 bg-red-50";
  }

  return "border-amber-100 bg-amber-50";
}

function getStatusLabel(status: ResultStatus) {
  if (status === "basic-match") {
    return "Basic criteria matched";
  }

  if (status === "verify") {
    return "Needs verification";
  }

  return "Some criteria not matched";
}

function getStatusStyles(status: ResultStatus) {
  if (status === "basic-match") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "verify") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-red-200 bg-red-50 text-red-700";
}

/*
 * Compare the user's selected occupation
 * with the occupations stored in the scheme data.
 */
function occupationMatchesScheme(
  scheme: Scheme,
  occupation: string
) {
  if (!occupation) {
    return false;
  }

  const selected = occupation
    .toLowerCase()
    .trim();

  return scheme.occupations.some((item) => {
    const schemeOccupation = item
      .toLowerCase()
      .trim();

    if (schemeOccupation === selected) {
      return true;
    }

    if (
      selected === "business owner" &&
      (schemeOccupation.includes("business") ||
        schemeOccupation.includes("entrepreneur"))
    ) {
      return true;
    }

    if (
      selected === "self employed" &&
      (schemeOccupation.includes("self") ||
        schemeOccupation.includes("business"))
    ) {
      return true;
    }

    if (
      selected === "worker" &&
      (schemeOccupation.includes("worker") ||
        schemeOccupation.includes("labour") ||
        schemeOccupation.includes("labor"))
    ) {
      return true;
    }

    if (
      selected === "woman" &&
      (schemeOccupation.includes("woman") ||
        schemeOccupation.includes("women") ||
        schemeOccupation.includes("female"))
    ) {
      return true;
    }

    if (
      selected === "farmer" &&
      schemeOccupation.includes("farmer")
    ) {
      return true;
    }

    if (
      selected === "student" &&
      schemeOccupation.includes("student")
    ) {
      return true;
    }

    if (
      selected === "artisan" &&
      schemeOccupation.includes("artisan")
    ) {
      return true;
    }

    return false;
  });
}

function checkEligibility(
  scheme: Scheme,
  age: number | null,
  occupation: string,
  income: number | null,
  state: string
): Result {
  const conditions: Condition[] = [];
  const reasons: string[] = [];
  const warnings: string[] = [];

  /*
   * OCCUPATION
   */
  if (!occupation) {
    conditions.push({
      name: "Occupation",
      status: "verify",
      message:
        "Select your occupation to screen this criterion.",
    });

    warnings.push(
      "Occupation information is required for verification."
    );
  } else if (scheme.occupations.length === 0) {
    conditions.push({
      name: "Occupation",
      status: "verify",
      message:
        "Occupation-specific information is not available in the current scheme data.",
    });

    warnings.push(
      "Verify occupation requirements from the official scheme source."
    );
  } else {
    const matches = occupationMatchesScheme(
      scheme,
      occupation
    );

    if (matches) {
      conditions.push({
        name: "Occupation",
        status: "match",
        message: `Your occupation (${occupation}) appears in the scheme's eligible occupation data.`,
      });

      reasons.push(`Occupation: ${occupation}`);
    } else {
      conditions.push({
        name: "Occupation",
        status: "no-match",
        message: `Your selected occupation (${occupation}) was not found in the scheme's occupation data.`,
      });

      warnings.push(
        `Occupation "${occupation}" was not found in the available scheme data.`
      );
    }
  }

  /*
   * AGE
   */
  if (age === null) {
    conditions.push({
      name: "Age",
      status: "verify",
      message:
        "Enter your age to screen this criterion.",
    });

    warnings.push("Age has not been provided.");
  } else {
    const belowMinAge =
      typeof scheme.minAge === "number" &&
      age < scheme.minAge;

    const aboveMaxAge =
      typeof scheme.maxAge === "number" &&
      age > scheme.maxAge;

    if (belowMinAge) {
      const message = `This scheme has a minimum age requirement of ${scheme.minAge}.`;

      conditions.push({
        name: "Age",
        status: "no-match",
        message,
      });

      warnings.push(message);
    } else if (aboveMaxAge) {
      const message = `This scheme has a maximum age requirement of ${scheme.maxAge}.`;

      conditions.push({
        name: "Age",
        status: "no-match",
        message,
      });

      warnings.push(message);
    } else if (
      typeof scheme.minAge === "number" ||
      typeof scheme.maxAge === "number"
    ) {
      let message =
        "Your age meets the available age criteria.";

      if (
        typeof scheme.minAge === "number" &&
        typeof scheme.maxAge === "number"
      ) {
        message = `Your age is within the ${scheme.minAge}–${scheme.maxAge} age range.`;
      } else if (
        typeof scheme.minAge === "number"
      ) {
        message = `Your age meets the minimum age requirement of ${scheme.minAge}.`;
      } else if (
        typeof scheme.maxAge === "number"
      ) {
        message = `Your age is below the maximum age requirement of ${scheme.maxAge}.`;
      }

      conditions.push({
        name: "Age",
        status: "match",
        message,
      });

      reasons.push(`Age: ${age}`);
    } else {
      conditions.push({
        name: "Age",
        status: "verify",
        message:
          "No specific age range is available in the current SchemeSamjho data.",
      });

      warnings.push(
        "Verify age requirements from the official scheme source."
      );
    }
  }

  /*
   * INCOME
   */
  if (income === null) {
    conditions.push({
      name: "Annual household income",
      status: "verify",
      message:
        "Enter your annual household income to screen this criterion.",
    });

    warnings.push("Income has not been provided.");
  } else if (
    typeof scheme.maxIncome === "number"
  ) {
    if (income <= scheme.maxIncome) {
      const message = `Your income is within the available annual threshold of ₹${scheme.maxIncome.toLocaleString(
        "en-IN"
      )}.`;

      conditions.push({
        name: "Annual household income",
        status: "match",
        message,
      });

      reasons.push(
        `Annual household income: ₹${income.toLocaleString(
          "en-IN"
        )}`
      );
    } else {
      const message = `Your income is above the available annual threshold of ₹${scheme.maxIncome.toLocaleString(
        "en-IN"
      )}.`;

      conditions.push({
        name: "Annual household income",
        status: "no-match",
        message,
      });

      warnings.push(message);
    }
  } else {
    conditions.push({
      name: "Annual household income",
      status: "verify",
      message:
        "No usable annual income threshold is available in the current scheme data.",
    });

    warnings.push(
      "Verify income-related eligibility from the official scheme source."
    );
  }

  /*
   * STATE
   */
  if (!state) {
    conditions.push({
      name: "State",
      status: "verify",
      message:
        "Select your state or UT to screen this criterion.",
    });

    warnings.push(
      "State has not been provided."
    );
  } else if (
    scheme.states &&
    scheme.states.length > 0
  ) {
    const stateMatches = scheme.states.some(
      (schemeState) =>
        schemeState.toLowerCase().trim() ===
        state.toLowerCase().trim()
    );

    if (stateMatches) {
      conditions.push({
        name: "State",
        status: "match",
        message: `Your state (${state}) is included in the scheme's available state data.`,
      });

      reasons.push(`State: ${state}`);
    } else {
      conditions.push({
        name: "State",
        status: "no-match",
        message: `Your state (${state}) is not included in the available state data for this scheme.`,
      });

      warnings.push(
        `State "${state}" was not found in the available scheme state data.`
      );
    }
  } else {
    conditions.push({
      name: "State",
      status: "verify",
      message:
        "This scheme does not have specific state information in the current SchemeSamjho data.",
    });

    warnings.push(
      "Check whether any state-specific conditions apply on the official source."
    );
  }

  const matchedConditions =
    conditions.filter(
      (condition) =>
        condition.status === "match"
    ).length;

  const failedConditions =
    conditions.filter(
      (condition) =>
        condition.status === "no-match"
    ).length;

  const verificationCount =
    conditions.filter(
      (condition) =>
        condition.status === "verify"
    ).length;

  const totalConditions =
    conditions.length;

  /*
   * Internal screening score.
   *
   * This is NOT an official government
   * eligibility score.
   */
  const score =
    matchedConditions * 25 -
    failedConditions * 20;

  let status: ResultStatus;

  if (
    matchedConditions >= 3 &&
    failedConditions === 0
  ) {
    status = "basic-match";
  } else if (
    matchedConditions >= 2 &&
    failedConditions === 0
  ) {
    status = "verify";
  } else {
    status = "limited";
  }

  return {
    scheme,
    score,
    matchedConditions,
    verificationCount,
    failedConditions,
    totalConditions,
    reasons,
    warnings,
    conditions,
    status,
  };
}

export default function EligibilityPage() {
  const [age, setAge] = useState("");
  const [occupation, setOccupation] =
    useState("");
  const [income, setIncome] = useState("");
  const [state, setState] = useState("");

  const [hasChecked, setHasChecked] =
    useState(false);

  const [showAllResults, setShowAllResults] =
    useState(false);

  const results = useMemo(() => {
    if (!hasChecked) {
      return [];
    }

    const parsedAge =
      age.trim() === ""
        ? null
        : Number.parseInt(age, 10);

    const parsedIncome =
      income.trim() === ""
        ? null
        : Number.parseInt(income, 10);

    const safeAge =
      parsedAge !== null &&
      Number.isFinite(parsedAge)
        ? parsedAge
        : null;

    const safeIncome =
      parsedIncome !== null &&
      Number.isFinite(parsedIncome)
        ? parsedIncome
        : null;

    return schemes
      .map((scheme) =>
        checkEligibility(
          scheme,
          safeAge,
          occupation,
          safeIncome,
          state
        )
      )
      .sort((a, b) => {
        if (
          b.matchedConditions !==
          a.matchedConditions
        ) {
          return (
            b.matchedConditions -
            a.matchedConditions
          );
        }

        if (
          a.failedConditions !==
          b.failedConditions
        ) {
          return (
            a.failedConditions -
            b.failedConditions
          );
        }

        return b.score - a.score;
      });
  }, [
    age,
    occupation,
    income,
    state,
    hasChecked,
  ]);

  const visibleResults =
    showAllResults
      ? results
      : results.slice(0, 6);

  const basicMatches =
    results.filter(
      (result) =>
        result.status === "basic-match"
    ).length;

  const needsVerification =
    results.filter(
      (result) =>
        result.status === "verify"
    ).length;

  function handleCheckEligibility() {
    setHasChecked(true);
    setShowAllResults(false);

    window.setTimeout(() => {
      document
        .getElementById(
          "eligibility-results"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  }

  function handleReset() {
    setAge("");
    setOccupation("");
    setIncome("");
    setState("");
    setHasChecked(false);
    setShowAllResults(false);
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div className="absolute -left-32 -top-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-blue-200 backdrop-blur">
              <ShieldCheck size={15} />
              Preliminary eligibility screening
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Find schemes you may
              <span className="block text-blue-300">
                be eligible for.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
              Enter a few basic details and
              SchemeSamjho will screen the schemes
              in our database against the information
              you provide.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-xs text-gray-300">

              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                ✓ Age
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                ✓ Occupation
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                ✓ Income
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                ✓ State
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STEP 1 — FORM
      ====================================================== */}

      <section className="border-t border-gray-200 bg-gray-50">

        <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">

          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-900/5">

            <div className="p-6 sm:p-8 lg:p-10">

              {/* FORM HEADER */}

              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Step 1
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
                  Tell us about yourself
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                  These details are used to perform
                  the preliminary screening shown on
                  this page.
                </p>
              </div>

              {/* FORM FIELDS */}

              <div className="mt-8 grid gap-5 md:grid-cols-2">

                {/* AGE */}

                <div>
                  <label
                    htmlFor="age"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Your age
                  </label>

                  <input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(event) =>
                      setAge(event.target.value)
                    }
                    placeholder="e.g. 25"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* OCCUPATION */}

                <div>
                  <label
                    htmlFor="occupation"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Occupation
                  </label>

                  <select
                    id="occupation"
                    value={occupation}
                    onChange={(event) =>
                      setOccupation(
                        event.target.value
                      )
                    }
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="">
                      Select occupation
                    </option>

                    {occupations.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* INCOME */}

                <div>
                  <label
                    htmlFor="income"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Annual household income
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                      ₹
                    </span>

                    <input
                      id="income"
                      type="number"
                      min="0"
                      value={income}
                      onChange={(event) =>
                        setIncome(
                          event.target.value
                        )
                      }
                      placeholder="e.g. 300000"
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* STATE */}

                <div>
                  <label
                    htmlFor="state"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    State / UT
                  </label>

                  <select
                    id="state"
                    value={state}
                    onChange={(event) =>
                      setState(
                        event.target.value
                      )
                    }
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="">
                      Select state / UT
                    </option>

                    {states.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>

              </div>

              {/* BUTTONS */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={
                    handleCheckEligibility
                  }
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 text-sm font-bold text-white transition hover:bg-gray-800"
                >
                  <Search size={17} />
                  Check Eligibility
                </button>

                {hasChecked && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Reset
                  </button>
                )}

              </div>

              {/* INFORMATION NOTICE */}

              <div className="mt-7 flex gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                <Info
                  size={19}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <p className="text-xs leading-5 text-blue-900">
                  This is a preliminary screening
                  tool, not an official eligibility
                  decision. Final eligibility is
                  determined by the relevant
                  government department and may
                  depend on documents and conditions
                  that are not captured here.
                </p>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RESULTS
      ====================================================== */}

      {hasChecked && (
        <section
          id="eligibility-results"
          className="scroll-mt-8 bg-white py-16"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

            {/* RESULT HEADER */}

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Step 2
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                  Your scheme results
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                  These results are based on the
                  information you entered and the
                  eligibility information currently
                  available in SchemeSamjho.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                  <p className="text-xs font-medium text-emerald-700">
                    Basic matches
                  </p>

                  <p className="mt-1 text-xl font-black text-emerald-900">
                    {basicMatches}
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
                  <p className="text-xs font-medium text-amber-700">
                    Need verification
                  </p>

                  <p className="mt-1 text-xl font-black text-amber-900">
                    {needsVerification}
                  </p>
                </div>

              </div>
            </div>

            {/* RESULT CARDS */}

            <div className="mt-10 space-y-6">

              {visibleResults.map(
                (result) => (
                  <article
                    key={
                      result.scheme.slug
                    }
                    className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:border-gray-300 hover:shadow-md"
                  >

                    {/* STATUS ACCENT */}

                    <div
                      className={`h-1.5 ${
                        result.status ===
                        "basic-match"
                          ? "bg-emerald-500"
                          : result.status ===
                              "verify"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                    />

                    <div className="p-5 sm:p-7">

                      {/* TITLE */}

                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusStyles(
                                result.status
                              )}`}
                            >
                              {getStatusLabel(
                                result.status
                              )}
                            </span>

                            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
                              {
                                result.matchedConditions
                              }
                              /
                              {
                                result.totalConditions
                              }{" "}
                              criteria matched
                            </span>

                          </div>

                          <h3 className="mt-4 text-2xl font-black tracking-tight text-gray-950">
                            {
                              result.scheme
                                .name
                            }
                          </h3>

                          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                            {
                              result.scheme
                                .shortDescription
                            }
                          </p>

                        </div>

                        {/* SCORE */}

                        <div className="shrink-0 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 lg:min-w-[150px] lg:text-center">

                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Screening score
                          </p>

                          <p className="mt-1 text-3xl font-black text-gray-950">
                            {Math.max(
                              0,
                              result.score
                            )}
                          </p>

                          <p className="text-xs text-gray-500">
                            preliminary
                          </p>

                        </div>

                      </div>

                      {/* CONDITIONS */}

                      <div className="mt-7 grid gap-3 md:grid-cols-2">

                        {result.conditions.map(
                          (condition) => (
                            <div
                              key={
                                condition.name
                              }
                              className={`rounded-2xl border p-4 ${getConditionStyles(
                                condition.status
                              )}`}
                            >

                              <div className="flex items-start gap-3">

                                <div className="mt-0.5 shrink-0">
                                  {getConditionIcon(
                                    condition.status
                                  )}
                                </div>

                                <div className="min-w-0">

                                  <p className="text-sm font-bold text-gray-900">
                                    {
                                      condition.name
                                    }
                                  </p>

                                  <p className="mt-1 text-xs leading-5 text-gray-600">
                                    {
                                      condition.message
                                    }
                                  </p>

                                </div>

                              </div>

                            </div>
                          )
                        )}

                      </div>

                      {/* REASONS / WARNINGS */}

                      <div className="mt-7 grid gap-5 lg:grid-cols-2">

                        {/* WHY MATCHED */}

                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">

                          <div className="flex items-center gap-2">

                            <CheckCircle2
                              size={18}
                              className="text-emerald-600"
                            />

                            <h4 className="text-sm font-bold text-emerald-950">
                              Why it matched
                            </h4>

                          </div>

                          {result.reasons
                            .length > 0 ? (
                            <ul className="mt-3 space-y-2">

                              {result.reasons.map(
                                (reason) => (
                                  <li
                                    key={reason}
                                    className="flex gap-2 text-xs leading-5 text-emerald-900"
                                  >
                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-600" />
                                    {reason}
                                  </li>
                                )
                              )}

                            </ul>
                          ) : (
                            <p className="mt-3 text-xs leading-5 text-emerald-900">
                              No confirmed match was
                              established from the
                              available information.
                            </p>
                          )}

                        </div>

                        {/* NEEDS ATTENTION */}

                        <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5">

                          <div className="flex items-center gap-2">

                            <Info
                              size={18}
                              className="text-amber-600"
                            />

                            <h4 className="text-sm font-bold text-amber-950">
                              What needs attention
                            </h4>

                          </div>

                          {result.warnings
                            .length > 0 ? (
                            <ul className="mt-3 space-y-2">

                              {result.warnings.map(
                                (warning) => (
                                  <li
                                    key={warning}
                                    className="flex gap-2 text-xs leading-5 text-amber-900"
                                  >
                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-600" />
                                    {warning}
                                  </li>
                                )
                              )}

                            </ul>
                          ) : (
                            <p className="mt-3 text-xs leading-5 text-amber-900">
                              No additional screening
                              warnings were generated.
                            </p>
                          )}

                        </div>

                      </div>

                      {/* SCHEME INFORMATION */}

                      <div className="mt-7 grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Category
                          </p>

                          <p className="mt-1 text-sm font-bold text-gray-900">
                            {
                              result.scheme
                                .category
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Benefits
                          </p>

                          <p className="mt-1 text-sm font-bold text-gray-900">
                            {result.scheme.benefits.join(
                              ", "
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Last verified
                          </p>

                          <p className="mt-1 text-sm font-bold text-gray-900">
                            {
                              result.scheme
                                .lastVerified
                            }
                          </p>
                        </div>

                      </div>

                      {/* ACTIONS */}

                      <div className="mt-7 flex flex-wrap items-center gap-3">

                        <Link
                          href={`/schemes/${result.scheme.slug}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gray-800"
                        >
                          View Scheme
                          <ArrowRight
                            size={16}
                          />
                        </Link>

                        <Link
                          href={`/explainers/${result.scheme.slug}`}
                          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                          Read Explainer
                        </Link>

                        <FavoriteButton
                          slug={
                            result.scheme
                              .slug
                          }
                        />

                        <a
                          href={
                            result.scheme
                              .officialUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                          Official Source
                          <ExternalLink
                            size={15}
                          />
                        </a>

                      </div>

                    </div>
                  </article>
                )
              )}

            </div>

            {/* SHOW MORE */}

            {results.length > 6 && (
              <div className="mt-10 text-center">

                {!showAllResults ? (
                  <button
                    type="button"
                    onClick={() =>
                      setShowAllResults(
                        true
                      )
                    }
                    className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-800 transition hover:bg-gray-50"
                  >
                    Show all{" "}
                    {results.length} schemes
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setShowAllResults(
                        false
                      )
                    }
                    className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-800 transition hover:bg-gray-50"
                  >
                    Show fewer results
                  </button>
                )}

              </div>
            )}

            {/* TRUST NOTICE */}

            <div className="mt-12 rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:p-8">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <ShieldCheck
                    size={22}
                    className="text-blue-600"
                  />
                </div>

                <div>

                  <h3 className="text-lg font-black text-gray-950">
                    Important: verify before applying
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    SchemeSamjho provides a
                    preliminary screening based on
                    the information available in our
                    scheme database. It does not
                    guarantee that you qualify.
                    Government departments may apply
                    additional conditions,
                    documentation requirements,
                    exclusions or verification
                    procedures.
                  </p>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Always review the official scheme
                    information before submitting an
                    application or relying on a
                    benefit.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>
      )}

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      {!hasChecked && (
        <section className="border-t border-gray-200 bg-white py-16">

          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

            <div className="grid gap-6 md:grid-cols-3">

              {/* CARD 1 */}

              <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Search
                    size={21}
                    className="text-blue-600"
                  />
                </div>

                <h3 className="mt-5 text-lg font-black text-gray-950">
                  1. Enter your details
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Provide basic information such as
                  age, occupation, income and state.
                </p>

              </div>

              {/* CARD 2 */}

              <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <CheckCircle2
                    size={21}
                    className="text-emerald-600"
                  />
                </div>

                <h3 className="mt-5 text-lg font-black text-gray-950">
                  2. Review matches
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  See which criteria appear to match
                  and which ones require additional
                  verification.
                </p>

              </div>

              {/* CARD 3 */}

              <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <ExternalLink
                    size={21}
                    className="text-violet-600"
                  />
                </div>

                <h3 className="mt-5 text-lg font-black text-gray-950">
                  3. Verify officially
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Open the official source and confirm
                  the latest eligibility and application
                  requirements.
                </p>

              </div>

            </div>

          </div>
        </section>
      )}

    </main>
  );
}