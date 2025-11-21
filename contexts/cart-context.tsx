"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItem, Order } from "@/lib/types"
import { restaurants } from "@/lib/data"

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  orders: Order[]
  placeOrder: (restaurantId: string, restaurantName: string) => string
  reorderAndPlace: (order: Order) => string
  cancelOrder: (orderId: string) => void
  markAsDelivered: (orderId: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders))
    }
  }, [orders])

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i))
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const placeOrder = (restaurantId: string, restaurantName: string) => {
    const restaurant = restaurants.find((r) => r.id === restaurantId)
    const deliveryTime = restaurant?.deliveryTime || "30-40 min"

    const now = new Date()
    const deliveryMinutes = Number.parseInt(deliveryTime.split("-")[1]) || 40
    const estimatedTime = new Date(now.getTime() + deliveryMinutes * 60000)
    const estimatedDelivery = estimatedTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    const description = `${itemCount} item${itemCount !== 1 ? "s" : ""} from ${restaurantName}`

    const deliveryLat = 37.7749 + (Math.random() - 0.5) * 0.02
    const deliveryLng = -122.4194 + (Math.random() - 0.5) * 0.02
    const currentLat = 37.7749 + (Math.random() - 0.5) * 0.04
    const currentLng = -122.4194 + (Math.random() - 0.5) * 0.04

    const orderId = Date.now().toString()

    const order: Order = {
      id: orderId,
      restaurantId,
      restaurantName,
      items: [...cart],
      total: getCartTotal(),
      date: new Date().toISOString(),
      estimatedDelivery,
      description,
      status: "on-the-way",
      deliveryLocation: {
        lat: deliveryLat,
        lng: deliveryLng,
        address: "123 Main St, San Francisco, CA 94102",
      },
      currentLocation: {
        lat: currentLat,
        lng: currentLng,
      },
    }
    setOrders((prev) => [order, ...prev])
    clearCart()
    return orderId
  }

  const reorderAndPlace = (order: Order) => {
    const restaurant = restaurants.find((r) => r.id === order.restaurantId)
    const deliveryTime = restaurant?.deliveryTime || "30-40 min"

    const now = new Date()
    const deliveryMinutes = Number.parseInt(deliveryTime.split("-")[1]) || 40
    const estimatedTime = new Date(now.getTime() + deliveryMinutes * 60000)
    const estimatedDelivery = estimatedTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })

    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)
    const description = `${itemCount} item${itemCount !== 1 ? "s" : ""} from ${order.restaurantName}`

    const deliveryLat = 37.7749 + (Math.random() - 0.5) * 0.02
    const deliveryLng = -122.4194 + (Math.random() - 0.5) * 0.02
    const currentLat = 37.7749 + (Math.random() - 0.5) * 0.04
    const currentLng = -122.4194 + (Math.random() - 0.5) * 0.04

    const newOrderId = Date.now().toString()

    const newOrder: Order = {
      id: newOrderId,
      restaurantId: order.restaurantId,
      restaurantName: order.restaurantName,
      items: [...order.items],
      total: order.items.reduce((total, item) => total + item.price * item.quantity, 0),
      date: new Date().toISOString(),
      estimatedDelivery,
      description,
      status: "on-the-way",
      deliveryLocation: {
        lat: deliveryLat,
        lng: deliveryLng,
        address: "123 Main St, San Francisco, CA 94102",
      },
      currentLocation: {
        lat: currentLat,
        lng: currentLng,
      },
    }
    setOrders((prev) => [newOrder, ...prev])
    return newOrderId
  }

  // Adding cancelOrder function to remove order from list
  const cancelOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId))
  }

  const markAsDelivered = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: "delivered" as const } : order)),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        orders,
        placeOrder,
        reorderAndPlace,
        cancelOrder,
        markAsDelivered,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
