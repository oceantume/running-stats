import { StravaApiActivity, StravaApiActivitySummary } from './strava-api-types'
import { authenticateWithRefreshToken } from './strava-auth-api'
import { getStoredStravaAuth, setStoredStravaAuth } from './strava-store'

// NOTE: Context stuff is complicated and seems like it's gonna cause a cascading mess
// when updating session info and whatnot. Let's make a class with a simpler interface
// and interact with that instead.
// We can just add event registration for receiving updates for client/session info on the
// settings page.

export const getPagedActivities = async (
  page: number
): Promise<StravaApiActivitySummary[]> => {
  const auth = await getLatestAuth()
  const url = new URL('https://www.strava.com/api/v3/athlete/activities')
  url.searchParams.append('page', page.toString())
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${auth.session.accessToken}` },
  })

  if (res.ok) {
    const activities = await res.json()
    return activities
  }

  return handleApiError(res)
}

export const getActivityById = async (
  activityId: number | string
): Promise<StravaApiActivity> => {
  const auth = await getLatestAuth()
  const url = `https://www.strava.com/api/v3/activities/${activityId}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${auth.session.accessToken}` },
  })

  if (res.ok) {
    const activities = await res.json()
    return activities
  }

  return handleApiError(res)
}

const handleApiError = (res: Response) => {
  throw new Error('Strava API error. Status: ' + res.status)
}

const getLatestAuth = async () => {
  const auth = await getStoredStravaAuth()
  if (!auth?.client || !auth?.session) {
    throw new Error('No active Strava session found.')
  }

  if (auth.session.expiresAt < new Date()) {
    return await refreshAccessToken()
  }

  return auth as ActiveStravaAuth
}

const refreshAccessToken = async () => {
  const auth = await getStoredStravaAuth()
  if (!auth?.client || !auth?.session) {
    throw new Error('No active Strava session found.')
  }

  const { id, secret } = auth.client
  const { refreshToken } = auth.session

  const result = await authenticateWithRefreshToken(id, secret, refreshToken)
  const newAuth: ActiveStravaAuth = {
    client: auth.client,
    session: {
      ...auth.session,
      ...result,
    },
  }

  await setStoredStravaAuth(newAuth)
  return newAuth
}

export interface StravaClient {
  id: string
  secret: string
}

export interface StravaSession {
  refreshToken: string
  accessToken: string
  expiresAt: Date
  athlete: {
    id: string
    name: string
    avatarUrl: string
  }
}

interface ActiveStravaAuth {
  client: StravaClient
  session: StravaSession
}

export interface StravaAuth {
  client?: StravaClient
  session?: StravaSession
}
