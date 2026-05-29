"use client"

import React from "react"
import { ShieldCheck, Award, Target, Crosshair } from "lucide-react"

export default function AiCodeReviews() {
  return (
    <div className="w-full h-full p-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-[320px] bg-[#050706]/90 border border-primary/20 rounded-xl p-4 font-mono text-2xs space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-1.5 text-primary">
            <Crosshair className="h-3.5 w-3.5" />
            <span className="font-bold uppercase tracking-wider">DNA INDEXER</span>
          </div>
          <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px]">
            ACTIVE
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-zinc-400">
            <span>TARGET CLASS</span>
            <span className="text-foreground font-bold">SWING SNIPER</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>DETECTION RATING</span>
            <span className="text-primary font-bold">92% MATCH</span>
          </div>
        </div>

        <div className="space-y-2 border-t border-white/5 pt-3">
          <div className="space-y-1">
            <div className="flex justify-between text-zinc-500 text-[10px]">
              <span>PATIENCE FACTOR</span>
              <span className="text-emerald-400">94%</span>
            </div>
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: "94%" }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-zinc-500 text-[10px]">
              <span>RISK CONTROL</span>
              <span className="text-primary">88%</span>
            </div>
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "88%" }} />
            </div>
          </div>
        </div>

        <div className="bg-[#0a0d0c] border border-white/5 p-2 rounded text-[10px] text-zinc-500 leading-normal">
          <span className="text-primary font-bold">// CLASSIFIED:</span> Executing entries strictly near local range support lines. Low FOMO risk.
        </div>
      </div>
    </div>
  )
}
