export interface StravaApiActivitySummary {
  id: number
  name: string
  type: string
  map: {
    id: string
    summary_polyline: string
  }
}

export interface StravaApiActivity {
  id: number
  name: string
  type: string
  map: {
    id: string
    summary_polyline: string
    polyline: string
  }
}
