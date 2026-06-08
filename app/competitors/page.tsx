"use client"

import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CompetitorTrendChart } from "@/components/competitor-chart"
import { competitors } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Star, MapPin, ArrowUpRight, ArrowDownRight, Radar, DollarSign, Percent } from "lucide-react"

const positionColor: Record<string, string> = {
  Luxury: "bg-gold/15 text-foreground border-gold/40",
  Premium: "bg-primary/10 text-primary border-primary/20",
  "Direct comp": "bg-secondary text-muted-foreground border-border",
  Value: "bg-success/10 text-success border-success/20",
}

export default function CompetitorsPage() {
  const avgPrice = Math.round(competitors.reduce((s, c) => s + c.price, 0) / competitors.length)
  const avgOcc = Math.round(competitors.reduce((s, c) => s + c.occ, 0) / competitors.length)

  return (
    <AppShell>
      <PageHeader title="Competitor Intelligence" description="Real-time rate and occupancy monitoring across your comp set">
        <Badge variant="outline" className="gap-1.5 border-primary/30 bg-primary/10 text-primary">
          <Radar className="size-3" /> 6 hotels tracked
        </Badge>
        <Button size="sm">Add competitor</Button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Your ADR" value="$412.55" delta={3.8} icon={DollarSign} accent />
        <StatCard label="Comp-set Avg" value={`$${avgPrice}`} hint="Across 6 hotels" icon={DollarSign} />
        <StatCard label="Comp-set Occupancy" value={`${avgOcc}%`} hint="Estimated" icon={Percent} />
        <StatCard label="Rate Index (MPI)" value="93.4" hint="Below market — room to grow" icon={Radar} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Nearby Competitors</CardTitle>
            <CardDescription>Live pricing and demand estimates</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {competitors.map((c) => {
              const up = c.change >= 0
              return (
                <div key={c.name} className="flex items-center justify-between gap-4 rounded-lg border border-border p-4">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{c.name}</span>
                      <Badge variant="outline" className={cn("text-[10px]", positionColor[c.position])}>
                        {c.position}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Star className="size-3 fill-gold text-gold" /> {c.rating}</span>
                      <span className="flex items-center gap-1"><MapPin className="size-3" /> {c.distance} mi</span>
                      <span>{c.occ}% occ</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-lg font-semibold tabular-nums">${c.price}</div>
                    <div className={cn("flex items-center justify-end gap-0.5 text-xs font-medium", up ? "text-success" : "text-destructive")}>
                      {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                      {Math.abs(c.change)}% / 24h
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <CompetitorTrendChart />
      </div>
    </AppShell>
  )
}
