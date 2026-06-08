"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { StatCard } from "@/components/stat-card"
import { forecastPeriods, forecastSeries, formatCurrency } from "@/lib/data"
import { Percent, DollarSign, BarChart3, BedDouble } from "lucide-react"

type PeriodKey = "7d" | "30d" | "90d"

export function ForecastPanel() {
  return (
    <Tabs defaultValue="7d" className="gap-4">
      <TabsList>
        <TabsTrigger value="7d">Next 7 Days</TabsTrigger>
        <TabsTrigger value="30d">Next 30 Days</TabsTrigger>
        <TabsTrigger value="90d">Next 90 Days</TabsTrigger>
      </TabsList>

      {(["7d", "30d", "90d"] as PeriodKey[]).map((key) => {
        const p = forecastPeriods[key]
        const series = forecastSeries[key]
        return (
          <TabsContent key={key} value={key} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard label="Expected Occupancy" value={`${p.occupancy}%`} icon={Percent} accent />
              <StatCard label="Expected Revenue" value={formatCurrency(p.revenue, { compact: true })} icon={DollarSign} />
              <StatCard label="Forecast ADR" value={`$${p.adr.toFixed(2)}`} icon={BarChart3} />
              <StatCard label="Forecast RevPAR" value={`$${p.revpar.toFixed(2)}`} icon={BedDouble} />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Occupancy Forecast</CardTitle>
                  <CardDescription>{p.label} · model confidence 94.6%</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{ occupancy: { label: "Occupancy", color: "var(--chart-2)" } }}
                    className="h-[260px] w-full"
                  >
                    <AreaChart data={series} margin={{ left: 4, right: 8, top: 8 }}>
                      <defs>
                        <linearGradient id={`occ-${key}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-occupancy)" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="var(--color-occupancy)" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickLine={false} axisLine={false} minTickGap={24} tickMargin={8} fontSize={11} />
                      <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 100]} tickLine={false} axisLine={false} width={36} fontSize={11} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area dataKey="occupancy" stroke="var(--color-occupancy)" strokeWidth={2.5} fill={`url(#occ-${key})`} />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Revenue Forecast</CardTitle>
                  <CardDescription>{p.label} · projected revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{ revenue: { label: "Revenue", color: "var(--chart-1)" } }}
                    className="h-[260px] w-full"
                  >
                    <BarChart data={series} margin={{ left: 4, right: 8, top: 8 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickLine={false} axisLine={false} minTickGap={24} tickMargin={8} fontSize={11} />
                      <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tickLine={false} axisLine={false} width={44} fontSize={11} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
