import { NavLink } from 'react-router-dom'
import { useStravaAuth } from '../strava-integration/strava-store'
import './Header.css'

export const Header = () => {
  const auth = useStravaAuth()

  return (
    <header className="app-header">
      <nav>
        <h1>Running Stats</h1>
        <ul>
          <li>
            <NavLink to="/activities">Activities</NavLink>
          </li>
          <li>
            <NavLink to="/maps">Maps</NavLink>
          </li>
          <li>
            <NavLink to="/settings">Settings</NavLink>
          </li>
        </ul>
      </nav>

      <div className="strava-status">
        {!auth?.session && 'Not connected'}
        {auth?.session && auth.session.athlete.name}
      </div>
    </header>
  )
}
