import { useState } from 'react'

export const useUniqueId = () => {
  const [id] = useState(createUniqueId)
  return id
}

let lastUniqueId = 0
const createUniqueId = () => `id-${++lastUniqueId}`
