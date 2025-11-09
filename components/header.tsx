"use client"

import Link from "next/link"
import { ShoppingCart, History, Home, Package, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { AirportSelector } from "@/components/airport-selector"

export function Header() {
  const { cart, orders } = useCart()
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const activeOrderCount = orders.filter((order) => order.status !== "delivered").length

  return (
    <header className="relative sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-x-hidden pointer-events-auto">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">G</span>
          </div>
          <span className="text-lg sm:text-xl font-bold text-foreground">Gate2Plate</span>
        </Link>

        {/* Center selector hidden on small screens to avoid header overflow */}
        <div className="hidden sm:flex flex-1 justify-center mx-2">
          <AirportSelector />
        </div>

        <div className="flex items-center gap-1 sm:gap-2 pointer-events-auto">
          <div className="sm:hidden">
            <AirportSelector
              trigger={
                <Button variant="ghost" size="icon" aria-label="Select airport">
                  <MapPin className="h-5 w-5" />
                </Button>
              }
            />
          </div>

          <nav className="flex items-center gap-1 sm:gap-2 pointer-events-auto">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/active-orders">
                <Package className="h-5 w-5" />
                {activeOrderCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 min-w-5 px-1 text-xs">{activeOrderCount}</Badge>
                )}
                <span className="sr-only">Active Orders ({activeOrderCount})</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/orders">
                <History className="h-5 w-5" />
                <span className="sr-only">Order History</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 min-w-5 px-1 text-xs">{itemCount}</Badge>
                )}
                <span className="sr-only">Cart ({itemCount})</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
