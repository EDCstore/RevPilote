"use client"

import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AiAssistant } from "@/components/ai-assistant"
import { aiInsights } from "@/lib/data"
import { cn } from "@/lib/utils"
import { TrendingUp, AlertTriangle, Activity, CalendarClock, ArrowRight, Sparkles } from "lucide-react"

const categoryMeta: Record<string, { icon: typeof TrendingUp; cls: string }> = {
  "Revenue Opportunity": { icon: TrendingUp, cls: "bg-success/10 text-success border-success/20" },
  "Pricing Anomaly": { icon: AlertTriangle, cls: "bg-warning/15 text-warning-foreground border-warning/30" },
  "Forecast Change": { icon: Activity, cls: "bg-primary/10 text-primary border-primary/20" },
  "Event Impact": { icon: CalendarClock, cls: "bg-primary/10 text-primary border-primary/20" },
  "Pricing Action": { icon: AlertTriangle, cls: "bg-warning/15 text-warning-foreground border-warning/30" },
}

const toneBar: Record<string, string> = {
  positive: "border-l-success",
  warning: "border-l-warning",
  neutral: "border-l-primary",
}

export default function InsightsPage() {
  return (
    <AppShell>
      <PageHeader title="AI Insights" description="Automated revenue intelligence and your on-demand AI analyst">
        <Badge variant="outline" className="gap-1.5 border-primary/30 bg-primary/10 text-primary">
          <Sparkles className="size-3" /> {aiInsights.length} new insights
        </Badge>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="flex flex-col gap-4 xl:col-span-2">
          {aiInsights.map((insight) => {
            const meta = categoryMeta[insight.category]
            const Icon = meta.icon
            return (
              <Card key={insight.id} className={cn("border-l-2", toneBar[insight.tone])}>
                <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-3">
                    <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg border", meta.cls)}>
                      <Icon className="size-4" />
                    </span>
                    <div className="space-y-1">
                      <Badge variant="outline" className={cn("text-[10px]", meta.cls)}>
                        {insight.category}
                      </Badge>
                      <h3 className="text-sm font-semibold leading-snug">{insight.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{insight.body}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                    <span className="text-base font-semibold text-success">{insight.value}</span>
                    <Button size="sm" variant="outline" className="gap-1.5 bg-transparent">
                      {insight.action} <ArrowRight className="size-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="xl:sticky xl:top-20 xl:self-start">
          <AiAssistant />
        </div>
      </div>
    </AppShell>
  )
}
