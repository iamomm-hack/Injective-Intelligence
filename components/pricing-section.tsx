"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)

  const pricingPlans = [
    {
      name: "Free",
      monthlyPrice: "$0",
      annualPrice: "$0",
      description: "Perfect for individuals starting their journey.",
      features: [
        "Full Trader DNA Report",
        "Deterministic wallet archetype matching",
        "Basic similar trader comparison",
        "Up to 5 wallet lookups per day",
        "Community market feed access",
      ],
      buttonText: "Get Started",
      buttonClass:
        "bg-transparent border border-white/20 hover:border-primary/50 text-white hover:bg-white/5",
    },
    {
      name: "Pro",
      monthlyPrice: "$30",
      annualPrice: "$24",
      description: "Ideal for active traders and analysts.",
      features: [
        "Unlimited wallet lookups",
        "Advanced cognitive scores & historical charts",
        "Similar Trader Engine (unlocked)",
        "RPG-style share card generation",
        "Future Self Forecast analytics model",
        "Historical leverage & liquidation risk audit",
        "Priority indexer search speed",
      ],
      buttonText: "Join now",
      buttonClass:
        "bg-[#050706] text-primary hover:bg-[#0c0f0d] border border-[#050706] hover:border-primary/30 shadow-md",
      popular: true,
    },
    {
      name: "Ultra",
      monthlyPrice: "$180",
      annualPrice: "$144",
      description: "Tailored solutions for funds & developers.",
      features: [
        "Dedicated websocket endpoints",
        "Real-time wallet behavioral alerts",
        "Custom programmatic simulation engine",
        "Full CSV export of analyzed metrics",
        "24/7 priority support & SLA guarantees",
      ],
      buttonText: "Talk to Sales",
      buttonClass:
        "bg-primary text-[#050706] hover:bg-primary/95 shadow-[0_0_15px_rgba(120,252,214,0.2)]",
    },
  ]

  return (
    <section className="w-full px-5 overflow-hidden flex flex-col justify-start items-center my-0 py-8 md:py-14">
      <div className="self-stretch relative flex flex-col justify-center items-center gap-2 py-0">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="text-center text-foreground text-4xl md:text-5xl font-semibold leading-tight md:leading-[40px] uppercase tracking-wide">
            Pricing built for active traders
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm font-medium leading-tight">
            Choose a plan that fits your behavioral audit requirements, from individuals <br /> mapping their patterns to professional funds.
          </p>
        </div>
        <div className="pt-4">
          <div className="p-0.5 bg-muted rounded-lg outline outline-1 outline-[#0307120a] outline-offset-[-1px] flex justify-start items-center gap-1 md:mt-0">
            <button
              onClick={() => setIsAnnual(true)}
              className={`pl-2 pr-1 py-1 flex justify-start items-start gap-2 rounded-md ${isAnnual ? "bg-accent shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.08)]" : ""}`}
            >
              <span
                className={`text-center text-sm font-medium leading-tight ${isAnnual ? "text-accent-foreground" : "text-zinc-400"}`}
              >
                Annually
              </span>
            </button>
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-2 py-1 flex justify-start items-start rounded-md ${!isAnnual ? "bg-accent shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.08)]" : ""}`}
            >
              <span
                className={`text-center text-sm font-medium leading-tight ${!isAnnual ? "text-accent-foreground" : "text-zinc-400"}`}
              >
                Monthly
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="self-stretch px-5 flex flex-col md:flex-row justify-start items-stretch gap-6 mt-8 max-w-[1100px] mx-auto">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`flex-1 p-6 overflow-hidden rounded-2xl flex flex-col justify-between gap-8 border transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] ${
              plan.popular 
                ? "bg-primary border-primary shadow-[0_0_20px_rgba(120,252,214,0.15)] hover:shadow-[0_0_35px_rgba(120,252,214,0.3)] text-primary-foreground" 
                : "bg-[#050706]/60 border-white/10 hover:border-primary/30 hover:shadow-[0_0_25px_rgba(120,252,214,0.08)]"
            }`}
          >
            {/* Top Card Info */}
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
              <div className="self-stretch flex flex-col justify-start items-start gap-8">
                <div
                  className={`w-full h-5 text-sm font-bold uppercase tracking-wider flex items-center justify-between ${plan.popular ? "text-primary-foreground" : "text-zinc-200"}`}
                >
                  <span>{plan.name}</span>
                  {plan.popular && (
                    <span className="px-2.5 py-0.5 text-[9px] rounded-full bg-white text-primary font-bold uppercase tracking-widest">
                      Popular
                    </span>
                  )}
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="flex justify-start items-baseline gap-1.5">
                    <div
                      className={`relative h-10 flex items-center text-3xl font-extrabold font-mono ${plan.popular ? "text-primary-foreground" : "text-zinc-50"}`}
                    >
                      <span className="invisible">{isAnnual ? plan.annualPrice : plan.monthlyPrice}</span>
                      <span
                        className="absolute inset-0 flex items-center transition-all duration-500"
                        style={{
                          opacity: isAnnual ? 1 : 0,
                          transform: `scale(${isAnnual ? 1 : 0.8})`,
                          filter: `blur(${isAnnual ? 0 : 4}px)`,
                        }}
                        aria-hidden={!isAnnual}
                      >
                        {plan.annualPrice}
                      </span>
                      <span
                        className="absolute inset-0 flex items-center transition-all duration-500"
                        style={{
                          opacity: !isAnnual ? 1 : 0,
                          transform: `scale(${!isAnnual ? 1 : 0.8})`,
                          filter: `blur(${!isAnnual ? 0 : 4}px)`,
                        }}
                        aria-hidden={isAnnual}
                      >
                        {plan.monthlyPrice}
                      </span>
                    </div>
                    <div
                      className={`text-center text-xs font-mono ${plan.popular ? "text-primary-foreground/70" : "text-zinc-500"}`}
                    >
                      /month
                    </div>
                  </div>
                  <div
                    className={`self-stretch text-xs leading-normal ${plan.popular ? "text-primary-foreground/80" : "text-zinc-400"}`}
                  >
                    {plan.description}
                  </div>
                </div>
              </div>
              <button
                className={`self-stretch px-5 py-2.5 rounded-[40px] flex justify-center items-center font-bold text-sm h-11 transition-all hover:-translate-y-0.5 ${plan.buttonClass}`}
              >
                {plan.buttonText}
              </button>
            </div>

            {/* Bottom Features List */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4 border-t border-white/5 pt-4">
              <div
                className={`self-stretch text-2xs font-mono uppercase tracking-wider ${plan.popular ? "text-primary-foreground/75" : "text-zinc-500"}`}
              >
                {plan.name === "Free" ? "Get Started today:" : "Everything in Free +"}
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="self-stretch flex justify-start items-center gap-2">
                    <Check
                      className={`h-4 w-4 shrink-0 ${plan.popular ? "text-primary-foreground" : "text-primary"}`}
                      strokeWidth={2.5}
                    />
                    <div
                      className={`leading-tight font-normal text-xs text-left ${plan.popular ? "text-primary-foreground/90" : "text-zinc-300"}`}
                    >
                      {feature}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
