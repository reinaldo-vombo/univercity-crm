import { Tooltip as Root, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ReactNode } from 'react'
type TTooltip = {
   trigger: any,
   children: ReactNode
}
const Tooltip = ({ children, trigger }: TTooltip) => {
   return (
      <Root >
         <TooltipTrigger asChild>
            {trigger}
         </TooltipTrigger>
         <TooltipContent>{children}</TooltipContent>
      </Root>
   )
}

export default Tooltip
