import Link from "next/link"
import Image from "next/image"
import { Star, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Restaurant } from "@/lib/types"
import { calculateDistance } from "@/lib/utils"

interface RestaurantCardProps {
  restaurant: Restaurant
  userLocation?: { lat: number; lng: number } | null
}

export function RestaurantCard({ restaurant, userLocation }: RestaurantCardProps) {
  const distance = userLocation
    ? calculateDistance(userLocation.lat, userLocation.lng, restaurant.location.lat, restaurant.location.lng)
    : null

  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative h-48 w-full">
          <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
        </div>
        <CardContent className="p-4">
          <h3 className="mb-1 text-lg font-semibold text-balance">{restaurant.name}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{restaurant.cuisine}</p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
          </div>
          {distance !== null && (
            <div className="mt-2 flex items-center gap-1 text-sm text-accent">
              <MapPin className="h-4 w-4" />
              <span>{distance.toFixed(1)} mi away</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
