
import { MotionGrid } from "@/components/ui/motion-grid";
import { ROUTES } from "@/constants/routes";
import { User } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <div className="h-screen">
      <MotionGrid
        speed='3s'
        opacity={0.15}
        enableGlow={true}
        lineColor='20, 184, 166'
        className='relative h-full w-full flex flex-col items-center justify-center'
      >
        <h2 className='bg-clip-text text-transparent text-center bg-linear-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight'>
          SIGU <br /> Sistema Integrado de Gestão Universitária
        </h2>
        <p className='max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center'>
          gliding right, setting the path.
        </p>
        <div className="flex items-center justify-center w-full mt-7">
          <Link
            className="rounded-lg p-2 ease-in duration-75 flex"
            href={ROUTES.LOGIN}
          >
            Entrar <User />
          </Link>
        </div>
      </MotionGrid>
    </div>
  );
}
