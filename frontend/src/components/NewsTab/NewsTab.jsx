import { useEffect, useState } from 'react'
import axios from 'axios'
import NewsCard from './NewsCard'
import styles from './NewsTab.module.css'

export default function NewsTab() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchNews()
  }, [filter])

  const fetchNews = async () => {
    try {
      const url = filter === 'all' ? '/api/news' : `/api/news/topic/${filter}`
      const response = await axios.get(url)
      setNews(response.data)
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1>📰 Current Affairs & News</h1>
      
      <div className={styles.filters}>
        <button 
          className={filter === 'all' ? styles.active : ''}
          onClick={() => setFilter('all')}
        >
          All News
        </button>
        <button 
          className={filter === 'Polity' ? styles.active : ''}
          onClick={() => setFilter('Polity')}
        >
          Polity
        </button>
        <button 
          className={filter === 'Environment' ? styles.active : ''}
          onClick={() => setFilter('Environment')}
        >
          Environment
        </button>
        <button 
          className={filter === 'Economy' ? styles.active : ''}
          onClick={() => setFilter('Economy')}
        >
          Economy
        </button>
      </div>

      {loading ? (
        <div>Loading news...</div>
      ) : (
        <div className={styles.newsList}>
          {news.map(article => (
            <NewsCard key={article.id} news={article} />
          ))}
        </div>
      )}
    </div>
  )
}
