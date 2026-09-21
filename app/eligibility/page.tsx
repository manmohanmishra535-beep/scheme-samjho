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

/* =========================================================
   TYPES
   ========================================================= */

type ConditionStatus = "match" | "no-match" | "verify";

type Condition = {
  name: string;
  status: ConditionStatus;
  message: string;
};

type ResultStatus = "basic-match" | "verify" | "limited";

type Result = {
  scheme: Scheme;
  matchedConditions: number;
  verificationCount: number;
  failedConditions: number;
  totalConditions: number;
  reasons: string[];
  warnings: string[];
  conditions: Condition[];
  status: ResultStatus;
};

/* =========================================================
   OPTIONS
   ========================================================= */

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

/* =========================================================
   CONDITION UI HELPERS
   ========================================================= */

function getConditionIcon(status: ConditionStatus) {
  if (status === "match") {
    return (
      <CheckCircle2
        size={18}
        className="text-[#16A34A]"
      />
    );
  }

  if (status === "no-match") {
    return (
      <XCircle
        size={18}
        className="text-[#111827]"
      />
    );
  }

  return (
    <Info
      size={18}
      className="text-[#2563EB]"
    />
  );
}

function getConditionStyles(status: ConditionStatus) {
  if (status === "match") {
    return "border-[#16A34A]/20 bg-[#16A34A]/10";
  }

  if (status === "no-match") {
    return "border-[#111827]/15 bg-[#111827]/5";
  }

  return "border-[#2563EB]/20 bg-[#2563EB]/10";
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
    return "border-[#16A34A]/20 bg-[#16A34A]/10 text-[#16A34A]";
  }

  if (status === "verify") {
    return "border-[#2563EB]/20 bg-[#2563EB]/10 text-[#2563EB]";
  }

  return "border-[#111827]/15 bg-[#111827]/5 text-[#111827]";
}

/* =========================================================
   OCCUPATION MATCHING
   ========================================================= */

function occupationMatchesScheme(
  scheme: Scheme,
  occupation: string
): boolean {
  if (!occupation) {
    return false;
  }

  const selected = occupation.toLowerCase().trim();

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

    if (
      selected === "senior citizen" &&
      (schemeOccupation.includes("senior") ||
        schemeOccupation.includes("citizen"))
    ) {
      return true;
    }

    if (
      selected === "job seeker" &&
      (schemeOccupation.includes("job") ||
        schemeOccupation.includes("employment"))
    ) {
      return true;
    }

    return false;
  });
}

/* =========================================================
   ELIGIBILITY CHECK
   ========================================================= */

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

  /* -------------------------------------------------------
     OCCUPATION
     ------------------------------------------------------- */

  if (!occupation) {
    conditions.push({
      name: "Occupation",
      status: "verify",
      message:
        "Select your occupation to screen this criterion.",
    });

    warnings.push(
      "Occupation has not been provided."
    );
  } else if (scheme.occupations.length === 0) {
    conditions.push({
      name: "Occupation",
      status: "verify",
      message:
        "Occupation-specific information is not available in the current scheme data.",
    });

    warnings.push(
      "Verify occupation requirements through the official scheme source."
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
        message: `Your selected occupation (${occupation}) appears in the available scheme occupation data.`,
      });

      reasons.push(`Occupation: ${occupation}`);
    } else {
      conditions.push({
        name: "Occupation",
        status: "no-match",
        message: `Your selected occupation (${occupation}) was not found in the available scheme occupation data.`,
      });

      warnings.push(
        `Occupation "${occupation}" was not found in the available scheme data.`
      );
    }
  }

  /* -------------------------------------------------------
     AGE
     ------------------------------------------------------- */

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
      scheme.minAge != null &&
      age < scheme.minAge;

    const aboveMaxAge =
      scheme.maxAge != null &&
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
      scheme.minAge != null ||
      scheme.maxAge != null
    ) {
      let message =
        "Your age meets the available age criteria.";

      if (
        scheme.minAge != null &&
        scheme.maxAge != null
      ) {
        message = `Your age is within the ${scheme.minAge}–${scheme.maxAge} age range.`;
      } else if (scheme.minAge != null) {
        message = `Your age meets the minimum age requirement of ${scheme.minAge}.`;
      } else if (scheme.maxAge != null) {
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
        "Verify age requirements through the official scheme source."
      );
    }
  }

  /* -------------------------------------------------------
     INCOME
     ------------------------------------------------------- */

  if (scheme.maxIncome == null) {
    conditions.push({
      name: "Annual household income",
      status: "verify",
      message:
        "No simple annual income threshold is available in the current scheme data.",
    });

    warnings.push(
      "Verify whether income-related conditions apply through the official scheme source."
    );
  } else if (income === null) {
    conditions.push({
      name: "Annual household income",
      status: "verify",
      message:
        "Enter your annual household income to screen this criterion.",
    });

    warnings.push(
      "Income has not been provided."
    );
  } else if (income <= scheme.maxIncome) {
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

  /* -------------------------------------------------------
     STATE
     ------------------------------------------------------- */

  /*
   * The current Scheme type does not contain a `states`
   * property. Therefore this page does not claim to perform
   * state-specific eligibility matching.
   */

  if (!state) {
    conditions.push({
      name: "State",
      status: "verify",
      message:
        "Select your state or UT to include it in the screening.",
    });

    warnings.push(
      "State has not been provided."
    );
  } else {
    conditions.push({
      name: "State",
      status: "verify",
      message: `Your selected state is ${state}. State-specific requirements should be verified through the official scheme source.`,
    });

    reasons.push(`State selected: ${state}`);

    warnings.push(
      "State-specific eligibility is not evaluated by the current SchemeSamjho scheme data."
    );
  }

  /* -------------------------------------------------------
     COUNTS
     ------------------------------------------------------- */

  const matchedConditions = conditions.filter(
    (condition) =>
      condition.status === "match"
  ).length;

  const failedConditions = conditions.filter(
    (condition) =>
      condition.status === "no-match"
  ).length;

  const verificationCount = conditions.filter(
    (condition) =>
      condition.status === "verify"
  ).length;

  const totalConditions = conditions.length;

  /* -------------------------------------------------------
     RESULT STATUS
     ------------------------------------------------------- */

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

/* =========================================================
   PAGE
   ========================================================= */

export default function EligibilityPage() {
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
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

        return (
          a.verificationCount -
          b.verificationCount
        );
      });
  }, [
    age,
    occupation,
    income,
    state,
    hasChecked,
  ]);

  const visibleResults = showAllResults
    ? results
    : results.slice(0, 6);

  const basicMatches = results.filter(
    (result) =>
      result.status === "basic-match"
  ).length;

  const needsVerification = results.filter(
    (result) =>
      result.status === "verify"
  ).length;

  function handleCheckEligibility() {
    setHasChecked(true);
    setShowAllResults(false);

    window.setTimeout(() => {
      document
        .getElementById("eligibility-results")
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
    <main className="min-h-screen bg-[#FFFFFF] text-[#111827]">
      {/* ===================================================
          HERO
          =================================================== */}

      <section className="bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFFFFF]/15 bg-[#FFFFFF]/10 px-4 py-2 text-sm font-semibold text-[#FFFFFF]">
              <ShieldCheck size={15} />
              Preliminary eligibility screening
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl">
              Find schemes you may be eligible for.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#FFFFFF]/75 sm:text-lg">
              Enter a few basic details and
              SchemeSamjho will screen the schemes
              in our database against the information
              you provide.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {[
                "Age",
                "Occupation",
                "Income",
                "State",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-[#FFFFFF]/15 bg-[#FFFFFF]/10 px-3.5 py-2 text-xs font-semibold text-[#FFFFFF]/80"
                >
                  <span className="mr-1.5 text-[#16A34A]">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          FORM
          =================================================== */}

      <section className="bg-[#FFFFFF]">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-14 lg:px-10">
          <div className="rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] shadow-sm">
            <div className="p-5 sm:p-7 lg:p-8">
              <p className="text-sm font-bold text-[#2563EB]">
                Step 1
              </p>

              <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl">
                Tell us about yourself
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#111827]/65">
                These details are used to perform the
                preliminary screening shown on this page.
              </p>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {/* AGE */}

                <div>
                  <label
                    htmlFor="age"
                    className="mb-2 block text-sm font-bold text-[#111827]"
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
                    className="h-11 w-full rounded-lg border border-[#111827]/15 bg-[#FFFFFF] px-4 text-sm text-[#111827] outline-none transition placeholder:text-[#111827]/40 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                  />
                </div>

                {/* OCCUPATION */}

                <div>
                  <label
                    htmlFor="occupation"
                    className="mb-2 block text-sm font-bold text-[#111827]"
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
                    className="h-11 w-full rounded-lg border border-[#111827]/15 bg-[#FFFFFF] px-4 text-sm text-[#111827] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                  >
                    <option value="">
                      Select occupation
                    </option>

                    {occupations.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* INCOME */}

                <div>
                  <label
                    htmlFor="income"
                    className="mb-2 block text-sm font-bold text-[#111827]"
                  >
                    Annual household income
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#111827]/55">
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
                      className="h-11 w-full rounded-lg border border-[#111827]/15 bg-[#FFFFFF] pl-9 pr-4 text-sm text-[#111827] outline-none transition placeholder:text-[#111827]/40 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                    />
                  </div>
                </div>

                {/* STATE */}

                <div>
                  <label
                    htmlFor="state"
                    className="mb-2 block text-sm font-bold text-[#111827]"
                  >
                    State / UT
                  </label>

                  <select
                    id="state"
                    value={state}
                    onChange={(event) =>
                      setState(event.target.value)
                    }
                    className="h-11 w-full rounded-lg border border-[#111827]/15 bg-[#FFFFFF] px-4 text-sm text-[#111827] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                  >
                    <option value="">
                      Select state / UT
                    </option>

                    {states.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* BUTTONS */}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={
                    handleCheckEligibility
                  }
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
                >
                  <Search size={17} />
                  Check Eligibility
                </button>

                {hasChecked && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-[#111827]/15 bg-[#FFFFFF] px-6 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* NOTICE */}

              <div className="mt-6 flex gap-3 rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/10 p-4">
                <Info
                  size={18}
                  className="mt-0.5 shrink-0 text-[#2563EB]"
                />

                <p className="text-xs leading-5 text-[#111827]/75">
                  This is a preliminary screening tool,
                  not an official eligibility decision.
                  Final eligibility is determined by the
                  relevant government department and may
                  depend on documents and conditions that
                  are not captured here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          RESULTS
          =================================================== */}

      {hasChecked && (
        <section
          id="eligibility-results"
          className="scroll-mt-8 bg-[#FFFFFF] py-14"
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            {/* HEADER */}

            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-bold text-[#2563EB]">
                  Step 2
                </p>

                <h2 className="mt-1.5 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
                  Your scheme results
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#111827]/65">
                  These results are based on the
                  information you entered and the
                  eligibility information currently
                  available in SchemeSamjho.
                </p>
              </div>

              <div className="flex gap-2">
                <div className="rounded-xl border border-[#16A34A]/20 bg-[#16A34A]/10 px-4 py-3">
                  <p className="text-xs font-semibold text-[#16A34A]">
                    Basic matches
                  </p>

                  <p className="mt-0.5 text-xl font-extrabold text-[#111827]">
                    {basicMatches}
                  </p>
                </div>

                <div className="rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-3">
                  <p className="text-xs font-semibold text-[#2563EB]">
                    Need verification
                  </p>

                  <p className="mt-0.5 text-xl font-extrabold text-[#111827]">
                    {needsVerification}
                  </p>
                </div>
              </div>
            </div>

            {/* RESULTS */}

            <div className="mt-7 space-y-5">
              {visibleResults.map((result) => (
                <article
                  key={result.scheme.slug}
                  className="overflow-hidden rounded-2xl border border-[#111827]/10 bg-[#FFFFFF] shadow-sm transition hover:border-[#2563EB]/30"
                >
                  <div
                    className={`h-1 ${
                      result.status ===
                      "basic-match"
                        ? "bg-[#16A34A]"
                        : result.status ===
                            "verify"
                          ? "bg-[#2563EB]"
                          : "bg-[#111827]"
                    }`}
                  />

                  <div className="p-5 sm:p-6">
                    {/* TITLE */}

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
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

                          <span className="rounded-full border border-[#111827]/10 bg-[#111827]/5 px-3 py-1 text-xs font-semibold text-[#111827]/65">
                            {result.matchedConditions}/
                            {result.totalConditions}{" "}
                            criteria matched
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-extrabold tracking-tight text-[#111827] sm:text-2xl">
                          {result.scheme.name}
                        </h3>

                        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#111827]/65">
                          {
                            result.scheme
                              .shortDescription
                          }
                        </p>
                      </div>
                    </div>

                    {/* CONDITIONS */}

                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                      {result.conditions.map(
                        (condition) => (
                          <div
                            key={condition.name}
                            className={`rounded-xl border p-4 ${getConditionStyles(
                              condition.status
                            )}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 shrink-0">
                                {getConditionIcon(
                                  condition.status
                                )}
                              </div>

                              <div>
                                <p className="text-sm font-bold text-[#111827]">
                                  {condition.name}
                                </p>

                                <p className="mt-1 text-xs leading-5 text-[#111827]/65">
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

                    <div className="mt-6 grid gap-4 lg:grid-cols-2">
                      <div className="rounded-xl border border-[#16A34A]/20 bg-[#16A34A]/10 p-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2
                            size={18}
                            className="text-[#16A34A]"
                          />

                          <h4 className="text-sm font-bold text-[#111827]">
                            Why it matched
                          </h4>
                        </div>

                        {result.reasons.length >
                        0 ? (
                          <ul className="mt-3 space-y-2">
                            {result.reasons.map(
                              (reason) => (
                                <li
                                  key={reason}
                                  className="flex gap-2 text-xs leading-5 text-[#111827]/75"
                                >
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#16A34A]" />
                                  {reason}
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="mt-3 text-xs leading-5 text-[#111827]/65">
                            No confirmed match was
                            established from the available
                            information.
                          </p>
                        )}
                      </div>

                      <div className="rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/10 p-4">
                        <div className="flex items-center gap-2">
                          <Info
                            size={18}
                            className="text-[#2563EB]"
                          />

                          <h4 className="text-sm font-bold text-[#111827]">
                            What needs attention
                          </h4>
                        </div>

                        {result.warnings.length >
                        0 ? (
                          <ul className="mt-3 space-y-2">
                            {result.warnings.map(
                              (warning) => (
                                <li
                                  key={warning}
                                  className="flex gap-2 text-xs leading-5 text-[#111827]/75"
                                >
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#2563EB]" />
                                  {warning}
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="mt-3 text-xs leading-5 text-[#111827]/65">
                            No additional screening
                            warnings were generated.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* INFORMATION */}

                    <div className="mt-6 grid gap-4 border-t border-[#111827]/10 pt-5 sm:grid-cols-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#111827]/45">
                          Category
                        </p>

                        <p className="mt-1 text-sm font-bold text-[#111827]">
                          {result.scheme.category}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#111827]/45">
                          Key benefit
                        </p>

                        <p className="mt-1 text-sm font-bold text-[#111827]">
                          {result.scheme.benefits[0] ??
                            "See scheme details"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#111827]/45">
                          Last verified
                        </p>

                        <p className="mt-1 text-sm font-bold text-[#111827]">
                          {
                            result.scheme
                              .lastVerified
                          }
                        </p>
                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <Link
                        href={`/schemes/${result.scheme.slug}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#111827]"
                      >
                        View Scheme
                        <ArrowRight size={16} />
                      </Link>

                      <Link
                        href={`/explainers/${result.scheme.slug}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#111827]/15 bg-[#FFFFFF] px-4 py-2.5 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
                      >
                        Read Explainer
                      </Link>

                      <FavoriteButton
                        slug={result.scheme.slug}
                      />

                      <a
                        href={result.scheme.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#111827]/15 bg-[#FFFFFF] px-4 py-2.5 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
                      >
                        Official Source
                        <ExternalLink size={15} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* SHOW MORE */}

            {results.length > 6 && (
              <div className="mt-8 text-center">
                {!showAllResults ? (
                  <button
                    type="button"
                    onClick={() =>
                      setShowAllResults(true)
                    }
                    className="rounded-lg border border-[#111827]/15 bg-[#FFFFFF] px-6 py-3 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
                  >
                    Show all {results.length} schemes
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setShowAllResults(false)
                    }
                    className="rounded-lg border border-[#111827]/15 bg-[#FFFFFF] px-6 py-3 text-sm font-bold text-[#111827] transition hover:border-[#2563EB] hover:text-[#2563EB]"
                  >
                    Show fewer results
                  </button>
                )}
              </div>
            )}

            {/* NOTICE */}

            <div className="mt-10 rounded-2xl border border-[#111827]/10 bg-[#111827]/5 p-5 sm:p-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFFFFF]">
                  <ShieldCheck
                    size={20}
                    className="text-[#2563EB]"
                  />
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#111827]">
                    Important: verify before applying
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#111827]/65">
                    SchemeSamjho provides preliminary
                    screening based on the information
                    available in its scheme database. It
                    does not guarantee that you qualify.
                    Government departments may apply
                    additional conditions, documentation
                    requirements, exclusions or verification
                    procedures.
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#111827]/65">
                    Always review the official scheme
                    information before submitting an
                    application or relying on a benefit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================
          HOW IT WORKS
          =================================================== */}

      {!hasChecked && (
        <section className="border-t border-[#111827]/10 bg-[#FFFFFF] py-12">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-[#111827]/10 bg-[#111827]/5 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFFFFF]">
                  <Search
                    size={20}
                    className="text-[#2563EB]"
                  />
                </div>

                <h3 className="mt-4 text-lg font-extrabold text-[#111827]">
                  1. Enter your details
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#111827]/65">
                  Provide basic information such as age,
                  occupation, income and state.
                </p>
              </div>

              <div className="rounded-2xl border border-[#111827]/10 bg-[#111827]/5 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFFFFF]">
                  <CheckCircle2
                    size={20}
                    className="text-[#16A34A]"
                  />
                </div>

                <h3 className="mt-4 text-lg font-extrabold text-[#111827]">
                  2. Review matches
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#111827]/65">
                  See which criteria appear to match and
                  which ones require additional verification.
                </p>
              </div>

              <div className="rounded-2xl border border-[#111827]/10 bg-[#111827]/5 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFFFFF]">
                  <ExternalLink
                    size={20}
                    className="text-[#2563EB]"
                  />
                </div>

                <h3 className="mt-4 text-lg font-extrabold text-[#111827]">
                  3. Verify officially
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#111827]/65">
                  Open the official source and confirm the
                  latest eligibility and application
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