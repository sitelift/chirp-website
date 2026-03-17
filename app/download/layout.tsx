import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Chirp",
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
