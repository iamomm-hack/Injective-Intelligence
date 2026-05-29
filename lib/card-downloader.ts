import { BehaviorProfile } from "./engine"

export function downloadCardAsImage(profile: BehaviorProfile) {
  if (typeof window === "undefined") return

  const canvas = document.createElement("canvas")
  canvas.width = 680
  canvas.height = 1040
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Determine Rarity
  let rarity = "UNCOMMON"
  let accentColor = "#10b981" // emerald
  let rarityGlow = "rgba(16, 185, 129, 0.2)"
  
  if (profile.overallScore >= 85) {
    rarity = "MYTHICAL LEGEND"
    accentColor = "#a855f7" // purple
    rarityGlow = "rgba(168, 85, 247, 0.2)"
  } else if (profile.overallScore >= 70) {
    rarity = "RARE SPECS"
    accentColor = "#06b6d4" // cyan
    rarityGlow = "rgba(6, 182, 212, 0.2)"
  } else if (profile.archetype === "Volatility Surfer") {
    rarity = "CHAOTIC HIGH-LEVERAGE"
    accentColor = "#f43f5e" // rose
    rarityGlow = "rgba(244, 63, 94, 0.2)"
  }

  // Draw background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
  grad.addColorStop(0, "#0a0e0c")
  grad.addColorStop(0.5, "#040605")
  grad.addColorStop(1, "#020302")
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw grid pattern in background
  ctx.strokeStyle = "rgba(120, 252, 214, 0.025)"
  ctx.lineWidth = 1
  const gridSize = 40
  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke()
  }
  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
    ctx.stroke()
  }

  // Draw outer borders
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
  ctx.lineWidth = 1
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

  ctx.strokeStyle = accentColor
  ctx.lineWidth = 3
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40)

  // Scanline lines overlays
  ctx.fillStyle = "rgba(255, 255, 255, 0.01)"
  for (let y = 0; y < canvas.height; y += 6) {
    ctx.fillRect(20, y, canvas.width - 40, 2)
  }

  // Top Header text
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
  ctx.font = "bold 13px monospace"
  ctx.textAlign = "left"
  ctx.fillText("INJECTIVE DNA TRADER ARCHETYPE", 50, 65)

  // Rarity Pill
  const pillX = canvas.width - 240
  const pillY = 43
  const pillW = 190
  const pillH = 32
  
  ctx.fillStyle = "rgba(5, 7, 6, 0.8)"
  ctx.fillRect(pillX, pillY, pillW, pillH)
  
  ctx.strokeStyle = accentColor
  ctx.lineWidth = 1.5
  ctx.strokeRect(pillX, pillY, pillW, pillH)

  ctx.fillStyle = accentColor
  ctx.font = "bold 11px monospace"
  ctx.textAlign = "center"
  ctx.fillText(rarity, pillX + pillW / 2, pillY + 20)

  // Middle card visual
  const centerX = canvas.width / 2
  
  // Outer circle glow
  ctx.beginPath()
  ctx.arc(centerX, 210, 68, 0, Math.PI * 2)
  ctx.fillStyle = rarityGlow
  ctx.fill()

  // Inner avatar circle
  ctx.beginPath()
  ctx.arc(centerX, 210, 56, 0, Math.PI * 2)
  ctx.fillStyle = "#050706"
  ctx.fill()
  ctx.strokeStyle = accentColor
  ctx.lineWidth = 2
  ctx.stroke()

  // Trophy symbol
  ctx.fillStyle = accentColor
  ctx.font = "42px Arial"
  ctx.textAlign = "center"
  ctx.fillText("🏆", centerX, 225)

  // Archetype name
  ctx.fillStyle = "#ffffff"
  ctx.font = "extrabold 36px Arial"
  ctx.fillText(profile.archetype.toUpperCase(), centerX, 320)

  // Address label
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
  ctx.font = "14px monospace"
  const shortAddr = profile.address.slice(0, 16) + "..." + profile.address.slice(-10)
  ctx.fillText(`ID: ${shortAddr}`, centerX, 355)

  // Middle divider
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)"
  ctx.beginPath()
  ctx.moveTo(50, 390)
  ctx.lineTo(canvas.width - 50, 390)
  ctx.stroke()

  // Attributes Boxes Grid
  const stats = [
    { label: "🛡️ RISK RATING", val: profile.scores.riskDiscipline >= 80 ? "CONSERVATIVE" : profile.scores.riskDiscipline >= 55 ? "BALANCED" : "AGGRESSIVE" },
    { label: "⚡ POWER LEVEL", val: `LVL ${profile.overallScore} ALPHA` },
    { label: "🪙 PNL AFFINITY", val: `${profile.stats.netPnLUsd >= 0 ? "+" : ""}$${profile.stats.netPnLUsd.toLocaleString()}`, color: profile.stats.netPnLUsd >= 0 ? "#34d399" : "#f43f5e" },
    { label: "🧭 WIN RATE", val: `${profile.stats.winRate}%` }
  ]

  const boxW = 265
  const boxH = 85
  const startX = 50
  const startY = 425
  const gapX = 50
  const gapY = 35

  stats.forEach((item, idx) => {
    const col = idx % 2
    const row = Math.floor(idx / 2)
    const bx = startX + col * (boxW + gapX)
    const by = startY + row * (boxH + gapY)

    // Draw box background
    ctx.fillStyle = "rgba(5, 7, 6, 0.85)"
    ctx.fillRect(bx, by, boxW, boxH)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
    ctx.lineWidth = 1
    ctx.strokeRect(bx, by, boxW, boxH)

    // Draw item label
    ctx.textAlign = "left"
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
    ctx.font = "bold 10px monospace"
    ctx.fillText(item.label, bx + 16, by + 28)

    // Draw item value
    ctx.fillStyle = item.color || "#ffffff"
    ctx.font = "bold 18px monospace"
    ctx.fillText(item.val, bx + 16, by + 60)
  })

  // Bottom stats pills box
  const pillsY = 690
  const pillsW = canvas.width - 100
  const pillsH = 110

  ctx.fillStyle = "rgba(5, 7, 6, 0.6)"
  ctx.fillRect(50, pillsY, pillsW, pillsH)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
  ctx.strokeRect(50, pillsY, pillsW, pillsH)

  // Stat pillars
  ctx.textAlign = "center"
  ctx.font = "bold 12px monospace"

  ctx.fillStyle = "#34d399" // emerald
  ctx.fillText(`PATIENCE: ${profile.scores.patienceScore}`, 150, pillsY + 45)

  ctx.fillStyle = "#22d3ee" // cyan
  ctx.fillText(`STABILITY: ${profile.scores.emotionalStability}`, centerX, pillsY + 45)

  ctx.fillStyle = "#f43f5e" // rose
  ctx.fillText(`FOMO RISK: ${profile.scores.fomoProbability}`, canvas.width - 150, pillsY + 45)

  // Card quote/description
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
  ctx.font = "italic 13px sans-serif"
  ctx.fillText(`"Behavior profile generated deterministically from real Injective DEX activity"`, centerX, pillsY + 82)

  // Footer divider
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
  ctx.beginPath()
  ctx.moveTo(50, 875)
  ctx.lineTo(canvas.width - 50, 875)
  ctx.stroke()

  // Footer details
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
  ctx.font = "bold 11px monospace"
  ctx.fillText("INJECTIVE INTELLIGENCE COGNITIVE DECRYPTION SYSTEM", centerX, 925)
  ctx.font = "9px monospace"
  ctx.fillText("AUTHENTIC BLOCKCHAIN ANALYSIS RECORD // HACKATHON BUILD V1.0", centerX, 950)

  // Trigger Download
  const link = document.createElement("a")
  link.download = `Injective_Intelligence_RPG_${profile.archetype.replace(" ", "_")}.png`
  link.href = canvas.toDataURL("image/png")
  link.click()
}
