"use client"

import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PricingCalendar } from "@/components/pricing-calendar"
import { PricingControls, PriceRules } from "@/components/pricing-controls"
import { PricingHistoryChart } from "@/components/dashboard-charts"
import { Zap, Sliders } from "lucide-react"

export default function PricingEnginePage() {
  return (
    <AppShell>
      <PageHeader title="Pricing Engine" description="Visual rate calendar with dynamic pricing automation">
        <Badge variant="outline" className="gap-1.5 border-success/30 bg-success/10 text-success">
          <Zap className="size-3" /> Auto pricing active
        </Badge>
        <Button size="sm" className="gap-2">
          <Sliders className="size-4" /> Manual override
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PricingCalendar />
        </div>
        <PricingControls />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PriceRules />
        <PricingHistoryChart />
      </div>
    </AppShell>
  )
}
