"use client"

import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ForecastPanel } from "@/components/forecast-panel"
import { demandAlerts } from "@/lib/data"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react"

export default function ForecastingPage() {
  return (
    <AppShell>
      <PageHeader title="Demand Forecasting" description="AI-powered occupancy and revenue forecasts">
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <RefreshCw className="size-4" /> Refresh model
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ForecastPanel />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Demand Alerts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {demandAlerts.map((alert, i) => {
              const high = alert.type === "high"
              return (
                <div
                  key={i}
                  className={cn(
                    "rounded-lg border border-l-2 p-3",
                    high ? "border-l-success bg-success/5" : "border-l-warning bg-warning/5",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "flex size-7 items-center justify-center rounded-md",
                          high ? "bg-success/15 text-success" : "bg-warning/20 text-warning-foreground",
                        )}
                      >
                        {high ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                      </span>
                      <div>
                        <p className="text-sm font-medium leading-tight">{alert.title}</p>
                        <p className="text-xs text-muted-foreground">{alert.date}</p>
                      </div>
                    </div>
                    <span className={cn("shrink-0 text-xs font-semibold", high ? "text-success" : "text-warning-foreground")}>
                      {alert.lift}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{alert.detail}</p>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
