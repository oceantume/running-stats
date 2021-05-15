import { Heatmap } from './Heatmap'

const ActivityMaps = () => {
  return (
    <div>
      <h2>Activity maps</h2>
      <div>
        <label>
          <input type="radio" defaultChecked />
          Heatmap
        </label>
      </div>
      <Heatmap />
    </div>
  )
}

// default export for React.lazy()
export default ActivityMaps
