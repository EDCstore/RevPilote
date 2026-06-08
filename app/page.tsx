"use client"

import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { Button } from "@/components/ui/button"
import { AiRecommendations } from "@/components/ai-recommendations"
import {
  RevenueTrendChart,
  OccupancyForecastChart,
  BookingPaceChart,
  PricingHistoryChart,
  MarketDemandChart,
} from "@/components/dashboard-charts"
import { kpis, formatCurrency } from "@/lib/data"
import {
  DollarSign,
  CalendarRange,
  BedDouble,
  BarChart3,
  Percent,
  Target,
  TrendingUp,
  Sparkles,
  Download,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        title="Dashboard"
       description="Gestionnaire d'hôtels - France"
      >
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="size-4" /> Export
        </Button>
        <Button size="sm" className="gap-2">
          <Sparkles className="size-4" /> Run AI Optimization
        </Button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Revenue Today" value={formatCurrency(kpis.revenueToday)} delta={kpis.revenueTodayDelta} icon={DollarSign} accent />
        <StatCard label="Revenue This Month" value={formatCurrency(kpis.revenueMonth, { compact: true })} delta={kpis.revenueMonthDelta} icon={CalendarRange} />
        <StatCard label="RevPAR" value={`$${kpis.revpar.toFixed(2)}`} delta={kpis.revparDelta} icon={BedDouble} />
        <StatCard label="ADR" value={`$${kpis.adr.toFixed(2)}`} delta={kpis.adrDelta} icon={BarChart3} />
        <StatCard label="Occupancy Rate" value={`${kpis.occupancy}%`} delta={kpis.occupancyDelta} icon={Percent} />
        <StatCard label="Forecast Accuracy" value={`${kpis.forecastAccuracy}%`} delta={kpis.forecastAccuracyDelta} icon={Target} />
        <StatCard label="Revenue Growth" value={`${kpis.revenueGrowth}%`} delta={kpis.revenueGrowthDelta} icon={TrendingUp} />
        <StatCard label="AI Recommendations" value={String(kpis.aiRecommendations)} hint={`${kpis.aiRecommendationsDelta} new today`} icon={Sparkles} accent />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RevenueTrendChart />
        <OccupancyForecastChart />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="grid grid-cols-1 gap-4 lg:col-span-2 xl:grid-cols-2">
          <BookingPaceChart />
          <PricingHistoryChart />
          <div className="xl:col-span-2">
            <MarketDemandChart />
          </div>
        </div>
        <AiRecommendations limit={4} />
      </div>
    </AppShell>
  )
}
