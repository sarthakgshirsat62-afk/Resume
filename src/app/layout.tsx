import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/common/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Sarthak Shirsat — Product Manager",
    template: "%s | Sarthak Shirsat",
  },
  description:
    "Product Manager with 7+ years of experience in AI-powered solutions, cloud-native platforms, and workflow optimization. MBA from IIM Indore.",
  keywords: ["product manager", "AI", "cloud", "FinOps", "IIM Indore", "Optum", "portfolio", "resume"],
  authors: [{ name: "Sarthak Shirsat" }],
  creator: "Sarthak Shirsat",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sarthak Shirsat",
    title: "Sarthak Shirsat — Product Manager",
    description:
      "Product Manager with 7+ years of experience in AI-powered solutions, cloud-native platforms, and workflow optimization. MBA from IIM Indore.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarthak Shirsat — Product Manager",
    description:
      "Product Manager with 7+ years of experience in AI-powered solutions, cloud-native platforms, and workflow optimization. MBA from IIM Indore.",
    creator: "@sarthakshirsat",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
