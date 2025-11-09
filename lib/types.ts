export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  deliveryTime: string
  image: string
  menu: MenuItem[]
  location: {
    lat: number
    lng: number
  }
  airport?: string
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface Order {
  id: string
  restaurantId: string
  restaurantName: string
  items: CartItem[]
  total: number
  date: string
  estimatedDelivery: string
  description: string
  status: "preparing" | "on-the-way" | "delivered"
  deliveryLocation: {
    lat: number
    lng: number
    address: string
  }
  currentLocation?: {
    lat: number
    lng: number
  }
  flightInfo?: FlightInfo
}

export interface SavedAddress {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  isDefault: boolean
}

export interface Airport {
  code: string
  name: string
  terminals: Terminal[]
  location: {
    lat: number
    lng: number
  }
}

export interface Terminal {
  id: string
  name: string
  gates: string[]
}

export interface FlightInfo {
  flightNumber: string
  airline: string
  boardingTime: string
  gate: string
  terminal: string
}
