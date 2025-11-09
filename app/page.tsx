"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { RestaurantCard } from "@/components/restaurant-card"
import { restaurants } from "@/lib/data"
import { calculateDistance } from "@/lib/utils"
import { MapPin, AlertCircle, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLocation } from "@/contexts/location-context"

export default function HomePage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [sortedRestaurants, setSortedRestaurants] = useState(restaurants)
  const { currentAddress, selectedAirport } = useLocation()

  useEffect(() => {
    if (currentAddress) {
      const location = { lat: currentAddress.lat, lng: currentAddress.lng }
      setUserLocation(location)
      setLocationError(null)

      const filteredRestaurants = selectedAirport
        ? restaurants.filter((r) => r.airport === selectedAirport.code)
        : restaurants

      const sorted = [...filteredRestaurants].sort((a, b) => {
        const distA = calculateDistance(location.lat, location.lng, a.location.lat, a.location.lng)
        const distB = calculateDistance(location.lat, location.lng, b.location.lat, b.location.lng)
        return distA - distB
      })
      setSortedRestaurants(sorted)
    }
  }, [currentAddress, selectedAirport])

  const handlePositionUpdate = (position: GeolocationPosition) => {
    const location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }
    setUserLocation(location)
    setLocationError(null)

    const filteredRestaurants = selectedAirport
      ? restaurants.filter((r) => r.airport === selectedAirport.code)
      : restaurants

    const sorted = [...filteredRestaurants].sort((a, b) => {
      const distA = calculateDistance(location.lat, location.lng, a.location.lat, a.location.lng)
      const distB = calculateDistance(location.lat, location.lng, b.location.lat, b.location.lng)
      return distA - distB
    })
    setSortedRestaurants(sorted)
  }

  const handleGeolocationError = (error: GeolocationPositionError) => {
    let msg = "Unable to get your location."
    // Code 0 typically means the permission was not granted yet
    if (error.code === 0) {
      msg = "Please grant location permission in your browser settings."
    } else if (error.code === 1) {
      msg = "Location access was denied. Please enable location services in your browser settings and try again."
    } else if (error.code === 2) {
      msg = "Location not available. Please check if location services are enabled."
    } else if (error.code === 3) {
      msg = "Location request timed out. Please check your connection and try again."
    }
    setLocationError(msg)
    // Log the full error for debugging
    console.error("Geolocation error details:", {
      code: error.code,
      message: error.message,
      PERMISSION_DENIED: error.PERMISSION_DENIED,
      POSITION_UNAVAILABLE: error.POSITION_UNAVAILABLE,
      TIMEOUT: error.TIMEOUT
    })
  }

  useEffect(() => {
    if (!currentAddress && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        handlePositionUpdate,
        handleGeolocationError,
        { 
          enableHighAccuracy: true, 
          timeout: 10000,
          maximumAge: 0 
        }
      )
    } else if (!currentAddress) {
      setLocationError("Location services not available in your browser.")
    }
  }, [currentAddress, selectedAirport])

  const requestLocation = () => {
    setLocationError(null)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        handlePositionUpdate,
        handleGeolocationError,
        { 
          enableHighAccuracy: true, 
          timeout: 10000,
          maximumAge: 0 
        }
      )
    }
  }

  const enterLocationManually = () => {
    setLocationError(null)
    // Use input fields that work well on mobile
    const userLat = window.prompt('Enter latitude (e.g. 40.6413)')
    if (!userLat) return
    
    const userLng = window.prompt('Enter longitude (e.g. -73.7781)')
    if (!userLng) return

    const lat = parseFloat(userLat)
    const lng = parseFloat(userLng)
    
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      alert('Please enter valid numbers for latitude and longitude')
      return
    }
    
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      alert('Please enter valid coordinates:\nLatitude: -90 to 90\nLongitude: -180 to 180')
      return
    }

    setUserLocation({ lat, lng })
    
    // Update restaurants with new location
    const filteredRestaurants = selectedAirport
      ? restaurants.filter((r) => r.airport === selectedAirport.code)
      : restaurants

    const sorted = [...filteredRestaurants].sort((a, b) => {
      const distA = calculateDistance(lat, lng, a.location.lat, a.location.lng)
      const distB = calculateDistance(lat, lng, b.location.lat, b.location.lng)
      return distA - distB
    })
    setSortedRestaurants(sorted)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-balance">Discover Restaurants</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            {selectedAirport ? `Gate delivery at ${selectedAirport.name}` : "Order from your favorite local spots"}
          </p>

          <div className="mt-4">
            {selectedAirport && (
              <div className="flex items-center gap-2 text-sm text-accent mb-2">
                <Plane className="h-4 w-4" />
                <span>Showing restaurants near {selectedAirport.code}</span>
              </div>
            )}

            {locationError ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span className="mr-4">{locationError}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={requestLocation}>
                      Try Again
                    </Button>
                    <Button variant="outline" size="sm" onClick={enterLocationManually}>
                      Enter Manually
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            ) : userLocation || currentAddress ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{currentAddress ? `Delivering to ${currentAddress.name}` : "Showing restaurants near you"}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 animate-pulse" />
                <span>Getting your location...</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} userLocation={userLocation} />
          ))}
        </div>
      </main>
    </div>
  )
}
