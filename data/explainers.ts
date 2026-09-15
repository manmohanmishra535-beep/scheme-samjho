export type ExplainerSection = {
  heading: string;
  content: string | string[];
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Explainer = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  introduction: string;
  whatIsScheme: string;
  whoIsFor: string[];
  mainBenefits: string[];
  documents: string[];
  howToApply: string[];
  faqs: FAQ[];
  officialUrl: string;
  officialSourceLabel: string;
  disclaimer: string;
};

export const explainers: Explainer[] = [
  {
    slug: "pm-kisan",
    title: "PM-KISAN Explained",
    category: "Farmers",
    shortDescription:
      "A simple breakdown of how the ₹6,000 annual farmer support scheme works, who can receive it, and how payments are made.",
    introduction:
      "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is one of India's largest direct benefit transfer programs. It gives financial support directly into the bank accounts of eligible farmer families.",
    whatIsScheme:
      "PM-KISAN is a central government scheme that provides ₹6,000 every year to eligible land-holding farmers. This money is paid in three equal installments of ₹2,000 every four months directly via DBT (Direct Benefit Transfer) through Aadhaar-seeded bank accounts.",
    whoIsFor: [
      "Landholding farmer families with cultivable land registered in their name.",
      "Small and marginal farmers across all Indian states and Union Territories.",
      "Excluded: Institutional landholders, families holding constitutional posts, serving or retired government employees, and income tax payees.",
    ],
    mainBenefits: [
      "₹6,000 per year in guaranteed financial support.",
      "Paid in 3 equal installments of ₹2,000 each (roughly every 4 months).",
      "Direct Bank Transfer with no middleman or cash handling.",
      "Helps meet farm input costs such as seeds, fertilizers, and equipment repairs.",
    ],
    documents: [
      "Aadhaar card linked with active mobile number.",
      "Proof of cultivable land ownership (Khasra/Khatauni or Jamabandi land records).",
      "Active bank account details (Aadhaar-seeded / NPCI mapped).",
      "Valid mobile number for OTP verification.",
    ],
    howToApply: [
      "Visit the official PM-KISAN portal (pmkisan.gov.in) or visit your nearest Common Service Centre (CSC).",
      "Click on 'New Farmer Registration' under the Farmers Corner.",
      "Enter your Aadhaar number, state, and mobile number to authenticate with OTP.",
      "Fill in land details and bank account information, then submit for state revenue department verification.",
      "Check your beneficiary status and eKYC completion periodically on the portal.",
    ],
    faqs: [
      {
        question: "Is eKYC mandatory to receive PM-KISAN installments?",
        answer:
          "Yes, completing Aadhaar-based eKYC on the PM-KISAN portal or through CSC biometrics is compulsory to continue receiving installments.",
      },
      {
        question: "Can tenant farmers or agricultural labourers apply?",
        answer:
          "Under current scheme guidelines, PM-KISAN is only for farmers who own cultivable land in their name. Tenant farmers are generally not eligible.",
      },
      {
        question: "Can more than one member of the same family receive ₹6,000?",
        answer:
          "No. The scheme defines a family as husband, wife, and minor children. Only one benefit is allowed per eligible farmer family.",
      },
    ],
    officialUrl: "https://pmkisan.gov.in/",
    officialSourceLabel: "Official PM-KISAN Portal (pmkisan.gov.in)",
    disclaimer:
      "SchemeSamjho provides this guide for informational purposes only. State land verification rules and exclusion criteria apply. Check the official PM-KISAN portal for current beneficiary status.",
  },

  {
    slug: "ayushman-bharat",
    title: "Ayushman Bharat Explained",
    category: "Healthcare",
    shortDescription:
      "Learn how Ayushman Bharat (PM-JAY) provides up to ₹5 lakh per family per year for secondary and tertiary hospital treatments.",
    introduction:
      "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY) is India's flagship health protection scheme providing cashless hospital coverage to low-income and vulnerable families.",
    whatIsScheme:
      "Ayushman Bharat is a health assurance scheme that covers hospital expenses up to ₹5,00,000 per family per year. It covers hospitalization, surgeries, day-care procedures, medicines, diagnostics, and pre- and post-hospitalization costs at thousands of empaneled government and private hospitals across India.",
    whoIsFor: [
      "Households identified in the Socio-Economic Caste Census (SECC 2011) database.",
      "Active beneficiaries of government food security (ration card) programs in participating states.",
      "Senior citizens aged 70 and above (under recent expanded universal coverage guidelines).",
      "Families with no earning adult or informal workers without formal health insurance.",
    ],
    mainBenefits: [
      "Cashless health cover up to ₹5 lakh per eligible family every year.",
      "Covers secondary and tertiary care hospitalizations across empaneled hospitals across India.",
      "No restriction on family size, age, or gender.",
      "Covers pre-existing medical conditions from day one of enrollment.",
    ],
    documents: [
      "Aadhaar card for individual identity verification.",
      "Ration card or government family identification document.",
      "Active mobile number for communication and verification.",
    ],
    howToApply: [
      "Check your eligibility on the official portal (nha.gov.in or beneficiary.nha.gov.in) using your mobile number or ration card.",
      "If your family name is in the database, visit an empaneled hospital or nearest CSC/Arogya Mitra desk.",
      "Complete eKYC verification using Aadhaar biometric or OTP.",
      "Receive and download your digital Ayushman Card.",
    ],
    faqs: [
      {
        question: "Do I have to pay any premium or fee to get treatment?",
        answer:
          "No. For eligible beneficiaries, treatment, medicines, and room charges within the package limit are completely cashless and free at empaneled hospitals.",
      },
      {
        question: "Can I use the Ayushman Card in another state?",
        answer:
          "Yes. PM-JAY is portable across India. You can seek treatment at any empaneled public or private hospital nationwide.",
      },
      {
        question: "Are pre-existing diseases covered under PM-JAY?",
        answer:
          "Yes, all pre-existing medical conditions are covered from the first day without any waiting periods.",
      },
    ],
    officialUrl: "https://nha.gov.in/",
    officialSourceLabel: "National Health Authority (nha.gov.in)",
    disclaimer:
      "SchemeSamjho is not affiliated with the National Health Authority. Empaneled hospital lists and package rates vary by state.",
  },

  {
    slug: "pm-awas-yojana",
    title: "PM Awas Yojana Explained",
    category: "Housing",
    shortDescription:
      "Understand PMAY-Urban and PMAY-Gramin, subsidy structures, and how financial assistance is provided for pucca houses.",
    introduction:
      "Pradhan Mantri Awas Yojana (PMAY) is the government's housing mission dedicated to providing pucca (permanent) houses with basic amenities like water, sanitation, and electricity to homeless and kutcha-house dwelling families.",
    whatIsScheme:
      "PMAY is divided into two parts: PMAY-Gramin (rural areas) and PMAY-Urban (cities and towns). The scheme provides direct financial subsidies for house construction or interest rate subsidies on home loans taken by eligible low- and middle-income families.",
    whoIsFor: [
      "Families that do not own a pucca house anywhere in India in any member's name.",
      "Economically Weaker Section (EWS) and Low-Income Group (LIG) households.",
      "Rural families listed in the Awaas+ / SECC deprivation criteria.",
      "Female ownership or co-ownership of the house is given special preference.",
    ],
    mainBenefits: [
      "Direct financial grant for rural home construction (₹1.20 lakh in plains, ₹1.30 lakh in hilly/difficult areas).",
      "Additional financial support for toilet construction under Swachh Bharat Mission and 90-95 days of unskilled labour wages under MGNREGS.",
      "Interest subsidy on housing loans for eligible urban beneficiaries.",
      "All houses built include basic water, electricity, and clean cooking fuel connections.",
    ],
    documents: [
      "Aadhaar card of all family members.",
      "Bank account details (linked with Aadhaar).",
      "Income certificate or salary slips where applicable.",
      "Land ownership documents or house site certificate.",
      "Affidavit stating that no family member owns a pucca house in India.",
    ],
    howToApply: [
      "For Rural (PMAY-G): Selection is done through Gram Sabha based on the SECC and Awaas+ survey list. Contact your local Gram Panchayat.",
      "For Urban (PMAY-U): Apply online through the official portal (pmay-urban.gov.in) or visit your local municipal office / CSC.",
      "Submit applicant personal, income, and bank details.",
      "Track application verification status through your local urban local body (ULB).",
    ],
    faqs: [
      {
        question: "Can I apply if my parents already own a pucca house?",
        answer:
          "If you are unmarried and living with your parents, you are considered part of their household. If you are married or an independent earner without an existing pucca house, specific guidelines apply.",
      },
      {
        question: "Is there any fee to submit a PMAY application?",
        answer:
          "No. Official PMAY online registration is free on government portals, though CSC centers charge a small nominal fee for operator data entry.",
      },
      {
        question: "How is money disbursed for rural house construction?",
        answer:
          "Payments are released in milestone installments directly into your bank account after geo-tagging physical construction progress (foundation, lintel, roof, and completion).",
      },
    ],
    officialUrl: "https://pmay-urban.gov.in/",
    officialSourceLabel: "PMAY Urban Portal (pmay-urban.gov.in)",
    disclaimer:
      "SchemeSamjho does not sanction housing grants. Verification and approvals are conducted solely by municipal and panchayat authorities.",
  },

  {
    slug: "pm-mudra-yojana",
    title: "PM Mudra Yojana Explained",
    category: "Business",
    shortDescription:
      "A complete guide to collateral-free business loans up to ₹20 lakh under Shishu, Kishore, and Tarun categories.",
    introduction:
      "Pradhan Mantri MUDRA Yojana (PMMY) facilitates loans to micro and small business enterprises to help individuals start or expand non-farm income-generating enterprises.",
    whatIsScheme:
      "MUDRA loans are collateral-free business loans provided by public and private commercial banks, RRBs, Small Finance Banks, and NBFCs. The scheme classifies loans into categories: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 lakh), and Tarun (₹5 lakh to ₹10 lakh, recently expandable up to ₹20 lakh for eligible past borrowers).",
    whoIsFor: [
      "Any Indian citizen who has a business plan for a non-farm income-generating activity.",
      "Shopkeepers, traders, street vendors, repair shops, and service businesses.",
      "Artisans, food processors, micro-manufacturers, and transport operators.",
      "Existing micro-entrepreneurs looking for working capital or machinery purchase.",
    ],
    mainBenefits: [
      "No collateral or third-party security is required.",
      "Zero to low processing fees depending on the loan tier.",
      "Mudra Card (RuPay debit card) provides flexible overdraft working capital.",
      "Structured into simple tiers matching the growth stage of small businesses.",
    ],
    documents: [
      "Identity proof (Aadhaar card, Voter ID, PAN card).",
      "Residence proof (Utility bill, Ration card).",
      "Business establishment proof (Trade license, Udyam registration, or shop certificate).",
      "Bank statement for past 6 to 12 months.",
      "Quotation for machinery or project report for higher loan tiers.",
    ],
    howToApply: [
      "Prepare your business proposal and estimate required capital.",
      "Apply online via the JanSamarth portal (jansamarth.in) or visit any local commercial bank, RRB, or cooperative bank.",
      "Submit the MUDRA application form along with KYC, business proof, and bank statements.",
      "The lending bank reviews credit history, verifies business viability, and sanctions the loan.",
    ],
    faqs: [
      {
        question: "Does MUDRA grant direct money from the government?",
        answer:
          "No. MUDRA is a refinancing agency. The loan is disbursed by commercial banks, microfinance institutions, or NBFCs, and must be repaid as per the agreed loan schedule.",
      },
      {
        question: "Do I need a high CIBIL score for a Shishu loan?",
        answer:
          "While banks evaluate creditworthiness and lack of loan defaults, Shishu loans are tailored to help micro-borrowers establish formal credit history.",
      },
      {
        question: "Can I get a loan to buy a vehicle for commercial use?",
        answer:
          "Yes. Commercial transport vehicles like auto-rickshaws, e-rickshaws, small goods trucks, and passenger taxis are covered under MUDRA.",
      },
    ],
    officialUrl: "https://www.mudra.org.in/",
    officialSourceLabel: "Official MUDRA Portal (mudra.org.in)",
    disclaimer:
      "SchemeSamjho does not issue loans. Final interest rates and loan sanctions are determined by the respective lending bank or institution.",
  },

  {
    slug: "sukanya-samriddhi",
    title: "Sukanya Samriddhi Yojana Explained",
    category: "Savings",
    shortDescription:
      "Learn how parents can save for a girl child's education and marriage with high sovereign interest and tax exemptions.",
    introduction:
      "Sukanya Samriddhi Yojana (SSY) is a government-backed small savings scheme launched under the 'Beti Bachao Beti Padhao' campaign to secure the financial future of girls in India.",
    whatIsScheme:
      "SSY is an account opened by parents or legal guardians in the name of a girl child below 10 years of age. It offers one of the highest interest rates among government savings schemes, compounded annually, along with triple tax exemption (EEE: contribution, interest, and maturity are all tax-free).",
    whoIsFor: [
      "Any Indian resident girl child up to 10 years of age.",
      "Account opened by biological parents or legal guardian.",
      "Maximum of two accounts per family (one per girl child, with an exception for twins/triplets).",
    ],
    mainBenefits: [
      "Attractive government-notified interest rate, compounded annually.",
      "Triple tax exemption (EEE) under Section 80C of the Income Tax Act.",
      "Low minimum annual deposit of only ₹250 (up to ₹1,50,000 per financial year).",
      "Partial withdrawal allowed after age 18 for higher education expenses.",
      "Maturity after 21 years from account opening date.",
    ],
    documents: [
      "Birth certificate of the girl child.",
      "Identity proof of parent / guardian (Aadhaar, PAN, Voter ID).",
      "Address proof of parent / guardian.",
      "Photographs of child and guardian.",
    ],
    howToApply: [
      "Visit any designated public/private bank branch or India Post Office.",
      "Fill out the Sukanya Samriddhi Yojana account opening form.",
      "Attach the girl child's birth certificate and guardian's KYC documents.",
      "Deposit the opening amount (minimum ₹250).",
      "Receive the SSY passbook to track contributions and interest earnings.",
    ],
    faqs: [
      {
        question: "For how many years do I need to deposit money?",
        answer:
          "Deposits are required for 15 years from the date of account opening. The account continues earning interest until maturity at 21 years.",
      },
      {
        question: "Can I open an account for a girl child aged 12?",
        answer:
          "No. The girl child must be under 10 years of age on the date of account opening.",
      },
      {
        question: "Can the money be withdrawn before 21 years?",
        answer:
          "Up to 50% of the balance can be withdrawn after the girl reaches 18 years of age or passes 10th grade to fund verified higher education fees.",
      },
    ],
    officialUrl: "https://www.indiapost.gov.in/",
    officialSourceLabel: "India Post Portal (indiapost.gov.in)",
    disclaimer:
      "SchemeSamjho provides interest and maturity information based on official finance ministry announcements. Rates are reviewed quarterly by the government.",
  },

  {
    slug: "pm-vishwakarma",
    title: "PM Vishwakarma Scheme Explained",
    category: "Artisans",
    shortDescription:
      "A comprehensive guide for 18 traditional artisan and craft trades, including certificates, toolkits, and subsidized credit.",
    introduction:
      "PM Vishwakarma is a holistic central scheme designed to provide end-to-end support to traditional artisans and craftspeople who work with their hands and traditional tools.",
    whatIsScheme:
      "PM Vishwakarma provides recognition, skill upgradation, toolkit incentives of ₹15,000, collateral-free credit support at a concessional 5% interest rate, and marketing assistance to artisans engaged in 18 identified traditional family-based trades.",
    whoIsFor: [
      "Artisans working in 18 traditional trades (e.g., carpenter, blacksmith, potter, cobbler, mason, weaver, tailor, barber, basket/mat maker, washerman).",
      "Self-employed rural and urban craftspeople using traditional family skills.",
      "Minimum age of 18 years on date of registration.",
      "One member per family is eligible; family members cannot be in government service.",
    ],
    mainBenefits: [
      "PM Vishwakarma Certificate and ID card providing formal government recognition.",
      "Basic skill training (5-7 days) with a stipend of ₹500 per day.",
      "Toolkit incentive grant of ₹15,000 credited directly to beneficiary.",
      "Collateral-free credit: Tier 1 up to ₹1,00,000 and Tier 2 up to ₹2,00,000 at a subsidized 5% interest rate.",
      "Incentives for digital transactions and domestic marketing assistance.",
    ],
    documents: [
      "Aadhaar card linked with active mobile number.",
      "Bank account details (Aadhaar linked).",
      "Ration card or family details.",
      "Declaration of the specific trade practiced.",
    ],
    howToApply: [
      "Visit your nearest Common Service Centre (CSC) with your Aadhaar and bank details.",
      "The operator submits your application on pmvishwakarma.gov.in with biometric verification.",
      "Applications undergo three-tier verification: Gram Panchayat / Urban Local Body, District Implementation Committee, and Screening Committee.",
      "Once approved, you receive your digital Vishwakarma Certificate and can schedule training.",
    ],
    faqs: [
      {
        question: "Which trades are eligible under PM Vishwakarma?",
        answer:
          "18 trades are covered: Carpenter, Boat Maker, Armourer, Blacksmith, Hammer & Tool Kit Maker, Locksmith, Goldsmith, Potter, Sculptor/Stone Carver, Cobbler, Mason, Basket/Mat/Broom Maker, Traditional Doll/Toy Maker, Barber, Garland Maker, Washerman, Tailor, and Fishing Net Maker.",
      },
      {
        question: "Do I have to repay the ₹15,000 toolkit assistance?",
        answer:
          "No. The ₹15,000 toolkit support is a grant/incentive provided after completing basic skill training.",
      },
      {
        question: "Is collateral needed to take the ₹1 lakh business loan?",
        answer:
          "No. Loans under PM Vishwakarma are collateral-free and backed by the Credit Guarantee scheme.",
      },
    ],
    officialUrl: "https://pmvishwakarma.gov.in/",
    officialSourceLabel: "Official PM Vishwakarma Portal (pmvishwakarma.gov.in)",
    disclaimer:
      "SchemeSamjho is an informational guide. Trade eligibility and stage verification are overseen by local district authorities.",
  },

  {
    slug: "pm-scholarship",
    title: "PM Scholarship Explained",
    category: "Students",
    shortDescription:
      "Financial assistance details for eligible students, wards of ex-servicemen, police personnel, and central scholarship programs.",
    introduction:
      "The Prime Minister's Scholarship Scheme (PMSS) and allied central scholarship programs support higher professional and technical education for eligible students across India.",
    whatIsScheme:
      "The Prime Minister's Scholarship Scheme offers monthly financial assistance (paid annually) to encourage technical and post-graduate professional education for eligible wards and widows of defense personnel, central armed police forces (CAPF), and railway protection forces.",
    whoIsFor: [
      "Wards and widows of deceased or disabled defense and paramilitary personnel.",
      "Students pursuing recognized first professional degree courses (such as BE, B.Tech, MBBS, BDS, B.Pharm, MBA, MCA) recognized by regulatory authorities like AICTE or UGC.",
      "Students who have scored a minimum percentage (typically 60% or above in 10+2/Diploma/Graduation).",
    ],
    mainBenefits: [
      "₹3,000 per month for girl students (₹36,000 per year).",
      "₹2,500 per month for boy students (₹30,000 per year).",
      "Direct benefit transfer directly to student's bank account.",
      "Coverage for duration of recognized degree course (1 to 5 years).",
    ],
    documents: [
      "Aadhaar card of the applicant student.",
      "Matriculation (10th) and 10+2 mark sheets.",
      "Bonafide student certificate from the enrolled college or university.",
      "Discharge certificate / Ex-servicemen PPO / Gallantry award certificate of parent.",
      "Bank passbook copy with student's name and Aadhaar seeding.",
    ],
    howToApply: [
      "Applications are invited annually through the National Scholarship Portal (scholarships.gov.in) or Kendriya Sainik Board (ksb.gov.in).",
      "Register on the portal and generate an application ID.",
      "Upload verified academic mark sheets, parent service certificates, and bank documents.",
      "Submit for online institute-level and board verification.",
    ],
    faqs: [
      {
        question: "Can students enrolled in distance learning apply?",
        answer:
          "No. Only students enrolled in full-time regular degree courses recognized by AICTE, UGC, or MCI are eligible.",
      },
      {
        question: "Can I receive this scholarship if I am already receiving another state scholarship?",
        answer:
          "Generally, students cannot avail two government scholarships simultaneously for the same course.",
      },
      {
        question: "Is there a renewal process for subsequent years?",
        answer:
          "Yes. Students must apply for annual renewal and maintain passing grades with minimum prescribed marks each academic year.",
      },
    ],
    officialUrl: "https://scholarships.gov.in/",
    officialSourceLabel: "National Scholarship Portal (scholarships.gov.in)",
    disclaimer:
      "SchemeSamjho provides scholarship guidelines for informational purposes. Exact application windows and merit lists are published on the official National Scholarship Portal.",
  },

  {
    slug: "pension-schemes-explained",
    title: "Pension Schemes Explained",
    category: "Finance",
    shortDescription:
      "Understand Atal Pension Yojana (APY) and PM-SYM: how small monthly savings create guaranteed monthly pensions in retirement.",
    introduction:
      "Government-backed pension programs in India help unorganised sector workers, self-employed individuals, and everyday citizens secure a guaranteed monthly pension after age 60.",
    whatIsScheme:
      "The two primary micro-pension schemes are Atal Pension Yojana (APY) and Pradhan Mantri Shram Yogi Maandhan (PM-SYM). Subscribers contribute a small monthly amount depending on their joining age (18-40 years) to secure a guaranteed monthly pension of ₹1,000 to ₹5,000 starting from age 60.",
    whoIsFor: [
      "Indian citizens between 18 and 40 years of age.",
      "Atal Pension Yojana: Any citizen with an active bank or post office savings account (non-income tax payers).",
      "PM Shram Yogi Maandhan: Unorganised workers (street vendors, domestic workers, rickshaw pullers, construction workers) earning under ₹15,000/month.",
      "Individuals not covered under formal statutory social security schemes like EPFO or NPS.",
    ],
    mainBenefits: [
      "Guaranteed monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 for life starting at age 60.",
      "Spouse receives the same pension amount upon subscriber's demise.",
      "Nominee receives the full accumulated pension corpus upon demise of both subscriber and spouse.",
      "Affordable monthly auto-debit starting as low as ₹42 to ₹210 depending on age and pension tier.",
      "For PM-SYM: Equal 50% matching monthly contribution paid by the Central Government.",
    ],
    documents: [
      "Aadhaar card.",
      "Savings bank account or Post Office savings account details.",
      "Active mobile number for SMS alerts and OTP authentication.",
    ],
    howToApply: [
      "For APY: Visit your bank branch or use net banking / mobile banking app to enroll under 'Atal Pension Yojana' with auto-debit.",
      "For PM-SYM: Visit any Common Service Centre (CSC) with your Aadhaar and bank passbook or enroll via maandhan.in.",
      "Select your desired monthly pension amount (e.g. ₹3,000 or ₹5,000).",
      "Ensure sufficient balance in your bank account for monthly auto-debit.",
    ],
    faqs: [
      {
        question: "Can an income-tax payer join Atal Pension Yojana?",
        answer:
          "No. As per revised government guidelines, individuals who are or have been income-tax payers are not eligible to open new APY accounts.",
      },
      {
        question: "What happens if a monthly auto-debit payment fails?",
        answer:
          "Banks levy a nominal late fee (usually ₹1 to ₹10 per month). You can clear missed contributions by maintaining sufficient balance in subsequent months.",
      },
      {
        question: "Can I exit the scheme before reaching 60 years of age?",
        answer:
          "Early exit is permitted only under exceptional circumstances (terminal illness or demise). In voluntary exit cases, only your own contributions with net interest are refunded.",
      },
    ],
    officialUrl: "https://www.pfrda.org.in/",
    officialSourceLabel: "Pension Fund Regulatory and Development Authority (pfrda.org.in)",
    disclaimer:
      "SchemeSamjho provides informational pension guides. Pension guarantees and corpus transfers are administered by PFRDA and LIC under government rules.",
  },

  {
    slug: "government-insurance-schemes-explained",
    title: "Government Insurance Schemes Explained",
    category: "Insurance",
    shortDescription:
      "Simple breakdown of PMJJBY (life insurance for ₹436/yr) and PMSBY (accident cover for ₹20/yr) for ordinary families.",
    introduction:
      "The Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) and Pradhan Mantri Suraksha Bima Yojana (PMSBY) are low-cost social security insurance schemes designed to protect Indian families against untimely death or accidental disability.",
    whatIsScheme:
      "These two schemes offer basic insurance coverage at nominal annual premiums: PMJJBY provides ₹2,00,000 life insurance for death due to any cause at ₹436 per year, while PMSBY provides ₹2,00,000 accidental death and disability cover at just ₹20 per year.",
    whoIsFor: [
      "PMJJBY: Indian bank account holders aged between 18 and 50 years.",
      "PMSBY: Indian bank account holders aged between 18 and 70 years.",
      "Any individual with a savings bank account who gives consent for annual auto-debit.",
      "Individuals without private life or accident insurance seeking low-cost family protection.",
    ],
    mainBenefits: [
      "PMJJBY: ₹2,00,000 paid to the nominee in case of death of the subscriber due to any cause.",
      "PMSBY: ₹2,00,000 for accidental death or total permanent disability; ₹1,00,000 for partial permanent disability.",
      "Unmatched affordability: Only ₹436/year for life cover and ₹20/year for accident cover.",
      "Convenient auto-debit directly from your bank account between May 25 and May 31 each year.",
      "Tax deduction benefits under Section 80C and tax-free payout under Section 10(10D).",
    ],
    documents: [
      "Aadhaar card.",
      "Active savings bank account with an eligible participating bank.",
      "Nominee details (name, relationship, date of birth, and identity proof).",
      "Consent-cum-declaration form for bank auto-debit.",
    ],
    howToApply: [
      "Visit the bank branch where you have your savings bank account, or log in to internet / mobile banking.",
      "Locate the 'Social Security Schemes' or 'Insurance' section in your banking app.",
      "Select PMJJBY or PMSBY, choose your account, and designate your nominee.",
      "Submit the auto-debit mandate. Premium is automatically debited every year in May.",
    ],
    faqs: [
      {
        question: "Can I hold multiple PMJJBY or PMSBY policies across different banks?",
        answer:
          "No. A subscriber can join each scheme through only one savings bank account. Payout is restricted to ₹2 lakh even if premium was debited from multiple accounts.",
      },
      {
        question: "Does PMJJBY cover death by suicide?",
        answer:
          "Under current rules, death due to suicide during the first 45 days (lien period) is excluded, but standard deaths thereafter are covered under scheme guidelines.",
      },
      {
        question: "How does the nominee file an insurance claim?",
        answer:
          "The nominee must submit a claim form along with the death certificate, FIR / post-mortem report (for accidental claims), and bank details to the bank branch within 30 days.",
      },
    ],
    officialUrl: "https://financialservices.gov.in/",
    officialSourceLabel: "Department of Financial Services (financialservices.gov.in)",
    disclaimer:
      "SchemeSamjho does not sell insurance or process claims. Policies are underwritten by Life Insurance Corporation (LIC) and authorized general insurance companies.",
  },
];
