import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import SessionWrapper from "@/providers/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const {
  NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_TWITTER_CREATOR,
  NEXT_PUBLIC_AUTHOR_SITE,
  NEXT_PUBLIC_AUTHOR_NAME } = process.env;

const baseUrl = NEXT_PUBLIC_BASE_URL
  ? `https://${NEXT_PUBLIC_BASE_URL}`
  : 'http://localhost:3000';
export const metadata: Metadata = {
  title: {
    default: NEXT_PUBLIC_SITE_NAME || "Enrollix",
    template: `%s | ${NEXT_PUBLIC_SITE_NAME || "Enrollix"}`,
  },
  description: "A powerful University CRM system to manage students, courses, departments, and faculty records.",
  keywords: [
    "University",
    "CRM",
    "Student Management",
    "Course Management",
    "Faculty System",
    "Education Software",
    "University Admin Portal",
  ],
  authors: [
    { name: NEXT_PUBLIC_AUTHOR_NAME, url: NEXT_PUBLIC_AUTHOR_SITE },
  ],
  creator: "University IT Department",
  publisher: "University CRM",
  openGraph: {
    title: "University CRM",
    description: "Manage university operations with a centralized CRM system for administration and records.",
    url: "https://crm.university.edu",
    siteName: NEXT_PUBLIC_AUTHOR_SITE,
    images: [
      {
        url: "https://crm.university.edu/og-image.png",
        width: 1200,
        height: 630,
        alt: "University CRM Dashboard",
      },
    ],
    locale: "pt-PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "University CRM",
    description: "Centralized CRM system for universities.",
    images: ["https://crm.university.edu/og-image.png"],
    creator: NEXT_PUBLIC_TWITTER_CREATOR,
  },
  metadataBase: new URL(baseUrl),
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </SessionWrapper>
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
