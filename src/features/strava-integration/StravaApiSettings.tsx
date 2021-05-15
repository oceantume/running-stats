import { getStravaAuthenticationUrl } from './strava-auth-api'
import { Route, useRouteMatch } from 'react-router'
import { StravaAuthReturn } from './StravaAuthReturn'
import { InputField } from '../../components/InputField'
import { setStoredStravaAuth, useStravaAuth } from './strava-store'

export const StravaApiConnection = () => {
  const auth = useStravaAuth()
  const routeMatch = useRouteMatch()

  console.log('auth:', auth)

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}
      onSubmit={(e) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)
        const id = formData.get('clientId')!.toString().trim()
        const secret = formData.get('clientSecret')!.toString().trim()

        ;(async () => {
          await setStoredStravaAuth({ client: { id, secret } })

          const redirectUrl = `${window.location.href}/strava-auth-return`
          const authUrl = getStravaAuthenticationUrl(id, redirectUrl)

          window.location.href = authUrl
        })()
      }}
    >
      <h2>Settings</h2>
      <h3>Strava API Client</h3>
      <InputField required name="clientId" defaultValue={auth?.client?.id}>
        Client ID
      </InputField>
      <InputField
        required
        name="clientSecret"
        type="password"
        defaultValue={auth?.client?.secret}
      >
        Client Secret
      </InputField>
      <button type="submit">Save and connect</button>

      {!auth?.session && (
        <div>
          <p>
            The app is not currently connected to strava. Enter your API
            credentials and connect. You will be prompted to link your account
            with this app, allowing it to access the Strava API.
          </p>
          <p>
            This app has no back-end so you will need to{' '}
            <a href="https://www.strava.com/settings/api">
              configure your own Strava API application
            </a>
            . Make sure that the <i>Authorization Callback Domain</i> is set to{' '}
            <code>{window.location.host}</code> or authorization will not work.
          </p>
          <p>
            Please{' '}
            <a href="https://www.strava.com/legal/api">
              read the Strava API Agreement
            </a>{' '}
            before entering your client id and secret into the application. The
            creator(s) of this software are not responsible for what you do with
            it and will not be held accountable if Strava revokes your access to
            their API if they were to judge that this is not a correct use of
            it. Note that no data retrieved from the API will be stored anywhere
            other than on the browser for caching purposes.
          </p>
        </div>
      )}
      {auth?.session && (
        <>
          <h3>Strava API Session</h3>
          <InputField readOnly value={auth?.session.athlete.name}>
            Display Name
          </InputField>
          <InputField
            type="password"
            readOnly
            value={auth?.session.accessToken}
          >
            Access Token
          </InputField>
          <InputField readOnly value={auth?.session.expiresAt.toISOString()}>
            Expires At
          </InputField>
          <InputField
            type="password"
            readOnly
            value={auth?.session.refreshToken}
          >
            Refresh Token
          </InputField>
          <button
            type="button"
            onClick={() => {
              setStoredStravaAuth(undefined)
            }}
          >
            Clear Strava session and all cached data
          </button>
        </>
      )}

      <Route
        path={`${routeMatch.path}/strava-auth-return`}
        component={StravaAuthReturn}
      />
    </form>
  )
}
