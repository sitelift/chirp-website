import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { ConditionalFooter } from "@/components/conditional-footer";
import "./globals.css";

// Geist Sans + Geist Mono are imported via globals.css (@fontsource-
// variable/geist) so the @font-face declarations register before any
// component renders. Same stack used by the Chirp desktop app.

export const metadata: Metadata = {
  metadataBase: new URL("https://chirptype.com"),
  title: {
    default: "Chirp: Local Voice-to-Text for Mac & Windows",
    template: "%s | Chirp",
  },
  description:
    "Free voice-to-text that runs entirely on your PC or Mac. No cloud, no subscription, no compromise.",
  keywords: [
    "voice to text",
    "speech to text",
    "dictation",
    "Windows",
    "Mac",
    "macOS",
    "local",
    "privacy",
    "free",
    "no subscription",
    "offline",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chirptype.com",
    title: "Chirp: Local Voice-to-Text for Mac & Windows",
    description:
      "Free voice-to-text that runs entirely on your computer. No cloud, no subscription.",
    siteName: "Chirp",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chirp: Local Voice-to-Text for Mac & Windows",
    description:
      "Free voice-to-text that runs entirely on your computer. No cloud, no subscription.",
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
      <body className="font-body antialiased bg-background text-foreground">
        <Nav />
        <main>{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
