"use client"

import { useState } from "react"
import { Search, Bell, ChevronDown, Menu, Calendar } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { property } from "@/lib/data"

export function Topbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-md md:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={<Button variant="ghost" size="icon" className="lg:hidden" />}
        >
          <Menu className="size-5" />
          <span className="sr-only">Open navigation</span>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 border-sidebar-border p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <button className="hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary sm:flex">
        <span className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-[11px] font-bold text-primary">
          RP
        </span>
        <span className="max-w-[160px] truncate">{property.name}</span>
        <ChevronDown className="size-4 text-muted-foreground" />
      </button>

      <div className="relative hidden flex-1 md:block md:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search rooms, rates, reports..."
          className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" className="hidden h-9 gap-2 bg-transparent sm:flex">
          <Calendar className="size-4" />
          <span className="text-sm">Jun 2025</span>
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-card" />
          <span className="sr-only">Notifications</span>
        </Button>
        <div className="flex size-9 items-center justify-center rounded-full bg-sidebar text-xs font-semibold text-white">
          D
        </div>
      </div>
    </header>
  )
}
