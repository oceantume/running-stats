import { useEffect, useState } from 'react'
import { Redirect, RouteComponentProps } from 'react-router'

import { authenticateWithCode } from './strava-auth-api'
import { setStoredStravaAuth, useStravaAuth } from './strava-store'

export const StravaAuthReturn = ({ location }: RouteComponentProps) => {
  const auth = useStravaAuth()
  const { id, secret } = auth?.client || {}

  const { search } = location

  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    ;(async () => {
      const params = new URLSearchParams(search)
      const error = params.get('error')
      const code = params.get('code')
      //const scope = params.get('scope')
      //const state = params.get('state')

      if (error) {
        setError(error)
        return
      }

      if (id && secret && code) {
        const result = await authenticateWithCode(id, secret, code)

        await setStoredStravaAuth({
          client: { id, secret },
          session: {
            refreshToken: result.refreshToken,
            accessToken: result.accessToken,
            expiresAt: result.expiresAt,
            athlete: {
              id: '',
              avatarUrl: '',
              name: `${result.info.firstName} ${result.info.lastName}`,
            },
          },
        })

        setDone(true)
      }
    })()
  }, [id, secret, search])

  if (error) {
    return (
      <p>
        Error during authentication with Strava: <code>{error}</code>
      </p>
    )
  }

  return done ? <Redirect to="/settings" /> : null
}
