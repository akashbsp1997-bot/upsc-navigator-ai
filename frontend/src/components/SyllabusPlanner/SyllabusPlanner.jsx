import { useEffect, useState } from 'react'
import axios from 'axios'
import Module from './Module'
import styles from './SyllabusPlanner.module.css'

export default function SyllabusPlanner() {
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchModules()
  }, [])

  const fetchModules = async () => {
    try {
      const response = await axios.get('/api/modules')
      setModules(response.data)
    } catch (error) {
      console.error('Error fetching modules:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading modules...</div>

  return (
    <div className={styles.container}>
      <h1>52-Week Syllabus Planner (3+3+1 Strategy)</h1>
      <div className={styles.modulesGrid}>
        {modules.map(module => (
          <Module key={module.id} module={module} />
        ))}
      </div>
    </div>
  )
}
