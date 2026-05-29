"use client"

import React from "react"
import { Brain, Heart, AlertTriangle } from "lucide-react"

export default function RealtimeCodingPreviews() {
  return (
    <div className="w-full h-full p-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-[320px] bg-[#050706]/90 border border-primary/20 rounded-xl p-4 font-mono text-2xs space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-1.5 text-primary">
            <Brain className="h-3.5 w-3.5" />
            <span className="font-bold uppercase tracking-wider">COGNITIVE INDEX</span>
          </div>
          <span className="text-zinc-500 font-bold">LIVE DIAGNOSIS</span>
        </div>

        <div className="space-y-3">
          {/* Row 1 */}
          <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <Heart className="h-3.5 w-3.5 text-rose-400" />
              <span className="text-zinc-300">Emotional Stability</span>
            </div>
            <span className="text-foreground font-bold text-xs">78%</span>
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-zinc-300">FOMO Resistance</span>
            </div>
            <span className="text-foreground font-bold text-xs">85%</span>
          </div>

          {/* Row 3 */}
          <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <Brain className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-zinc-300">Discipline Index</span>
            </div>
            <span className="text-primary font-bold text-xs">91%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
