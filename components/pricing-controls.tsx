"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { priceRules } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

const ruleTypeColor: Record<string, string> = {
  Seasonal: "bg-primary/10 text-primary border-primary/20",
  Dynamic: "bg-success/10 text-success border-success/20",
  Event: "bg-warning/15 text-warning-foreground border-warning/30",
  "Length of stay": "bg-secondary text-muted-foreground border-border",
}

export function PricingControls() {
  const [autoMode, setAutoMode] = useState(true)
  const [floor, setFloor] = useState(true)
  const [minStay, setMinStay] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Dynamic Pricing Controls</CardTitle>
        <CardDescription>Configure how RevPilot manages your rates</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <ControlRow
          title="Automatic pricing mode"
          desc="AI adjusts rates in real time based on demand"
          checked={autoMode}
          onChange={setAutoMode}
        />
        <ControlRow
          title="Rate floor protection"
          desc="Never price below your defined minimums"
          checked={floor}
          onChange={setFloor}
        />
        <ControlRow
          title="Minimum stay rules"
          desc="Enforce LOS restrictions on peak nights"
          checked={minStay}
          onChange={setMinStay}
        />
        <div className="mt-2 rounded-lg border border-dashed border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
          {autoMode
            ? "Automatic mode is on. Manual overrides on the calendar are respected for 24 hours."
            : "Automatic mode is off. All rates are set manually until re-enabled."}
        </div>
      </CardContent>
    </Card>
  )
}

function ControlRow({
  title,
  desc,
  checked,
  onChange,
}: {
  title: string
  desc: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-0">
      <div className="space-y-0.5">
        <Label className="text-sm font-medium">{title}</Label>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )
}

export function PriceRules() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-base">Price Rules</CardTitle>
          <CardDescription>Seasonal, event-based and dynamic rules</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
          <Plus className="size-4" /> New rule
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {priceRules.map((rule) => (
          <div key={rule.id} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">{rule.name}</span>
                <Badge variant="outline" className={cn("text-[10px]", ruleTypeColor[rule.type])}>
                  {rule.type}
                </Badge>
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {rule.condition} · <span className="font-medium text-foreground">{rule.action}</span>
              </p>
            </div>
            <RuleToggle active={rule.active} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function RuleToggle({ active }: { active: boolean }) {
  const [on, setOn] = useState(active)
  return <Switch checked={on} onCheckedChange={setOn} />
}
