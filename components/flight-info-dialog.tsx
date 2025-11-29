"use client"

import { useState, useEffect, useRef } from "react"
import { Plane, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Airport, FlightInfo } from "@/lib/types"
import { getAirlineFromFlightNumber, pickGateFromTerminal, suggestBoardingTime, getAirportGuid, minutesUntil } from "@/lib/flight"
import { flightsByAirport } from "@/lib/data"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FlightInfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  airport: Airport
  onSubmit: (flightInfo: FlightInfo) => void
}

export function FlightInfoDialog({ open, onOpenChange, airport, onSubmit }: FlightInfoDialogProps) {
  const [flightInfo, setFlightInfo] = useState<FlightInfo>({
    flightNumber: "",
    airline: "",
    boardingTime: "",
    gate: "",
    terminal: airport.terminals[0]?.id || "",
  })
  const [selectedTerminal, setSelectedTerminal] = useState(airport.terminals[0])
  const [timeWarning, setTimeWarning] = useState<string | null>(null)

  const handleTerminalChange = (terminalId: string) => {
    const terminal = airport.terminals.find((t) => t.id === terminalId)
    if (terminal) {
      setSelectedTerminal(terminal)
      setFlightInfo({ ...flightInfo, terminal: terminalId, gate: "" })
    }
  }

  const handleBoardingTimeChange = (time: string) => {
    setFlightInfo({ ...flightInfo, boardingTime: time })

    if (time) {
      const boardingTime = new Date(`2024-01-01T${time}`)
      const now = new Date(`2024-01-01T${new Date().toTimeString().slice(0, 5)}`)
      const diffMinutes = (boardingTime.getTime() - now.getTime()) / (1000 * 60)

      if (diffMinutes < 45) {
        setTimeWarning("Warning: Your boarding time is less than 45 minutes away. Delivery may not arrive in time.")
      } else {
        setTimeWarning(null)
      }
    }
  }

  const handleFlightNumberChange = (value: string) => {
    // only set the flight number while typing; auto-fill will run after a debounce
    setFlightInfo({ ...flightInfo, flightNumber: value })
  }

  const autoFillFromFlightNumber = () => {
    const flightNumber = flightInfo.flightNumber.trim()
    if (!flightNumber) return

    const airlineAuto = getAirlineFromFlightNumber(flightNumber)
    const updated: FlightInfo = { ...flightInfo }

    if (!updated.airline && airlineAuto) {
      updated.airline = airlineAuto
    }

    if (!updated.gate && selectedTerminal) {
      updated.gate = pickGateFromTerminal(selectedTerminal, flightNumber)
    }

    if (!updated.boardingTime) {
      updated.boardingTime = suggestBoardingTime(60)
    }

    setFlightInfo(updated)
  }
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    const flightNumber = flightInfo.flightNumber.trim()
    if (!flightNumber) return

    debounceRef.current = setTimeout(() => {
      const airlineAuto = getAirlineFromFlightNumber(flightNumber)
      const updated: FlightInfo = { ...flightInfo }

      if (!updated.airline && airlineAuto) {
        updated.airline = airlineAuto
      }

      // Fill gate if missing or if it isn't valid for the selected terminal
      if (selectedTerminal && (!updated.gate || !selectedTerminal.gates.includes(updated.gate))) {
        updated.gate = pickGateFromTerminal(selectedTerminal, flightNumber)
      }

      if (!updated.boardingTime) {
        updated.boardingTime = suggestBoardingTime(60)
      }

      setFlightInfo(updated)
      setShowAutoFields(true)
      setLockFields(true)
    }, 600)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [flightInfo.flightNumber, selectedTerminal])

  const [showAutoFields, setShowAutoFields] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [lockFields, setLockFields] = useState(false)

  useEffect(() => {
    // If flightNumber is cleared, hide auto fields and unlock fields
    if (!flightInfo.flightNumber.trim()) {
      setShowAutoFields(false)
      setLockFields(false)
    }
  }, [flightInfo.flightNumber])

  useEffect(() => {
    if (!open) {
      setLockFields(false)
      setShowAutoFields(false)
    }
  }, [open])

  const handleSubmit = () => {
    if (flightInfo.flightNumber && flightInfo.gate && flightInfo.boardingTime) {
      const diffMinutes = minutesUntil(flightInfo.boardingTime)

      if (diffMinutes < 60) {
        setSubmitError(`Cannot confirm order: boarding time is in ${diffMinutes} minute(s), which is less than 60 minutes from now.`)
        return
      }

      setSubmitError(null)
      onSubmit(flightInfo)
      onOpenChange(false)
    }
  }

  const isValid = flightInfo.flightNumber && flightInfo.gate && flightInfo.boardingTime

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Flight Information
          </DialogTitle>
          <DialogDescription>Enter your flight details for gate delivery at {airport.code} ({getAirportGuid(airport.code + airport.name).slice(0,8)})</DialogDescription>
        </DialogHeader>

          <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="flightNumber">Flight Number *</Label>
            { (flightsByAirport[airport.code] || []).length > 0 ? (
              <Select
                value={flightInfo.flightNumber}
                onValueChange={(value) => {
                  const available = flightsByAirport[airport.code] || []
                  const f = available.find((x) => x.flightNumber === value)
                  if (f) {
                    const term = airport.terminals.find((t) => t.id === f.terminal)
                    let newInfo: FlightInfo = { ...f }
                    if (term) {
                      setSelectedTerminal(term)
                      if (!term.gates.includes(newInfo.gate)) {
                        newInfo.gate = pickGateFromTerminal(term, f.flightNumber)
                      }
                    }

                    setFlightInfo(newInfo)
                    setShowAutoFields(true)
                    setLockFields(true)
                  }
                }}
              >
                <SelectTrigger id="flightNumber">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                      {(flightsByAirport[airport.code] || []).map((f) => (
                          <SelectItem key={f.flightNumber} value={f.flightNumber}>
                            {f.flightNumber}
                          </SelectItem>
                        ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id="flightNumber"
                placeholder="e.g., AA123"
                value={flightInfo.flightNumber}
                onChange={(e) => handleFlightNumberChange(e.target.value)}
              />
            )}
          </div>

          {showAutoFields && (
            <>
              <div className="space-y-2">
                <Label htmlFor="airline">Airline (Optional)</Label>
                <Input
                  id="airline"
                  placeholder="e.g., American Airlines"
                  value={flightInfo.airline}
                  onChange={(e) => setFlightInfo({ ...flightInfo, airline: e.target.value })}
                  disabled={lockFields}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="terminal">Terminal *</Label>
                <Select value={flightInfo.terminal} onValueChange={handleTerminalChange} disabled={lockFields}>
                  <SelectTrigger id="terminal">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {airport.terminals.map((terminal) => (
                      <SelectItem key={terminal.id} value={terminal.id}>
                        {terminal.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gate">Gate *</Label>
                <Select value={flightInfo.gate} onValueChange={(value) => setFlightInfo({ ...flightInfo, gate: value })} disabled={lockFields}>
                  <SelectTrigger id="gate">
                    <SelectValue placeholder="Select gate" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedTerminal?.gates.map((gate) => (
                      <SelectItem key={gate} value={gate}>
                        Gate {gate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="boardingTime" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Boarding Time *
                </Label>
                <Input
                  id="boardingTime"
                  type="time"
                  value={flightInfo.boardingTime}
                  onChange={(e) => handleBoardingTimeChange(e.target.value)}
                  disabled={lockFields}
                />
              </div>
            </>
          )}

          {timeWarning && (
            <Alert variant="destructive">
              <AlertDescription>{timeWarning}</AlertDescription>
            </Alert>
          )}

          {submitError && (
            <Alert variant="destructive">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <Button className="w-full" onClick={handleSubmit} disabled={!isValid}>
            Confirm & Place Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
