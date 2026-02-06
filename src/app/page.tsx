import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/logo.svg"
          alt="Enrollix logo"
          width={500}
          height={500}
          priority
        />
        <div className="flex items-center justify-center w-full">
          <Link
            className="rounded-lg bg-primary p-2 text-black hover:bg-primary-foreground ease-in duration-75"
            href={ROUTES.LOGIN}
          >
            Entrar
          </Link>
        </div>
      </main>

    </div>
  );
}
