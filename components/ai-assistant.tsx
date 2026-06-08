"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Send, User } from "lucide-react"
import { chatSuggestions } from "@/lib/data"
import { cn } from "@/lib/utils"

type Msg = { role: "user" | "ai"; text: string }

const cannedAnswer =
  "Based on the last 30 days, your revenue growth is driven primarily by a 6.2% RevPAR lift from dynamic weekend pricing and stronger booking pace (+31% vs. last year) for Standard Queen rooms. The upcoming Tech Summit (Jun 18–20) is the single biggest near-term opportunity — I recommend raising suite rates 18% and applying a 2-night minimum to capture an estimated +$24,600."

export function AiAssistant() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hi Mon Nom — I'm your RevPilot AI analyst. Ask me anything about your revenue, demand, pricing or competitors.",
    },
  ])
  const [input, setInput] = useState("")

  function send(text: string) {
    if (!text.trim()) return
    setMessages((m) => [...m, { role: "user", text }, { role: "ai", text: cannedAnswer }])
    setInput("")
  }

  return (
    <Card className="flex h-[560px] flex-col">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2 text-base">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          AI Revenue Analyst
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 overflow-y-auto py-4">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}>
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full",
                m.role === "ai" ? "bg-primary/10 text-primary" : "bg-sidebar text-white",
              )}
            >
              {m.role === "ai" ? <Sparkles className="size-4" /> : <User className="size-4" />}
            </span>
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                m.role === "ai" ? "rounded-tl-sm bg-secondary text-foreground" : "rounded-tr-sm bg-primary text-primary-foreground",
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
      </CardContent>
      <div className="border-t border-border p-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {chatSuggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about revenue, demand, pricing..."
            className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
          />
          <Button type="submit" size="icon" className="size-10 shrink-0">
            <Send className="size-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </Card>
  )
}
