'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, TrendingUp, DollarSign, BarChart, Users } from 'lucide-react'

const Nav = [
  { group: 'Overview', items: [{ name: 'Dashboard', href: '/', icon: LayoutDashboard }] },
  {
    group: 'Optimize',
    items: [
      { name: 'Revenue Management', href: '/revenue', icon: TrendingUp },
      { name: 'Pricing Engine', href: '/pricing', icon: DollarSign },
      { name: 'Demand Forecast', href: '/forecast', icon: BarChart },
      { name: 'Competitor Intelligence', href: '/competitors', icon: Users },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <div className="w-64 border-r bg-slate-900 text-white p-4">
      <div className="text-xl font-bold mb-8">Mon Hôtel</div>
      {Nav.map((section) => (
        <div key={section.group} className="mb-6">
          <div className="text-xs uppercase text-slate-400 mb-2">{section.group}</div>
          {section.items.map((item) => (
            <Link key={item.name} href={item.href} className={cn("flex items-center gap-2 p-2 rounded hover:bg-slate-800", pathname === item.href && "bg-slate-800")}>
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}