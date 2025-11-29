"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackButton } from "@/components/back-button"
import { Header } from "@/components/header"
import { MapPin, Clock, Package, X, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ActiveOrdersPage() {
  const { orders, cancelOrder, markAsDelivered } = useCart()

  // Filter only active orders (not delivered)
  const activeOrders = orders.filter((order) => order.status !== "delivered")

  if (activeOrders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-16">
          <BackButton />
          <div className="mx-auto max-w-md text-center">
            <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <p className="mb-4 text-center text-muted-foreground">No active orders at the moment</p>
            <Button asChild>
              <Link href="/">Browse Restaurants</Link>
            </Button>
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
        <h1 className="mb-6 text-3xl font-bold">Active Orders</h1>
        <div className="grid gap-6">
          {activeOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{order.restaurantName}</CardTitle>
                    <CardDescription className="mt-1">{order.description}</CardDescription>
                  </div>
                  <Badge variant="default" className="bg-orange-500">
                    {order.status === "preparing" ? "Preparing" : "On the way"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Estimated delivery: {order.estimatedDelivery}</span>
                </div>
                {order.deliveryLocation?.address && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{order.deliveryLocation.address}</span>
                  </div>
                )}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Order Items:</p>
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-muted-foreground">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-lg font-semibold">Total: ${order.total.toFixed(2)}</span>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="default"
                      className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                      onClick={() => markAsDelivered(order.id)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark Delivered
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="default">
                          <X className="mr-2 h-4 w-4" />
                          Cancel Order
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel this order? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep Order</AlertDialogCancel>
                          <AlertDialogAction onClick={() => cancelOrder(order.id)}>Cancel Order</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button asChild>
                      <Link href={`/track/${order.id}`}>
                        <MapPin className="mr-2 h-4 w-4" />
                        Track Order
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
