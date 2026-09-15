export type Scheme = {
  name: string;
  slug: string;
  category: string;

  shortDescription: string;
  description: string;

  benefits: string[];
  documents: string[];

  occupations: string[];
  keywords: string[];

  minAge?: number;
  maxAge?: number;

  /*
   * Use this only when the scheme has a simple
   * annual income criterion that works with our
   * preliminary eligibility checker.
   */
  maxIncome?: number;

  states?: string[];

  /*
   * Human-readable eligibility information.
   */
  eligibilitySummary: string[];

  /*
   * Important exclusions or conditions.
   */
  exclusions?: string[];

  /*
   * Verification information.
   */
  lastVerified: string;

  /*
   * Official government source.
   */
  officialUrl: string;
};

export const schemes: Scheme[] = [
  /*
   * =========================================================
   * 1. PM-KISAN
   * =========================================================
   */
  {
    name: "PM-KISAN",
    slug: "pm-kisan",
    category: "Farmers",

    shortDescription:
      "Income support scheme for eligible land-holding farmer families in India.",

    description:
      "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme that provides income support to eligible land-holding farmer families.",

    benefits: [
      "₹6,000 financial support per year",
      "Paid in three equal installments",
      "Money is transferred directly to the beneficiary's bank account",
    ],

    documents: [
      "Aadhaar details",
      "Bank account details",
      "Land-related details",
      "Mobile number and other information required during registration or verification",
    ],

    occupations: ["farmer"],

    keywords: [
      "farmer",
      "agriculture",
      "kisan",
      "income support",
      "financial assistance",
      "pm kisan",
    ],

    eligibilitySummary: [
      "Primarily intended for eligible land-holding farmer families.",
      "The family definition includes husband, wife and minor children.",
      "State and Union Territory administrations identify and verify eligible farmer families.",
      "eKYC is mandatory for registered PM-KISAN farmers.",
      "Eligibility is subject to the official PM-KISAN exclusion rules.",
    ],

    exclusions: [
      "Institutional landholders are excluded.",
      "Certain present and former holders of constitutional or elected posts are excluded.",
      "Many serving or retired government and public-sector employees are excluded, subject to specified exceptions.",
      "Retired pensioners receiving ₹10,000 or more per month are generally excluded, subject to specified exceptions.",
      "People who paid income tax in the last assessment year are excluded.",
      "Certain registered professionals practising their profession are excluded.",
      "Cases where more than one family member is receiving benefits may be subject to verification.",
      "Land ownership and beneficiary records may be verified by the authorities.",
    ],

    lastVerified: "14 September 2026",

    officialUrl: "https://pmkisan.gov.in/",
  },

  /*
   * =========================================================
   * 2. PM VISHWAKARMA
   * =========================================================
   */
  {
    name: "PM Vishwakarma",
    slug: "pm-vishwakarma",
    category: "Artisans",

    shortDescription:
      "Government support scheme for traditional artisans and craftspeople who work with their hands and tools.",

    description:
      "PM Vishwakarma is a Central Sector Scheme providing end-to-end support to eligible artisans and craftspeople working with their hands and tools in 18 traditional trades.",

    benefits: [
      "PM Vishwakarma certificate and ID card",
      "Basic skill training of 5–7 days",
      "Advanced skill training of 15 days or more",
      "Training stipend of ₹500 per day",
      "Toolkit incentive of up to ₹15,000",
      "Collateral-free credit support of up to ₹3 lakh in two tranches",
      "Concessional loan interest rate of 5%",
      "Digital transaction incentives",
      "Marketing and market-linkage support",
    ],

    documents: [
      "Aadhaar",
      "Mobile number",
      "Bank account details",
      "Information about the artisan trade",
      "Other information required during registration and verification",
    ],

    occupations: ["other", "business"],

    keywords: [
      "artisan",
      "craftsman",
      "vishwakarma",
      "carpenter",
      "boat maker",
      "armourer",
      "blacksmith",
      "tool kit maker",
      "locksmith",
      "goldsmith",
      "potter",
      "sculptor",
      "cobbler",
      "mason",
      "barber",
      "tailor",
      "washerman",
      "traditional worker",
      "handicraft",
      "toolkit",
      "skill training",
      "loan",
    ],

    minAge: 18,

    eligibilitySummary: [
      "Applicant must be at least 18 years old on the date of registration.",
      "Applicant must be engaged in one of the 18 traditional trades covered by PM Vishwakarma.",
      "The artisan or craftsperson should work with hands and tools.",
      "The applicant should generally be working in the unorganised sector or on a self-employment basis.",
      "The applicant should be engaged in the relevant trade on the date of registration.",
      "Registration is followed by official verification.",
    ],

    exclusions: [
      "The scheme is limited to the 18 eligible traditional trades.",
      "A person employed in government service is not eligible.",
      "Certain previous loans under similar Central or State Government credit-based schemes can affect eligibility.",
      "The benefit is restricted to one member of a family.",
      "Final eligibility is determined through the official registration and verification process.",
    ],

    lastVerified: "14 September 2026",

    officialUrl: "https://pmvishwakarma.gov.in/",
  },

  /*
   * =========================================================
   * 3. AYUSHMAN BHARAT PM-JAY
   * =========================================================
   */
  {
    name: "Ayushman Bharat PM-JAY",
    slug: "ayushman-bharat",
    category: "Healthcare",

    shortDescription:
      "Government health protection scheme providing cashless hospitalization benefits to eligible beneficiaries.",

    description:
      "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) provides health coverage for eligible beneficiaries for specified secondary and tertiary hospitalization services through empanelled hospitals.",

    benefits: [
      "Cashless treatment at empanelled hospitals",
      "Coverage for eligible hospitalization expenses",
      "Access to public and private empanelled hospitals",
      "Portability of benefits across India at participating hospitals",
      "Financial protection against eligible hospitalization expenses",
    ],

    documents: [
      "Aadhaar or other accepted identification",
      "Beneficiary identification details",
      "Ration card or other supporting family documentation where applicable",
      "Documents required by the implementing authority",
    ],

    occupations: [
      "farmer",
      "business",
      "employee",
      "student",
      "other",
    ],

    keywords: [
      "health",
      "healthcare",
      "hospital",
      "medical",
      "ayushman",
      "pm jay",
      "pm-jay",
      "health insurance",
    ],

    eligibilitySummary: [
      "Eligibility is determined according to the beneficiary identification rules of PM-JAY and applicable government decisions.",
      "Beneficiaries should check their eligibility through official channels.",
      "Treatment is provided through empanelled hospitals for covered services.",
      "Coverage and beneficiary status should be verified through the official system.",
    ],

    exclusions: [
      "Not every person is automatically eligible based only on income.",
      "Eligibility depends on the applicable beneficiary database and government rules.",
      "Individual treatments and services may have specific coverage conditions.",
      "The scheme should not be treated as a general private health insurance policy.",
    ],

    lastVerified: "14 September 2026",

    officialUrl: "https://nha.gov.in/",
  },

  /*
   * =========================================================
   * 4. PRADHAN MANTRI AWAS YOJANA
   * =========================================================
   */
  {
    name: "Pradhan Mantri Awas Yojana",
    slug: "pm-awas-yojana",
    category: "Housing",

    shortDescription:
      "Government housing support programme for eligible households under applicable PMAY components.",

    description:
      "Pradhan Mantri Awas Yojana includes government housing programmes designed to improve access to affordable and adequate housing for eligible households.",

    benefits: [
      "Housing assistance for eligible beneficiaries",
      "Support towards construction or purchase of eligible housing",
      "Assistance under applicable housing components",
      "Interest-related assistance under applicable components",
      "Improved access to formal housing support",
    ],

    documents: [
      "Aadhaar",
      "Identity proof",
      "Address proof",
      "Income-related documents where applicable",
      "Bank account details",
      "Property or housing documents where applicable",
    ],

    occupations: [
      "farmer",
      "business",
      "employee",
      "student",
      "other",
    ],

    keywords: [
      "housing",
      "home",
      "house",
      "awas",
      "pmay",
      "pmay urban",
      "home loan",
      "housing subsidy",
    ],

    eligibilitySummary: [
      "Eligibility depends on the applicable PMAY component and beneficiary category.",
      "Household and housing conditions may be considered.",
      "Income criteria vary according to the applicable component.",
      "For applicable PMAY-Urban components, beneficiary and housing conditions must be satisfied.",
      "Applicants must satisfy the applicable official requirements.",
    ],

    exclusions: [
      "Eligibility is not determined by income alone.",
      "Different PMAY components have different conditions.",
      "Applicants who already own a qualifying pucca house may not qualify for applicable housing assistance.",
      "A beneficiary generally cannot receive benefits under multiple components where the applicable rules prohibit it.",
    ],

    lastVerified: "14 September 2026",

    officialUrl: "https://pmay-urban.gov.in/",
  },

  /*
   * =========================================================
   * 5. SUKANYA SAMRIDDHI YOJANA
   * =========================================================
   */
  {
    name: "Sukanya Samriddhi Yojana",
    slug: "sukanya-samriddhi",
    category: "Savings",

    shortDescription:
      "Government-backed savings scheme designed for the financial future of a girl child.",

    description:
      "Sukanya Samriddhi Yojana is a government-backed small savings scheme intended to encourage savings for the future education and financial needs of a girl child.",

    benefits: [
      "Government-backed small savings product",
      "Designed specifically for a girl child",
      "Interest is provided according to the applicable government-notified rate",
      "Tax benefits may be available under applicable tax rules",
      "Long-term savings for education and future needs",
    ],

    documents: [
      "Birth certificate of the girl child",
      "Identity proof of parent or guardian",
      "Address proof",
      "PAN and KYC documents where applicable",
      "Other documents required by the account-opening institution",
    ],

    occupations: [
      "farmer",
      "business",
      "employee",
      "student",
      "other",
    ],

    keywords: [
      "girl child",
      "savings",
      "sukanya",
      "education",
      "investment",
      "post office",
      "small savings",
    ],

    maxAge: 10,

    eligibilitySummary: [
      "The account is intended for an eligible girl child who meets the applicable age requirement.",
      "The account can generally be opened by a parent or legal guardian on behalf of the girl child.",
      "The account is subject to the rules of the Sukanya Samriddhi Account Scheme.",
      "The girl's date of birth must be established through the required documentation.",
    ],

    exclusions: [
      "The account is specifically for eligible girl children.",
      "Age and account-opening rules apply.",
      "Deposit, withdrawal and maturity rules must be followed.",
      "The account-opening institution may require additional KYC documents.",
    ],

    lastVerified: "14 September 2026",

    officialUrl: "https://www.indiapost.gov.in/",
  },

  /*
   * =========================================================
   * 6. PRADHAN MANTRI MUDRA YOJANA
   * =========================================================
   */
  {
    name: "Pradhan Mantri Mudra Yojana",
    slug: "pm-mudra-yojana",
    category: "Business",

    shortDescription:
      "Credit support scheme for eligible micro and small business activities.",

    description:
      "Pradhan Mantri Mudra Yojana provides institutional credit support to eligible micro enterprises and small business activities through participating lending institutions.",

    benefits: [
      "Business credit support",
      "Loans through eligible lending institutions",
      "Loan products based on the stage and requirements of the business",
      "Support for income-generating business activities",
      "Credit support without conventional collateral requirements under applicable PMMY rules",
    ],

    documents: [
      "Identity proof",
      "Address proof",
      "Bank account details",
      "Business-related documents",
      "Business or project information",
      "Other documents required by the lending institution",
    ],

    occupations: ["business"],

    keywords: [
      "mudra",
      "business",
      "loan",
      "startup",
      "small business",
      "micro business",
      "self employed",
      "entrepreneur",
      "shishu",
      "kishor",
      "tarun",
    ],

    minAge: 18,

    eligibilitySummary: [
      "Intended for eligible micro and small business activities covered by PMMY.",
      "Applicants must satisfy the requirements of the participating lending institution.",
      "The proposed business activity must fall within eligible categories.",
      "Loan approval depends on applicable credit and lending requirements.",
    ],

    exclusions: [
      "Loan approval is not automatic.",
      "The lending institution may require additional documents or conditions.",
      "Business activities outside eligible categories may not qualify.",
      "The final lending decision is made by the participating financial institution.",
    ],

    lastVerified: "14 September 2026",

    officialUrl: "https://www.mudra.org.in/",
  },

  /*
   * =========================================================
   * 7. PRIME MINISTER'S SCHOLARSHIP SCHEMES
   * =========================================================
   */
  {
    name: "Prime Minister's Scholarship Scheme",
    slug: "pm-scholarship",
    category: "Students",

    shortDescription:
      "Scholarship support for eligible students under applicable Prime Minister's Scholarship programmes.",

    description:
      "Prime Minister's Scholarship Schemes provide financial assistance to eligible students who meet the requirements of the specific scholarship programme, department and beneficiary category.",

    benefits: [
      "Financial scholarship support",
      "Assistance towards higher education",
      "Scholarship payment through the designated government system",
      "Online application through the National Scholarship Portal where applicable",
    ],

    documents: [
      "Aadhaar",
      "Academic certificates or marksheets",
      "Admission or course details",
      "Bank account details",
      "Category or supporting documents where applicable",
      "Documents required by the specific scholarship programme",
    ],

    occupations: ["student"],

    keywords: [
      "student",
      "scholarship",
      "education",
      "college",
      "financial aid",
      "pm scholarship",
      "national scholarship portal",
      "nsp",
    ],

    eligibilitySummary: [
      "Eligibility depends on the specific Prime Minister's Scholarship Scheme.",
      "Applicants must satisfy the academic and course-related requirements of the applicable scheme.",
      "Family income and other conditions may apply depending on the specific programme.",
      "Category, service-family or departmental conditions may apply.",
      "Applications are subject to verification by the relevant authorities.",
    ],

    exclusions: [
      "There is no single eligibility rule for every Prime Minister's Scholarship Scheme.",
      "Not every student is automatically eligible.",
      "The applicable scholarship may have specific course, academic and category requirements.",
      "Incomplete or unverified applications may not be considered.",
    ],

    lastVerified: "14 September 2026",

    officialUrl: "https://scholarships.gov.in/",
  },

  /*
   * =========================================================
   * 8. PRADHAN MANTRI MATRU VANDANA YOJANA
   * =========================================================
   */
  {
    name: "Pradhan Mantri Matru Vandana Yojana",
    slug: "pm-matru-vandana-yojana",
    category: "Women",

    shortDescription:
      "Maternity benefit programme providing financial support to eligible pregnant and lactating women.",

    description:
      "Pradhan Mantri Matru Vandana Yojana is a maternity benefit programme intended to provide financial assistance to eligible women during pregnancy and after childbirth, subject to applicable government conditions.",

    benefits: [
      "Maternity-related financial assistance",
      "Support linked to specified conditions and requirements",
      "Encourages health-seeking behaviour",
      "Support is provided through the applicable government system",
    ],

    documents: [
      "Aadhaar",
      "Bank account details",
      "Mobile number",
      "Pregnancy or childbirth-related records",
      "Documents related to eligibility where applicable",
      "Other documents required by the implementing authority",
    ],

    occupations: [
      "farmer",
      "business",
      "employee",
      "student",
      "other",
    ],

    keywords: [
      "pregnancy",
      "maternity",
      "women",
      "mother",
      "childbirth",
      "pmmvy",
      "maternity benefit",
    ],

    eligibilitySummary: [
      "The scheme is intended for eligible pregnant and lactating women according to the applicable government rules.",
      "Eligibility depends on pregnancy, childbirth and beneficiary conditions.",
      "Specific beneficiary categories and conditions apply.",
      "Registration and supporting documentation are required.",
    ],

    exclusions: [
      "Specific eligibility conditions and exclusions apply.",
      "Benefits may depend on the applicable programme guidelines and circumstances.",
      "The scheme should not be treated as an automatic benefit for every pregnant woman.",
      "Applicants should verify current rules with the official source.",
    ],

    lastVerified: "14 September 2026",

    officialUrl: "https://pmmvy.wcd.gov.in/",
  },

  /*
   * =========================================================
   * 9. PRADHAN MANTRI SHRAM YOGI MAANDHAN
   * =========================================================
   */
  {
    name: "Pradhan Mantri Shram Yogi Maandhan",
    slug: "pm-shram-yogi-maandhan",
    category: "Employment",

    shortDescription:
      "Contributory pension scheme for eligible unorganised workers.",

    description:
      "Pradhan Mantri Shram Yogi Maandhan (PM-SYM) is a voluntary and contributory pension scheme for eligible unorganised workers.",

    benefits: [
      "Minimum monthly pension of ₹3,000 after reaching age 60, subject to scheme rules",
      "Government contribution according to the applicable scheme structure",
      "Spouse may receive family pension under applicable conditions",
      "Voluntary and contributory pension arrangement",
      "Designed for eligible unorganised workers",
    ],

    documents: [
      "Aadhaar",
      "Savings bank account or Jan-Dhan account details",
      "Mobile number",
      "Other information required for enrolment",
    ],

    occupations: [
      "business",
      "other",
      "farmer",
    ],

    keywords: [
      "worker",
      "unorganised worker",
      "unorganized worker",
      "pension",
      "shram yogi",
      "labour",
      "social security",
      "pm sym",
      "pm-sym",
    ],

    minAge: 18,
    maxAge: 40,

    eligibilitySummary: [
      "Generally intended for eligible unorganised workers.",
      "Entry age is between 18 and 40 years.",
      "Monthly income should generally be ₹15,000 or less.",
      "The worker should not be covered under specified statutory social-security schemes such as NPS, EPFO or ESIC.",
      "The applicant should not be an income-tax payer.",
    ],

    exclusions: [
      "Workers covered under specified statutory social-security schemes may not qualify.",
      "Income above the applicable monthly limit can make a worker ineligible.",
      "Income-tax payers are not eligible to join.",
      "Contribution requirements must be followed.",
    ],

    lastVerified: "14 September 2026",

    officialUrl: "https://labour.gov.in/",
  },

  /*
   * =========================================================
   * 10. ATAL PENSION YOJANA
   * =========================================================
   */
  {
    name: "Atal Pension Yojana",
    slug: "atal-pension-yojana",
    category: "Finance",

    shortDescription:
      "Government-backed pension scheme designed to encourage long-term retirement savings.",

    description:
      "Atal Pension Yojana (APY) is a voluntary pension scheme that allows eligible subscribers to make contributions during their working years and receive a guaranteed minimum pension after reaching age 60, subject to scheme rules.",

    benefits: [
      "Guaranteed minimum pension options of ₹1,000 to ₹5,000 per month",
      "Pension after reaching age 60",
      "Spouse-related pension benefit under applicable conditions",
      "Return of pension wealth to the nominee under applicable conditions",
      "Government-backed pension framework",
    ],

    documents: [
      "Aadhaar",
      "Savings bank or post-office savings account",
      "Mobile number",
      "Nominee details",
      "Other information required by the bank or post office",
    ],

    occupations: [
      "farmer",
      "business",
      "employee",
      "student",
      "other",
    ],

    keywords: [
      "pension",
      "retirement",
      "atal pension",
      "apy",
      "finance",
      "social security",
      "pension scheme",
    ],

    minAge: 18,
    maxAge: 40,

    eligibilitySummary: [
      "The subscriber must be an Indian citizen.",
      "The subscriber must be between 18 and 40 years old at the time of joining.",
      "The subscriber needs a savings bank or post-office savings bank account.",
      "From 1 October 2022, a person who is or has been an income-tax payer is not eligible to open a new APY account.",
      "Contributions are made according to the selected pension option.",
    ],

    exclusions: [
      "A person who is or has been an income-tax payer is not eligible to open a new APY account under the current rule.",
      "Age limits apply at the time of joining.",
      "Contribution requirements must be maintained.",
      "Only one APY account can be opened by an individual.",
    ],

    lastVerified: "14 September 2026",

    officialUrl: "https://www.pfrda.org.in/",
  },

  /*
   * =========================================================
   * 11. PMJJBY
   * =========================================================
   */
  {
    name: "Pradhan Mantri Jeevan Jyoti Bima Yojana",
    slug: "pm-jeevan-jyoti-bima",
    category: "Insurance",

    shortDescription:
      "One-year renewable life insurance scheme available through participating banks and post offices.",

    description:
      "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) is a one-year renewable term life insurance scheme providing life cover to eligible subscribers under the applicable scheme conditions.",

    benefits: [
      "₹2 lakh life insurance cover",
      "Cover for death due to any cause, subject to scheme conditions",
      "One-year renewable coverage",
      "Premium collected through the linked bank or post-office account",
      "Simple enrolment through participating institutions",
    ],

    documents: [
      "Aadhaar or accepted identification",
      "Savings bank or post-office account details",
      "Consent for auto-debit",
      "Nominee details",
    ],

    occupations: [
      "farmer",
      "business",
      "employee",
      "student",
      "other",
    ],

    keywords: [
      "life insurance",
      "insurance",
      "pmjjby",
      "financial security",
      "bank insurance",
      "life cover",
    ],

    minAge: 18,
    maxAge: 50,

    eligibilitySummary: [
      "Individual account holders of participating banks or post offices can join within the applicable age range.",
      "Entry age is 18 to 50 years.",
      "The subscriber must provide consent for premium auto-debit.",
      "The insurance cover is renewable annually subject to scheme rules.",
      "An individual with multiple accounts can generally enrol through only one participating account.",
    ],

    exclusions: [
      "Entry-age and renewal conditions apply.",
      "Only one account can be used for enrolment by an individual.",
      "Insurance claims are subject to the terms and conditions of the scheme.",
      "A 30-day lien period applies to certain non-accidental deaths for first-time enrolment.",
    ],

    lastVerified: "14 September 2026",

    officialUrl: "https://financialservices.gov.in/pmjjby",
  },

  /*
   * =========================================================
   * 12. PMSBY
   * =========================================================
   */
  {
    name: "Pradhan Mantri Suraksha Bima Yojana",
    slug: "pm-suraksha-bima",
    category: "Insurance",

    shortDescription:
      "Affordable personal accident insurance scheme providing cover for accidental death and disability.",

    description:
      "Pradhan Mantri Suraksha Bima Yojana (PMSBY) is a one-year renewable personal accident insurance scheme for eligible subscribers.",

    benefits: [
      "₹2 lakh cover for accidental death",
      "₹2 lakh cover for specified total and irrecoverable disability",
      "₹1 lakh cover for specified partial disability",
      "Affordable annual premium",
      "Automatic renewal subject to scheme rules and account balance",
    ],

    documents: [
      "Aadhaar or accepted identification",
      "Savings bank or post-office account details",
      "Consent for auto-debit",
      "Nominee details",
    ],

    occupations: [
      "farmer",
      "business",
      "employee",
      "student",
      "other",
    ],

    keywords: [
      "accident insurance",
      "insurance",
      "pmsby",
      "personal accident",
      "disability",
      "financial protection",
      "accidental death",
    ],

    minAge: 18,
    maxAge: 70,

    eligibilitySummary: [
      "Individual account holders of participating banks or post offices can join within the applicable age range.",
      "Entry age is 18 to 70 years.",
      "The subscriber must provide consent for premium auto-debit.",
      "The cover is renewable annually subject to scheme conditions.",
      "An individual with multiple accounts can generally enrol through only one participating account.",
    ],

    exclusions: [
      "Coverage applies to specified accidental events and disabilities.",
      "Normal illness or non-accidental death is not covered under the accident insurance benefit.",
      "Claims are subject to the applicable scheme terms and conditions.",
      "Entry-age and renewal conditions apply.",
    ],

    lastVerified: "14 September 2026",

    officialUrl: "https://financialservices.gov.in/pmsby",
  },
];