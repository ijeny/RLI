import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "The Serverless Odyssey",
  description: "A focused command center for serverless product delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
