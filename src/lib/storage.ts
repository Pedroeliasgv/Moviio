export function loadState<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  const item = window.localStorage.getItem(key)
  if (!item) return fallback

  try {
    return JSON.parse(item) as T
  } catch {
    return fallback
  }
}

export function saveState<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}
