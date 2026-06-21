import { useEffect, useState } from 'react'
import axios from 'axios'
import ProgressAnalysis from './ProgressAnalysis'
import styles from './RealityCheck.module.css'

export default function RealityCheck() {
  const [stats, setStats] = useState(null)
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProgressData()
  }, [])

  const fetchProgressData = async () => {
    try {
      const [statsRes, progressRes] = await Promise.all([
        axios.get('/api/progress/stats'),
        axios.get('/api/progress/user')
      ])
      setStats(statsRes.data)
      setProgress(progressRes.data)
    } catch (error) {
      console.error('Error fetching progress:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1>✅ Reality Check - Your Progress</h1>
      
      {loading ? (
        <div>Loading your progress analysis...</div>
      ) : (
        <ProgressAnalysis stats={stats} progress={progress} />
      )}
    </div>
  )
}
