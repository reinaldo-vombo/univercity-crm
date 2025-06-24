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
  description: "Um poderoso sistema de CRM universitário para gerenciar alunos, cursos, departamentos e registros de professores.",
  keywords: [
    "Universidade",
    "Dashboard",
    "Gestão de notas",
    "CRM",
    "Gestão de Estudantes",
    "Gestão de Cursos",
    "Sistema de Faculdade",
    "Software educacional",
    "Portal de Administração da Universidade",
  ],
  authors: [
    { name: NEXT_PUBLIC_AUTHOR_NAME, url: NEXT_PUBLIC_AUTHOR_SITE },
  ],
  creator: NEXT_PUBLIC_AUTHOR_NAME,
  publisher: NEXT_PUBLIC_AUTHOR_NAME,
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
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
      </head>
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
