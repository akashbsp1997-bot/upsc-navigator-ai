import { useEffect, useState } from 'react'
import axios from 'axios'
import TrendAnalysis from './TrendAnalysis'
import styles from './PYQViewer.module.css'

export default function PYQViewer() {
  const [pyqs, setPyqs] = useState([])
  const [trends, setTrends] = useState(null)
  const [year, setYear] = useState(2023)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPYQData()
  }, [year])

  const fetchPYQData = async () => {
    try {
      // This would fetch from your backend
      const response = await axios.get(`/api/pyqs?year=${year}`)
      setPyqs(response.data.questions || [])
      setTrends(response.data.trends)
    } catch (error) {
      console.error('Error fetching PYQs:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1>❓ Previous Year Questions & Trend Analysis</h1>
      
      <div className={styles.controls}>
        <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
          {[2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div>Loading PYQs...</div>
      ) : (
        <>
          <TrendAnalysis trends={trends} />
          <div className={styles.pyqsList}>
            <h3>Questions from {year}</h3>
            {pyqs.map((
