"use client"

import React from "react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"
import { Brain, TrendingUp, ShieldAlert, Sparkles, Zap, Award } from "lucide-react"

export function DashboardPreview() {
  // Mini chart data
  const data = [
    { name: "T1", pnl: 200 },
    { name: "T2", pnl: -100 },
    { name: "T3", pnl: 450 },
    { name: "T4", pnl: 300 },
    { name: "T5", pnl: 800 },
    { name: "T6", pnl: 650 },
    { name: "T7", pnl: 1200 },
    { name: "T8", pnl: 1100 },
    { name: "T9", pnl: 1650 },
  ]

  const previewScores = [
    { label: "Risk Discipline", value: 88, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Emotional Stability", value: 76, color: "text-cyan-400", bg: "bg-cyan-400/10" },
    { label: "Patience Score", value: 92, color: "text-primary", bg: "bg-primary/10" },
    { label: "FOMO Resistance", value: 85, color: "text-purple-400", bg: "bg-purple-400/10" },
  ]

  return (
    <div className="w-[calc(100vw-32px)] md:w-[1160px] relative">
      {/* Outer border glow wrapper */}
      <div className="bg-primary/10 rounded-2xl p-1.5 shadow-[0_0_30px_rgba(120,252,214,0.1)] border border-primary/20 backdrop-blur-lg">
        <div className="bg-[#050706]/90 rounded-xl p-4 md:p-6 overflow-hidden border border-white/5 flex flex-col gap-6">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              <div className="text-xs font-mono text-muted-foreground">
                ADDRESS_INDEXER: <span className="text-primary font-bold">inj1qpzk...0fqqt</span>
              </div>
            </div>
            
            {/* Archetype Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
              <Award className="h-3.5 w-3.5" />
              Swing Sniper Archetype
            </div>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Column 1: Cognitive Scorecard */}
            <div className="lg:col-span-4 flex flex-col gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <Brain className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold uppercase text-zinc-300">Cognitive Scorecard</h4>
              </div>
              
              <div className="flex flex-col gap-3">
                {previewScores.map((score, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-muted-foreground">{score.label}</span>
                      <span className={`${score.color} font-bold`}>{score.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-primary`} 
                        style={{ width: `${score.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-2 text-2xs text-muted-foreground font-mono leading-relaxed bg-[#0b0e0d] p-2.5 rounded border border-white/5">
                <span className="text-primary font-semibold">// INTEL_REPLY:</span> Wallet displays extremely high stop-loss compliance and minimal panic execution.
              </div>
            </div>

            {/* Column 2: Chart Area */}
            <div className="lg:col-span-5 flex flex-col gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-semibold uppercase text-zinc-300">Net Profit/Loss Pattern</h4>
                </div>
                <span className="text-emerald-400 text-xs font-bold font-mono">+$1,650.00 INJ</span>
              </div>
              
              <div className="h-48 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="pnlGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0f1211", borderColor: "rgba(120,252,214,0.2)", borderRadius: "8px" }}
                      labelStyle={{ color: "#888" }}
                    />
                    <Area type="monotone" dataKey="pnl" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#pnlGlow)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Column 3: Strengths/Weaknesses */}
            <div className="lg:col-span-3 flex flex-col gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold uppercase text-zinc-300">Detected Traits</h4>
              </div>

              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-2xs uppercase text-emerald-400 font-semibold tracking-wider flex items-center gap-1">
                    <Zap className="h-3 w-3" /> Core Strength
                  </div>
                  <p className="text-xs text-zinc-300 leading-normal">
                    Perfect entries near range bounds before major upward volume surges.
                  </p>
                </div>
                
                <div className="space-y-2 border-t border-white/5 pt-3">
                  <div className="text-2xs uppercase text-rose-400 font-semibold tracking-wider flex items-center gap-1">
                    <ShieldAlert className="h-3 w-3" /> Potential Risk
                  </div>
                  <p className="text-xs text-zinc-300 leading-normal">
                    Slight yield-bleeding during highly volatile, multi-day consolidating periods.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
