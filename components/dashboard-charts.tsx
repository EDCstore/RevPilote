"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  revenueTrend,
  occupancyForecast,
  bookingPace,
  pricingHistory,
  marketDemand,
} from "@/lib/data"

const money = (v: number) => `$${(v / 1000).toFixed(0)}k`

export function RevenueTrendChart() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base">Revenue Trend</CardTitle>
        <CardDescription>Actual vs. AI forecast — last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            actual: { label: "Actual", color: "var(--chart-1)" },
            forecast: { label: "Forecast", color: "var(--chart-3)" },
          }}
          className="h-[260px] w-full"
        >
          <AreaChart data={revenueTrend} margin={{ left: 4, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-actual)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-actual)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} minTickGap={32} tickMargin={8} fontSize={11} />
            <YAxis tickFormatter={money} tickLine={false} axisLine={false} width={42} fontSize={11} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="forecast"
              stroke="var(--color-forecast)"
              strokeDasharray="4 4"
              strokeWidth={2}
              fill="none"
            />
            <Area
              dataKey="actual"
              stroke="var(--color-actual)"
              strokeWidth={2.5}
              fill="url(#fillActual)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function OccupancyForecastChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Occupancy Forecast</CardTitle>
        <CardDescription>Next 14 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{ occupancy: { label: "Occupancy", color: "var(--chart-2)" } }}
          className="h-[260px] w-full"
        >
          <AreaChart data={occupancyForecast} margin={{ left: 4, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="fillOcc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-occupancy)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-occupancy)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} minTickGap={24} tickMargin={8} fontSize={11} />
            <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 100]} tickLine={false} axisLine={false} width={36} fontSize={11} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area dataKey="occupancy" stroke="var(--color-occupancy)" strokeWidth={2.5} fill="url(#fillOcc)" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function BookingPaceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Booking Pace</CardTitle>
        <CardDescription>On the books vs. same time last year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            thisYear: { label: "This Year", color: "var(--chart-1)" },
            lastYear: { label: "Last Year", color: "var(--chart-5)" },
          }}
          className="h-[260px] w-full"
        >
          <BarChart data={bookingPace} margin={{ left: 4, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
            <YAxis tickFormatter={(v) => `${v / 1000}k`} tickLine={false} axisLine={false} width={32} fontSize={11} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="lastYear" fill="var(--color-lastYear)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="thisYear" fill="var(--color-thisYear)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function PricingHistoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Dynamic Pricing History</CardTitle>
        <CardDescription>AI rate vs. market — last 24 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            ai: { label: "RevPilot Rate", color: "var(--chart-1)" },
            market: { label: "Market Avg", color: "var(--chart-3)" },
          }}
          className="h-[260px] w-full"
        >
          <LineChart data={pricingHistory} margin={{ left: 4, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} minTickGap={32} tickMargin={8} fontSize={11} />
            <YAxis tickFormatter={(v) => `$${v}`} tickLine={false} axisLine={false} width={42} fontSize={11} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Line dataKey="ai" stroke="var(--color-ai)" strokeWidth={2.5} dot={false} />
            <Line dataKey="market" stroke="var(--color-market)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function MarketDemandChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Market Demand Score</CardTitle>
        <CardDescription>Composite signal — 78 / 100</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{ score: { label: "Score", color: "var(--chart-1)" } }}
          className="mx-auto h-[260px] w-full"
        >
          <RadarChart data={marketDemand} margin={{ top: 8, bottom: 8 }}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey="factor" fontSize={11} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Radar
              dataKey="score"
              stroke="var(--color-score)"
              fill="var(--color-score)"
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
