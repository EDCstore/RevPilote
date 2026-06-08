"use client"

import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { hotels, formatCurrency } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Building2, BedDouble, DollarSign, Plus, MapPin } from "lucide-react"

export default function HotelsPage() {
  const active = hotels.filter((h) => h.status === "active")
  const totalRooms = hotels.reduce((s, h) => s + h.rooms, 0)
  const totalRevenue = hotels.reduce((s, h) => s + h.revenue, 0)
  const avgOcc = Math.round(active.reduce((s, h) => s + h.occupancy, 0) / active.length)

  return (
    <AppShell>
      <PageHeader title="Hotels" description="Manage your portfolio of properties">
        <Button size="sm" className="gap-2">
          <Plus className="size-4" /> Add property
        </Button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Properties" value={String(hotels.length)} hint={`${active.length} active`} icon={Building2} accent />
        <StatCard label="Total Rooms" value={String(totalRooms)} icon={BedDouble} />
        <StatCard label="Portfolio Revenue" value={formatCurrency(totalRevenue, { compact: true })} delta={14.2} icon={DollarSign} />
        <StatCard label="Avg Occupancy" value={`${avgOcc}%`} delta={3.6} icon={BedDouble} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {hotels.map((h) => {
          const onboarding = h.status === "onboarding"
          return (
            <Card key={h.id} className="gap-0 overflow-hidden p-0">
              <div className="flex items-start justify-between gap-2 p-5 pb-4">
                <div className="flex gap-3">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-sidebar text-sm font-semibold text-white">
                    {h.name.split(" ").slice(-1)[0].slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <h3 className="font-semibold leading-tight">{h.name}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" /> {h.location}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "shrink-0 capitalize",
                    onboarding ? "border-warning/30 bg-warning/15 text-warning-foreground" : "border-success/20 bg-success/10 text-success",
                  )}
                >
                  {h.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-border px-5 py-4 text-center">
                <Stat label="Rooms" value={String(h.rooms)} />
                <Stat label="ADR" value={onboarding ? "—" : `$${h.adr}`} />
                <Stat label="Revenue" value={onboarding ? "—" : formatCurrency(h.revenue, { compact: true })} />
              </div>

              <div className="border-t border-border px-5 py-4">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Occupancy</span>
                  <span className="font-medium tabular-nums">{onboarding ? "—" : `${h.occupancy}%`}</span>
                </div>
                <Progress value={onboarding ? 0 : h.occupancy} className="h-1.5" />
              </div>
            </Card>
          )
        })}
      </div>
    </AppShell>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm font-semibold tabular-nums">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  )
}
