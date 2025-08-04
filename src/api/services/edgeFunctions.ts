import { supabase } from '@/api/clients/supabase'
import type { EdgeFunctionResponse } from '../types/edgeFunctions'
import type { ProductResponse, ProductUpdate } from '../types/products'
import type { Product } from '@/hooks/useProduct'
import type { OrderData, OrderResponse } from '../types/order'

const makeRequest = async <T>(
  endpoint: string, 
  options: RequestInit = {},
  requireAuth: boolean = false
): Promise<EdgeFunctionResponse<T>> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
    }

    if (options.headers) {
      Object.assign(headers, options.headers)
    }

    if (requireAuth) {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`
      }
    }

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${endpoint}`, {
      ...options,
      headers,
    })

    const result = await response.json()
    
    if (!response.ok) {
      return { data: null, error: result.error || 'Request failed' }
    }

    return result
  } catch (err) {
    return { 
      data: null, 
      error: err instanceof Error ? err.message : 'Network error' 
    }
  }
}

// Products (Public read, Admin write)
export const getProducts = (): Promise<EdgeFunctionResponse<ProductResponse[]>> => {
  return makeRequest<ProductResponse[]>('products', {
    method: 'GET',
  })
}

export const createProduct = (product: Product): Promise<EdgeFunctionResponse<ProductResponse>> => {
  return makeRequest<ProductResponse>('products', {
    method: 'POST',
    body: JSON.stringify(product),
  }, true)
}

export const updateProduct = (id: string, updates: ProductUpdate): Promise<EdgeFunctionResponse<ProductResponse>> => {
  return makeRequest<ProductResponse>('products', {
    method: 'PUT',
    body: JSON.stringify({ id, ...updates }),
  }, true)
}

// Orders (Public create, Admin read)
export const createOrder = (orderData: OrderData): Promise<EdgeFunctionResponse<OrderResponse>> => {
  return makeRequest<OrderResponse>('orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  })
}

export const getOrders = (): Promise<EdgeFunctionResponse<OrderResponse[]>> => {
  return makeRequest<OrderResponse[]>('orders', {
    method: 'GET',
  }, true)
}