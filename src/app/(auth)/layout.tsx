

export default function AuthLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main className="h-screen grid grid-cols-12 gap-2">
         {children}
         <div className="col-span-9 bg-purple-500 rounded-l-2xl">img</div>
      </main>
   );
}