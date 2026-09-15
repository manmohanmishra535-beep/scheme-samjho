"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { schemes, Scheme } from "../../data/schemes";

type Occupation =
  | "farmer"
  | "business"
  | "employee"
  | "student"
  | "other";

type Result = {
  scheme: Scheme;
  score: number;
  reasons: string[];
  warnings: string[];
};

const occupations: {
  value: Occupation;
  label: string;
  description: string;
}[] = [
  {
    value: "farmer",
    label: "Farmer",
    description: "I work in farming or agriculture",
  },
  {
    value: "business",
    label: "Business / Self-employed",
    description: "I run a business or work for myself",
  },
  {
    value: "employee",
    label: "Employee",
    description: "I work for an organisation or company",
  },
  {
    value: "student",
    label: "Student",
    description: "I am currently studying",
  },
  {
    value: "other",
    label: "Other",
    description: "My occupation does not fit these categories",
  },
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
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

function formatIncome(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatAge(minAge?: number, maxAge?: number) {
  if (minAge !== undefined && maxAge !== undefined) {
    return `${minAge}–${maxAge} years`;
  }

  if (minAge !== undefined) {
    return `${minAge}+ years`;
  }

  if (maxAge !== undefined) {
    return `Up to ${maxAge} years`;
  }

  return "Depends on scheme rules";
}

function getMatchLabel(score: number) {
  if (score >= 70) {
    return {
      label: "Strong match",
      className: "bg-green-50 text-green-700",
    };
  }

  if (score >= 40) {
    return {
      label: "Possible match",
      className: "bg-amber-50 text-amber-700",
    };
  }

  return {
    label: "Low match",
    className: "bg-slate-100 text-slate-600",
  };
}

function getOccupationLabel(value: Occupation) {
  return (
    occupations.find((item) => item.value === value)?.label ?? value
  );
}

function calculateResult(
  scheme: Scheme,
  age: number,
  occupation: Occupation,
  income: number,
  state: string
): Result {
  let score = 0;

  const reasons: string[] = [];
  const warnings: string[] = [];

  /*
   * ---------------------------------------------------------
   * OCCUPATION
   * ---------------------------------------------------------
   */
  if (scheme.occupations.includes(occupation)) {
    score += 35;

    reasons.push(
      `Your occupation (${getOccupationLabel(
        occupation
      )}) matches the occupation category used for this scheme.`
    );
  } else {
    warnings.push(
      `Your selected occupation (${getOccupationLabel(
        occupation
      )}) is not one of the occupation categories listed for this scheme.`
    );
  }

  /*
   * ---------------------------------------------------------
   * AGE
   * ---------------------------------------------------------
   */
  const ageHasMinimum =
    scheme.minAge !== undefined && age < scheme.minAge;

  const ageHasMaximum =
    scheme.maxAge !== undefined && age > scheme.maxAge;

  if (!ageHasMinimum && !ageHasMaximum) {
    score += 25;

    if (
      scheme.minAge !== undefined ||
      scheme.maxAge !== undefined
    ) {
      reasons.push(
        `Your age falls within the basic age range listed for this scheme.`
      );
    } else {
      reasons.push(
        "Your age does not conflict with a simple age restriction in our scheme data."
      );
    }
  } else {
    warnings.push(
      `Your age (${age}) does not fall within the basic age range listed for this scheme.`
    );
  }

  /*
   * ---------------------------------------------------------
   * INCOME
   * ---------------------------------------------------------
   */
  if (scheme.maxIncome !== undefined) {
    if (income <= scheme.maxIncome) {
      score += 25;

      reasons.push(
        `Your annual household income of ${formatIncome(
          income
        )} is within the simple income limit used by our screening data.`
      );
    } else {
      warnings.push(
        `Your annual household income of ${formatIncome(
          income
        )} is above the simple income limit of ${formatIncome(
          scheme.maxIncome
        )} used by our screening data.`
      );
    }
  } else {
    warnings.push(
      "This scheme does not have a simple income limit in our screening data, so income requires verification against the official rules."
    );
  }

  /*
   * ---------------------------------------------------------
   * STATE
   * ---------------------------------------------------------
   */
  if (!scheme.states || scheme.states.length === 0) {
    score += 15;

    reasons.push(
      "No state restriction is listed in our screening data."
    );
  } else if (scheme.states.includes(state)) {
    score += 15;

    reasons.push(
      `Your selected state (${state}) is included in the scheme data.`
    );
  } else {
    warnings.push(
      `Your selected state (${state}) is not included in the scheme's listed state coverage.`
    );
  }

  /*
   * ---------------------------------------------------------
   * CAP
   * ---------------------------------------------------------
   */
  score = Math.min(score, 100);

  /*
   * ---------------------------------------------------------
   * GENERAL VERIFICATION WARNING
   * ---------------------------------------------------------
   */
  warnings.push(
    "Final eligibility depends on the official scheme rules and verification process."
  );

  return {
    scheme,
    score,
    reasons,
    warnings,
  };
}

export default function EligibilityPage() {
  const [step, setStep] = useState(1);

  const [age, setAge] = useState("");
  const [occupation, setOccupation] =
    useState<Occupation | "">("");
  const [income, setIncome] = useState("");
  const [state, setState] = useState("");

  const [showLowMatches, setShowLowMatches] = useState(false);

  const isComplete =
    age !== "" &&
    occupation !== "" &&
    income !== "" &&
    state !== "";

  const numericAge = Number(age);
  const numericIncome = Number(income);

  const results = useMemo(() => {
    if (!isComplete) {
      return [];
    }

    return schemes
      .map((scheme) =>
        calculateResult(
          scheme,
          numericAge,
          occupation as Occupation,
          numericIncome,
          state
        )
      )
      .sort((a, b) => b.score - a.score);
  }, [
    age,
    occupation,
    income,
    state,
    isComplete,
    numericAge,
    numericIncome,
  ]);

  const strongMatches = results.filter(
    (result) => result.score >= 70
  );

  const possibleMatches = results.filter(
    (result) => result.score >= 40 && result.score < 70
  );

  const lowMatches = results.filter(
    (result) => result.score < 40
  );

  function resetChecker() {
    setStep(1);
    setAge("");
    setOccupation("");
    setIncome("");
    setState("");
    setShowLowMatches(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function startChecking() {
    setStep(2);

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              Preliminary eligibility checker
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Which government schemes may fit you?
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Answer four simple questions. We&apos;ll compare your basic
              profile with the scheme information available on SchemeSamjho.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CHECKER
      ====================================================== */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* PROGRESS */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">
              Your profile
            </p>

            <p className="text-sm text-slate-500">
              {isComplete ? "Complete" : "4 questions"}
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            {[1, 2, 3, 4].map((item) => {
              const completed =
                (item === 1 && age !== "") ||
                (item === 2 && occupation !== "") ||
                (item === 3 && income !== "") ||
                (item === 4 && state !== "");

              return (
                <div
                  key={item}
                  className={`h-2 flex-1 rounded-full ${
                    completed
                      ? "bg-blue-600"
                      : "bg-slate-200"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* =================================================
            QUESTIONS
        ================================================== */}
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {/* AGE */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700">
                1
              </span>

              <div>
                <h2 className="font-bold text-slate-900">
                  What is your age?
                </h2>

                <p className="text-sm text-slate-500">
                  Enter your current age in years.
                </p>
              </div>
            </div>

            <div className="mt-4 max-w-xs">
              <input
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(event) => {
                  setAge(event.target.value);
                  setStep(1);
                }}
                placeholder="e.g. 25"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* OCCUPATION */}
          <div className="mt-9 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700">
                2
              </span>

              <div>
                <h2 className="font-bold text-slate-900">
                  What best describes your occupation?
                </h2>

                <p className="text-sm text-slate-500">
                  Choose the category closest to your current work.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {occupations.map((item) => {
                const selected = occupation === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      setOccupation(item.value);
                      setStep(1);
                    }}
                    className={`rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-900">
                        {item.label}
                      </p>

                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          selected
                            ? "border-blue-600 bg-blue-600 text-xs text-white"
                            : "border-slate-300"
                        }`}
                      >
                        {selected ? "✓" : ""}
                      </span>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* INCOME */}
          <div className="mt-9 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700">
                3
              </span>

              <div>
                <h2 className="font-bold text-slate-900">
                  What is your annual household income?
                </h2>

                <p className="text-sm text-slate-500">
                  Enter an approximate amount before taxes.
                </p>
              </div>
            </div>

            <div className="mt-4 max-w-md">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  value={income}
                  onChange={(event) => {
                    setIncome(event.target.value);
                    setStep(1);
                  }}
                  placeholder="e.g. 300000"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-9 pr-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Some government schemes use different income definitions or
                monthly income limits. We use this only as a preliminary
                screening input.
              </p>
            </div>
          </div>

          {/* STATE */}
          <div className="mt-9 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700">
                4
              </span>

              <div>
                <h2 className="font-bold text-slate-900">
                  Which state or union territory do you live in?
                </h2>

                <p className="text-sm text-slate-500">
                  This helps identify schemes with location-specific rules.
                </p>
              </div>
            </div>

            <div className="mt-4 max-w-md">
              <select
                value={state}
                onChange={(event) => {
                  setState(event.target.value);
                  setStep(1);
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">
                  Select your state / UT
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

          {/* CHECK BUTTON */}
          <div className="mt-9 border-t border-slate-100 pt-8">
            <button
              type="button"
              disabled={!isComplete}
              onClick={startChecking}
              className={`w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition sm:w-auto ${
                isComplete
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              }`}
            >
              Find Matching Schemes
              <span className="ml-2">→</span>
            </button>

            {!isComplete && (
              <p className="mt-3 text-xs text-slate-500">
                Please answer all four questions to see your results.
              </p>
            )}
          </div>
        </div>

        {/* =================================================
            PROFILE SUMMARY
        ================================================== */}
        {isComplete && step >= 2 && (
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Your screening profile
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-800">
                    Age: {age}
                  </span>

                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-800">
                    {getOccupationLabel(
                      occupation as Occupation
                    )}
                  </span>

                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-800">
                    Income: {formatIncome(numericIncome)}
                  </span>

                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-800">
                    {state}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetChecker}
                className="rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                Start over
              </button>
            </div>
          </div>
        )}

        {/* =================================================
            RESULTS
        ================================================== */}
        {isComplete && step >= 2 && (
          <div className="mt-8">
            {/* RESULT HEADER */}
            <div>
              <p className="text-sm font-semibold text-blue-700">
                Your results
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Schemes that may be relevant to you
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                These results are based on the four details you provided and
                the screening information in SchemeSamjho. They are not an
                official eligibility decision.
              </p>
            </div>

            {/* STRONG MATCHES */}
            {strongMatches.length > 0 && (
              <section className="mt-7">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Strong matches
                    </h3>

                    <p className="text-sm text-slate-500">
                      Your profile matches several basic signals used in our
                      screening.
                    </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    {strongMatches.length}
                  </span>
                </div>

                <div className="space-y-5">
                  {strongMatches.map((result) => (
                    <ResultCard
                      key={result.scheme.slug}
                      result={result}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* POSSIBLE MATCHES */}
            {possibleMatches.length > 0 && (
              <section className="mt-10">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Possible matches
                    </h3>

                    <p className="text-sm text-slate-500">
                      These schemes may be relevant, but some conditions need
                      closer verification.
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    {possibleMatches.length}
                  </span>
                </div>

                <div className="space-y-5">
                  {possibleMatches.map((result) => (
                    <ResultCard
                      key={result.scheme.slug}
                      result={result}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* LOW MATCHES */}
            {lowMatches.length > 0 && (
              <section className="mt-10">
                <button
                  type="button"
                  onClick={() =>
                    setShowLowMatches((current) => !current)
                  }
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Other schemes
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      These have fewer matching signals based on your current
                      answers.
                    </p>
                  </div>

                  <span className="text-slate-400">
                    {showLowMatches ? "⌃" : "⌄"}
                  </span>
                </button>

                {showLowMatches && (
                  <div className="mt-4 space-y-5">
                    {lowMatches.map((result) => (
                      <ResultCard
                        key={result.scheme.slug}
                        result={result}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* NO RESULTS */}
            {results.length === 0 && (
              <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <h3 className="font-bold text-slate-900">
                  No matching schemes found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your profile information and check again.
                </p>
              </div>
            )}

            {/* =================================================
                DISCLAIMER
            ================================================== */}
            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-900">
                Important: this is not official eligibility
              </p>

              <p className="mt-2 text-sm leading-6 text-amber-800">
                SchemeSamjho provides a preliminary screening based on basic
                information. Government schemes can have detailed conditions
                involving land records, family status, category, employment,
                previous benefits, documents, databases and other factors.
                Always verify your final eligibility through the official
                government source before applying.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

/* =========================================================
   RESULT CARD
========================================================= */

function ResultCard({ result }: { result: Result }) {
  const { scheme, score, reasons, warnings } = result;
  const match = getMatchLabel(score);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* CARD HEADER */}
      <div className="border-b border-slate-100 p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {scheme.category}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${match.className}`}
              >
                {match.label}
              </span>
            </div>

            <h3 className="mt-3 text-xl font-bold text-slate-900">
              {scheme.name}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {scheme.shortDescription}
            </p>
          </div>

          {/* SCORE */}
          <div className="shrink-0 sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Profile match
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {score}%
            </p>
          </div>
        </div>
      </div>

      {/* QUICK INFO */}
      <div className="grid grid-cols-2 border-b border-slate-100 sm:grid-cols-4">
        <div className="border-b border-slate-100 p-4 sm:border-b-0 sm:border-r">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Age
          </p>

          <p className="mt-1 text-xs font-semibold text-slate-700">
            {formatAge(scheme.minAge, scheme.maxAge)}
          </p>
        </div>

        <div className="border-b border-slate-100 p-4 sm:border-b-0 sm:border-r">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Income
          </p>

          <p className="mt-1 text-xs font-semibold text-slate-700">
            {scheme.maxIncome !== undefined
              ? `≤ ${formatIncome(scheme.maxIncome)}`
              : "Verify"}
          </p>
        </div>

        <div className="border-r border-slate-100 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Category
          </p>

          <p className="mt-1 text-xs font-semibold text-slate-700">
            {scheme.category}
          </p>
        </div>

        <div className="p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Reviewed
          </p>

          <p className="mt-1 text-xs font-semibold text-slate-700">
            {scheme.lastVerified}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-2">
        {/* MATCHING SIGNALS */}
        <div>
          <h4 className="font-bold text-slate-900">
            Why it matched
          </h4>

          <div className="mt-4 space-y-3">
            {reasons.map((reason, index) => (
              <div
                key={`${reason}-${index}`}
                className="flex gap-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                  ✓
                </span>

                <p className="text-sm leading-6 text-slate-600">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* VERIFY */}
        <div>
          <h4 className="font-bold text-slate-900">
            Things to verify
          </h4>

          <div className="mt-4 space-y-3">
            {warnings.slice(0, 4).map((warning, index) => (
              <div
                key={`${warning}-${index}`}
                className="flex gap-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                  !
                </span>

                <p className="text-sm leading-6 text-slate-600">
                  {warning}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OFFICIAL FACTORS */}
      <div className="border-t border-slate-100 bg-slate-50 p-5 sm:p-6">
        <h4 className="font-bold text-slate-900">
          Official eligibility factors to check
        </h4>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {scheme.eligibilitySummary.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex gap-3 rounded-xl bg-white p-3 ring-1 ring-slate-100"
            >
              <span className="mt-0.5 text-blue-600">
                •
              </span>

              <p className="text-xs leading-5 text-slate-600">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* EXCLUSIONS */}
        {scheme.exclusions &&
          scheme.exclusions.length > 0 && (
            <div className="mt-5">
              <h5 className="text-sm font-bold text-slate-900">
                Important exclusions
              </h5>

              <div className="mt-3 space-y-2">
                {scheme.exclusions
                  .slice(0, 4)
                  .map((item, index) => (
                    <p
                      key={`${item}-${index}`}
                      className="text-xs leading-5 text-slate-600"
                    >
                      <span className="mr-2 font-bold text-amber-600">
                        !
                      </span>
                      {item}
                    </p>
                  ))}
              </div>
            </div>
          )}
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col gap-3 border-t border-slate-100 p-5 sm:flex-row sm:p-6">
        <Link
          href={`/schemes/${scheme.slug}`}
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          View Scheme
          <span className="ml-2">→</span>
        </Link>

        <Link
          href={`/explainers/${scheme.slug}`}
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
        >
          Read Explainer
        </Link>

        <a
          href={scheme.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
        >
          Official Source
          <span className="ml-2">↗</span>
        </a>
      </div>
    </article>
  );
}