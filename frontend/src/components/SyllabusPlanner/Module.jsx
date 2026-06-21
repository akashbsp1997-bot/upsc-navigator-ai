import { useState } from 'react'
import axios from 'axios'
import styles from './SyllabusPlanner.module.css'

export default function Module({ module }) {
  const [expanded, setExpanded] = useState(false)
  const [progress, setProgress] = useState(module.progress || null)

  const updateProgress = async (stage) => {
    try {
      await axios.post('/api/progress/update', {
        moduleId: module.id,
        stage
      })
      setProgress(stage)
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  return (
    <div className={`${styles.moduleCard} ${progress ? styles.active : ''}`}>
      <div className={styles.moduleHeader} onClick={() => setExpanded(!expanded)}>
        <h3>Week {module.week_number}: {module.topic}</h3>
        <span className={styles.expand}>{expanded ? '▼' : '▶'}</span>
      </div>

      {expanded && (
        <div className={styles.moduleContent}>
          <div className={styles.subtopics}>
            <h4>Subtopics:</h4>
            <ul>
              {module.subtopics.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ul>
          </div>

          <div className={styles.strategy}>
            <h4>3+3+1 Strategy:</h4>
            <div className={styles.daySection}>
              <strong>Days 1-3: Learning</strong>
              <p>{module.strategy_3_3_1.day_1_3.description}</p>
            </div>
            <div className={styles.daySection}>
              <strong>Days 4-6: Revision</strong>
              <p>{module.strategy_3_3_1.day_4_6.description}</p>
            </div>
            <div className={styles.daySection}>
              <strong>Day 7: Reality Check</strong>
              <p>{module.strategy_3_3_1.day_7.description}</p>
            </div>
          </div>

          <div className={styles.progressButtons}>
            <button 
              className={progress === 'learning' ? styles.active : ''}
              onClick={() => updateProgress('3_days_learning')}
            >
              📖 Learning Done
            </button>
            <button 
              className={progress === 'revision' ? styles.active : ''}
              onClick={() => updateProgress('3_days_revision')}
            >
              📝 Revision Done
            </button>
            <button 
              className={progress === 'check' ? styles.active : ''}
              onClick={() => updateProgress('1_day_reality_check')}
            >
              ✅ Reality Check
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
