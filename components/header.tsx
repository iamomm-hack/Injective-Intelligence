"use client"

import React, { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, BarChart3, Wallet, Copy } from "lucide-react"
import Link from "next/link"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [connecting, setConnecting] = useState(false)

  // Wallet connection state
  const [connectedAddress, setConnectedAddress] = useState<string>("")
  const [connectedBalance, setConnectedBalance] = useState<number | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeDashboardAddress, setActiveDashboardAddress] = useState<string>("")

  const dropdownRef = useRef<HTMLDivElement>(null)

  // Load connected wallet from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("connected_injective_address")
    if (saved && saved.startsWith("inj1") && saved.length >= 42) {
      setConnectedAddress(saved)
      fetchBalance(saved)
    }
  }, [])

  // Sync active dashboard address from connected state or last searched address
  useEffect(() => {
    const connected = localStorage.getItem("connected_injective_address")
    const lastSearched = localStorage.getItem("last_analyzed_address")
    if (connected && connected.startsWith("inj1") && connected.length >= 42) {
      setActiveDashboardAddress(connected)
    } else if (lastSearched && lastSearched.startsWith("inj1") && lastSearched.length >= 42) {
      setActiveDashboardAddress(lastSearched)
    } else {
      setActiveDashboardAddress("")
    }
  }, [connectedAddress, pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchBalance = async (addr: string) => {
    try {
      const res = await fetch(`/api/wallet/${addr}`)
      if (res.ok) {
        const data = await res.json()
        if (data && typeof data.injBalance === "number") {
          setConnectedBalance(data.injBalance)
        }
      }
    } catch (err) {
      console.error("Failed to fetch wallet balance:", err)
    }
  }

  const copyConnectedAddress = () => {
    if (!connectedAddress) return
    navigator.clipboard.writeText(connectedAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const disconnectWallet = () => {
    setConnectedAddress("")
    setConnectedBalance(null)
    localStorage.removeItem("connected_injective_address")
    setIsDropdownOpen(false)
  }
  
  const navItems = [
    { name: "Analyze Wallet", href: "/" },
    { name: "Market Feed", href: "/market-intelligence" },
    { name: "Dashboard", href: activeDashboardAddress ? `/wallet/${activeDashboardAddress}` : "/" },
  ]

  const isLinkActive = (item: typeof navItems[0]) => {
    if (item.name === "Analyze Wallet") {
      return pathname === "/"
    }
    if (item.name === "Dashboard") {
      return pathname.startsWith("/wallet") || pathname.startsWith("/analyze")
    }
    return pathname === item.href
  }

  const connectKeplrWallet = async () => {
    if (connecting) return
    setConnecting(true)
    try {
      if (typeof window === "undefined") return
      const anyWindow = window as any
      if (!anyWindow.keplr) {
        alert("Keplr Wallet extension is not installed. Please install it to connect.")
        setConnecting(false)
        return
      }

      // Try mainnet first
      const chainId = "injective-1"
      await anyWindow.keplr.enable(chainId)
      const offlineSigner = anyWindow.keplr.getOfflineSigner(chainId)
      const accounts = await offlineSigner.getAccounts()
      
      if (accounts && accounts.length > 0) {
        const address = accounts[0].address
        setConnectedAddress(address)
        localStorage.setItem("connected_injective_address", address)
        fetchBalance(address)
        router.push(`/wallet/${address}`)
      }
    } catch (err: any) {
      console.warn("Injective Mainnet connect failed, trying Testnet...", err)
      try {
        const anyWindow = window as any
        const chainId = "injective-888"
        await anyWindow.keplr.enable(chainId)
        const offlineSigner = anyWindow.keplr.getOfflineSigner(chainId)
        const accounts = await offlineSigner.getAccounts()
        if (accounts && accounts.length > 0) {
          const address = accounts[0].address
          setConnectedAddress(address)
          localStorage.setItem("connected_injective_address", address)
          fetchBalance(address)
          router.push(`/wallet/${address}`)
          return
        }
      } catch (nestedErr) {
        console.error("Testnet connect failed too:", nestedErr)
      }
      alert("Could not connect to Keplr. Please ensure Keplr is unlocked and permissions are granted.")
    } finally {
      setConnecting(false)
    }
  }

  return (
    <header className="w-full py-4 px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-colors">
              <BarChart3 className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-foreground text-lg font-bold tracking-wider uppercase glow-text">
              Injective Intelligence
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1.5 bg-[#080a10]/60 border border-white/10 backdrop-blur-md px-2 py-1.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {navItems.map((item) => {
              const active = isLinkActive(item)
              return (
                <div key={item.name} className="relative">
                  <Link
                    href={item.href}
                    className={`px-5 py-2 rounded-full font-bold text-2xs tracking-widest uppercase transition-all duration-200 block ${
                      active
                        ? "bg-[#131722] text-white border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] font-extrabold scale-[1.02]"
                        : "text-[#8a8d98] hover:text-[#c5c8d4] hover:bg-white/[0.03]"
                    }`}
                  >
                    {item.name}
                  </Link>
                  {active && (
                    <span className="absolute -top-0.5 right-1 w-1.5 h-1.5 bg-[#4f46e5] rounded-full shadow-[0_0_8px_#4f46e5]" />
                  )}
                </div>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Desktop Wallet Connect */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <Button 
              onClick={() => {
                if (connectedAddress) {
                  setIsDropdownOpen(!isDropdownOpen)
                } else {
                  connectKeplrWallet()
                }
              }}
              disabled={connecting}
              className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full font-semibold shadow-[0_0_15px_rgba(120,252,214,0.3)] transition-all duration-300"
            >
              <Wallet className="h-4 w-4" />
              {connecting 
                ? "Connecting..." 
                : connectedAddress 
                  ? `${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}` 
                  : "Connect Wallet"
              }
            </Button>

            {/* Dropdown */}
            {isDropdownOpen && connectedAddress && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#080a10]/95 border border-white/10 backdrop-blur-md p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 flex flex-col gap-3 text-foreground font-mono">
                {/* Balance Info */}
                <div className="space-y-1">
                  <span className="text-zinc-500 text-3xs uppercase tracking-widest font-semibold block">Connected Balance</span>
                  <div className="text-sm font-bold text-primary flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    {connectedBalance !== null 
                      ? `${connectedBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} INJ` 
                      : "Loading..."
                    }
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                {/* Address Info */}
                <div className="space-y-1.5">
                  <span className="text-zinc-500 text-3xs uppercase tracking-widest font-semibold block">Wallet Address</span>
                  <div className="flex items-center justify-between bg-white/[0.03] border border-white/5 rounded-lg px-2.5 py-1.5 text-3xs text-zinc-300">
                    <span className="truncate max-w-[160px]">{connectedAddress}</span>
                    <button 
                      onClick={copyConnectedAddress}
                      className="text-zinc-400 hover:text-white transition-colors shrink-0 ml-1"
                      title="Copy Address"
                    >
                      {copied ? (
                        <span className="text-primary font-bold">✓</span>
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Disconnect Button */}
                <button
                  onClick={disconnectWallet}
                  className="w-full mt-1 py-1.5 px-3 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 text-3xs uppercase tracking-widest font-bold transition-all text-center"
                >
                  Disconnect Wallet
                </button>
              </div>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background border-t border-border text-foreground">
              <SheetHeader>
                <SheetTitle className="text-left text-xl font-semibold text-foreground">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary justify-start text-lg py-2 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Wallet Connect */}
                {connectedAddress ? (
                  <div className="w-full mt-4 bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col gap-3 font-mono">
                    <div className="space-y-0.5">
                      <span className="text-zinc-500 text-4xs uppercase tracking-widest font-semibold block">Connected Balance</span>
                      <div className="text-sm font-bold text-primary flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        {connectedBalance !== null 
                          ? `${connectedBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} INJ` 
                          : "Loading..."
                        }
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-zinc-500 text-4xs uppercase tracking-widest font-semibold block">Wallet Address</span>
                      <div className="flex items-center justify-between bg-white/[0.03] border border-white/5 rounded-lg px-2.5 py-1.5 text-3xs text-zinc-300">
                        <span className="truncate max-w-[190px]">{connectedAddress}</span>
                        <button 
                          onClick={copyConnectedAddress}
                          className="text-zinc-400 hover:text-white transition-colors shrink-0 ml-1"
                        >
                          {copied ? (
                            <span className="text-primary font-bold">✓</span>
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </div>
                    <Button 
                      onClick={disconnectWallet}
                      className="w-full mt-1 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/25 text-rose-400 text-3xs uppercase tracking-widest font-bold py-1.5 h-auto rounded-lg"
                    >
                      Disconnect Wallet
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={connectKeplrWallet}
                    disabled={connecting}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full font-semibold"
                  >
                    <Wallet className="h-4 w-4" />
                    {connecting ? "Connecting..." : "Connect Wallet"}
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

