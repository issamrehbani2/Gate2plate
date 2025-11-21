"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { SavedAddress, Airport, FlightInfo } from "@/lib/types"

interface LocationContextType {
  addresses: SavedAddress[]
  currentAddress: SavedAddress | null
  addAddress: (address: Omit<SavedAddress, "id">) => void
  removeAddress: (id: string) => void
  setCurrentAddress: (id: string) => void
  updateAddress: (id: string, updates: Partial<SavedAddress>) => void
  selectedAirport: Airport | null
  setSelectedAirport: (airport: Airport | null) => void
  flightInfo: FlightInfo | null
  setFlightInfo: (info: FlightInfo | null) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<SavedAddress[]>([])
  const [currentAddress, setCurrentAddressState] = useState<SavedAddress | null>(null)
  const [selectedAirport, setSelectedAirportState] = useState<Airport | null>(null)
  const [flightInfo, setFlightInfoState] = useState<FlightInfo | null>(null)

  useEffect(() => {
    const savedAddresses = localStorage.getItem("savedAddresses")
    if (savedAddresses) {
      const parsed = JSON.parse(savedAddresses)
      setAddresses(parsed)
      const defaultAddr = parsed.find((addr: SavedAddress) => addr.isDefault)
      setCurrentAddressState(defaultAddr || parsed[0] || null)
    }

    const savedAirport = localStorage.getItem("selectedAirport")
    if (savedAirport) {
      setSelectedAirportState(JSON.parse(savedAirport))
    }

    const savedFlightInfo = localStorage.getItem("flightInfo")
    if (savedFlightInfo) {
      setFlightInfoState(JSON.parse(savedFlightInfo))
    }
  }, [])

  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem("savedAddresses", JSON.stringify(addresses))
    }
  }, [addresses])

  useEffect(() => {
    if (selectedAirport) {
      localStorage.setItem("selectedAirport", JSON.stringify(selectedAirport))
    } else {
      localStorage.removeItem("selectedAirport")
    }
  }, [selectedAirport])

  useEffect(() => {
    if (flightInfo) {
      localStorage.setItem("flightInfo", JSON.stringify(flightInfo))
    } else {
      localStorage.removeItem("flightInfo")
    }
  }, [flightInfo])

  const addAddress = (address: Omit<SavedAddress, "id">) => {
    const newAddress: SavedAddress = {
      ...address,
      id: Date.now().toString(),
    }
    setAddresses((prev) => {
      const updated = address.isDefault ? prev.map((addr) => ({ ...addr, isDefault: false })) : prev
      return [...updated, newAddress]
    })
    if (address.isDefault || addresses.length === 0) {
      setCurrentAddressState(newAddress)
    }
  }

  const removeAddress = (id: string) => {
    setAddresses((prev) => {
      const filtered = prev.filter((addr) => addr.id !== id)
      if (currentAddress?.id === id && filtered.length > 0) {
        setCurrentAddressState(filtered[0])
      }
      return filtered
    })
  }

  const setCurrentAddress = (id: string) => {
    const address = addresses.find((addr) => addr.id === id)
    if (address) {
      setCurrentAddressState(address)
    }
  }

  const updateAddress = (id: string, updates: Partial<SavedAddress>) => {
    setAddresses((prev) =>
      prev.map((addr) => {
        if (addr.id === id) {
          return { ...addr, ...updates }
        }
        if (updates.isDefault) {
          return { ...addr, isDefault: false }
        }
        return addr
      }),
    )
    if (updates.isDefault) {
      const updatedAddr = addresses.find((addr) => addr.id === id)
      if (updatedAddr) {
        setCurrentAddressState({ ...updatedAddr, ...updates })
      }
    }
  }

  const setSelectedAirport = (airport: Airport | null) => {
    setSelectedAirportState(airport)
    if (!airport) {
      setFlightInfoState(null)
    }
  }

  const setFlightInfo = (info: FlightInfo | null) => {
    setFlightInfoState(info)
  }

  return (
    <LocationContext.Provider
      value={{
        addresses,
        currentAddress,
        addAddress,
        removeAddress,
        setCurrentAddress,
        updateAddress,
        selectedAirport,
        setSelectedAirport,
        flightInfo,
        setFlightInfo,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider")
  }
  return context
}
