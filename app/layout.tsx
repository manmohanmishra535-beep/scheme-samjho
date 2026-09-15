
import type { Metadata } from "next";
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
  icons: {
  icon: "/icon.svg",
  },
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
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}