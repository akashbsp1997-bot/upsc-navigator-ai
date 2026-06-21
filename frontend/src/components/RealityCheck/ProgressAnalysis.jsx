import styles from './RealityCheck.module.css'

export default function ProgressAnalysis({ stats, progress }) {
  const completionPercentage = stats ? 
    ((stats.learning_completed + stats.revision_completed + stats.reality_check_completed) / 
     (stats.total_modules * 3)) * 100 : 0

  return (
    <div className={styles.analysisContainer}>
      <div className={styles.statsOverview}>
        <div className={styles.statCard}>
          <h3>Total Modules</h3>
          <p className={styles.number}>{stats?.total_modules || 52}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Learning Completed</h3>
          <p className={styles.number}>{stats?.learning_completed || 0}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Revision Completed</h3>
          <p className={styles.number}>{stats?.revision_completed || 0}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Reality Checks Done</h3>
          <p className={styles.number}>{stats?.reality_check_completed || 0}</p>
        </div>
      </div>

      <div className={styles.progressBar}>
        <h3>Overall Progress: {completionPercentage.toFixed(1)}%</h3>
        <div className={styles.bar}>
          <div 
            className={styles.fill}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className={styles.moduleProgress}>
        <h3>Module-wise Status</h3>
        <div className={styles.moduleList}>
          {progress.map((mod, i) => (
            <div key={i} className={styles.moduleStatus}>
              <span>Week {mod.week_number}: {mod.topic}</span>
              <span className={`${styles.status} ${styles[mod.stage || 'pending']}`}>
                {mod.stage ? '✅' : '⏳'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.recommendations}>
        <h3>💡 Recommendations</h3>
        <ul>
          <li>You have completed {completionPercentage.toFixed(1)}% of your preparation</li>
          <li>Focus on completing learning phase for remaining modules</li>
          <li>Increase revision tests frequency</li>
          <li>Keep daily consistency - aim for 6-8 hours of focused study</li>
        </ul>
      </div>
    </div>
  )
}
