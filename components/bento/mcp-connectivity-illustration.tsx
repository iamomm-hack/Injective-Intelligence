"use client"

import React from "react"
import { Users, Search, ArrowUpRight } from "lucide-react"

export default function MCPConnectivityIllustration() {
  return (
    <div className="w-full h-full p-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-[320px] bg-[#050706]/90 border border-primary/20 rounded-xl p-4 font-mono text-2xs space-y-4 shadow-xl">
        
        {/* Search header mock */}
        <div className="flex items-center gap-2 bg-[#0b0e0d] border border-white/5 p-2 rounded-lg">
          <Search className="h-3.5 w-3.5 text-zinc-500" />
          <span className="text-zinc-400 select-all truncate">inj1qpzk5x3r...0fqqt</span>
        </div>

        {/* Similar matches */}
        <div className="space-y-2">
          <div className="text-3xs text-zinc-500 uppercase tracking-wider">Top DNA Matches</div>
          
          <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-2 rounded-lg">
            <div className="space-y-0.5">
              <span className="text-zinc-300 font-bold block">inj1whale...23x4</span>
              <span className="text-[9px] text-primary uppercase">Whale Follower</span>
            </div>
            <span className="text-emerald-400 font-bold">94% MATCH</span>
          </div>

          <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-2 rounded-lg">
            <div className="space-y-0.5">
              <span className="text-zinc-300 font-bold block">inj1sniper...890k</span>
              <span className="text-[9px] text-primary uppercase">Swing Sniper</span>
            </div>
            <span className="text-emerald-400 font-bold">89% MATCH</span>
          </div>
        </div>

      </div>
    </div>
  )
}
