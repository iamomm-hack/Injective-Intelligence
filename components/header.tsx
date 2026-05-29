import type React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, BarChart3 } from "lucide-react"
import Link from "next/link"

export function Header() {
  const navItems = [
    { name: "Analyze Wallet", href: "/" },
    { name: "Market Feed", href: "/market-intelligence" },
    { name: "Explore Demo", href: "/analyze?address=inj1qpzk5x3r4z7ux2wzcy5w2vhl9u7t08e6j0fqqt" },
  ]

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
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary px-4 py-2 rounded-full font-medium transition-colors text-sm"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/analyze?address=inj1qpzk5x3r4z7ux2wzcy5w2vhl9u7t08e6j0fqqt" className="hidden md:block">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full font-medium shadow-[0_0_15px_rgba(120,252,214,0.3)]">
              Launch App
            </Button>
          </Link>
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
                <Link href="/analyze?address=inj1qpzk5x3r4z7ux2wzcy5w2vhl9u7t08e6j0fqqt" className="w-full mt-4">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full font-medium">
                    Launch App
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

