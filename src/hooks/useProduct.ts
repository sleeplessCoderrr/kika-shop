import { getProducts } from '@/api/services/edgeFunctions';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from './useToast';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  in_stock: boolean;
  created_at: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { error: showError } = useToast()

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error: apiError } = await getProducts()
      
      if (apiError) {
        setError(apiError)
        showError('Failed to load products', {
          description: apiError
        })
        return
      }

      setProducts(data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products'
      setError(errorMessage)
      showError('Failed to load products', {
        description: errorMessage
      })
    } finally {
      setLoading(false)
    }
  }, [showError])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return {
    products,
    loading,
    error,
    refetch: fetchProducts
  }
}