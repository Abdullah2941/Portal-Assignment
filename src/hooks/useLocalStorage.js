import { useState, useEffect } from 'react'

/**
 * Keeps a piece of React state in sync with localStorage.
 * Works like useState, but the value survives page refreshes.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage unavailable (e.g. private browsing) - fail silently
    }
  }, [key, value])

  return [value, setValue]
}
