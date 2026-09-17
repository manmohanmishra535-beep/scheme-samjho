import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://schemesamjho.in"),

  title: {
    default: "SchemeSamjho — Government Schemes Explained Simply",
    template: "%s | SchemeSamjho",
  },

  description:
    "Understand Indian government schemes, benefits, eligibility, documents and application information in simple language.",

  keywords: [
    "government schemes India",
    "government schemes",
    "sarkari yojana",
    "government yojana",
    "scheme eligibility",
    "government subsidies",
    "PM Kisan",
    "PM Vishwakarma",
    "Ayushman Bharat",
    "government benefits India",
  ],

  authors: [{ name: "SchemeSamjho" }],
  creator: "SchemeSamjho",
  publisher: "SchemeSamjho",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "SchemeSamjho",
    title: "SchemeSamjho — Government Schemes Explained Simply",
    description:
      "Understand Indian government schemes, benefits, eligibility, documents and application information in simple language.",
    url: "https://schemesamjho.in",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SchemeSamjho — Government Schemes Explained Simply",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SchemeSamjho — Government Schemes Explained Simply",
    description:
      "Government schemes, eligibility, benefits and application information explained simply.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/icon.svg",
  },

  alternates: {
    canonical: "https://schemesamjho.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-gray-50">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-gray-950 focus:shadow-xl"
          >
            Skip to main content
          </a>

          <Navbar />

          <main id="main-content">{children}</main>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}