"use client"

import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { billingPlans, invoices, formatCurrency } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Check, CreditCard, Download } from "lucide-react"

export default function BillingPage() {
  return (
    <AppShell>
      <PageHeader title="Billing" description="Manage your subscription, usage and invoices" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Current Plan</CardTitle>
            <CardDescription>You are on the Professional plan, billed monthly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-semibold">Professional</div>
                <div className="text-sm text-muted-foreground">$1,299 / month · renews Jul 1, 2025</div>
              </div>
              <Button variant="outline" className="bg-transparent">Manage plan</Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Properties used</span>
                <span className="font-medium">4 of 5</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Rooms under management</span>
                <span className="font-medium">1,050 of unlimited</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <span className="flex size-10 items-center justify-center rounded-md bg-sidebar text-white">
                <CreditCard className="size-5" />
              </span>
              <div>
                <div className="text-sm font-medium">Visa ending in 4242</div>
                <div className="text-xs text-muted-foreground">Expires 09 / 2027</div>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-transparent">Update payment method</Button>
            <p className="text-xs text-muted-foreground">
              Payments are securely processed by Stripe. Your card details are never stored on our servers.
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="mt-8 mb-3 text-lg font-semibold">Plans</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {billingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={cn("relative flex flex-col", plan.current && "border-primary ring-1 ring-primary")}
          >
            {plan.current && (
              <Badge className="absolute right-4 top-4 bg-primary text-primary-foreground">Current</Badge>
            )}
            <CardHeader>
              <CardTitle className="text-base">{plan.name}</CardTitle>
              <CardDescription className="min-h-[40px]">{plan.tagline}</CardDescription>
              <div className="pt-2">
                {plan.price ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold">{formatCurrency(plan.price)}</span>
                    <span className="text-sm text-muted-foreground">/ mo</span>
                  </div>
                ) : (
                  <div className="text-3xl font-semibold">Custom</div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <ul className="flex flex-1 flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.current ? "outline" : plan.price ? "default" : "secondary"}
                disabled={plan.current}
                className={cn(plan.current && "bg-transparent")}
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-base">Invoice History</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="pl-6 font-mono text-xs text-muted-foreground">{inv.id}</TableCell>
                    <TableCell className="text-sm">{inv.date}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{inv.plan}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{formatCurrency(inv.amount)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-success/20 bg-success/10 capitalize text-success">
                        {inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <Button variant="ghost" size="sm" className="gap-1.5">
                        <Download className="size-4" /> PDF
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
