import { get, set } from 'idb-keyval'
import { useEffect, useState } from 'react'

/** Retrieves strava auth from the store. */
export const getStoredStravaAuth = async () =>
  await get<StoredStravaAuth>('strava-auth')

/** Stores the strava auth value and calls all auth listeners.  */
export const setStoredStravaAuth = async (
  auth: StoredStravaAuth | undefined
) => {
  await set('strava-auth', auth)
  stravaAuthChangeListeners.forEach(({ callback }) => callback())
}

/**
 * Registers the callback as a listener for auth changes.
 * @returns a function that unregisters that listener.
 */
export const listenToStravaAuthChange = (callback: () => void) => {
  const listener = { callback }
  stravaAuthChangeListeners.push(listener)
  return () => {
    const index = stravaAuthChangeListeners.findIndex(
      (item) => item === listener
    )
    if (index >= 0) {
      stravaAuthChangeListeners.splice(index, 1)
    }
  }
}

/**
 * React hook that keeps the latest strava auth object
 * and listens for changes to the stored auth.
 */
export const useStravaAuth = () => {
  const [auth, setAuth] = useState<StoredStravaAuth>()

  useEffect(() => {
    let cancelled = false

    const updateAuth = async () => {
      const auth = await getStoredStravaAuth()
      if (!cancelled) {
        setAuth(auth)
      }
    }

    // retrieve initial value.
    updateAuth()

    const unregister = listenToStravaAuthChange(updateAuth)

    return () => {
      unregister()
      cancelled = true
    }
  }, [])

  return auth
}

/** List of listeners registered via `listenToStravaAuthChange` */
const stravaAuthChangeListeners: { callback: () => void }[] = []

interface StoredStravaAuth {
  client?: {
    id: string
    secret: string
  }
  session?: {
    refreshToken: string
    accessToken: string
    expiresAt: Date
    athlete: {
      id: string
      name: string
      avatarUrl: string
    }
  }
}
