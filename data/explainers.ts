import { schemes } from "./schemes";

export type ExplainerFaq = {
  question: string;
  answer: string;
};

export type Explainer = {
  slug: string;
  schemeSlug: string;
  title: string;
  category: string;
  summary: string;
  whatIsIt: string;
  why: string;
  who: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  howItWorks: string[];
  howToApply: string;
  faqs: ExplainerFaq[];
};

type ExplainerContent = Omit<
  Explainer,
  "slug" | "schemeSlug" | "category"
>;

const explainerContent: Record<
  string,
  ExplainerContent
> = {
  "pm-kisan": {
    title: "PM-KISAN explained simply",

    summary:
      "Understand PM-KISAN, its purpose, benefits, eligibility, documents and application process in simple language.",

    whatIsIt:
      "PM-KISAN is a government income-support scheme for eligible farmer families. The scheme provides financial support through direct benefit transfers.",

    why:
      "The scheme is intended to provide additional financial support to eligible farming families and help them manage agricultural and related household expenses.",

    who:
      "Eligible farmer families who satisfy the applicable government conditions can benefit from the scheme.",

    benefits: [
      "Financial support through direct benefit transfer.",
      "Support is provided directly to eligible beneficiaries.",
      "Can help eligible farming families manage agricultural expenses.",
    ],

    eligibility: [
      "You must belong to an eligible farmer family.",
      "Applicable land and beneficiary conditions must be satisfied.",
      "You must not fall under the applicable exclusion categories.",
    ],

    documents: [
      "Aadhaar or other required identity information.",
      "Bank account details.",
      "Land or farmer-related records, where required.",
      "Other documents requested during verification.",
    ],

    howItWorks: [
      "Check whether you satisfy the applicable eligibility conditions.",
      "Provide the required beneficiary and bank details.",
      "Government authorities verify the submitted information.",
      "Eligible beneficiaries receive payments through the prescribed system.",
    ],

    howToApply:
      "Use the official PM-KISAN website to check the current registration process, beneficiary information and application requirements.",

    faqs: [
      {
        question:
          "Is PM-KISAN an income-support scheme?",
        answer:
          "Yes. PM-KISAN is designed to provide income support to eligible farmer families through direct benefit transfers.",
      },
      {
        question:
          "Does everyone who owns agricultural land automatically qualify?",
        answer:
          "No. Eligibility also depends on the applicable government conditions and exclusion criteria.",
      },
      {
        question:
          "Where can I check the latest information?",
        answer:
          "Check the official PM-KISAN website for current eligibility, registration, payment and beneficiary information.",
      },
    ],
  },

  "pm-vishwakarma": {
    title: "PM Vishwakarma explained simply",

    summary:
      "Understand PM Vishwakarma, the traditional trades it supports, its benefits, eligibility and application process.",

    whatIsIt:
      "PM Vishwakarma is a government initiative focused on supporting eligible traditional artisans and craftspeople working in covered trades.",

    why:
      "The scheme aims to strengthen the skills, tools, market access and financial opportunities available to eligible traditional artisans.",

    who:
      "Traditional artisans and craftspeople working in trades covered by the scheme may be eligible, subject to the applicable conditions.",

    benefits: [
      "Recognition through the beneficiary process.",
      "Skill training and related support.",
      "Support for tools and equipment.",
      "Access to applicable credit and financial assistance.",
      "Support related to marketing and digital transactions.",
    ],

    eligibility: [
      "You must work in an eligible traditional trade.",
      "You must satisfy the applicable beneficiary conditions.",
      "Other scheme-specific eligibility and exclusion conditions may apply.",
    ],

    documents: [
      "Aadhaar or required identity information.",
      "Mobile number.",
      "Bank account details.",
      "Other documents required during registration and verification.",
    ],

    howItWorks: [
      "Register through the prescribed government process.",
      "The submitted information goes through verification.",
      "Eligible beneficiaries receive recognition and access to applicable scheme components.",
      "Training, tools, credit and other support are provided according to the applicable rules.",
    ],

    howToApply:
      "Use the official PM Vishwakarma portal or the prescribed assisted registration process to check current registration requirements and application steps.",

    faqs: [
      {
        question:
          "Who is PM Vishwakarma mainly for?",
        answer:
          "It focuses on traditional artisans and craftspeople working in trades covered by the scheme.",
      },
      {
        question:
          "Does the scheme only provide financial support?",
        answer:
          "No. The scheme also includes components such as training, recognition, tools and market-related support.",
      },
      {
        question:
          "Where can I check the current process?",
        answer:
          "Use the official PM Vishwakarma portal for the latest registration and scheme information.",
      },
    ],
  },

  "ayushman-bharat": {
    title: "Ayushman Bharat explained simply",

    summary:
      "Understand Ayushman Bharat, healthcare coverage, eligibility, beneficiary verification and how the programme works.",

    whatIsIt:
      "Ayushman Bharat is a government healthcare initiative designed to improve access to healthcare and financial protection for eligible beneficiaries.",

    why:
      "The initiative aims to reduce financial barriers to healthcare and improve access to appropriate health services for eligible people.",

    who:
      "Eligibility depends on the particular Ayushman Bharat component and the beneficiary criteria prescribed by the government.",

    benefits: [
      "Access to eligible healthcare services under applicable components.",
      "Financial protection for covered medical treatment where applicable.",
      "Access to participating healthcare facilities according to scheme rules.",
    ],

    eligibility: [
      "Eligibility depends on the applicable government beneficiary criteria.",
      "The specific programme or component may have different conditions.",
      "Beneficiary details may need to be verified before receiving services.",
    ],

    documents: [
      "Required identity information.",
      "Beneficiary identification details.",
      "Other documents requested during verification.",
    ],

    howItWorks: [
      "Check beneficiary eligibility through the official system.",
      "Complete the required verification process.",
      "Use the applicable beneficiary identification at an eligible healthcare facility.",
      "Covered services are provided according to the applicable scheme rules.",
    ],

    howToApply:
      "Use the official Ayushman Bharat/PM-JAY channels to check eligibility, beneficiary status and the current process for accessing services.",

    faqs: [
      {
        question:
          "Is Ayushman Bharat only about hospital treatment?",
        answer:
          "Ayushman Bharat covers government healthcare initiatives, and the exact services depend on the specific component and applicable rules.",
      },
      {
        question:
          "How can I check whether I am eligible?",
        answer:
          "Use the official beneficiary and eligibility services provided through the government healthcare system.",
      },
      {
        question: "Can I use any hospital?",
        answer:
          "Services are subject to the applicable scheme rules and participating healthcare facilities.",
      },
    ],
  },
};

export const explainers: Explainer[] =
  Object.entries(explainerContent)
    .map(([schemeSlug, content]) => {
      const scheme = schemes.find(
        (item) => item.slug === schemeSlug
      );

      if (!scheme) {
        return null;
      }

      return {
        slug: schemeSlug,
        schemeSlug,
        category: scheme.category,
        ...content,
      };
    })
    .filter(
      (explainer): explainer is Explainer =>
        explainer !== null
    );

export function getExplainer(
  slug: string
): Explainer | undefined {
  return explainers.find(
    (explainer) => explainer.slug === slug
  );
}