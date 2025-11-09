"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BackButton } from "@/components/back-button"
import type { Order } from "@/lib/types"
import { MapPin, Clock, Package, Navigation, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

export default function TrackOrderPage() {
  const params = useParams()
  const router = useRouter()
  const { markAsDelivered } = useCart()
  const [order, setOrder] = useState<Order | null>(null)
  const [distance, setDistance] = useState<number>(0)

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const foundOrder = orders.find((o: Order) => o.id === params.id)
    if (foundOrder) {
      setOrder(foundOrder)
      // Calculate distance (Haversine formula simulation)
      if (foundOrder.currentLocation && foundOrder.deliveryLocation) {
        const dist = calculateDistance(
          foundOrder.currentLocation.lat,
          foundOrder.currentLocation.lng,
          foundOrder.deliveryLocation.lat,
          foundOrder.deliveryLocation.lng,
        )
        setDistance(dist)
      }
    }
  }, [params.id])

  // Calculate distance between two coordinates
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959 // Earth's radius in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-500"
      case "on-the-way":
        return "bg-blue-500"
      case "delivered":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "preparing":
        return "Preparing Your Order"
      case "on-the-way":
        return "Driver is on the way"
      case "delivered":
        return "Delivered"
      default:
        return status
    }
  }

  const handleMarkAsDelivered = () => {
    if (order) {
      markAsDelivered(order.id)
      // Reload order to show updated status
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      const updatedOrder = orders.find((o: Order) => o.id === params.id)
      if (updatedOrder) {
        setOrder(updatedOrder)
      }
    }
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-2xl font-bold">Order not found</h2>
            <Button onClick={() => router.push("/orders")}>View All Orders</Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <BackButton />
          <h1 className="mb-6 text-3xl font-bold">Track Your Order</h1>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Map Section */}
            <Card className="lg:col-span-2">
              <CardContent className="p-0">
                <div className="relative h-96 w-full overflow-hidden rounded-lg bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-full w-full">
                      {/* Simple map visualization */}
                      <div
                        className="absolute rounded-full bg-primary p-3 shadow-lg"
                        style={{
                          left: `${((order.deliveryLocation.lng + 122.45) / 0.05) * 100}%`,
                          top: `${((37.8 - order.deliveryLocation.lat) / 0.05) * 100}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <MapPin className="h-6 w-6 text-primary-foreground" />
                      </div>
                      {order.currentLocation && order.status !== "delivered" && (
                        <div
                          className="absolute animate-pulse rounded-full bg-blue-500 p-3 shadow-lg"
                          style={{
                            left: `${((order.currentLocation.lng + 122.45) / 0.05) * 100}%`,
                            top: `${((37.8 - order.currentLocation.lat) / 0.05) * 100}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <Navigation className="h-6 w-6 text-white" />
                        </div>
                      )}
                      {/* Background grid pattern */}
                      <div
                        className="h-full w-full"
                        style={{
                          backgroundImage: `
                            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
                          `,
                          backgroundSize: "40px 40px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Status */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Order Status</h2>
                  <Badge className={`${getStatusColor(order.status)} text-white`}>{getStatusText(order.status)}</Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Estimated Delivery</p>
                      <p className="text-lg font-bold text-primary">{order.estimatedDelivery}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Navigation className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Distance</p>
                      <p className="text-lg font-bold">{distance.toFixed(2)} miles away</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Delivery Address</p>
                      <p className="text-sm text-muted-foreground">{order.deliveryLocation.address}</p>
                    </div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mt-6 space-y-3 border-t border-border pt-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-3 w-3 rounded-full ${order.status === "preparing" || order.status === "on-the-way" || order.status === "delivered" ? "bg-primary" : "bg-muted"}`}
                    />
                    <span className="text-sm font-medium">Order Placed</span>
                  </div>
                  <div className="ml-1.5 h-8 w-0.5 bg-border" />
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-3 w-3 rounded-full ${order.status === "on-the-way" || order.status === "delivered" ? "bg-primary" : "bg-muted"}`}
                    />
                    <span className="text-sm font-medium">On the way</span>
                  </div>
                  <div className="ml-1.5 h-8 w-0.5 bg-border" />
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-3 w-3 rounded-full ${order.status === "delivered" ? "bg-primary" : "bg-muted"}`}
                    />
                    <span className="text-sm font-medium">Delivered</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-bold">Order Details</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Restaurant</p>
                    <p className="font-semibold">{order.restaurantName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Items</p>
                    <div className="mt-2 space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-primary">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex gap-3">
            <Button onClick={() => router.push("/orders")} variant="outline" className="flex-1">
              View All Orders
            </Button>
            <Button onClick={() => router.push("/")} className="flex-1">
              Order More
            </Button>
            {order?.status !== "delivered" && (
              <Button onClick={handleMarkAsDelivered} variant="default" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Mark as Delivered
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
