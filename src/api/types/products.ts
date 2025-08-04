export interface Product {
  name: string
  description?: string
  price: number
  image_url?: string
  in_stock?: boolean
}

export interface ProductUpdate {
  name?: string
  description?: string
  price?: number
  image_url?: string
  in_stock?: boolean
}

export interface ProductResponse {
  id: string
  name: string
  description?: string
  price: number
  image_url?: string
  in_stock: boolean
  created_at: string
}