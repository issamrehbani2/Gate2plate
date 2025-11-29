import { notFound } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Star, Clock, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { MenuItemCard } from "@/components/menu-item-card"
import { restaurants } from "@/lib/data"
import CartBar from "@/components/cart-bar"

export function generateStaticParams() {
  return restaurants.map((restaurant) => ({
    id: restaurant.id,
  }))
}

export default async function RestaurantPage({ params }: { params: { id: string } }) {
  // In some Next.js versions `params` may be a Promise — unwrap it to safely access `id`.
  const { id } = await params

  const restaurant = restaurants.find((r) => r.id === id)

  if (!restaurant) {
    notFound()
  }

  const categories = Array.from(new Set(restaurant.menu.map((item) => item.category)))

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Restaurants
          </Link>
        </Button>

        <div className="mb-8">
          <div className="relative mb-4 h-40 sm:h-64 w-full overflow-hidden rounded-lg sm:rounded-xl">
            <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" priority />
          </div>
          <h1 className="mb-2 text-xl sm:text-3xl font-bold text-balance">{restaurant.name}</h1>
          <p className="mb-3 text-base sm:text-lg text-muted-foreground">{restaurant.cuisine}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{restaurant.rating} Rating</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-6">
            <h2 className="mb-3 text-lg sm:text-2xl font-bold sticky top-16 bg-background/95 backdrop-blur-sm py-2 -mx-4 px-4">{category}</h2>
            <div className="grid gap-4">
              {restaurant.menu
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
            </div>
          </div>
        ))}
      </main>
      <CartBar />
    </div>
  )
}
