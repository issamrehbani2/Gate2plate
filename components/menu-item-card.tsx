"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { MenuItem } from "@/lib/types"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface MenuItemCardProps {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart({ ...item, quantity: 1 })
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex gap-4 p-4">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-lg">
          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col justify-between min-w-0">
          <div>
            <h4 className="font-semibold text-balance">{item.name}</h4>
            <p className="mt-1 text-sm text-muted-foreground text-pretty line-clamp-2">{item.description}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
            <Button size="sm" onClick={handleAddToCart} className="gap-1 whitespace-nowrap">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
