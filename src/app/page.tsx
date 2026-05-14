import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-12 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col space-y-6 gap-8 col-span-12 items-center">
        <Image
          className="dark:invert"
          src="/SIGU.png"
          alt='SIGU – Sistema Integrado de Gestão Universitária'
          width={500}
          height={500}
          priority
        />
        <h1 className="text-3xl">SIGU – Sistema Integrado de Gestão Universitária</h1>
        <div className="flex items-center justify-center w-full">
          <Link
            className="rounded-lg bg-primary p-2 hover:bg-primary-foreground ease-in duration-75"
            href={ROUTES.LOGIN}
          >
            Entrar
          </Link>
        </div>
      </main>

    </div>
  );
}
