import mapboxgl from 'mapbox-gl'

export const initializeMap = (container: HTMLElement) => {
  // TODO: Allow overriding this token from in-app settings, similar to Strava API.
  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

  if (!accessToken) {
    throw new Error('No mapbox access token available.')
  }

  return new mapboxgl.Map({
    accessToken,
    container,
    style: 'mapbox://styles/mapbox/streets-v11',
    //center: [-73.55, 45.54],
    //zoom: 12,
  })
}
