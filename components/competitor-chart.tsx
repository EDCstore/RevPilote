"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { competitorTrend } from "@/lib/data"

export function CompetitorTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Rate Positioning</CardTitle>
        <CardDescription>Your ADR vs. comp-set average — last 14 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            you: { label: "Mon Hôtel", color: "var(--chart-1)" },
            market: { label: "Comp-set Avg", color: "var(--chart-3)" },
          }}
          className="h-[280px] w-full"
        >
          <LineChart data={competitorTrend} margin={{ left: 4, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} minTickGap={32} tickMargin={8} fontSize={11} />
            <YAxis tickFormatter={(v) => `$${v}`} tickLine={false} axisLine={false} width={44} fontSize={11} domain={["dataMin - 20", "dataMax + 20"]} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Line dataKey="you" stroke="var(--color-you)" strokeWidth={2.5} dot={false} />
            <Line dataKey="market" stroke="var(--color-market)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
