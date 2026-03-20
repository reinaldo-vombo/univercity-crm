"use client"

import { Bar, BarChart as RootBarChart, CartesianGrid, XAxis, YAxis, Line } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
   ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from "@/components/ui/chart"
import { useState } from "react"
import { getMonthlyChartData, getYearlyChartData } from "@/lib/helper/chart-mappers"
import { TGlobalAnalitics } from "@/types/global"

//fill: "var(--color-chrome)"
const chartConfig = {
   cobrado: { label: "Cobrado", color: "var(--chart-1)" },
   pendente: { label: "Pendente", color: "var(--chart-2)" },
   taxa: { label: "Taxa de cobrança %", color: "var(--chart-3)" },

} satisfies ChartConfig
type Mode = "2026" | "2025" | "2024" | "anual"
type TProps = {
   revenues: TGlobalAnalitics[]
}
const RevenueBarChart = ({ revenues }: TProps) => {
   const [mode, setMode] = useState<Mode>("2025");
   const data =
      mode === "anual"
         ? getYearlyChartData(revenues)
         : getMonthlyChartData(revenues, Number(mode))
   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <div>
               <p className="text-sm font-medium">Receita</p>
               <p className="text-xs text-muted-foreground">
                  {mode === "anual" ? "Comparação 2024 – 2026" : `Mensal ${mode}`}
               </p>
            </div>
            <Select value={mode} onValueChange={(v) => setMode(v as Mode)}>
               <SelectTrigger className="w-36">
                  <SelectValue />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="anual">Por ano</SelectItem>
               </SelectContent>
            </Select>
         </div>
         <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <RootBarChart accessibilityLayer data={data}>
               <CartesianGrid vertical={false} />
               <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(v) => mode === "anual" ? v : v.slice(0, 3)}
               />
               <YAxis yAxisId="left" axisLine={false} tickLine={false} tickFormatter={(v) => `${v}k`} />
               <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false}
                  domain={[60, 100]} tickFormatter={(v) => `${v}%`} />
               <ChartTooltip content={<ChartTooltipContent />} />
               <Bar yAxisId="left" dataKey="cobrado" fill="var(--color-cobrado)" radius={4} />
               <Bar yAxisId="left" dataKey="pendente" fill="var(--color-pendente)" radius={4} />
               <Line yAxisId="right" dataKey="taxa" stroke="var(--color-taxa)"
                  dot={{ r: 4 }} strokeWidth={2} type="monotone" />
            </RootBarChart>
         </ChartContainer>
      </div>
   )
}

export default RevenueBarChart;
