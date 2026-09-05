

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { commonMetadata } from "@/lib/metadata";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import RootProvider from "@/providers/root-provider";
import Footer from "@/components/layouts/footer";
import { LOCAL_FONTS } from "@/lib/local-fonts";
// import ConnectionBanner from "@/components/connection-banner";

export const metadata = commonMetadata;
const font = LOCAL_FONTS;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`
          ${GeistSans.variable} 
          ${GeistMono.variable} 
          ${font.JetBrainsMono.variable},
          ${font.Nunito.variable}
          ${font.PTSerif.variable}
          antialiased`}
      >
        <RootProvider>
          {children}
        </RootProvider>
        <Footer />
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
