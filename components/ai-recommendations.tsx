"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import { aiRecommendations } from "@/lib/data"
import { cn } from "@/lib/utils"

const priorityStyles = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/15 text-warning-foreground border-warning/30",
  low: "bg-secondary text-muted-foreground border-border",
}

export function AiRecommendations({ limit }: { limit?: number }) {
  const items = limit ? aiRecommendations.slice(0, limit) : aiRecommendations

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="size-4 text-primary" />
            AI Recommendations
          </CardTitle>
          <CardDescription>Prioritized revenue actions for today</CardDescription>
        </div>
        <Badge variant="secondary" className="shrink-0">
          {aiRecommendations.length} active
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {items.map((rec) => (
          <div
            key={rec.id}
            className="group rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={cn("capitalize", priorityStyles[rec.priority])}>
                    {rec.priority}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{rec.room}</span>
                </div>
                <p className="text-sm font-medium leading-snug">{rec.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{rec.detail}</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm font-semibold text-success">{rec.impact}</div>
                <div className="text-[11px] text-muted-foreground">{rec.confidence}% conf.</div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                Dismiss
              </Button>
              <Button size="sm" className="h-7 gap-1 text-xs">
                Apply <ArrowRight className="size-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
