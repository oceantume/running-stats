import { toGeoJSON } from '@mapbox/polyline'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { useEffect, useRef, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { initializeMap } from '../../utils/mapbox-utils'

import * as strava from '../strava-integration/strava-api'

type ActivitiesListProps = RouteComponentProps<{ id: string }>

const ActivityOverview = ({ match }: ActivitiesListProps) => {
  const activityId = match.params.id
  const [activity, setActivity] = useState<any>()

  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map>()

  useEffect(() => {
    ;(async () => {
      setActivity(await strava.getActivityById(activityId))
    })()
  }, [activityId])

  useEffect(() => {
    if (activity) {
      if (!mapRef.current) {
        mapRef.current = initializeMap(mapContainerRef.current!)
      }

      mapRef.current.on('load', ({ target: map }) => {
        map.setCenter([-73.55, 45.54]).setZoom(12)

        map.addSource('test-line-1', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: toGeoJSON(activity.map.polyline),
          },
        })

        map.addLayer({
          id: 'test-line',
          type: 'line',
          source: 'test-line-1',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#e11',
            'line-width': 5,
          },
        })
      })
    }
  }, [activity])

  if (!activity) {
    return <p>loading...</p>
  }

  console.log('activity:', activity)

  return (
    <div>
      <h2>{activity.name}</h2>
      <a href={`https://www.strava.com/activities/${activity.id}`}>
        See on Strava
      </a>
      <table>
        <tbody>
          <tr>
            <td>Distance:</td>
            <td>{Math.round(activity.distance / 1000)} km</td>
          </tr>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div ref={mapContainerRef} style={{ minHeight: '600px' }} />
    </div>
  )
}

// default export for React.lazy()
export default ActivityOverview
