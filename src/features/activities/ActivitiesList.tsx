import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from '../../components/Pagination'
import * as strava from '../strava-integration/strava-api'

export const ActivitiesList = () => {
  const [activities, setActivities] = useState<any[]>()
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    ;(async () => {
      const activities = await strava.getPagedActivities(page)
      setActivities(activities)
    })()
  }, [page])

  return (
    <div>
      <h2>Activities</h2>
      <Pagination
        page={page}
        onOpenPage={setPage}
        canOpenPreviousPage={page > 1}
        canOpenNextPage={!!activities && activities.length > 0}
      />

      <ul>
        {activities?.map((activity) => (
          <li key={activity.id}>
            <Link to={`/activities/${activity.id}`}>
              {activity.name}
            </Link>{' '}
            ({Math.round(activity.distance / 1000)} km)
          </li>
        ))}
      </ul>
      {!activities && <p>loading...</p>}
      {activities && !activities.length && <p>No more results</p>}
    </div>
  )
}
