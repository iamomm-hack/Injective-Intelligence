"use client"

import React, { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, ShieldCheck, Terminal, Database, LineChart, Cpu } from "lucide-react"
import { Header } from "@/components/header"

const SCAN_STEPS = [
  { text: "Connecting to Injective RPC nodes...", icon: Database },
  { text: "Fetching trade logs from Helix DEX orderbooks...", icon: LineChart },
  { text: "Retrieving DojoSwap LP allocations...", icon: Database },
  { text: "Calculating position sizing and volatility factors...", icon: Cpu },
  { text: "Evaluating risk discipline and emotional indexes...", icon: ShieldCheck },
  { text: "Generating Trader DNA report...", icon: Terminal },
]

function AnalyzeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const rawAddress = searchParams.get("address")
  
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [address, setAddress] = useState("")

  useEffect(() => {
    if (rawAddress) {
      setAddress(rawAddress.trim())
    } else {
      router.push("/")
    }
  }, [rawAddress, router])

  useEffect(() => {
    if (!address) return

    // Progress bar increment
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      });
    }, 35)

    // Step change sequence
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < SCAN_STEPS.length - 1) {
          return prev + 1
        } else {
          clearInterval(stepInterval)
          // Redirect when steps finish
          setTimeout(() => {
            router.push(`/wallet/${address}`)
          }, 600)
          return prev
        }
      })
    }, 700)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
    }
  }, [address, router])

  return (
    <main className="min-h-screen bg-background bg-grid-pattern relative text-foreground flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-xl mx-auto w-full relative z-10 py-12">
        <div className="w-full bg-[#050706]/85 border border-primary/20 backdrop-blur-md rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-[0_0_40px_rgba(120,252,214,0.15)] relative overflow-hidden">
          
          {/* Scanning sweep animation line */}
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />

          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold uppercase tracking-wider text-foreground">
              Behavioral Scan Initiated
            </h2>
            <p className="text-xs font-mono text-zinc-500 break-all select-all">
              TARGET: {address}
            </p>
          </div>

          {/* Big Spinner / Brain Scanner */}
          <div className="flex justify-center items-center py-6">
            <div className="relative flex items-center justify-center">
              {/* Outer rotating ring */}
              <div className="h-28 w-28 rounded-full border border-primary/10 border-t-primary animate-spin" />
              {/* Inner glowing pulse */}
              <div className="absolute h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(120,252,214,0.2)] animate-pulse" />
              <Cpu className="absolute h-8 w-8 text-primary" />
            </div>
          </div>

          {/* Log steps */}
          <div className="space-y-3 font-mono text-xs">
            {SCAN_STEPS.map((step, idx) => {
              const Icon = step.icon
              const isDone = idx < currentStep
              const isActive = idx === currentStep
              
              return (
                <div 
                  key={idx} 
                  className={`flex items-center gap-3 transition-opacity duration-300 ${
                    isDone ? "text-primary/70" : isActive ? "text-primary font-semibold" : "text-muted-foreground/30"
                  }`}
                >
                  {isDone ? (
                    <span className="text-primary font-bold">✓</span>
                  ) : isActive ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
                  )}
                  <Icon className="h-3.5 w-3.5" />
                  <span className="truncate">{step.text}</span>
                </div>
              )
            })}
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-2xs font-mono text-zinc-400">
              <span>COMPILING COGNITIVE DNA</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-zinc-900 border border-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(120,252,214,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default function AnalyzePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground font-mono">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-zinc-500">INITIALIZING ANALYSIS MODULE...</p>
      </main>
    }>
      <AnalyzeContent />
    </Suspense>
  )
}
