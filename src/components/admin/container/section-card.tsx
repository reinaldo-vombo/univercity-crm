
import { Badge } from "@/components/ui/badge"
import {
   Card,
   CardAction,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,

} from "@/components/ui/card"
import { formatCurrency } from "@/lib/helper"
import { getRevenueSourceWithYoY } from "@/lib/helper/chart-mappers"
import { TGlobalAnalitics } from "@/types/global"
import { Minus, TrendingDown, TrendingUp } from "lucide-react"

type TProps = {
   data: TGlobalAnalitics[]
}

export function SectionCards({ data }: TProps) {
   const year = new Date().getFullYear()
   const cards = getRevenueSourceWithYoY(data, year)

   return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
         {cards.map((item) => {
            const isUp = item.yoy !== null && item.yoy > 0
            const isDown = item.yoy !== null && item.yoy < 0
            const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus

            return (
               <Card className="@container/card" key={item.source}>
                  <CardHeader>
                     <CardDescription>{item.source}</CardDescription>
                     <CardTitle className="text-[1rem] font-semibold tabular-nums @[250px]/card:text-[1rem]">
                        {formatCurrency(item.total)}
                     </CardTitle>
                     <CardAction>
                        {item.yoy !== null ? (
                           <Badge variant="outline">
                              <Icon className={`size-3 ${isUp ? 'text-green-500' : isDown ? 'text-red-500' : 'text-amber-400'}`} />
                              {item.yoy > 0 ? "+" : ""}{item.yoy}% vs {year - 1}
                           </Badge>
                        ) : (
                           <Badge variant="outline">Sem dados anteriores</Badge>
                        )}
                     </CardAction>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1.5 text-sm">
                     <div className="line-clamp-1 flex gap-2 font-medium">
                        <Icon className={`size-4 ${isUp ? 'text-green-500' : isDown ? 'text-red-500' : 'text-amber-400'}`} />
                        {isUp && `Cresceu ${item.yoy}% face a ${year - 1}`}
                        {isDown && `Caiu ${Math.abs(item.yoy!)}% face a ${year - 1}`}
                        {!isUp && !isDown && "Sem variação anual"}
                     </div>
                     <div className="text-muted-foreground">
                        {formatCurrency(item.previousTotal || 0)} cobrado · taxa {item.yoy}%
                     </div>
                  </CardFooter>
               </Card>
            )
         })}
      </div>
   )
}