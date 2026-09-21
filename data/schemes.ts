export type Scheme = {
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  documents: string[];
  occupations: string[];
  minAge?: number;
  maxAge?: number;
  maxIncome?: number | null;
  eligibilitySummary: string;
  exclusions: string[];
  lastVerified: string;
  officialUrl: string;
};

export const schemes: Scheme[] = [
  {
    name: "PM-KISAN",
    slug: "pm-kisan",
    category: "Agriculture",
    shortDescription:
      "Income support scheme for eligible landholding farmer families.",
    description:
      "Pradhan Mantri Kisan Samman Nidhi provides income support to eligible landholding farmer families subject to the scheme rules.",
    benefits: [
      "Income support through eligible installments.",
      "Direct transfer to eligible beneficiaries.",
      "Support for agricultural household expenses.",
    ],
    documents: [
      "Aadhaar card",
      "Bank account details",
      "Land ownership or land record details",
      "Mobile number",
    ],
    occupations: ["Farmer"],
    minAge: 18,
    maxIncome: null,
    eligibilitySummary:
      "Eligible landholding farmer families subject to applicable government conditions and exclusions.",
    exclusions: [
      "Certain higher-income and government-service categories are excluded.",
      "Other exclusion conditions may apply under the scheme guidelines.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.myscheme.gov.in/schemes/pradhan-mantri-kisan-samman-nidhi",
  },

  {
    name: "PM Vishwakarma",
    slug: "pm-vishwakarma",
    category: "Business",
    shortDescription:
      "Support programme for eligible traditional artisans and craftspeople.",
    description:
      "PM Vishwakarma supports eligible artisans and craftspeople working in traditional trades through recognition, training and other scheme benefits.",
    benefits: [
      "PM Vishwakarma certificate and identity card.",
      "Skill training support.",
      "Toolkit incentive subject to scheme rules.",
      "Credit support subject to eligibility.",
    ],
    documents: [
      "Aadhaar card",
      "Mobile number",
      "Bank account details",
      "Other documents required during registration",
    ],
    occupations: [
      "Artisan",
      "Self Employed",
      "Business Owner",
      "Worker",
    ],
    minAge: 18,
    maxIncome: null,
    eligibilitySummary:
      "Available to eligible artisans and craftspeople in specified traditional trades.",
    exclusions: [
      "The applicant must meet the specified trade and eligibility conditions.",
      "Additional exclusion conditions may apply.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.myscheme.gov.in/schemes/pm-vishwakarma",
  },

  {
    name: "Ayushman Bharat PM-JAY",
    slug: "ayushman-bharat",
    category: "Healthcare",
    shortDescription:
      "Government health assurance programme providing hospitalisation benefits to eligible beneficiaries.",
    description:
      "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana provides cashless hospitalisation coverage to eligible beneficiaries through empanelled hospitals.",
    benefits: [
      "Cashless hospitalisation for eligible beneficiaries.",
      "Coverage for specified secondary and tertiary healthcare services.",
      "Access to empanelled hospitals.",
    ],
    documents: [
      "Aadhaar or other accepted identity proof",
      "Ration card or family identification document",
      "Address details",
      "Other documents required for beneficiary verification",
    ],
    occupations: [
      "Worker",
      "Artisan",
      "Self Employed",
      "Other",
    ],
    maxIncome: null,
    eligibilitySummary:
      "Eligibility is based on government-defined beneficiary and occupational criteria rather than a simple universal income test.",
    exclusions: [
      "Eligibility depends on the beneficiary database and applicable scheme criteria.",
      "Specific exclusion conditions apply.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.myscheme.gov.in/hi/schemes/ab-pmjay",
  },

  {
    name: "Pradhan Mantri Fasal Bima Yojana",
    slug: "pm-fasal-bima-yojana",
    category: "Agriculture",
    shortDescription:
      "Crop insurance scheme designed to provide financial protection against specified crop losses.",
    description:
      "Pradhan Mantri Fasal Bima Yojana provides crop insurance protection to eligible farmers against specified risks and crop losses according to notified terms.",
    benefits: [
      "Crop insurance protection.",
      "Financial support for covered crop losses.",
      "Protection against specified natural risks.",
    ],
    documents: [
      "Aadhaar card",
      "Bank account details",
      "Land or cultivation records",
      "Crop-related details",
    ],
    occupations: ["Farmer"],
    minAge: 18,
    maxIncome: null,
    eligibilitySummary:
      "Eligible farmers can participate subject to notified crops, areas, seasons and applicable scheme rules.",
    exclusions: [
      "Only notified crops and areas are covered.",
      "Claims are subject to the applicable insurance and scheme conditions.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.myscheme.gov.in/schemes/pmfby",
  },

  {
    name: "Pradhan Mantri Awas Yojana - Urban",
    slug: "pmay-urban",
    category: "Housing",
    shortDescription:
      "Housing support programme for eligible urban households.",
    description:
      "Pradhan Mantri Awas Yojana - Urban supports eligible urban households through housing-related assistance under applicable components of the programme.",
    benefits: [
      "Housing assistance under eligible components.",
      "Support for eligible urban households.",
      "Assistance subject to applicable programme rules.",
    ],
    documents: [
      "Aadhaar card",
      "Identity proof",
      "Address proof",
      "Income-related documents",
      "Bank account details",
    ],
    occupations: [
      "Worker",
      "Self Employed",
      "Business Owner",
      "Other",
    ],
    minAge: 18,
    maxIncome: 1800000,
    eligibilitySummary:
      "Eligibility depends on household income category, housing status, location and other programme conditions.",
    exclusions: [
      "Families already owning a pucca house may not qualify under applicable conditions.",
      "Previous housing assistance may affect eligibility.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.myscheme.gov.in/schemes/pmay-u",
  },

  {
    name: "Pradhan Mantri Mudra Yojana",
    slug: "pm-mudra-yojana",
    category: "Business",
    shortDescription:
      "Credit support programme for eligible micro and small business activities.",
    description:
      "Pradhan Mantri Mudra Yojana facilitates institutional credit for eligible micro enterprises and small business activities through participating financial institutions.",
    benefits: [
      "Access to eligible business credit.",
      "Support for income-generating micro enterprises.",
      "Credit through participating financial institutions.",
    ],
    documents: [
      "Aadhaar card",
      "PAN card",
      "Address proof",
      "Bank account details",
      "Business-related documents",
    ],
    occupations: [
      "Business Owner",
      "Self Employed",
      "Worker",
    ],
    minAge: 18,
    maxIncome: null,
    eligibilitySummary:
      "Eligible non-corporate and non-farm small or micro enterprises can seek credit subject to lender and scheme conditions.",
    exclusions: [
      "Loan approval is subject to the lending institution.",
      "The applicant must satisfy applicable credit and business requirements.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.india.gov.in/my-government/schemes",
  },

  {
    name: "PM SVANidhi",
    slug: "pm-svanidhi",
    category: "Business",
    shortDescription:
      "Credit support programme for eligible street vendors.",
    description:
      "PM SVANidhi provides structured credit support to eligible street vendors to help them restart or strengthen their vending activities.",
    benefits: [
      "Working-capital credit support.",
      "Digital transaction incentives subject to scheme rules.",
      "Support for eligible street vendors.",
    ],
    documents: [
      "Identity proof",
      "Address details",
      "Street vendor certificate or applicable identification",
      "Bank account details",
    ],
    occupations: [
      "Self Employed",
      "Business Owner",
      "Worker",
    ],
    minAge: 18,
    maxIncome: null,
    eligibilitySummary:
      "Designed for eligible street vendors meeting the applicable identification and scheme requirements.",
    exclusions: [
      "Eligibility depends on vendor identification and applicable government conditions.",
      "Loan approval is subject to the applicable process.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.myscheme.gov.in/schemes/pm-svanidhi",
  },

  {
    name: "Pradhan Mantri Ujjwala Yojana",
    slug: "pm-ujjwala-yojana",
    category: "Women",
    shortDescription:
      "LPG access programme for eligible households under applicable government criteria.",
    description:
      "Pradhan Mantri Ujjwala Yojana supports access to LPG connections for eligible households, with eligibility and benefits governed by the current programme rules.",
    benefits: [
      "LPG connection support for eligible households.",
      "Improved access to clean cooking fuel.",
      "Support subject to applicable government provisions.",
    ],
    documents: [
      "Aadhaar card",
      "Address proof",
      "Family composition details",
      "Bank account details",
      "Other KYC documents",
    ],
    occupations: [
      "Woman",
      "Other",
    ],
    minAge: 18,
    maxIncome: null,
    eligibilitySummary:
      "Eligible adult women from qualifying households can apply subject to the current programme criteria.",
    exclusions: [
      "Eligibility depends on household and connection-related conditions.",
      "Duplicate or existing eligible LPG connections may affect eligibility.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.india.gov.in/category/housing-local-services/subcategory/electricity-lpg-water/details/pradhan-mantri-ujjwala-yojana-pmuy",
  },

  {
    name: "Pradhan Mantri Jan-Dhan Yojana",
    slug: "pm-jan-dhan-yojana",
    category: "Finance",
    shortDescription:
      "Financial inclusion programme providing access to basic banking services.",
    description:
      "Pradhan Mantri Jan-Dhan Yojana focuses on access to banking, savings, remittance, credit, insurance and pension services.",
    benefits: [
      "Access to basic banking services.",
      "Savings and deposit account access.",
      "Access to eligible financial services.",
    ],
    documents: [
      "Aadhaar card or accepted KYC document",
      "Address proof",
      "Mobile number",
    ],
    occupations: [
      "Worker",
      "Self Employed",
      "Business Owner",
      "Student",
      "Other",
    ],
    minAge: 10,
    maxIncome: null,
    eligibilitySummary:
      "Banking access is available subject to account-opening and applicable KYC requirements.",
    exclusions: [
      "Account opening is subject to applicable KYC requirements.",
      "Specific banking products may have additional conditions.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.myscheme.gov.in/schemes/pradhan-mantri-jan-dhan-yojana",
  },

  {
    name: "Sukanya Samriddhi Yojana",
    slug: "sukanya-samriddhi-yojana",
    category: "Savings",
    shortDescription:
      "Small savings programme designed for the financial future of a girl child.",
    description:
      "Sukanya Samriddhi Yojana is a government-backed small savings scheme intended for eligible girl children.",
    benefits: [
      "Long-term savings opportunity.",
      "Government-backed small savings product.",
      "Tax-related benefits subject to applicable tax rules.",
    ],
    documents: [
      "Girl child's birth certificate",
      "Parent or guardian identity proof",
      "Address proof",
      "KYC documents",
    ],
    occupations: [
      "Woman",
      "Other",
    ],
    minAge: 0,
    maxAge: 10,
    maxIncome: null,
    eligibilitySummary:
      "An account can generally be opened for an eligible girl child within the applicable age requirement.",
    exclusions: [
      "Age and account-opening conditions apply.",
      "Account rules limit the number of eligible accounts under applicable provisions.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.india.gov.in/my-government/schemes",
  },

  {
    name: "Atal Pension Yojana",
    slug: "atal-pension-yojana",
    category: "Finance",
    shortDescription:
      "Pension-oriented savings scheme for eligible subscribers.",
    description:
      "Atal Pension Yojana is a pension scheme intended to encourage long-term retirement savings among eligible subscribers.",
    benefits: [
      "Pension-oriented long-term savings.",
      "Defined pension options according to applicable contribution rules.",
      "Support for retirement planning.",
    ],
    documents: [
      "Aadhaar card",
      "Bank account details",
      "Mobile number",
      "KYC documents",
    ],
    occupations: [
      "Worker",
      "Self Employed",
      "Business Owner",
      "Other",
    ],
    minAge: 18,
    maxAge: 40,
    maxIncome: null,
    eligibilitySummary:
      "Eligible individuals can subscribe within the applicable joining age and account conditions.",
    exclusions: [
      "Joining age limits apply.",
      "Additional subscriber conditions may apply under current rules.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.india.gov.in/my-government/schemes",
  },

  {
    name: "Pradhan Mantri Kaushal Vikas Yojana",
    slug: "pm-kaushal-vikas-yojana",
    category: "Employment",
    shortDescription:
      "Skill development programme supporting eligible candidates through training and certification.",
    description:
      "Pradhan Mantri Kaushal Vikas Yojana supports skill development through training and certification opportunities under applicable programme components.",
    benefits: [
      "Skill training opportunities.",
      "Assessment and certification under eligible programmes.",
      "Support for employability-oriented skills.",
    ],
    documents: [
      "Aadhaar card",
      "Identity proof",
      "Mobile number",
      "Educational documents where applicable",
    ],
    occupations: [
      "Student",
      "Job Seeker",
      "Worker",
      "Self Employed",
    ],
    minAge: 18,
    maxIncome: null,
    eligibilitySummary:
      "Eligibility depends on the applicable training programme, candidate profile and current guidelines.",
    exclusions: [
      "Individual training programmes can have different eligibility conditions.",
      "Availability depends on approved training centres and programmes.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.india.gov.in/my-government/schemes",
  },

  {
    name: "Pradhan Mantri Shram Yogi Maan-dhan",
    slug: "pm-shram-yogi-maandhan",
    category: "Employment",
    shortDescription:
      "Pension scheme for eligible workers in the unorganised sector.",
    description:
      "Pradhan Mantri Shram Yogi Maan-dhan is a pension scheme for eligible unorganised workers meeting the prescribed age, occupation and income conditions.",
    benefits: [
      "Pension-oriented social security support.",
      "Designed for eligible unorganised workers.",
      "Monthly contribution-based pension structure.",
    ],
    documents: [
      "Aadhaar card",
      "Savings bank account details",
      "Mobile number",
      "Other KYC details",
    ],
    occupations: [
      "Worker",
      "Self Employed",
      "Artisan",
      "Farmer",
    ],
    minAge: 18,
    maxAge: 40,
    maxIncome: 180000,
    eligibilitySummary:
      "Designed for eligible unorganised workers aged 18–40 with monthly income within the prescribed limit.",
    exclusions: [
      "Certain organised-sector or pension-covered workers are excluded.",
      "Income and age conditions apply.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.india.gov.in/category/business-self-employed/subcategory/career-information-jobs/details/pradhan-mantri-shram-yogi-maan-dhan-pm-sym",
  },

  {
    name: "Pradhan Mantri Matru Vandana Yojana",
    slug: "pm-matru-vandana-yojana",
    category: "Women",
    shortDescription:
      "Maternity benefit programme for eligible women under applicable conditions.",
    description:
      "Pradhan Mantri Matru Vandana Yojana provides maternity-related financial support to eligible women according to the applicable programme guidelines.",
    benefits: [
      "Maternity-related financial assistance.",
      "Support linked to applicable maternity conditions.",
      "Encourages appropriate health and nutrition practices.",
    ],
    documents: [
      "Aadhaar card",
      "Bank account details",
      "Pregnancy or maternity-related documents",
      "Mobile number",
    ],
    occupations: [
      "Woman",
      "Worker",
      "Self Employed",
      "Other",
    ],
    minAge: 18,
    maxIncome: null,
    eligibilitySummary:
      "Eligible women can receive benefits subject to the current scheme conditions and applicable category requirements.",
    exclusions: [
      "Eligibility depends on the applicable maternity and beneficiary conditions.",
      "Required registration and documentation conditions apply.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.india.gov.in/my-government/schemes",
  },

  {
    name: "Stand-Up India",
    slug: "stand-up-india",
    category: "Business",
    shortDescription:
      "Bank-loan facilitation programme for eligible entrepreneurs from specified groups.",
    description:
      "Stand-Up India facilitates bank loans for eligible entrepreneurs setting up greenfield enterprises, subject to applicable scheme and lending conditions.",
    benefits: [
      "Access to eligible institutional credit.",
      "Support for setting up a greenfield enterprise.",
      "Loan facilitation through participating banks.",
    ],
    documents: [
      "Aadhaar card",
      "PAN card",
      "Address proof",
      "Business plan",
      "Bank-required documents",
    ],
    occupations: [
      "Business Owner",
      "Self Employed",
    ],
    minAge: 18,
    maxIncome: null,
    eligibilitySummary:
      "Eligibility depends on the applicant category, enterprise type and applicable bank and scheme conditions.",
    exclusions: [
      "Loan approval is subject to the lending institution.",
      "The enterprise and applicant must satisfy applicable scheme requirements.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.india.gov.in/my-government/schemes",
  },

  {
    name: "Prime Minister's Employment Generation Programme",
    slug: "pmegp",
    category: "Business",
    shortDescription:
      "Credit-linked support programme for eligible new micro-enterprises.",
    description:
      "The Prime Minister's Employment Generation Programme supports eligible entrepreneurs establishing new micro-enterprises through credit-linked assistance subject to programme conditions.",
    benefits: [
      "Credit-linked assistance for eligible projects.",
      "Support for establishing new micro-enterprises.",
      "Employment-generation oriented support.",
    ],
    documents: [
      "Aadhaar card",
      "PAN card",
      "Project report",
      "Bank account details",
      "Educational or category documents where applicable",
    ],
    occupations: [
      "Business Owner",
      "Self Employed",
      "Job Seeker",
    ],
    minAge: 18,
    maxIncome: null,
    eligibilitySummary:
      "Eligible applicants can seek support for qualifying new micro-enterprise projects subject to programme conditions.",
    exclusions: [
      "Existing units may not qualify under the same conditions as new units.",
      "Project and financing requirements apply.",
    ],
    lastVerified: "September 2026",
    officialUrl:
      "https://www.india.gov.in/my-government/schemes",
  },
];