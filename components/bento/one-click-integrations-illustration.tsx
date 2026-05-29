"use client"

import React from "react"
import { Database, Link, ArrowRight, Zap } from "lucide-react"

export default function OneClickIntegrationsIllustration() {
  return (
    <div className="w-full h-full p-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-[320px] bg-[#050706]/90 border border-primary/20 rounded-xl p-4 font-mono text-2xs space-y-4 shadow-xl">
        
        {/* Connected state header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="text-zinc-500 uppercase tracking-wider">Sync Status</span>
          <span className="text-primary flex items-center gap-1">
            <Zap className="h-3 w-3 animate-pulse" /> LIVE STREAMING
          </span>
        </div>

        {/* Integration Nodes */}
        <div className="flex items-center justify-around py-2">
          <div className="flex flex-col items-center gap-1 p-2 border border-white/5 bg-[#0b0e0d] rounded-lg">
            <span className="text-foreground font-bold">Helix</span>
            <span className="text-[9px] text-zinc-500">Orderbook</span>
          </div>
          <ArrowRight className="h-4 w-4 text-zinc-600" />
          <div className="p-3 rounded-full bg-primary/10 border border-primary/30">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <ArrowRight className="h-4 w-4 text-zinc-600" />
          <div className="flex flex-col items-center gap-1 p-2 border border-white/5 bg-[#0b0e0d] rounded-lg">
            <span className="text-foreground font-bold">Dojo</span>
            <span className="text-[9px] text-zinc-500">AMM Pool</span>
          </div>
        </div>

        {/* Synchronized logs list */}
        <div className="space-y-1.5 border-t border-white/5 pt-3">
          <div className="flex justify-between text-[10px] text-zinc-400">
            <span>[16:42:01] Helix Spot Log</span>
            <span className="text-emerald-400 font-bold">SYNCED</span>
          </div>
          <div className="flex justify-between text-[10px] text-zinc-400">
            <span>[16:41:45] Dojo LP Deposit</span>
            <span className="text-emerald-400 font-bold">SYNCED</span>
          </div>
        </div>

      </div>
    </div>
  )
}
