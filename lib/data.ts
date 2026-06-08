// Centralized realistic hotel-industry mock data for RevPilot AI

export type Trend = "up" | "down" | "flat"

export const property = {
  name: "RevPilot",
  location: "San Francisco, CA",
  rooms: 248,
  type: "Luxury Collection",
}

export const kpis = {
  revenueToday: 142680,
  revenueTodayDelta: 8.4,
  revenueMonth: 3_812_440,
  revenueMonthDelta: 12.1,
  revpar: 318.42,
  revparDelta: 6.2,
  adr: 412.55,
  adrDelta: 3.8,
  occupancy: 77.2,
  occupancyDelta: 4.1,
  forecastAccuracy: 94.6,
  forecastAccuracyDelta: 1.3,
  revenueGrowth: 18.7,
  revenueGrowthDelta: 2.4,
  aiRecommendations: 14,
  aiRecommendationsDelta: 5,
}

// 30-day revenue trend (actual vs forecast)
export const revenueTrend = Array.from({ length: 30 }, (_, i) => {
  const base = 110000 + Math.sin(i / 3) * 22000 + i * 950
  const weekend = i % 7 === 5 || i % 7 === 6 ? 28000 : 0
  const actual = Math.round(base + weekend + (i % 3) * 4200)
  const forecast = Math.round(actual * (0.96 + (i % 4) * 0.015))
  const d = new Date(2025, 5, 1)
  d.setDate(d.getDate() + i)
  return {
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    actual,
    forecast,
  }
})

// Occupancy forecast next 14 days
export const occupancyForecast = Array.from({ length: 14 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i)
  const weekend = d.getDay() === 5 || d.getDay() === 6
  const occ = Math.min(99, Math.round((weekend ? 88 : 72) + Math.sin(i / 2) * 8 + (i % 3) * 2))
  return {
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    occupancy: occ,
    capacity: 100,
  }
})

// Booking pace — bookings on the books vs same time last year
export const bookingPace = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(2025, i, 1)
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }),
    thisYear: Math.round(2200 + Math.sin(i / 2) * 600 + i * 70),
    lastYear: Math.round(2000 + Math.sin(i / 2) * 520 + i * 45),
  }
})

// Dynamic pricing history (ADR over time, manual vs AI)
export const pricingHistory = Array.from({ length: 24 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() - (24 - i))
  return {
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    ai: Math.round(380 + Math.sin(i / 3) * 55 + i * 2.5),
    market: Math.round(360 + Math.sin(i / 3 + 1) * 48 + i * 1.8),
  }
})

// Market demand score radar
export const marketDemand = [
  { factor: "Events", score: 88 },
  { factor: "Search", score: 74 },
  { factor: "Flights", score: 81 },
  { factor: "Weather", score: 63 },
  { factor: "Seasonality", score: 92 },
  { factor: "Competitor", score: 70 },
]

export const aiRecommendations = [
  {
    id: 1,
    priority: "high" as const,
    title: "Increase Deluxe Room rate by 12%",
    detail: "High weekend demand detected for the next 3 days. Projected +$18,400 revenue.",
    impact: "+$18,400",
    confidence: 96,
    room: "Deluxe King",
  },
  {
    id: 2,
    priority: "high" as const,
    title: "Competitor prices increased 15%",
    detail: "4 of 6 tracked competitors raised rates in the last 24 hours. Reprice to capture demand.",
    impact: "+$9,200",
    confidence: 91,
    room: "All categories",
  },
  {
    id: 3,
    priority: "medium" as const,
    title: "Apply 2-night minimum stay",
    detail: "Tech conference Jun 18–20 driving compression. Protect peak-night yield.",
    impact: "+$6,750",
    confidence: 88,
    room: "Suites",
  },
  {
    id: 4,
    priority: "medium" as const,
    title: "Reduce midweek Standard rate 5%",
    detail: "Soft demand Tue–Wed. Stimulate occupancy without eroding weekend ADR.",
    impact: "+$3,100",
    confidence: 82,
    room: "Standard Queen",
  },
  {
    id: 5,
    priority: "low" as const,
    title: "Open Booking.com allotment",
    detail: "OTA mix below target. Release 12 rooms to balance channel distribution.",
    impact: "+$2,400",
    confidence: 79,
    room: "Standard Queen",
  },
]

// Revenue Management — inventory by date
export const inventoryRows = Array.from({ length: 14 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i)
  const weekend = d.getDay() === 5 || d.getDay() === 6
  const occ = Math.min(99, Math.round((weekend ? 90 : 71) + Math.sin(i) * 6))
  const current = Math.round((weekend ? 440 : 380) + Math.sin(i / 2) * 20)
  const recommended = Math.round(current * (weekend ? 1.11 : occ > 80 ? 1.06 : 0.97))
  const diff = recommended - current
  const impact = Math.round((diff / current) * occ * 248 * 0.4)
  return {
    date: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    occupancy: occ,
    current,
    recommended,
    impact,
    confidence: Math.round(80 + Math.sin(i) * 8 + 8),
  }
})

// Pricing calendar — 35 days
export const pricingCalendar = Array.from({ length: 35 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() - d.getDay() + i)
  const weekend = d.getDay() === 5 || d.getDay() === 6
  const price = Math.round((weekend ? 449 : 379) + Math.sin(i / 3) * 30)
  const demand = weekend ? "high" : i % 5 === 0 ? "low" : "med"
  const event = i === 11 || i === 12 ? "Tech Summit" : i === 25 ? "Marathon" : null
  return {
    date: new Date(d),
    price,
    demand: demand as "high" | "med" | "low",
    event,
    auto: i % 7 !== 3,
  }
})

export const priceRules = [
  { id: 1, name: "Weekend Premium", type: "Seasonal", condition: "Fri–Sun", action: "+12% base rate", active: true },
  { id: 2, name: "Last-Minute Discount", type: "Dynamic", condition: "< 48h to arrival & occ < 60%", action: "−8%", active: true },
  { id: 3, name: "Tech Summit Event", type: "Event", condition: "Jun 18–20", action: "+25% & 2-night min", active: true },
  { id: 4, name: "Holiday Floor", type: "Seasonal", condition: "Major holidays", action: "Min rate $499", active: true },
  { id: 5, name: "Midweek Stimulus", type: "Dynamic", condition: "Tue–Wed & occ < 55%", action: "−6%", active: false },
  { id: 6, name: "Long-Stay Discount", type: "Length of stay", condition: "≥ 5 nights", action: "−10%", active: true },
]

// Demand forecasting
export const forecastPeriods = {
  "7d": {
    occupancy: 81.4,
    revenue: 1_042_300,
    adr: 421.8,
    revpar: 343.3,
    label: "Next 7 Days",
  },
  "30d": {
    occupancy: 78.9,
    revenue: 4_120_700,
    adr: 408.2,
    revpar: 322.1,
    label: "Next 30 Days",
  },
  "90d": {
    occupancy: 74.6,
    revenue: 11_980_400,
    adr: 396.5,
    revpar: 295.8,
    label: "Next 90 Days",
  },
}

export const forecastSeries = {
  "7d": Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    const weekend = d.getDay() === 5 || d.getDay() === 6
    return {
      date: d.toLocaleDateString("en-US", { weekday: "short" }),
      occupancy: Math.min(98, Math.round((weekend ? 90 : 75) + Math.sin(i) * 5)),
      revenue: Math.round((weekend ? 168000 : 132000) + Math.sin(i) * 12000),
    }
  }),
  "30d": occupancyForecast.concat(
    Array.from({ length: 16 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() + 14 + i)
      return {
        date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        occupancy: Math.min(98, Math.round(76 + Math.sin((14 + i) / 2) * 9)),
        capacity: 100,
      }
    }),
  ).map((r) => ({ date: r.date, occupancy: r.occupancy, revenue: Math.round(r.occupancy * 1350) })),
  "90d": Array.from({ length: 13 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i * 7)
    return {
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      occupancy: Math.max(58, Math.round(80 - i * 1.5 + Math.sin(i) * 6)),
      revenue: Math.round((900000 - i * 12000 + Math.sin(i) * 60000)),
    }
  }),
}

export const demandAlerts = [
  { type: "high" as const, date: "Jun 18–20", title: "Tech Summit 2025", detail: "Compression expected, 4 hotels sold out. Raise rates 20–28%.", lift: "+34% demand" },
  { type: "high" as const, date: "Jul 4–6", title: "Independence Day weekend", detail: "Leisure surge. Recommend 2-night minimum.", lift: "+22% demand" },
  { type: "low" as const, date: "Jun 24–26", title: "Midweek soft patch", detail: "No major demand drivers. Consider promotional rate.", lift: "−18% demand" },
  { type: "high" as const, date: "Aug 9–11", title: "Music Festival", detail: "City-wide event. Early booking pace strong.", lift: "+41% demand" },
]

export const competitors = [
  { name: "The Fairmont Sky", price: 489, change: 6.2, occ: 84, position: "Premium", rating: 4.7, distance: 0.4 },
  { name: "Grandview Hotel & Spa", price: 432, change: -2.1, occ: 79, position: "Direct comp", rating: 4.5, distance: 0.7 },
  { name: "Hotel Vespera", price: 458, change: 15.3, occ: 91, position: "Premium", rating: 4.6, distance: 1.1 },
  { name: "The Continental", price: 398, change: 3.4, occ: 72, position: "Direct comp", rating: 4.3, distance: 0.9 },
  { name: "Azure Bay Resort", price: 376, change: -4.8, occ: 68, position: "Value", rating: 4.2, distance: 1.6 },
  { name: "Meridian Suites", price: 521, change: 9.1, occ: 88, position: "Luxury", rating: 4.8, distance: 2.0 },
]

export const competitorTrend = Array.from({ length: 14 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() - (14 - i))
  return {
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    you: Math.round(412 + Math.sin(i / 3) * 25 + i),
    market: Math.round(440 + Math.sin(i / 3 + 1) * 30 + i * 1.2),
  }
})

export const aiInsights = [
  {
    id: 1,
    category: "Revenue Opportunity",
    tone: "positive" as const,
    title: "Untapped suite premium during Tech Summit",
    body: "Your suites are priced 18% below the comp set for Jun 18–20. Demand modeling shows you can raise Junior Suite rates to $749 with 93% sell-through probability.",
    action: "Apply +18% suite rate",
    value: "+$24,600",
  },
  {
    id: 2,
    category: "Pricing Anomaly",
    tone: "warning" as const,
    title: "Standard Queen underpriced vs. demand",
    body: "Booking pace for Standard Queen is 31% ahead of pace, yet rates are flat. This indicates pricing is leaving money on the table for the next 9 days.",
    action: "Enable dynamic uplift",
    value: "+$11,900",
  },
  {
    id: 3,
    category: "Forecast Change",
    tone: "neutral" as const,
    title: "30-day occupancy forecast revised +3.2pts",
    body: "Increased flight search volume to SFO and two newly announced conferences pushed the forecast from 75.7% to 78.9%.",
    action: "Review updated forecast",
    value: "94.6% accuracy",
  },
  {
    id: 4,
    category: "Event Impact",
    tone: "positive" as const,
    title: "Music Festival Aug 9–11 will drive compression",
    body: "Citywide event historically lifts ADR 38–45%. Early pace is strong. Recommend opening higher rate tiers and a 3-night minimum on peak.",
    action: "Set event pricing rule",
    value: "+$58,000",
  },
  {
    id: 5,
    category: "Pricing Action",
    tone: "warning" as const,
    title: "Competitor Hotel Vespera raised rates 15.3%",
    body: "Your closest premium competitor moved aggressively. Maintaining current rates risks signaling lower quality. Recommend a measured +9% adjustment.",
    action: "Match market move",
    value: "+$9,200",
  },
]

export const chatSuggestions = [
  "What's driving the revenue increase this month?",
  "Should I raise rates for the weekend?",
  "Summarize competitor activity in the last 24h",
  "Forecast occupancy for the Tech Summit",
]

export const hotels = [
  { id: 1, name: "RevPilot", location: "San Francisco, CA", rooms: 248, occupancy: 77.2, revenue: 3_812_440, status: "active" as const, adr: 412 },
  { id: 2, name: "RevPilot", location: "Seattle, WA", rooms: 186, occupancy: 71.5, revenue: 2_104_900, status: "active" as const, adr: 348 },
  { id: 3, name: "RevPilot", location: "Aspen, CO", rooms: 92, occupancy: 88.1, revenue: 2_890_300, status: "active" as const, adr: 689 },
  { id: 4, name: "RevPilot", location: "New York, NY", rooms: 312, occupancy: 82.4, revenue: 5_640_100, status: "active" as const, adr: 521 },
  { id: 5, name: "RevPilot", location: "Los Angeles, CA", rooms: 204, occupancy: 69.8, revenue: 2_330_700, status: "active" as const, adr: 389 },
  { id: 6, name: "RevPilot", location: "Miami, FL", rooms: 158, occupancy: 0, revenue: 0, status: "onboarding" as const, adr: 0 },
]

export const reservations = [
  { id: "RSV-48201", guest: "Eleanor Whitfield", room: "Deluxe King", checkIn: "Jun 14", checkOut: "Jun 17", nights: 3, rate: 442, total: 1326, channel: "Direct", status: "confirmed" as const },
  { id: "RSV-48202", guest: "Marcus Chen", room: "Junior Suite", checkIn: "Jun 14", checkOut: "Jun 16", nights: 2, rate: 689, total: 1378, channel: "Booking.com", status: "confirmed" as const },
  { id: "RSV-48203", guest: "Sofia Marquez", room: "Standard Queen", checkIn: "Jun 15", checkOut: "Jun 18", nights: 3, rate: 379, total: 1137, channel: "Expedia", status: "pending" as const },
  { id: "RSV-48204", guest: "James Okafor", room: "Executive Suite", checkIn: "Jun 15", checkOut: "Jun 20", nights: 5, rate: 812, total: 4060, channel: "Direct", status: "confirmed" as const },
  { id: "RSV-48205", guest: "Priya Anand", room: "Deluxe King", checkIn: "Jun 16", checkOut: "Jun 17", nights: 1, rate: 458, total: 458, channel: "Direct", status: "checked-in" as const },
  { id: "RSV-48206", guest: "Liam O'Connor", room: "Standard Queen", checkIn: "Jun 16", checkOut: "Jun 19", nights: 3, rate: 389, total: 1167, channel: "Hotels.com", status: "confirmed" as const },
  { id: "RSV-48207", guest: "Yuki Tanaka", room: "Junior Suite", checkIn: "Jun 17", checkOut: "Jun 21", nights: 4, rate: 712, total: 2848, channel: "Booking.com", status: "confirmed" as const },
  { id: "RSV-48208", guest: "Amara Diallo", room: "Standard Queen", checkIn: "Jun 17", checkOut: "Jun 18", nights: 1, rate: 365, total: 365, channel: "Expedia", status: "cancelled" as const },
]

export const reports = [
  { id: 1, name: "Revenue Performance — May 2025", type: "Revenue", period: "Monthly", generated: "Jun 1, 2025", size: "2.4 MB", format: "PDF" },
  { id: 2, name: "Occupancy Trends — Q2 2025", type: "Occupancy", period: "Quarterly", generated: "Jun 5, 2025", size: "1.8 MB", format: "PDF" },
  { id: 3, name: "Forecast Accuracy Report", type: "Forecast", period: "Monthly", generated: "Jun 1, 2025", size: "980 KB", format: "XLSX" },
  { id: 4, name: "Competitor Analysis — Weekly", type: "Competitor", period: "Weekly", generated: "Jun 9, 2025", size: "1.2 MB", format: "PDF" },
  { id: 5, name: "Monthly Summary — May 2025", type: "Summary", period: "Monthly", generated: "Jun 1, 2025", size: "3.1 MB", format: "PDF" },
  { id: 6, name: "Channel Production Report", type: "Revenue", period: "Monthly", generated: "Jun 1, 2025", size: "1.5 MB", format: "XLSX" },
]

export const roomTypes = [
  { name: "Standard Queen", count: 96, rate: 379 },
  { name: "Deluxe King", count: 84, rate: 442 },
  { name: "Junior Suite", count: 38, rate: 689 },
  { name: "Executive Suite", count: 22, rate: 812 },
  { name: "Penthouse", count: 8, rate: 1840 },
]

export const billingPlans = [
  {
    name: "Starter",
    price: 499,
    tagline: "For independent hotels getting started with revenue management.",
    features: ["1 property", "Up to 100 rooms", "Dynamic pricing", "7-day forecasting", "Email support"],
    cta: "Current plan",
    current: false,
  },
  {
    name: "Professional",
    price: 1299,
    tagline: "For growing groups that need forecasting and competitor intel.",
    features: ["Up to 5 properties", "Unlimited rooms", "90-day forecasting", "Competitor intelligence", "AI insights", "Priority support"],
    cta: "Current plan",
    current: true,
  },
  {
    name: "Enterprise",
    price: null,
    tagline: "For portfolios that demand custom models and dedicated support.",
    features: ["Unlimited properties", "Custom AI models", "API access & integrations", "Dedicated success manager", "SSO & advanced security", "99.9% SLA"],
    cta: "Contact sales",
    current: false,
  },
]

export const invoices = [
  { id: "INV-2025-006", date: "Jun 1, 2025", amount: 1299, status: "paid" as const, plan: "Professional" },
  { id: "INV-2025-005", date: "May 1, 2025", amount: 1299, status: "paid" as const, plan: "Professional" },
  { id: "INV-2025-004", date: "Apr 1, 2025", amount: 1299, status: "paid" as const, plan: "Professional" },
  { id: "INV-2025-003", date: "Mar 1, 2025", amount: 499, status: "paid" as const, plan: "Starter" },
]

export function formatCurrency(n: number, opts?: { compact?: boolean }) {
  if (opts?.compact && Math.abs(n) >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(n)
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}
