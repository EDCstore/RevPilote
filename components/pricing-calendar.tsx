"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { pricingCalendar } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Calendar as CalIcon, Zap } from "lucide-react"

const demandColor = {
  high: "border-l-success bg-success/5",
  med: "border-l-primary/40 bg-card",
  low: "border-l-warning bg-warning/5",
}

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function PricingCalendar() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-base">
            <CalIcon className="size-4 text-primary" /> Pricing Calendar
          </CardTitle>
          <CardDescription>Live room rates · click a day to override</CardDescription>
        </div>
        <div className="hidden items-center gap-3 text-xs text-muted-foreground sm:flex">
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-success" /> High</span>
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-primary/40" /> Medium</span>
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-warning" /> Low</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1.5">
          {dayLabels.map((d) => (
            <div key={d} className="pb-1 text-center text-[11px] font-medium text-muted-foreground">
              {d}
            </div>
          ))}
          {pricingCalendar.map((cell, i) => {
            const isSelected = selected === i
            return (
              <button
                key={i}
                onClick={() => setSelected(isSelected ? null : i)}
                className={cn(
                  "flex min-h-[78px] flex-col items-start gap-1 rounded-md border border-l-2 p-2 text-left transition-all hover:ring-2 hover:ring-primary/30",
                  demandColor[cell.demand],
                  isSelected && "ring-2 ring-primary",
                )}
              >
                <span className="text-[11px] font-medium text-muted-foreground">{cell.date.getDate()}</span>
                <span className="text-sm font-semibold tabular-nums">${cell.price}</span>
                {cell.event && (
                  <Badge variant="outline" className="max-w-full truncate border-primary/30 px-1 py-0 text-[9px] text-primary">
                    {cell.event}
                  </Badge>
                )}
                {cell.auto && !cell.event && (
                  <span className="mt-auto inline-flex items-center gap-0.5 text-[9px] text-primary/70">
                    <Zap className="size-2.5" /> Auto
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
