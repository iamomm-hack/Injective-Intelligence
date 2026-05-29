"use client"

import React from "react"
import { Activity, Clock } from "lucide-react"

export default function EasyDeployment() {
  return (
    <div className="w-full h-full p-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-[320px] bg-[#050706]/90 border border-primary/20 rounded-xl p-4 font-mono text-2xs space-y-4 shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-1.5 text-primary">
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            <span className="font-bold uppercase tracking-wider">EVENT FEEDER</span>
          </div>
          <span className="text-zinc-500 font-bold">1.2s DELAY</span>
        </div>

        {/* Live log entries */}
        <div className="space-y-3">
          <div className="flex items-start gap-2 border-l-2 border-emerald-400 pl-2 py-0.5">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-400 font-bold">inj1qpzk...</span>
                <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1 rounded">LONG</span>
              </div>
              <p className="text-[10px] text-zinc-300">Entered $12k INJ position (3x leverage) near support.</p>
            </div>
          </div>

          <div className="flex items-start gap-2 border-l-2 border-rose-400 pl-2 py-0.5">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-400 font-bold">inj1volat...</span>
                <span className="text-[9px] text-rose-400 font-bold bg-rose-500/10 px-1 rounded">LIQ</span>
              </div>
              <p className="text-[10px] text-zinc-300">15x Leverage HLX position liquidated at $1.15.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
