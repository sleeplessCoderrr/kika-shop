export interface OrderItem {
  product_id: string
  quantity: number
  price: number
}

export interface OrderData {
  customer_name: string
  customer_email: string
  customer_phone: string
  shipping_address: string
  items: OrderItem[]
  total_amount: number
}

export interface OrderResponse {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  shipping_address: string
  total_amount: number
  status: string
  payment_status: string
  created_at: string
}