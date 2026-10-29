import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { NeuralMeshCanvas } from "@/components/animations/NeuralMeshCanvas";
import { CommandPalette } from "@/components/CommandPalette";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-headline" });

export const metadata: Metadata = {
  title: "EBRAHIM HASHISH | Software Engineer",
  description: "Crafting high-performance MERN stack applications and scalable backend architectures.",
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
