import { NextResponse } from "next/server"
import { generateBehaviorProfile } from "@/lib/engine"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params
  if (!address) {
    return NextResponse.json({ error: "Missing address parameter" }, { status: 400 })
  }

  try {
    const profile = await generateBehaviorProfile(address)
    return NextResponse.json(profile)
  } catch (err: any) {
    console.error(`Error in /api/wallet/${address}:`, err)
    return NextResponse.json({ error: err.message || "Failed to generate behavior profile" }, { status: 500 })
  }
}
