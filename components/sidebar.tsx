"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  TrendingUp,
  Gauge,
  LineChart,
  Radar,
  Building2,
  CalendarCheck,
  FileText,
  Sparkles,
  CreditCard,
  Settings,
  Plane,
} from "lucide-react"
import { cn } from "@/lib/utils"

const nav = [
  { group: "Overview", items: [{ name: "Dashboard", href: "/", icon: LayoutDashboard }] },
  {
    group: "Optimize",
    items: [
      { name: "Revenue Management", href: "/revenue", icon: TrendingUp },
      { name: "Pricing Engine", href: "/pricing", icon: Gauge },
      { name: "Demand Forecasting", href: "/forecasting", icon: LineChart },
      { name: "Competitor Intelligence", href: "/competitors", icon: Radar },
    ],
  },
  {
    group: "Operate",
    items: [
      { name: "Hotels", href: "/hotels", icon: Building2 },
      { name: "Reservations", href: "/reservations", icon: CalendarCheck },
      { name: "Reports", href: "/reports", icon: FileText },
      { name: "AI Insights", href: "/insights", icon: Sparkles },
    ],
  },
  {
    group: "Account",
    items: [
      { name: "Billing", href: "/billing", icon: CreditCard },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
]

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-2.5 px-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Plane className="size-5 -rotate-45" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-white">RevPilot AI</div>
          <div className="text-[11px] text-sidebar-foreground/60">Revenue Intelligence</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {nav.map((section) => (
          <div key={section.group} className="mb-5">
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
              {section.group}
            </div>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-sidebar-accent text-white font-medium"
                        : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-white",
                    )}
                  >
                    <item.icon className={cn("size-4 shrink-0", active && "text-sidebar-primary")} />
                    <span className="truncate">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-md px-2 py-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-white">
            MN
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-sm font-medium text-white">Mon Nom</div>
            <div className="truncate text-[11px] text-sidebar-foreground/55">Director of Revenue</div>
          </div>
        </div>
      </div>
    </div>
  )
}
