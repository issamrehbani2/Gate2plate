"use client"

import { useState } from "react"
import { Plane, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Airport, FlightInfo } from "@/lib/types"
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

  const handleSubmit = () => {
    if (flightInfo.flightNumber && flightInfo.gate && flightInfo.boardingTime) {
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
          <DialogDescription>Enter your flight details for gate delivery at {airport.code}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="airline">Airline (Optional)</Label>
            <Input
              id="airline"
              placeholder="e.g., American Airlines"
              value={flightInfo.airline}
              onChange={(e) => setFlightInfo({ ...flightInfo, airline: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="flightNumber">Flight Number *</Label>
            <Input
              id="flightNumber"
              placeholder="e.g., AA123"
              value={flightInfo.flightNumber}
              onChange={(e) => setFlightInfo({ ...flightInfo, flightNumber: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="terminal">Terminal *</Label>
            <Select value={flightInfo.terminal} onValueChange={handleTerminalChange}>
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
            <Select value={flightInfo.gate} onValueChange={(value) => setFlightInfo({ ...flightInfo, gate: value })}>
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
            />
          </div>

          {timeWarning && (
            <Alert variant="destructive">
              <AlertDescription>{timeWarning}</AlertDescription>
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
