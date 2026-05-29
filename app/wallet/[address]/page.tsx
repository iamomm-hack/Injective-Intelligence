"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { generateBehaviorProfile, BehaviorProfile, Trade } from "@/lib/engine"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Copy, 
  Share2, 
  ShieldAlert, 
  Zap, 
  Award, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  Users, 
  Sparkles,
  CheckCircle,
  HelpCircle,
  Play,
  RotateCcw,
  Download
} from "lucide-react"
import { downloadCardAsImage } from "@/lib/card-downloader"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export default function WalletDashboardPage() {
  const params = useParams()
  const router = useRouter()
  const address = params.address as string
  
  const [profile, setProfile] = useState<BehaviorProfile | null>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "cognitive" | "trades" | "similar" | "forecast">("overview")
  const [copied, setCopied] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  // Simulation state
  const [simLeverage, setSimLeverage] = useState(3)
  const [simHoldingTime, setSimHoldingTime] = useState(48)
  const [simPnLBoost, setSimPnLBoost] = useState<number | null>(null)

  useEffect(() => {
    if (address) {
      let isMounted = true
      fetch(`/api/wallet/${address}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load profile")
          return res.json()
        })
        .then((generated) => {
          if (isMounted) {
            setProfile(generated)
            localStorage.setItem("last_analyzed_address", address)
          }
        })
        .catch((err) => {
          console.error(err)
        })
      return () => {
        isMounted = false
      }
    }
  }, [address])

  if (!profile) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 rounded-full border border-primary/20 border-t-primary animate-spin" />
          <p className="text-sm text-zinc-500">DECRYPTING BEHAVIOR DNA...</p>
        </div>
      </main>
    )
  }

  // Calculate cumulative PnL for chart
  const pnlChartData = [...profile.trades]
    .reverse()
    .reduce((acc: any[], trade, idx) => {
      const prevPnL = idx > 0 ? acc[idx - 1].cumulativePnL : 0
      acc.push({
        name: `Trade #${idx + 1}`,
        asset: trade.asset,
        pnl: trade.pnlUsd,
        cumulativePnL: prevPnL + trade.pnlUsd,
      })
      return acc
    }, [])

  const copyAddress = () => {
    navigator.clipboard.writeText(profile.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}/wallet/${profile.address}/share`
    navigator.clipboard.writeText(shareUrl)
    setShareCopied(true)
    setTimeout(() => setShareCopied(false), 2000)
  }

  const handleSimulate = () => {
    // Determine simulation returns
    let boost = 0
    if (profile.archetype === "Volatility Surfer" || profile.archetype === "Momentum Predator") {
      if (simLeverage < 8) {
        boost += 22 // Reducing leverage improves net return
      } else {
        boost -= 12 // Increasing leverage decreases score
      }
    } else {
      if (simLeverage > 5) {
        boost -= 18 // High leverage on swing sniper adds risk
      } else {
        boost += 8
      }
    }

    if (simHoldingTime > 24 && profile.archetype === "Swing Sniper") {
      boost += 14 // Higher patience improves results
    }

    setSimPnLBoost(Math.round(profile.stats.netPnLUsd * (1 + boost / 100)))
  }

  const resetSimulation = () => {
    setSimPnLBoost(null)
    setSimLeverage(3)
    setSimHoldingTime(48)
  }

  return (
    <main className="min-h-screen bg-background bg-grid-pattern relative text-foreground flex flex-col">
      <Header />

      <div className="flex-grow max-w-7xl mx-auto px-4 md:px-6 py-6 w-full space-y-6 relative z-10">
        
        {profile.isSimulated ? (
          <div className="w-full bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono shadow-[0_0_20px_rgba(234,179,8,0.05)]">
            <div className="flex items-start sm:items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse mt-1.5 sm:mt-0" />
              <div className="space-y-0.5">
                <p className="text-yellow-400 text-xs font-semibold uppercase tracking-wider">Demo / Simulation Mode Fallback</p>
                <p className="text-zinc-400 text-2xs leading-relaxed">
                  Empty wallet detected. Displaying an address-seeded trader profile simulation to demonstrate dashboard functionality.
                </p>
              </div>
            </div>
            <Button 
              onClick={() => {
                const headerBtn = document.querySelector('header button') as HTMLButtonElement
                if (headerBtn && headerBtn.textContent?.includes("Connect Wallet")) {
                  headerBtn.click()
                }
              }}
              className="text-primary hover:text-primary-foreground hover:bg-primary/20 bg-transparent border border-primary/30 rounded-full px-4 py-1.5 text-2xs font-semibold uppercase transition-all shrink-0 h-auto self-start sm:self-center"
            >
              Connect Real Wallet →
            </Button>
          </div>
        ) : (
          <div className="w-full bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-center gap-3 font-mono shadow-[0_0_20px_rgba(120,252,214,0.05)]">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            <div className="space-y-0.5">
              <p className="text-primary text-xs font-semibold uppercase tracking-wider">Live On-Chain Decryption Active</p>
              <p className="text-zinc-400 text-2xs leading-relaxed">
                Analyzing active metrics for {profile.isTestnet ? "Injective Testnet" : "Injective Mainnet"} wallet.
              </p>
            </div>
          </div>
        )}

        {/* Top Header Card */}
        <div className="w-full bg-[#050706]/85 border border-primary/20 backdrop-blur-md rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_0_30px_rgba(120,252,214,0.08)] transition-all duration-300 hover:border-primary/45 hover:shadow-[0_0_35px_rgba(120,252,214,0.14)] hover:-translate-y-0.5">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse-glow" />
              <h2 className="text-zinc-500 font-mono text-xs uppercase tracking-wider">WALLET ANALYSIS</h2>
              <span className="px-3 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-2xs font-semibold uppercase tracking-wider">
                {profile.archetype}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-foreground text-sm sm:text-lg font-mono font-bold break-all select-all">
                {profile.address}
              </span>
              <button 
                onClick={copyAddress}
                className="p-1.5 hover:bg-white/5 rounded border border-white/5 text-muted-foreground hover:text-foreground transition-colors"
                title="Copy Address"
              >
                <Copy className="h-4 w-4" />
              </button>
              {copied && <span className="text-primary text-2xs font-mono">Copied!</span>}
              
              <span className="ml-0 sm:ml-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/25 text-primary text-xs font-mono font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {profile.injBalance !== undefined ? `${profile.injBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} INJ` : "0.00 INJ"}
              </span>
            </div>

            <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
              {profile.insights.summary}
            </p>
          </div>

          <div className="flex flex-col xs:flex-row gap-3">
            <button 
              onClick={copyShareLink}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0a0d0c] border border-white/10 hover:border-primary/50 text-foreground text-sm font-semibold transition-all"
            >
              <Share2 className="h-4 w-4" />
              {shareCopied ? "Link Copied!" : "Copy Share Link"}
            </button>
            <button 
              onClick={() => router.push(`/wallet/${profile.address}/share`)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/95 font-semibold text-sm shadow-[0_0_15px_rgba(120,252,214,0.25)] transition-all"
            >
              <Award className="h-4 w-4" />
              View RPG Card
            </button>
          </div>
        </div>

        {/* Highlight Scorecards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#050706]/75 border border-white/5 rounded-xl p-4 flex flex-col justify-between h-28 transition-all duration-300 hover:border-primary/35 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(120,252,214,0.06)]">
            <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide">Reputation Score</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-foreground">{profile.overallScore}</span>
              <span className="text-zinc-500 font-mono text-sm">/100</span>
            </div>
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${profile.overallScore}%` }} />
            </div>
          </div>

          <div className="bg-[#050706]/75 border border-white/5 rounded-xl p-4 flex flex-col justify-between h-28 transition-all duration-300 hover:border-primary/35 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(120,252,214,0.06)]">
            <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide">Win / Loss Ratio</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-foreground">{profile.stats.winRate}%</span>
            </div>
            <span className="text-2xs text-zinc-500 font-mono">
              {profile.stats.profitableTrades} wins / {profile.stats.lossTrades} losses
            </span>
          </div>

          <div className="bg-[#050706]/75 border border-white/5 rounded-xl p-4 flex flex-col justify-between h-28 transition-all duration-300 hover:border-primary/35 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(120,252,214,0.06)]">
            <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide">Net PnL</span>
            <div className="flex items-center gap-1">
              {profile.stats.netPnLUsd >= 0 ? (
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              ) : (
                <TrendingDown className="h-5 w-5 text-rose-400" />
              )}
              <span className={`text-2xl font-extrabold font-mono ${profile.stats.netPnLUsd >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {profile.stats.netPnLUsd >= 0 ? "+" : ""}${profile.stats.netPnLUsd.toLocaleString()}
              </span>
            </div>
            <span className="text-2xs text-zinc-500 font-mono">
              Volume: ${profile.stats.volumeTradedUsd.toLocaleString()}
            </span>
          </div>

          <div className="bg-[#050706]/75 border border-white/5 rounded-xl p-4 flex flex-col justify-between h-28 transition-all duration-300 hover:border-primary/35 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(120,252,214,0.06)]">
            <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide">Primary Archetype</span>
            <span className="text-lg font-bold text-primary truncate uppercase">{profile.archetype}</span>
            <span className="text-2xs text-zinc-500 font-mono">
              Deterministic Seed Profile
            </span>
          </div>
        </div>

        {/* Dashboard Tabs & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Left Detail Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tabs Bar */}
            <div className="flex border-b border-white/10 gap-1 overflow-x-auto pb-px">
              {[
                { id: "overview", label: "Overview" },
                { id: "cognitive", label: "Behavioral Scores" },
                { id: "trades", label: "Transaction Logs" },
                { id: "similar", label: "Similar Traders" },
                { id: "forecast", label: "Future Forecast" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="bg-[#050706]/85 border border-white/5 rounded-xl p-5 md:p-6 shadow-sm min-h-[350px] transition-all duration-300 hover:border-white/15 hover:shadow-[0_0_25px_rgba(255,255,255,0.01)]">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                    <Award className="h-5 w-5 text-primary" />
                    <h3 className="text-base font-bold uppercase tracking-wider text-zinc-300">Trader DNA Breakdown</h3>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed bg-[#0b0e0d] p-4 rounded-xl border border-white/5">
                    <strong>Archetype: {profile.archetype}</strong> — {profile.archetypeDescription}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <div className="space-y-3 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-xl p-4 transition-all duration-300 hover:border-emerald-500/30 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(16,185,129,0.04)]">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                        <Zap className="h-4 w-4" /> Cognitive Strengths
                      </div>
                      <ul className="space-y-2">
                        {profile.strengths.map((str, idx) => (
                          <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                            <span className="text-emerald-400 mt-0.5">•</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Weaknesses */}
                    <div className="space-y-3 bg-rose-500/[0.02] border border-rose-500/10 rounded-xl p-4 transition-all duration-300 hover:border-rose-500/30 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(244,63,94,0.04)]">
                      <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                        <ShieldAlert className="h-4 w-4" /> Psychological Risks
                      </div>
                      <ul className="space-y-2">
                        {profile.weaknesses.map((weak, idx) => (
                          <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                            <span className="text-rose-400 mt-0.5">•</span>
                            <span>{weak}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Insights Section */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Core Psychological Insights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="bg-[#0b0e0d] p-3 rounded border border-white/5">
                        <span className="text-primary font-bold">// STYLE: </span> {profile.insights.tradingStyle}
                      </div>
                      <div className="bg-[#0b0e0d] p-3 rounded border border-white/5">
                        <span className="text-primary font-bold">// RISK: </span> {profile.insights.riskBehavior}
                      </div>
                      <div className="bg-[#0b0e0d] p-3 rounded border border-white/5">
                        <span className="text-primary font-bold">// PATIENCE: </span> {profile.insights.holdingBehavior}
                      </div>
                      <div className="bg-[#0b0e0d] p-3 rounded border border-white/5">
                        <span className="text-primary font-bold">// SCALE: </span> {profile.insights.positionSizing}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: COGNITIVE SCORES */}
              {activeTab === "cognitive" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                    <Brain className="h-5 w-5 text-primary" />
                    <h3 className="text-base font-bold uppercase tracking-wider text-zinc-300">Cognitive Performance Metrics</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(profile.scores).map(([key, value]) => {
                      const displayKey = key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())

                      let desc = ""
                      if (key === "riskDiscipline") desc = "Strict stop-loss usage and leverage budgeting."
                      else if (key === "emotionalStability") desc = "Resistance to selling early or holding losing positions in anger."
                      else if (key === "convictionScore") desc = "Confidence level and duration holding major asset weights."
                      else if (key === "patienceScore") desc = "Ability to sit in cash/liquidity waiting for optimal triggers."
                      else if (key === "fomoProbability") desc = "Likelihood of buying breakout candles late in the volume wave."
                      else if (key === "lossRecoveryAbility") desc = "Recovering mental clarity and taking calculated setups after drawer."

                      return (
                        <div key={key} className="space-y-2 bg-[#0b0e0d] p-4 rounded-xl border border-white/5">
                          <div className="flex justify-between items-baseline font-mono text-xs">
                            <span className="font-semibold text-zinc-300">{displayKey}</span>
                            <span className="text-primary font-extrabold text-sm">{value}%</span>
                          </div>
                          
                          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${key === 'fomoProbability' && value > 60 ? 'bg-rose-500' : 'bg-primary'}`} 
                              style={{ width: `${value}%` }} 
                            />
                          </div>
                          <p className="text-[10px] text-zinc-500">{desc}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: TRANSACTION LOGS */}
              {activeTab === "trades" && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <h3 className="text-base font-bold uppercase tracking-wider text-zinc-300">DEX Transaction Psychology History</h3>
                    </div>
                    <span className="text-zinc-500 font-mono text-xs">Helix & DojoSwap Audits</span>
                  </div>

                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse text-xs font-mono">
                      <thead>
                        <tr className="border-b border-white/10 text-zinc-400">
                          <th className="py-2.5">Time</th>
                          <th>Asset</th>
                          <th>Action</th>
                          <th>Size (USD)</th>
                          <th>Leverage</th>
                          <th>Hold Time</th>
                          <th className="text-right">PnL Outcome</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {profile.trades.map((trade) => (
                          <tr key={trade.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 text-zinc-500">
                              {new Date(trade.timestamp).toLocaleDateString()} {new Date(trade.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="font-semibold text-foreground">{trade.asset}</td>
                            <td>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                ["LONG", "BUY"].includes(trade.type) 
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              }`}>
                                {trade.type}
                              </span>
                            </td>
                            <td className="text-zinc-300">${trade.sizeUsd.toLocaleString()}</td>
                            <td className="text-zinc-500">{trade.leverage}x</td>
                            <td className="text-zinc-300">
                              {trade.holdDurationHours >= 24 
                                ? `${(trade.holdDurationHours / 24).toFixed(0)}d ${trade.holdDurationHours % 24}h` 
                                : `${trade.holdDurationHours}h`
                              }
                            </td>
                            <td className={`text-right font-bold ${trade.pnlUsd >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                              {trade.pnlUsd >= 0 ? "+" : ""}${trade.pnlUsd.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: SIMILAR TRADERS */}
              {activeTab === "similar" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="text-base font-bold uppercase tracking-wider text-zinc-300">Wallet DNA Proximity Engine</h3>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    The engine calculates behavioral vector distances on Injective based on holding durations, asset choice, FOMO spikes, and average sizing. Click any address below to inspect their DNA.
                  </p>

                  <div className="flex flex-col gap-4">
                    {profile.similarTraders.map((trader) => (
                      <div 
                        key={trader.address}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#0b0e0d] border border-white/5 rounded-xl hover:border-primary/45 transition-colors gap-4"
                      >
                        <div className="space-y-1.5">
                          <div className="text-xs font-mono text-zinc-300 select-all font-bold">
                            {trader.address}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground text-2xs uppercase font-mono">Archetype:</span>
                            <span className="text-primary text-2xs font-semibold uppercase">{trader.archetype}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6">
                          <div className="text-right font-mono">
                            <div className="text-2xs text-muted-foreground">SIMILARITY</div>
                            <div className="text-sm font-bold text-foreground">{trader.similarity}%</div>
                          </div>

                          <button
                            onClick={() => router.push(`/analyze?address=${trader.address}`)}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            Analyze
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: FORECAST & SIMULATOR */}
              {activeTab === "forecast" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="text-base font-bold uppercase tracking-wider text-zinc-300">Future Self Forecast Simulator</h3>
                  </div>

                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold uppercase text-primary tracking-wide">Predictive Analysis</h4>
                    <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                      {profile.futureForecast}
                    </p>
                  </div>

                  {/* Simulator Controls */}
                  <div className="space-y-4 border-t border-white/5 pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Behavioral Adjustment Simulator</h4>
                    <p className="text-2xs text-zinc-500">
                      Slide parameters to predict how altering your leverage discipline and patience metrics impacts your net returns.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Leverage Slider */}
                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-zinc-300">Max Target Leverage</span>
                          <span className="text-primary font-bold">{simLeverage}x</span>
                        </div>
                        <input 
                          type="range" 
                          min={1} 
                          max={20} 
                          value={simLeverage}
                          onChange={(e) => setSimLeverage(Number(e.target.value))}
                          className="w-full accent-primary bg-zinc-800 h-1 rounded-full cursor-pointer"
                        />
                      </div>

                      {/* Holding Time Slider */}
                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-zinc-300">Average Holding Duration</span>
                          <span className="text-primary font-bold">{simHoldingTime} hours</span>
                        </div>
                        <input 
                          type="range" 
                          min={1} 
                          max={240} 
                          value={simHoldingTime}
                          onChange={(e) => setSimHoldingTime(Number(e.target.value))}
                          className="w-full accent-primary bg-zinc-800 h-1 rounded-full cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={handleSimulate}
                        className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-all shadow-[0_0_10px_rgba(120,252,214,0.25)]"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        Run Simulation
                      </button>

                      {simPnLBoost !== null && (
                        <button
                          onClick={resetSimulation}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-800 text-zinc-300 font-semibold text-xs hover:bg-zinc-700 transition-all"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Reset
                        </button>
                      )}
                    </div>

                    {/* Simulation Result */}
                    {simPnLBoost !== null && (
                      <div className="mt-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] animate-pulse-glow flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-2xs font-mono text-zinc-400 uppercase">Simulated Cumulative PnL</div>
                          <div className="text-lg font-bold text-emerald-400 font-mono">
                            ${simPnLBoost.toLocaleString()} USD
                          </div>
                        </div>
                        <div className="text-right text-2xs font-mono">
                          <div className="text-muted-foreground">DIFFERENCE</div>
                          <div className="font-bold text-emerald-400">
                            {simPnLBoost >= profile.stats.netPnLUsd ? "+" : ""}
                            {(((simPnLBoost - profile.stats.netPnLUsd) / Math.max(1, Math.abs(profile.stats.netPnLUsd))) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Right Detail Column: PnL Performance Chart */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* PnL Performance Card */}
            <div className="bg-[#050706]/85 border border-white/5 rounded-xl p-5 md:p-6 shadow-sm space-y-4 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_0_25px_rgba(120,252,214,0.04)]">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4.5 w-4.5 text-primary" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">Equity Growth</h3>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">Simulated Net Return</span>
              </div>

              <div className="h-64 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={pnlChartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="dashboardPnLGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#444" fontSize={9} tickLine={false} axisLine={false} />
                    <YAxis stroke="#444" fontSize={9} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0b0d0c", borderColor: "rgba(120,252,214,0.2)", borderRadius: "8px" }}
                      labelStyle={{ color: "#777", fontSize: 10 }}
                      itemStyle={{ color: "hsl(var(--primary))", fontSize: 11 }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="cumulativePnL" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
                      fillOpacity={1} 
                      fill="url(#dashboardPnLGlow)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex items-center justify-between text-2xs font-mono text-zinc-500 bg-[#0b0e0d] p-3 rounded border border-white/5">
                <span>VOLATILITY RATIO</span>
                <span className="text-foreground font-semibold">
                  {profile.archetype === "Volatility Surfer" ? "HIGH (8.8/10)" : "STABLE (3.4/10)"}
                </span>
              </div>
            </div>

            {/* RPG Card Mini Preview Box */}
            <div className="bg-[#050706]/85 border border-white/5 rounded-xl p-5 md:p-6 shadow-sm space-y-4 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_0_25px_rgba(120,252,214,0.04)]">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <Award className="h-4.5 w-4.5 text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 font-mono">Trader DNA RPG Card</h3>
              </div>

              {/* Mock RPG card UI */}
              <div className="relative border border-primary/20 bg-gradient-to-b from-[#0a0f0d] to-[#040605] rounded-xl p-4 overflow-hidden shadow-[0_0_15px_rgba(120,252,214,0.05)] text-center space-y-4 flex flex-col items-center">
                <div className="absolute right-[-20px] top-[-20px] h-20 w-20 bg-primary/5 rounded-full blur-xl" />
                
                <div className="h-12 w-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">{profile.archetype}</h4>
                  <div className="text-2xs text-zinc-500 font-mono">REPUTATION RATING: {profile.overallScore}/100</div>
                </div>

                <div className="w-full flex items-center justify-between border-t border-b border-white/5 py-2 my-2 font-mono text-2xs">
                  <div>
                    <div className="text-zinc-500">WIN RATE</div>
                    <div className="text-foreground font-bold">{profile.stats.winRate}%</div>
                  </div>
                  <div>
                    <div className="text-zinc-500">HOLD DURATION</div>
                    <div className="text-foreground font-bold">
                      {profile.archetype === "Volatility Surfer" ? "SHORT" : profile.archetype === "Conviction Hunter" ? "LONG" : "MEDIUM"}
                    </div>
                  </div>
                  <div>
                    <div className="text-zinc-500">PnL OUTCOME</div>
                    <div className="text-primary font-bold">${profile.stats.netPnLUsd.toLocaleString()}</div>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <button
                    onClick={() => router.push(`/wallet/${profile.address}/share`)}
                    className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 text-2xs uppercase tracking-wider transition-all hover:-translate-y-0.5"
                  >
                    View Share Page
                  </button>
                  <button
                    onClick={() => downloadCardAsImage(profile)}
                    className="w-full py-2.5 rounded-lg bg-[#0c100e] hover:bg-primary/10 text-primary border border-primary/20 hover:border-primary/40 text-2xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 hover:-translate-y-0.5"
                  >
                    <Download className="h-3 w-3" />
                    Download Image
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <FooterSection />
    </main>
  )
}
