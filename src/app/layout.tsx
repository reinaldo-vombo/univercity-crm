

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { commonMetadata } from "@/lib/metadata";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import RootProvider from "@/providers/root-provider";
// import ConnectionBanner from "@/components/connection-banner";

export const metadata = commonMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {/* <ConnectionBanner /> */}
        <RootProvider>
          {children}
        </RootProvider>
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
