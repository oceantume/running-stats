import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import * as strava from '../strava-integration/strava-api'

import 'mapbox-gl/dist/mapbox-gl.css'
import { toGeoJSON } from '@mapbox/polyline'
import { initializeMap } from '../../utils/mapbox-utils'

export const Heatmap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map>()
  const [positions, setPositions] = useState<GeoJSON.Position[]>()

  useEffect(() => {
    ;(async () => {
      const activityPositions: GeoJSON.Position[] = []

      // get activities page by page to find all activities
      for (let page = 1, lastCount = -1; lastCount !== 0; page++) {
        const result = await strava.getPagedActivities(page)
        lastCount = result.length

        const runs = result.filter(({ map }) => map?.summary_polyline)

        Array.prototype.push.apply(
          activityPositions,
          runs.flatMap(({ map }) => toGeoJSON(map.summary_polyline).coordinates)
        )
      }

      setPositions(activityPositions)
    })()
  }, [])

  useEffect(() => {
    if (!positions) {
      return
    }

    if (!mapRef.current) {
      mapRef.current = initializeMap(mapContainerRef.current!)
    }

    mapRef.current.on('load', ({ target: map }) => {
      map.setCenter([-73.55, 45.54]).setZoom(12)

      map.addSource('heatpoints', {
        type: 'geojson',
        // The following is lighter on memory, but if we wanted to attach properties
        // we'd probably have to use FeatureCollection.
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'MultiPoint',
            coordinates: positions,
          },
        },
        /*data: {
          type: 'FeatureCollection',
          features: positions.map((pos) => ({
            type: 'Feature',
            properties: { },
            geometry: {
              type: 'Point',
              coordinates: pos,
            },
          })),
        },*/
      })

      map.addLayer({
        id: 'my-heat',
        type: 'heatmap',
        source: 'heatpoints',
        paint: {
          'heatmap-radius': 6,
          'heatmap-weight': {
            type: 'identity',
            property: 'point_count',
          },
        },
      })
    })
  }, [positions])

  return (
    <div
      ref={mapContainerRef}
      style={{ minHeight: '600px', minWidth: '600px' }}
    />
  )
}
