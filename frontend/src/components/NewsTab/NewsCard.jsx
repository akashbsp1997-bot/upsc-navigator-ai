import styles from './NewsTab.module.css'

export default function NewsCard({ news }) {
  return (
    <div className={styles.newsCard}>
      <h3>{news.title}</h3>
      <p className={styles.source}>Source: {news.source}</p>
      <p className={styles.content}>{news.content.substring(0, 200)}...</p>
      
      <div className={styles.mapping}>
        <h4>Relevant UPSC Topics:</h4>
        <div className={styles.tags}>
          {news.topic_mapping?.topics?.map((topic, i) => (
            <span key={i} className={styles.tag}>{topic}</span>
          ))}
        </div>
      </div>

      <div className={styles.concepts}>
        <h4>Key Concepts:</h4>
        <div className={styles.tags}>
          {news.relevant_concepts?.map((concept, i) => (
            <span key={i} className={`${styles.tag} ${styles.concept}`}>{concept}</span>
          ))}
        </div>
      </div>

      <a href={news.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
        Read Full Article →
      </a>
    </div>
  )
}
