import { StravaApiConnection } from './strava-integration/StravaApiSettings'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Header } from './header/Header'
import { ActivitiesList } from './activities/ActivitiesList'
import { lazy, Suspense } from 'react'
import { Footer } from './footer/Footer'

const Maps = lazy(() => import('./maps/ActivityMaps'))
const ActivityOverview = lazy(() => import('./activities/ActivityOverview'))

export const App = () => {
  return (
    <HashRouter>
      <div className="app-content-without-footer">
        <Header />
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/settings" />} />
            <Route path="/settings" component={StravaApiConnection} />
            <Route path="/activities/:id" component={ActivityOverview} />
            <Route path="/activities" component={ActivitiesList} />
            <Route path="/maps" component={Maps} />
          </Switch>
        </Suspense>
      </div>
      <Footer />
    </HashRouter>
  )
}
