"use client"

import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { reports } from "@/lib/data"
import { cn } from "@/lib/utils"
import { FileText, Download, DollarSign, BedDouble, Target, Radar, FileBarChart } from "lucide-react"

const reportTemplates = [
  { name: "Revenue Performance", desc: "Detailed revenue, ADR and RevPAR breakdown", icon: DollarSign },
  { name: "Occupancy Trends", desc: "Occupancy patterns and pickup analysis", icon: BedDouble },
  { name: "Forecast Accuracy", desc: "Predicted vs. actual model performance", icon: Target },
  { name: "Competitor Analysis", desc: "Comp-set rate and positioning report", icon: Radar },
  { name: "Monthly Summary", desc: "Executive overview of the period", icon: FileBarChart },
]

const typeColor: Record<string, string> = {
  Revenue: "bg-primary/10 text-primary border-primary/20",
  Occupancy: "bg-success/10 text-success border-success/20",
  Forecast: "bg-warning/15 text-warning-foreground border-warning/30",
  Competitor: "bg-secondary text-muted-foreground border-border",
  Summary: "bg-gold/15 text-foreground border-gold/40",
}

export default function ReportsPage() {
  return (
    <AppShell>
      <PageHeader title="Reports" description="Generate and download revenue management reports">
        <Button size="sm" className="gap-2">
          <FileText className="size-4" /> New report
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {reportTemplates.map((t) => (
          <Card key={t.name} className="cursor-pointer gap-0 p-4 transition-colors hover:border-primary/40">
            <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
              <t.icon className="size-4" />
            </span>
            <h3 className="mt-3 text-sm font-medium">{t.name}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.desc}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Generated Reports</CardTitle>
          <CardDescription>Download or share previously generated reports</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">Report</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Generated</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="pr-6 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <span className="flex size-8 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                          <FileText className="size-4" />
                        </span>
                        <div>
                          <div className="text-sm font-medium">{r.name}</div>
                          <div className="text-xs text-muted-foreground">{r.format}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("text-[10px]", typeColor[r.type])}>{r.type}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.period}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.generated}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.size}</TableCell>
                    <TableCell className="pr-6 text-right">
                      <Button variant="ghost" size="sm" className="gap-1.5">
                        <Download className="size-4" /> Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  )
}
