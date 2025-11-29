"use client"

import React from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

export default function CartBar() {
  const { cart } = useCart()
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0)

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex items-center px-4 justify-between">
      <div className="flex items-center gap-2">
        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">{itemCount} items</span>
      </div>
      <Button asChild size="lg">
        <Link href="/cart">View Cart</Link>
      </Button>
    </div>
  )
}
