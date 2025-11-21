import type { Terminal } from "./types"

const airlineMapping: Record<string, string> = {
  AA: "American Airlines",
  DL: "Delta Air Lines",
  UA: "United Airlines",
  BA: "British Airways",
  AF: "Air France",
  EK: "Emirates",
  JL: "Japan Airlines",
  NH: "ANA",
  LH: "Lufthansa",
  QR: "Qatar Airways",
  SQ: "Singapore Airlines",
}

export function getAirlineFromFlightNumber(flightNumber: string): string {
  if (!flightNumber) return ""
  const m = flightNumber.trim().toUpperCase().match(/^([A-Z]{2,3})/)
  if (!m) return ""
  const code = m[1]
  return airlineMapping[code] || ""
}

export function pickGateFromTerminal(terminal: Terminal | undefined, flightNumber: string): string {
  if (!terminal || !terminal.gates || terminal.gates.length === 0) return ""
  if (!flightNumber) return terminal.gates[0]
  let sum = 0
  for (let i = 0; i < flightNumber.length; i++) {
    sum += flightNumber.charCodeAt(i)
  }
  const index = sum % terminal.gates.length
  return terminal.gates[index]
}

export function suggestBoardingTime(minutesFromNow = 60): string {
  const now = new Date()
  now.setMinutes(now.getMinutes() + minutesFromNow)
  const hh = now.getHours().toString().padStart(2, "0")
  const mm = now.getMinutes().toString().padStart(2, "0")
  return `${hh}:${mm}`
}

// Deterministic GUID-like id derived from a string (stable across runs)
export function getAirportGuid(seed: string): string {
  // simple hash (FNV-1a) to 128-bit hex then format as GUID
  let h1 = 2166136261 >>> 0
  for (let i = 0; i < seed.length; i++) {
    h1 ^= seed.charCodeAt(i)
    h1 = Math.imul(h1, 16777619) >>> 0
  }

  // produce 32 hex chars by hashing variations
  const parts: string[] = []
  for (let i = 0; i < 4; i++) {
    let v = h1 ^ (i * 2654435761)
    v = Math.imul(v, 1597334677) >>> 0
    parts.push(v.toString(16).padStart(8, "0"))
  }
  const hex = parts.join("") // 32 chars

  // format as xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx (version 4 style y uses high bits)
  const g = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-${((parseInt(hex.slice(16, 18), 16) & 0x3f) | 0x80).toString(16)}${hex.slice(18, 20)}-${hex.slice(20, 32)}`
  return g
}

// Returns minutes from now until the given boarding time (HH:MM).
// If the time is earlier than now, it is assumed to be on the next day.
export function minutesUntil(boardingTime: string): number {
  if (!boardingTime) return Infinity
  const parts = boardingTime.split(":")
  if (parts.length < 2) return Infinity
  const hh = parseInt(parts[0], 10)
  const mm = parseInt(parts[1], 10)
  if (Number.isNaN(hh) || Number.isNaN(mm)) return Infinity

  const now = new Date()
  const bt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm, 0, 0)

  if (bt.getTime() < now.getTime()) {
    // assume next day
    bt.setDate(bt.getDate() + 1)
  }

  return Math.round((bt.getTime() - now.getTime()) / (1000 * 60))
}
