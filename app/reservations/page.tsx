"use client"

import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { reservations, formatCurrency } from "@/lib/data"
import { cn } from "@/lib/utils"
import { CalendarCheck, LogIn, Clock, DollarSign, Plus } from "lucide-react"

const statusColor: Record<string, string> = {
  confirmed: "bg-primary/10 text-primary border-primary/20",
  "checked-in": "bg-success/10 text-success border-success/20",
  pending: "bg-warning/15 text-warning-foreground border-warning/30",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
}

export default function ReservationsPage() {
  const active = reservations.filter((r) => r.status !== "cancelled")
  const revenue = active.reduce((s, r) => s + r.total, 0)
  const arrivals = reservations.filter((r) => r.checkIn === "Jun 14").length

  return (
    <AppShell>
      <PageHeader title="Reservations" description="Upcoming arrivals, departures and booking activity">
        <Button size="sm" className="gap-2">
          <Plus className="size-4" /> New reservation
        </Button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Active Bookings" value={String(active.length)} icon={CalendarCheck} accent />
        <StatCard label="Arrivals Today" value={String(arrivals)} icon={LogIn} />
        <StatCard label="Pending" value={String(reservations.filter((r) => r.status === "pending").length)} icon={Clock} />
        <StatCard label="Booked Revenue" value={formatCurrency(revenue)} icon={DollarSign} />
      </div>

      <Card className="mt-6">
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">Booking</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Stay</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="pr-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="pl-6 font-mono text-xs text-muted-foreground">{r.id}</TableCell>
                    <TableCell className="font-medium">{r.guest}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.room}</TableCell>
                    <TableCell className="whitespace-nowrap text-sm">
                      {r.checkIn} – {r.checkOut}
                      <span className="ml-1 text-xs text-muted-foreground">({r.nights}n)</span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.channel}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{formatCurrency(r.total)}</TableCell>
                    <TableCell className="pr-6">
                      <Badge variant="outline" className={cn("capitalize", statusColor[r.status])}>
                        {r.status}
                      </Badge>
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
