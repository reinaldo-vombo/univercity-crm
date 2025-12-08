import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Auth'
}
export default function AuthLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main className="h-screen relative grid grid-cols-12 gap-2 p-3 overflow-clip">
         {children}
      </main>
   );
}