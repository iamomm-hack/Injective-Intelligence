"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { generateBehaviorProfile, BehaviorProfile } from "@/lib/engine"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { 
  Award, 
  Brain, 
  Share2, 
  Twitter, 
  ArrowLeft,
  Copy,
  Zap,
  Shield,
  Coins,
  Compass
} from "lucide-react"

export default function ShareCardPage() {
  const params = useParams()
  const router = useRouter()
  const address = params.address as string

  const [profile, setProfile] = useState<BehaviorProfile | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (address) {
      let isMounted = true
      generateBehaviorProfile(address)
        .then((generated) => {
          if (isMounted) {
            setProfile(generated)
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
        <div className="h-8 w-8 rounded-full border border-primary/20 border-t-primary animate-spin" />
      </main>
    )
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTweet = () => {
    const text = `My Injective Trader DNA profile has been decoded! 

Archetype: ${profile.archetype}
Reputation Score: ${profile.overallScore}/100
Net PnL: ${profile.stats.netPnLUsd >= 0 ? '+' : ''}$${profile.stats.netPnLUsd.toLocaleString()}

Check your own behavior report card on Injective Intelligence:`
    const url = window.location.href
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank")
  }

  // RPG class/element matches
  let cardColor = "from-emerald-500/20 via-primary/5 to-background"
  let shadowGlow = "shadow-[0_0_35px_rgba(120,252,214,0.15)]"
  let rarity = "UNCOMMON"
  let rarityColor = "text-primary border-primary/30"

  if (profile.overallScore >= 85) {
    rarity = "MYTHICAL LEGEND"
    cardColor = "from-purple-500/20 via-indigo-500/5 to-background border-purple-500/30"
    shadowGlow = "shadow-[0_0_40px_rgba(168,85,247,0.2)]"
    rarityColor = "text-purple-400 border-purple-500/30 bg-purple-500/5"
  } else if (profile.overallScore >= 70) {
    rarity = "RARE SPECS"
    cardColor = "from-cyan-500/20 via-sky-500/5 to-background border-cyan-500/30"
    shadowGlow = "shadow-[0_0_35px_rgba(6,182,212,0.15)]"
    rarityColor = "text-cyan-400 border-cyan-500/30 bg-cyan-500/5"
  } else if (profile.archetype === "Volatility Surfer") {
    rarity = "CHAOTIC HIGH-LEVERAGE"
    cardColor = "from-rose-500/20 via-amber-500/5 to-background border-rose-500/30"
    shadowGlow = "shadow-[0_0_35px_rgba(244,63,94,0.15)]"
    rarityColor = "text-rose-400 border-rose-500/30 bg-rose-500/5"
  }

  return (
    <main className="min-h-screen bg-background bg-grid-pattern relative text-foreground flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-4xl mx-auto w-full relative z-10">
        
        {/* Back Link */}
        <button 
          onClick={() => router.push(`/wallet/${profile.address}`)}
          className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors self-start mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          BACK TO ANALYSIS DASHBOARD
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
          
          {/* Column 1: Gamified Trading Card (RPG Card) */}
          <div className="md:col-span-7 flex justify-center">
            
            {/* The RPG Trading Card */}
            <div className={`relative w-[340px] h-[520px] rounded-3xl bg-gradient-to-b ${cardColor} border border-white/10 p-6 flex flex-col justify-between ${shadowGlow} overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}>
              
              {/* Scanline animations */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none" />
              
              {/* Glowing header banner */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <span className="text-2xs font-mono tracking-widest text-zinc-400">INJECTIVE DNA</span>
                </div>
                
                <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-mono font-bold tracking-widest uppercase ${rarityColor}`}>
                  {rarity}
                </span>
              </div>

              {/* Character Avatar Icon Area */}
              <div className="flex flex-col items-center py-6 text-center space-y-3 relative z-10">
                <div className="h-20 w-20 rounded-full bg-[#050706] border border-white/10 flex items-center justify-center relative shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-1 rounded-full border border-primary/20 animate-pulse" />
                  <Award className="h-10 w-10 text-primary" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold uppercase tracking-wider text-foreground glow-text">
                    {profile.archetype}
                  </h3>
                  <p className="text-3xs font-mono text-zinc-500 uppercase select-all max-w-[220px] truncate">
                    ID: {profile.address}
                  </p>
                </div>
              </div>

              {/* Attributes & Stats grid */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-[#050706]/75 border border-white/5 p-2.5 rounded-xl space-y-1">
                    <div className="text-3xs text-zinc-500 uppercase flex items-center gap-1">
                      <Shield className="h-2.5 w-2.5 text-primary" /> Risk Rating
                    </div>
                    <div className="text-sm font-bold text-foreground">
                      {profile.scores.riskDiscipline >= 80 ? "CONSERVATIVE" : profile.scores.riskDiscipline >= 55 ? "BALANCED" : "AGGRESSIVE"}
                    </div>
                  </div>

                  <div className="bg-[#050706]/75 border border-white/5 p-2.5 rounded-xl space-y-1">
                    <div className="text-3xs text-zinc-500 uppercase flex items-center gap-1">
                      <Zap className="h-2.5 w-2.5 text-primary" /> Power Level
                    </div>
                    <div className="text-sm font-bold text-foreground">LVL {profile.overallScore} ALPHA</div>
                  </div>

                  <div className="bg-[#050706]/75 border border-white/5 p-2.5 rounded-xl space-y-1">
                    <div className="text-3xs text-zinc-500 uppercase flex items-center gap-1">
                      <Coins className="h-2.5 w-2.5 text-primary" /> PnL Affinity
                    </div>
                    <div className={`text-sm font-bold font-mono ${profile.stats.netPnLUsd >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {profile.stats.netPnLUsd >= 0 ? "+" : ""}${profile.stats.netPnLUsd.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-[#050706]/75 border border-white/5 p-2.5 rounded-xl space-y-1">
                    <div className="text-3xs text-zinc-500 uppercase flex items-center gap-1">
                      <Compass className="h-2.5 w-2.5 text-primary" /> Win Rate
                    </div>
                    <div className="text-sm font-bold text-foreground">{profile.stats.winRate}%</div>
                  </div>
                </div>

                {/* RPG Custom Traits list */}
                <div className="bg-[#050706]/70 border border-white/5 p-3 rounded-xl flex flex-wrap gap-2 justify-center">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono">
                    PATIENCE: {profile.scores.patienceScore}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono">
                    STABILITY: {profile.scores.emotionalStability}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[9px] font-mono">
                    FOMO RISK: {profile.scores.fomoProbability}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="border-t border-white/10 pt-3 text-center">
                <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                  INJECTIVE INTELLIGENCE // BEHAVIOR CARD
                </span>
              </div>

            </div>

          </div>

          {/* Column 2: Share Callouts */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-foreground">
                Decoded RPG Card
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This is a standalone share card compiled from your on-chain trading behavior on Injective DEXs. Share your statistical archetype card with the Web3 space.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span> Seeding complete
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span> Level classification calculated
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span> Rarity quotient assigned
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={handleTweet}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/95 font-bold text-sm shadow-[0_0_15px_rgba(120,252,214,0.25)] transition-all"
              >
                <Twitter className="h-4 w-4 fill-current" />
                Share to Twitter / X
              </button>

              <button 
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#0a0d0c] border border-white/10 hover:border-primary/50 text-foreground text-sm font-semibold transition-all"
              >
                <Copy className="h-4 w-4" />
                {copied ? "Link Copied!" : "Copy Share Link"}
              </button>
            </div>
          </div>

        </div>

      </div>

      <FooterSection />
    </main>
  )
}
