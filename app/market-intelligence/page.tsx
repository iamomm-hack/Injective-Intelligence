"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { 
  BarChart3, 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  ArrowUpRight, 
  ShieldAlert, 
  Clock, 
  Gauge 
} from "lucide-react"

interface FeedItem {
  id: string
  timestamp: string
  address: string
  archetype: string
  asset: string
  action: string
  leverage: number
  pnlUsd?: number
  metric: string
  type: "positive" | "negative" | "neutral"
}

const INITIAL_FEED: FeedItem[] = [
  {
    id: "f-1",
    timestamp: new Date(Date.now() - 40000).toISOString(),
    address: "inj1swingsniper00000000000000000000sniper",
    archetype: "Swing Sniper",
    asset: "INJ",
    action: "Accumulated $18,400 INJ at key horizontal support $21.50",
    leverage: 1,
    metric: "Patience Score: 94%",
    type: "positive"
  },
  {
    id: "f-2",
    timestamp: new Date(Date.now() - 90000).toISOString(),
    address: "inj1volatilitysurfer0000000000000000surfer",
    archetype: "Volatility Surfer",
    asset: "TALIS",
    action: "Opened 12x Leverage SHORT position on Talis breakout failure",
    leverage: 12,
    metric: "FOMO Factor: 75%",
    type: "neutral"
  },
  {
    id: "f-3",
    timestamp: new Date(Date.now() - 150000).toISOString(),
    address: "inj1hlxpredator000000000000000000000pred",
    archetype: "Momentum Predator",
    asset: "HLX",
    action: "Closed LONG position on Helix with +$4,200 net return",
    leverage: 8,
    pnlUsd: 4200,
    metric: "Loss Recovery: 88%",
    type: "positive"
  },
  {
    id: "f-4",
    timestamp: new Date(Date.now() - 240000).toISOString(),
    address: "inj1mitohunter0000000000000000000000hunter",
    archetype: "Conviction Hunter",
    asset: "MITO",
    action: "Increased Mito Vault exposure by $35,000",
    leverage: 1,
    metric: "Conviction Score: 98%",
    type: "positive"
  },
  {
    id: "f-5",
    timestamp: new Date(Date.now() - 320000).toISOString(),
    address: "inj1dojoswapper00000000000000000000swapper",
    archetype: "Liquidity Farmer",
    asset: "DOJO",
    action: "Deposited $50,000 into DOJO/INJ liquidity pools",
    leverage: 1,
    metric: "Risk Discipline: 99%",
    type: "positive"
  }
]

export default function MarketIntelligencePage() {
  const router = useRouter()
  const [feed, setFeed] = useState<FeedItem[]>(INITIAL_FEED)
  const [fearGreedIndex, setFearGreedIndex] = useState(68)
  const [avgLeverage, setAvgLeverage] = useState(4.8)

  useEffect(() => {
    // Dynamic generation of feed items
    const interval = setInterval(() => {
      const assets = ["INJ", "HLX", "BLACK", "MITO", "DOJO", "TALIS"]
      const archetypes = ["Momentum Predator", "Swing Sniper", "Volatility Surfer", "Conviction Hunter", "Liquidity Farmer"]
      
      const firstNames = ["alpha", "whale", "sniper", "hunter", "farmer", "surfer", "predator", "swapper", "holder"]
      const randName = firstNames[Math.floor(Math.random() * firstNames.length)]
      const mockAddr = `inj1${randName}${Math.floor(Math.random() * 1000000000)}00000000000`
      
      const archetype = archetypes[Math.floor(Math.random() * archetypes.length)]
      const asset = assets[Math.floor(Math.random() * assets.length)]
      
      let action = ""
      let leverage = 1
      let metric = ""
      let type: "positive" | "negative" | "neutral" = "neutral"
      let pnlUsd: number | undefined = undefined

      if (archetype === "Momentum Predator") {
        leverage = Math.floor(Math.random() * 10) + 5
        action = `Opened ${leverage}x Leverage LONG on ${asset} following volume spike`
        metric = `FOMO Probability: ${Math.floor(Math.random() * 25) + 65}%`
        type = "neutral"
      } else if (archetype === "Swing Sniper") {
        leverage = Math.floor(Math.random() * 3) + 1
        pnlUsd = Math.floor(Math.random() * 5000) + 800
        action = `Closed profitable ${asset} trade with +$${pnlUsd.toLocaleString()} gain`
        metric = `Loss Recovery: ${Math.floor(Math.random() * 15) + 80}%`
        type = "positive"
      } else if (archetype === "Volatility Surfer") {
        leverage = Math.floor(Math.random() * 12) + 8
        const isLoss = Math.random() > 0.6
        if (isLoss) {
          pnlUsd = -Math.floor(Math.random() * 3000) - 500
          action = `Liquidated on high-leverage ${asset} position`
          metric = `Risk Discipline: ${Math.floor(Math.random() * 20) + 20}%`
          type = "negative"
        } else {
          pnlUsd = Math.floor(Math.random() * 8000) + 1500
          action = `Successfully closed high-leverage ${asset} position with +$${pnlUsd.toLocaleString()}`
          metric = `Emotional Stability: ${Math.floor(Math.random() * 30) + 40}%`
          type = "positive"
        }
      } else {
        action = `Re-balanced portfolio weights, scaling allocation in ${asset}`
        metric = `Conviction Rating: ${Math.floor(Math.random() * 15) + 80}%`
        type = "positive"
      }

      const newItem: FeedItem = {
        id: `f-${Date.now()}`,
        timestamp: new Date().toISOString(),
        address: mockAddr,
        archetype,
        asset,
        action,
        leverage,
        pnlUsd,
        metric,
        type
      }

      setFeed(prev => [newItem, ...prev.slice(0, 19)])
      
      // Slightly fluctuate index stats
      setFearGreedIndex(prev => {
        const delta = Math.floor(Math.random() * 5) - 2
        return Math.max(30, Math.min(95, prev + delta))
      })
      setAvgLeverage(prev => {
        const delta = Number((Math.random() * 0.4 - 0.2).toFixed(1))
        return Math.max(1, Math.min(15, prev + delta))
      })

    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-background bg-grid-pattern relative text-foreground flex flex-col">
      <Header />

      <div className="flex-grow max-w-7xl mx-auto px-4 md:px-6 py-6 w-full space-y-8 relative z-10">
        
        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-medium uppercase tracking-wider mb-2">
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            Live Network Profiling Feed
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase glow-text">
            Market Intelligence Feed
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Real-time cognitive evaluation metrics mapping. Inspect transactions, leverage, and trader archetypes flowing on the Injective network indexers.
          </p>
        </div>

        {/* Global Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#050706]/75 border border-white/5 rounded-xl p-4 flex flex-col justify-between h-28 transition-all duration-300 hover:scale-[1.03] hover:border-primary/30 hover:shadow-[0_0_20px_rgba(120,252,214,0.08)]">
            <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-primary" /> Psychological Index
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-foreground">{fearGreedIndex}</span>
              <span className="text-zinc-500 font-mono text-xs">
                {fearGreedIndex > 75 ? "EUPHORIC" : fearGreedIndex > 55 ? "OPTIMISTIC" : "CONSERVATIVE"}
              </span>
            </div>
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${fearGreedIndex}%` }} />
            </div>
          </div>

          <div className="bg-[#050706]/75 border border-white/5 rounded-xl p-4 flex flex-col justify-between h-28 transition-all duration-300 hover:scale-[1.03] hover:border-primary/30 hover:shadow-[0_0_20px_rgba(120,252,214,0.08)]">
            <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide">Network Avg Leverage</span>
            <span className="text-3xl font-extrabold text-foreground">{avgLeverage.toFixed(1)}x</span>
            <span className="text-2xs text-zinc-500 font-mono">Spot accounts dominate</span>
          </div>

          <div className="bg-[#050706]/75 border border-white/5 rounded-xl p-4 flex flex-col justify-between h-28 transition-all duration-300 hover:scale-[1.03] hover:border-primary/30 hover:shadow-[0_0_20px_rgba(120,252,214,0.08)]">
            <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide">Most Active Profile</span>
            <span className="text-lg font-bold text-primary uppercase">Volatility Surfer</span>
            <span className="text-2xs text-zinc-500 font-mono">Due to Talis listings</span>
          </div>

          <div className="bg-[#050706]/75 border border-white/5 rounded-xl p-4 flex flex-col justify-between h-28 transition-all duration-300 hover:scale-[1.03] hover:border-primary/30 hover:shadow-[0_0_20px_rgba(120,252,214,0.08)]">
            <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide">Average Accuracy</span>
            <span className="text-3xl font-extrabold text-foreground">62.8%</span>
            <span className="text-2xs text-zinc-500 font-mono">Profitable margin exits</span>
          </div>
        </div>

        {/* Live Logs Section */}
        <div className="w-full bg-[#050706]/85 border border-primary/20 backdrop-blur-md rounded-2xl p-6 shadow-[0_0_30px_rgba(120,252,214,0.05)]">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 font-mono">Live Behavioral Logs</h3>
            </div>
            <span className="text-2xs text-zinc-500 font-mono">UPDATING AUTOMATICALLY VIA RPC INDEXERS</span>
          </div>

          <div className="divide-y divide-white/5 space-y-4">
            {feed.map((item) => (
              <div 
                key={item.id}
                className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs transition-all duration-500 animate-in fade-in slide-in-from-top-2"
              >
                
                {/* Left: Time and Archetype Badge */}
                <div className="flex items-start gap-3">
                  <span className="text-zinc-600 mt-1 text-2xs whitespace-nowrap">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-300 font-semibold truncate max-w-[140px] sm:max-w-none select-all">
                        {item.address}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary text-3xs font-semibold uppercase tracking-wider">
                        {item.archetype}
                      </span>
                    </div>
                    
                    <p className="text-zinc-400 text-2xs leading-normal">
                      {item.action}
                    </p>
                  </div>
                </div>

                {/* Right: Metrics & Analysis triggers */}
                <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-white/5 pt-2 sm:pt-0 sm:border-none">
                  
                  {/* Performance Indicators */}
                  <div className="text-right">
                    <span className="text-zinc-500 text-3xs block uppercase">INDEXER CLASSIFIER</span>
                    <span className={`text-2xs font-bold ${
                      item.type === "positive" ? "text-emerald-400" : item.type === "negative" ? "text-rose-400" : "text-zinc-400"
                    }`}>
                      {item.metric}
                    </span>
                  </div>

                  <button
                    onClick={() => router.push(`/analyze?address=${item.address}`)}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#0a0d0c] hover:bg-primary hover:text-primary-foreground border border-white/10 hover:border-transparent text-foreground text-3xs font-bold transition-all"
                  >
                    INSPECT
                    <ArrowUpRight className="h-3 w-3" />
                  </button>

                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      <FooterSection />
    </main>
  )
}
