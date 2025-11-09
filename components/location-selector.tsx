"use client"

import { useState } from "react"
import { MapPin, Plus, Home, Briefcase, Trash2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLocation } from "@/contexts/location-context"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useIsMobile } from "@/hooks/use-mobile"

export function LocationSelector() {
  const { addresses, currentAddress, addAddress, removeAddress, setCurrentAddress } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
  })
  const isMobile = useIsMobile()

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.address) {
      // Default coordinates for San Francisco area
      const lat = 37.7749 + (Math.random() - 0.5) * 0.1
      const lng = -122.4194 + (Math.random() - 0.5) * 0.1

      addAddress({
        name: newAddress.name,
        address: newAddress.address,
        lat,
        lng,
        isDefault: addresses.length === 0,
      })
      setNewAddress({ name: "", address: "" })
      setIsAddingNew(false)
    }
  }

  const getIcon = (name: string) => {
    const lower = name.toLowerCase()
    if (lower.includes("home")) return <Home className="h-4 w-4" />
    if (lower.includes("work") || lower.includes("office")) return <Briefcase className="h-4 w-4" />
    return <MapPin className="h-4 w-4" />
  }

  const triggerButton = (
    <Button variant="ghost" className="flex items-center gap-2 px-3">
      <MapPin className="h-4 w-4" />
      <span className="max-w-[150px] truncate text-sm">
        {currentAddress ? currentAddress.name : "Add Location"}
      </span>
    </Button>
  )

  const content = (
    <>
      <DialogHeader>
        <DialogTitle>Delivery Location</DialogTitle>
        <DialogDescription>Select or add a delivery address</DialogDescription>
      </DialogHeader>

      {!isAddingNew ? (
        <div className="space-y-4">
          <RadioGroup
            value={currentAddress?.id}
            onValueChange={(value) => {
              setCurrentAddress(value)
              setIsOpen(false)
            }}
          >
            {addresses.map((addr) => (
              <div key={addr.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3 flex-1">
                  <RadioGroupItem value={addr.id} id={addr.id} />
                  <label htmlFor={addr.id} className="flex items-start gap-2 cursor-pointer flex-1">
                    <div className="mt-0.5">{getIcon(addr.name)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{addr.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{addr.address}</div>
                    </div>
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeAddress(addr.id)
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </RadioGroup>

          <Button onClick={() => setIsAddingNew(true)} className="w-full" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add New Address
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Label</Label>
            <Input
              id="name"
              placeholder="e.g., Home, Work, Office"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="123 Main St, City, State ZIP"
              value={newAddress.address}
              onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddAddress} className="flex-1">
              <Check className="mr-2 h-4 w-4" />
              Save Address
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddingNew(false)
                setNewAddress({ name: "", address: "" })
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  )

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
        <DrawerContent className="max-h-[85vh] overflow-y-auto px-4 pb-6 pt-4">
          <div className="mx-auto flex w-full max-w-md flex-col gap-4">{content}</div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-w-md">{content}</DialogContent>
    </Dialog>
  )
}
