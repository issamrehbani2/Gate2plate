"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BackButton } from "@/components/back-button"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { Receipt, RotateCcw, Clock } from "lucide-react"

export default function OrdersPage() {
  const { orders, reorderAndPlace } = useCart()
  const router = useRouter()

  const deliveredOrders = orders.filter((order) => order.status === "delivered")

  const handleReorder = (orderId: string) => {
    const order = deliveredOrders.find((o) => o.id === orderId)
    if (order) {
      const newOrderId = reorderAndPlace(order)
      router.push(`/track/${newOrderId}`)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (deliveredOrders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <Receipt className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-2xl font-bold">No delivered orders yet</h2>
            <p className="mb-6 text-muted-foreground">Your completed order history will appear here</p>
            <Button onClick={() => router.push("/")}>Start Ordering</Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8">
        <BackButton />
        <h1 className="mb-6 text-3xl font-bold">Order History</h1>

        <div className="space-y-4">
          {deliveredOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{order.restaurantName}</h3>
                    <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
                    {order.description && (
                      <p className="mt-1 text-sm font-medium text-foreground">{order.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">${order.total.toFixed(2)}</p>
                    {order.estimatedDelivery && (
                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{order.estimatedDelivery}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4 space-y-2 border-t border-border pt-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Button variant="default" className="w-full gap-2" onClick={() => handleReorder(order.id)}>
                  <RotateCcw className="h-4 w-4" />
                  Order Again
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
