'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  TrendingUp, 
  DollarSign, 
  BarChart, 
  Users, 
  Building, 
  Calendar, 
  FileText, 
  Sparkles, 
  CreditCard, 
  Settings,
  Plane
} from 'lucide-react'

const Nav = [
  { 
    group: 'Overview', 
    items: [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard }
    ] 
  },
  {
    group: 'Optimize',
    items: [
      { name: 'Revenue Management', href: '/revenue', icon: TrendingUp },
      { name: 'Pricing Engine', href: '/pricing', icon: DollarSign },
      { name: 'Demand Forecasting', href: '/forecast', icon: BarChart },
      { name: 'Competitor Intelligence', href: '/competitors', icon: Users },
    ],
  },
  {
    group: 'Operate',
    items: [
      { name: 'Hotels', href: '/hotels', icon: Building },
      { name: 'Reservations', href: '/reservations', icon: Calendar },
      { name: 'Reports', href: '/reports', icon: FileText },
      { name: 'AI Insights', href: '/insights', icon: Sparkles },
    ],
  },
  {
    group: 'Account',
    items: [
      { name: 'Billing', href: '/billing', icon: CreditCard },
      { name: 'Settings', href: '/settings', icon: Settings },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  
  return (
    <div className="w-64 border-r border-slate-800 bg-[#1e293b] text-white flex flex-col h-screen">
      {/* En-tête du menu */}
      <div className="p-4 flex items-center gap-3 mb-2">
        <div className="bg-blue-600 p-1.5 rounded-lg flex-shrink-0">
          <Plane className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-sm font-bold leading-none">Mon Hôtel</div>
          <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">Revenue Intelligence</div>
        </div>
      </div>

      {/* Liens de navigation */}
      <div className="flex-1 overflow-y-auto px-3 scrollbar-hide">
        {Nav.map((section) => (
          <div key={section.group} className="mb-6">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2">
              {section.group}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className={cn(
                    "flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors text-slate-300 hover:text-white hover:bg-slate-800", 
                    pathname === item.href && "bg-slate-800 text-white"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Profil en bas */}
      <div className="p-4 border-t border-slate-800 mt-auto bg-[#1e293b]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium flex-shrink-0">
            N
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium leading-none mb-1 truncate">Administrateur</span>
            <span className="text-[11px] text-slate-400 leading-none truncate">Director of Revenue</span>
          </div>
        </div>
      </div>
    </div>
  )
}