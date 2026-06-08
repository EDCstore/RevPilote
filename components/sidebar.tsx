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
    <div className="w-64 border-r bg-slate-900 text-white p-4 h-screen">
      <div className="text-xl font-bold mb-8 px-2">Mon Hôtel</div>
      {Nav.map((section) => (
        <div key={section.group} className="mb-6">
          <div className="text-xs uppercase text-slate-400 mb-2 px-2">{section.group}</div>
          {section.items.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={cn(
                "flex items-center gap-3 p-2 rounded hover:bg-slate-800 transition-colors", 
                pathname === item.href && "bg-slate-800 text-white"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}