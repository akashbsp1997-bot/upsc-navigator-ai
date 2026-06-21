import { useEffect, useState } from 'react'
import axios from 'axios'
import DailyPlan from './DailyPlan'
import styles from './Recommendation.module.css'

export default function RecommendationPanel() {
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDailyPlan()
  }, [])

  const fetchDailyPlan = async () => {
    try {
      const response = await axios.get('/api/recommendations/daily')
      setPlan(response.data)
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1>🤖 AI-Powered Daily Recommendations</h1>
      
      {loading ? (
        <div>Generating your personalized plan...</div>
      ) : plan ? (
        <DailyPlan plan={plan} />
      ) : (
        <div>Unable to load recommendations</div>
      )}
    </div>
  )
}
