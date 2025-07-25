import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Template",
  description: "Template for a new project",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  alternates: {
    canonical: "https://your-domain.com",
  },
  openGraph: {
    title: "Template",
    description: "Template for a new project",
    url: "https://your-domain.com",
    siteName: "Template",
    images: [
      {
        url: "https://atomatio.com/favicon.ico",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  }
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  fallback: ["Arial", "sans-serif"],
});



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <head>
        <meta name="google-site-verification" content="X9CNFwxxpc5CLR1utE-mhOZ0zDTT5S5OsuP4EfHZI2s" />
      </head>
      <body className="font-sans" style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif" }}>
        <SessionProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
