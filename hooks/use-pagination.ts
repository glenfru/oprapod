'use client'

import { useState, useMemo } from 'react'

interface UsePaginationProps<T> {
  items: T[]
  initialItemsPerPage?: number
  itemsPerLoad?: number
}

export function usePagination<T>({
  items,
  initialItemsPerPage = 6,
  itemsPerLoad = 6
}: UsePaginationProps<T>) {
  const [displayCount, setDisplayCount] = useState(initialItemsPerPage)

  const displayedItems = useMemo(() => {
    return items.slice(0, displayCount)
  }, [items, displayCount])

  const hasMore = displayCount < items.length
  const remainingCount = items.length - displayCount

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + itemsPerLoad, items.length))
  }

  const reset = () => {
    setDisplayCount(initialItemsPerPage)
  }

  return {
    displayedItems,
    hasMore,
    remainingCount,
    loadMore,
    reset,
    totalItems: items.length,
    displayCount
  }
}