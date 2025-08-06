

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import SessionWrapper from "@/providers/SessionWrapper";
import { DUMMY_DATA } from "@/constants/mock-data";
import { commonMetadata } from "@/lib/metadata";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';


export const metadata = commonMetadata

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
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableColorScheme
            enableSystem
            disableTransitionOnChange
            themes={DUMMY_DATA.themes}
          >
            {children}
          </ThemeProvider>
        </SessionWrapper>
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
