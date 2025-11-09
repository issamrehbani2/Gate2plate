"use client"

import { useState } from "react"
import { Plane, Clock, Globe, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { airportsByCountry } from "@/lib/data"
import { useLocation } from "@/contexts/location-context"
import type { FlightInfo, Terminal } from "@/lib/types"

export function AirportSelector() {
  const { selectedAirport, setSelectedAirport, flightInfo, setFlightInfo } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<"country" | "airport" | "flight">("country")
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [selectedAirportTemp, setSelectedAirportTemp] = useState(selectedAirport)
  const [flightInfoTemp, setFlightInfoTemp] = useState<FlightInfo>(
    flightInfo || {
      flightNumber: "",
      airline: "",
      boardingTime: "",
      gate: "",
      terminal: "",
    },
  )
  const [selectedTerminal, setSelectedTerminal] = useState<Terminal | undefined>(undefined)
  const [timeWarning, setTimeWarning] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
    setStep("airport")
  }

  const handleAirportSelect = (airportCode: string) => {
    const allAirports = Object.values(airportsByCountry).flat()
    const airport = allAirports.find((a) => a.code === airportCode)
    if (airport) {
      setSelectedAirportTemp(airport)
      setSelectedTerminal(airport.terminals[0])
      setFlightInfoTemp({
        ...flightInfoTemp,
        terminal: airport.terminals[0]?.id || "",
        gate: "",
      })
      setStep("flight")
    }
  }

  const handleTerminalChange = (terminalId: string) => {
    const terminal = selectedAirportTemp?.terminals.find((t) => t.id === terminalId)
    if (terminal) {
      setSelectedTerminal(terminal)
      setFlightInfoTemp({ ...flightInfoTemp, terminal: terminalId, gate: "" })
    }
  }

  const handleBoardingTimeChange = (time: string) => {
    setFlightInfoTemp({ ...flightInfoTemp, boardingTime: time })

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

  const handleConfirm = () => {
    if (selectedAirportTemp && flightInfoTemp.flightNumber && flightInfoTemp.gate && flightInfoTemp.boardingTime) {
      setSelectedAirport(selectedAirportTemp)
      setFlightInfo(flightInfoTemp)
      setIsOpen(false)
      setStep("country")
      setSelectedCountry("")
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setStep("country")
      setSelectedCountry("")
      setTimeWarning(null)
    }
  }

  const isValid = flightInfoTemp.flightNumber && flightInfoTemp.gate && flightInfoTemp.boardingTime

  const filteredCountries = Object.keys(airportsByCountry).filter((country) =>
    country.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const availableAirports = selectedCountry ? airportsByCountry[selectedCountry] || [] : []

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-3">
          <Plane className="h-4 w-4" />
          <span className="max-w-[150px] truncate text-sm">
            {selectedAirport && flightInfo ? `${selectedAirport.code} - Gate ${flightInfo.gate}` : "Select Airport"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        {step === "country" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Select Country
              </DialogTitle>
              <DialogDescription>Choose your country to see available airports</DialogDescription>
            </DialogHeader>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              <RadioGroup value={selectedCountry} onValueChange={handleCountrySelect}>
                {filteredCountries.map((country) => (
                  <div key={country} className="flex items-center space-x-3 rounded-lg border p-4">
                    <RadioGroupItem value={country} id={country} />
                    <Label htmlFor={country} className="flex-1 cursor-pointer">
                      <div className="font-medium">{country}</div>
                      <div className="text-sm text-muted-foreground">
                        {airportsByCountry[country].length} airport{airportsByCountry[country].length > 1 ? "s" : ""}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {filteredCountries.length === 0 && (
                <div className="py-8 text-center text-sm text-muted-foreground">No countries found</div>
              )}
            </div>
          </>
        ) : step === "airport" ? (
          <>
            <DialogHeader>
              <DialogTitle>Select Airport</DialogTitle>
              <DialogDescription>Choose your airport in {selectedCountry}</DialogDescription>
            </DialogHeader>

            <RadioGroup value={selectedAirportTemp?.code} onValueChange={handleAirportSelect}>
              {availableAirports.map((airport) => (
                <div key={airport.code} className="flex items-center space-x-3 rounded-lg border p-4">
                  <RadioGroupItem value={airport.code} id={airport.code} />
                  <Label htmlFor={airport.code} className="flex-1 cursor-pointer">
                    <div className="font-medium">{airport.code}</div>
                    <div className="text-sm text-muted-foreground">{airport.name}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button variant="outline" className="w-full bg-transparent" onClick={() => setStep("country")}>
              Back to Countries
            </Button>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Flight Information
              </DialogTitle>
              <DialogDescription>
                Enter your flight details for gate delivery at {selectedAirportTemp?.code}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="airline">Airline (Optional)</Label>
                <Input
                  id="airline"
                  placeholder="e.g., American Airlines"
                  value={flightInfoTemp.airline}
                  onChange={(e) => setFlightInfoTemp({ ...flightInfoTemp, airline: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="flightNumber">Flight Number *</Label>
                <Input
                  id="flightNumber"
                  placeholder="e.g., AA123"
                  value={flightInfoTemp.flightNumber}
                  onChange={(e) => setFlightInfoTemp({ ...flightInfoTemp, flightNumber: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="terminal">Terminal *</Label>
                <Select value={flightInfoTemp.terminal} onValueChange={handleTerminalChange}>
                  <SelectTrigger id="terminal">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedAirportTemp?.terminals.map((terminal) => (
                      <SelectItem key={terminal.id} value={terminal.id}>
                        {terminal.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gate">Gate *</Label>
                <Select
                  value={flightInfoTemp.gate}
                  onValueChange={(value) => setFlightInfoTemp({ ...flightInfoTemp, gate: value })}
                >
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
                  value={flightInfoTemp.boardingTime}
                  onChange={(e) => handleBoardingTimeChange(e.target.value)}
                />
              </div>

              {timeWarning && (
                <Alert variant="destructive">
                  <AlertDescription>{timeWarning}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep("airport")}>
                  Back
                </Button>
                <Button className="flex-1" onClick={handleConfirm} disabled={!isValid}>
                  Confirm
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
