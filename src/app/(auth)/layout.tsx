

export default function AuthLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main className="h-screen relative grid grid-cols-12 gap-2 p-3">
         {children}
      </main>
   );
}