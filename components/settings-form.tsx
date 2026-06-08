"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SettingsForm() {
  const [autoPublish, setAutoPublish] = useState(true)
  const [guardrails, setGuardrails] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [slackAlerts, setSlackAlerts] = useState(false)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Organization profile</CardTitle>
          <CardDescription>Details shown across your workspace and reports.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="org">Organization name</Label>
            <Input id="org" defaultValue="Meridian Hospitality Group" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Billing email</Label>
            <Input id="email" type="email" defaultValue="finance@meridianhg.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="currency">Reporting currency</Label>
            <Select defaultValue="usd">
              <SelectTrigger id="currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD — US Dollar</SelectItem>
                <SelectItem value="eur">EUR — Euro</SelectItem>
                <SelectItem value="gbp">GBP — British Pound</SelectItem>
                <SelectItem value="aed">AED — UAE Dirham</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tz">Default timezone</Label>
            <Select defaultValue="et">
              <SelectTrigger id="tz">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="et">Eastern Time (ET)</SelectItem>
                <SelectItem value="pt">Pacific Time (PT)</SelectItem>
                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                <SelectItem value="cet">Central European Time (CET)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing automation</CardTitle>
          <CardDescription>Control how the AI engine applies rate changes.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-1">
          <div className="flex items-center justify-between py-3">
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">Auto-publish rates</p>
              <p className="text-sm text-muted-foreground">Push approved recommendations to your PMS automatically.</p>
            </div>
            <Switch checked={autoPublish} onCheckedChange={setAutoPublish} />
          </div>
          <Separator />
          <div className="flex items-center justify-between py-3">
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">Rate guardrails</p>
              <p className="text-sm text-muted-foreground">Enforce min/max price boundaries on every change.</p>
            </div>
            <Switch checked={guardrails} onCheckedChange={setGuardrails} />
          </div>
          <Separator />
          <div className="grid gap-2 py-3">
            <Label htmlFor="aggr">Optimization strategy</Label>
            <Select defaultValue="balanced">
              <SelectTrigger id="aggr">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="occupancy">Maximize occupancy</SelectItem>
                <SelectItem value="balanced">Balanced (RevPAR)</SelectItem>
                <SelectItem value="adr">Maximize ADR</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3 py-1">
            <div className="grid gap-2">
              <Label htmlFor="min">Floor rate ($)</Label>
              <Input id="min" type="number" defaultValue={129} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="max">Ceiling rate ($)</Label>
              <Input id="max" type="number" defaultValue={749} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose where revenue alerts are delivered.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-1">
          <div className="flex items-center justify-between py-3">
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">Email alerts</p>
              <p className="text-sm text-muted-foreground">Daily pickup and pacing summaries.</p>
            </div>
            <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
          </div>
          <Separator />
          <div className="flex items-center justify-between py-3">
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">Slack notifications</p>
              <p className="text-sm text-muted-foreground">Real-time demand surge and undercut alerts.</p>
            </div>
            <Switch checked={slackAlerts} onCheckedChange={setSlackAlerts} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected systems</CardTitle>
          <CardDescription>Property management and distribution integrations.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {[
            { name: "Opera Cloud PMS", status: "Connected" },
            { name: "SiteMinder Channel Manager", status: "Connected" },
            { name: "Booking.com Extranet", status: "Connected" },
            { name: "Expedia Partner Central", status: "Action needed" },
          ].map((i) => (
            <div
              key={i.name}
              className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
            >
              <span className="text-sm font-medium text-foreground">{i.name}</span>
              <span
                className={
                  i.status === "Connected"
                    ? "text-xs font-medium text-[var(--success)]"
                    : "text-xs font-medium text-[var(--warning)]"
                }
              >
                {i.status}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="lg:col-span-2 flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>Save changes</Button>
      </div>
    </div>
  )
}
