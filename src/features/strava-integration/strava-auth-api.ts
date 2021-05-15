export const getStravaAuthenticationUrl = (
  clientId: string,
  redirectUrl: string,
  userState?: string
) => {
  const url = new URL('https://www.strava.com/oauth/authorize')
  const params = url.searchParams

  params.append('client_id', clientId)
  params.append('redirect_uri', redirectUrl)
  params.append('response_type', 'code')
  params.append('scope', 'activity:read')

  if (userState) {
    params.append('state', userState)
  }

  return url.toString()
}

export const authenticateWithCode = async (
  clientId: string,
  clientSecret: string,
  code: string
) => {
  const formParams = new URLSearchParams()
  formParams.append('client_id', clientId)
  formParams.append('client_secret', clientSecret)
  formParams.append('code', code)
  formParams.append('grant_type', 'authorization_code')

  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    body: formParams,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(
      'Unknown error while getting initial Strava auth tokens. ' + error
    )
  }

  const data = await response.json()

  //log.info("Authentified to Strava with code:", data);

  // NOTE: we could also get profile picture here (data.athlete.profile or profile_medium)
  const result = {
    expiresAt: new Date(data.expires_at * 1000),
    refreshToken: data.refresh_token,
    accessToken: data.access_token,
    info: {
      firstName: data.athlete.firstname,
      lastName: data.athlete.lastname,
    },
  }

  return result
}

export const authenticateWithRefreshToken = async (
  clientId: string,
  clientSecret: string,
  refreshToken: string
) => {
  const body = new URLSearchParams()
  body.append('client_id', clientId)
  body.append('client_secret', clientSecret)
  body.append('refresh_token', refreshToken)
  body.append('grant_type', 'refresh_token')

  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    body,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(
      'Unknown error while refreshing Strava auth tokens: ' + error
    )
  }

  const data = await response.json()

  //log.info("Authentified to Strava with refresh token:", data);

  const result = {
    expiresAt: new Date(data.expires_at * 1000),
    refreshToken: data.refresh_token,
    accessToken: data.access_token,
  }

  return result
}

export const revokeToken = async (accessToken: string) => {
  const body = new URLSearchParams()
  body.append('access_token', accessToken)

  const response = await fetch('https://www.strava.com/oauth/deauthorize', {
    method: 'POST',
    body,
  })

  if (!response.ok) {
    //log.error("Error received while revoking Strava token", response);
  }
}
