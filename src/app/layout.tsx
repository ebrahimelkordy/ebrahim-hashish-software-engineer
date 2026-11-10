import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { NeuralMeshCanvas } from "@/components/animations/NeuralMeshCanvas";
import { CommandPalette } from "@/components/CommandPalette";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-headline" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ebrahimelkordy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ebrahim Hashish | Full-Stack Software Engineer & AI Systems Architect",
    template: "%s | Ebrahim Hashish",
  },
  description: "Full-Stack Software Engineer & AI Systems Architect available for international contract & remote engineering. Specializing in high-performance Next.js 16, NestJS 11, PostgreSQL, and autonomous AI agents for startups & enterprise.",
  keywords: [
    "Hire Full Stack Developer",
    "Software Engineer",
    "Next.js Developer for hire",
    "NestJS Backend Architect",
    "AI Agent Engineer",
    "Google Gemini API Developer",
    "WhatsApp AI Automation",
    "TypeScript Full Stack",
    "PostgreSQL Database Architect",
    "Freelance Software Engineer",
    "Remote Full-Stack Developer",
    "Enterprise SaaS Architect",
    "SaaS MVP Builder",
    "مطور برمجيات ذكاء اصطناعي",
    "مهندس برمجيات فول ستاك",
    "برمجة وتطوير مواقع وتطبيقات"
  ],
  authors: [{ name: "Ebrahim Hashish", url: siteUrl }],
  creator: "Ebrahim Hashish",
  publisher: "Ebrahim Hashish",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    alternateLocale: "ar_EG",
    url: siteUrl,
    title: "Ebrahim Hashish | Full-Stack Software Engineer & AI Systems Architect",
    description: "Building mission-critical web applications, autonomous AI agents, and high-performance backend systems for international clients and enterprises worldwide.",
    siteName: "Ebrahim Hashish Engineering Core",
    images: [
      {
        url: "https://res.cloudinary.com/drcfpswre/image/upload/v1788211139/zz6ychzibw7jrihuuwdw.jpg",
        width: 1200,
        height: 630,
        alt: "Ebrahim Hashish — Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ebrahim Hashish | Full-Stack Software Engineer & AI Systems Architect",
    description: "Available for worldwide remote contracts. Next.js, NestJS, PostgreSQL & AI Agent Pipelines.",
    images: ["https://res.cloudinary.com/drcfpswre/image/upload/v1788211139/zz6ychzibw7jrihuuwdw.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      "name": "Ebrahim Hashish",
      "alternateName": ["إبراهيم حشيش", "Abo Hashish"],
      "jobTitle": "Full-Stack Software Engineer & AI Systems Architect",
      "description": "Full-Stack Software Engineer specializing in Next.js, NestJS, PostgreSQL, Distributed Systems, and Autonomous AI Agent Pipelines.",
      "url": siteUrl,
      "image": "https://res.cloudinary.com/drcfpswre/image/upload/v1788211139/zz6ychzibw7jrihuuwdw.jpg",
      "sameAs": [
        "https://github.com/ebrahimelkordy",
        "https://www.linkedin.com/in/ebrahim-hashish-b2b256406/"
      ],
      "knowsAbout": [
        "Full-Stack Web Development",
        "Next.js",
        "React",
        "NestJS",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Distributed Queues (BullMQ & Redis)",
        "Google Gemini AI & LLM Orchestration",
        "WhatsApp AI Agents",
        "Docker & Cloud Architecture"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "EG",
        "addressLocality": "Cairo"
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      "name": "Ebrahim Hashish — Enterprise Software & AI Engineering Services",
      "url": siteUrl,
      "image": "https://res.cloudinary.com/drcfpswre/image/upload/v1788211139/zz6ychzibw7jrihuuwdw.jpg",
      "priceRange": "$$$",
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Worldwide / Remote (US, Europe, GCC, Saudi Arabia, UAE)"
      },
      "serviceType": [
        "Full-Stack Web Application Development",
        "Autonomous AI Agent & LLM Integration",
        "High-Performance NestJS / Node.js Backend Architecture",
        "Database Architecture & Query Optimization",
        "Enterprise SaaS & MVP Engineering"
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-white relative bg-[#0e0e0e]`}>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18544945495"
        />
        <Script
          id="google-tag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18544945495');
            `,
          }}
        />

        {/* Global Interactive Neural Mesh Background */}
        <NeuralMeshCanvas />

        {/* Global Raycast/Linear Command Palette Modal (Cmd+K) */}
        <CommandPalette />

        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
