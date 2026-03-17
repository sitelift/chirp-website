import type { Metadata } from "next";
import { Nunito, Inter, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trychirp.app"),
  title: {
    default: "Chirp — Local Voice-to-Text for Windows",
    template: "%s | Chirp",
  },
  description:
    "Free, open-source voice-to-text that runs entirely on your PC. No cloud, no subscription, no compromise.",
  keywords: [
    "voice to text",
    "speech to text",
    "dictation",
    "Windows",
    "local",
    "privacy",
    "free",
    "open source",
    "offline",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://trychirp.app",
    title: "Chirp — Local Voice-to-Text for Windows",
    description:
      "Free, open-source voice-to-text that runs entirely on your PC.",
    siteName: "Chirp",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chirp — Local Voice-to-Text for Windows",
    description:
      "Free, open-source voice-to-text that runs entirely on your PC.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${inter.variable} ${jetbrains.variable} font-body antialiased`}
      >
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
