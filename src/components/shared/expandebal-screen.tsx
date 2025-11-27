"use client"

import { ReactNode } from "react"
import Image from "next/image"
import {
   ExpandableScreen,
   ExpandableScreenContent,
   ExpandableScreenTrigger,
} from "@/components/ui/expandable-screen"
type TProps = {
   formComponent: ReactNode
}

const ExpandableScreenForm = ({ formComponent }: TProps) => {
   return (
      <ExpandableScreen
         layoutId="cta-card"
         triggerRadius="100px"
         contentRadius="24px"
      >
         <div className="relative flex">
            <ExpandableScreenTrigger>
               <div className="bg-primary h-15 px-6 sm:px-8 py-3 text-lg sm:text-xl font-regular text-primary-foreground tracking-[-0.01em] rounded-lg">
                  Publicar Evento
               </div>
            </ExpandableScreenTrigger>
         </div>

         <ExpandableScreenContent className="bg-primary-foreground">
            <div className="relative z-10 flex flex-col lg:flex-row h-full w-full max-w-[1100px] mx-auto items-center p-6 sm:p-10 lg:p-16 gap-8 lg:gap-16">
               <div className="flex-1 flex flex-col justify-center space-y-3 w-full">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-primary leading-none tracking-[-0.03em]">
                     Gerencia os Eventos
                  </h2>

                  <div className="space-y-4 sm:space-y-6 pt-4">
                     <div className="flex gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary flex items-center justify-center">
                           <svg
                              className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <title>Icon</title>
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M5 13l4 4L19 7"
                              />
                           </svg>
                        </div>
                        <div>
                           <p className="text-sm sm:text-base text-primary leading-[150%]">
                              Get priority access to new features and updates before
                              public release.
                           </p>
                        </div>
                     </div>
                     <div className="flex gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary flex items-center justify-center">
                           <svg
                              className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <title>Icon</title>
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                           </svg>
                        </div>
                        <div>
                           <p className="text-sm sm:text-base text-primary leading-[150%]">
                              Join a community of early adopters and help influence our
                              product roadmap.
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-primary">
                     <p className="text-lg sm:text-xl lg:text-2xl text-primary leading-[150%] mb-4">
                        The waitlist has been a game-changer for our workflow. Highly
                        recommend joining early.
                     </p>
                     <div className="flex items-center gap-3 sm:gap-4">
                        <Image
                           src="/avatar-1.jpg"
                           alt="Alex Rivera"
                           width={48}
                           height={48}
                           className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />
                        <div>
                           <p className="text-base sm:text-lg lg:text-xl text-primary">
                              Alex Rivera
                           </p>
                           <p className="text-sm sm:text-base text-primary">
                              Early Access Member
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="flex-1 w-full">
                  {formComponent}
               </div>
            </div>
         </ExpandableScreenContent>
      </ExpandableScreen>
   )
}

export default ExpandableScreenForm
