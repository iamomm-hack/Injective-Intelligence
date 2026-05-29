"use client"

import React from "react"
import { Sparkles, TrendingUp, TrendingDown } from "lucide-react"

export default function ParallelCodingAgents() {
  return (
    <div className="w-full h-full p-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-[320px] bg-[#050706]/90 border border-primary/20 rounded-xl p-4 font-mono text-2xs space-y-4 shadow-xl">
        
        {/* Header */}
        <div className="flex items-center gap-1.5 text-primary border-b border-white/5 pb-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="font-bold uppercase tracking-wider">PROJECTED TRAJECTORIES</span>
        </div>

        {/* Projections List */}
        <div className="space-y-3.5">
          
          {/* Conservative Forecast */}
          <div className="space-y-1">
            <div className="flex justify-between text-zinc-400 text-3xs uppercase font-semibold">
              <span>Path A: 3x Leverage (Recommended)</span>
              <span className="text-emerald-400 font-bold">+$14,200 USD</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              <div className="h-1.5 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: "80%" }} />
              </div>
            </div>
            <p className="text-[10px] text-zinc-500">Stabilizes portfolio drift, locking gains near key range limits.</p>
          </div>

          {/* High Leverage Forecast */}
          <div className="space-y-1">
            <div className="flex justify-between text-zinc-400 text-3xs uppercase font-semibold">
              <span>Path B: 15x Leverage (High Risk)</span>
              <span className="text-rose-400 font-bold">-$8,500 USD</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-3.5 w-3.5 text-rose-400" />
              <div className="h-1.5 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-400 rounded-full" style={{ width: "35%" }} />
              </div>
            </div>
            <p className="text-[10px] text-zinc-500">Increases liquidations risk due to market consolidation whipsaws.</p>
          </div>

        </div>

      </div>
    </div>
  )
}
