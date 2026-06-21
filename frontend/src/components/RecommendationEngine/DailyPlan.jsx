import styles from './Recommendation.module.css'

export default function DailyPlan({ plan }) {
  return (
    <div className={styles.planContainer}>
      <div className={styles.timeBlock}>
        <h3>🌅 Morning (6:00-9:00 AM)</h3>
        <div className={styles.activities}>
          {plan.morning_routine?.map((activity, i) => (
            <div key={i} className={styles.activity}>{activity}</div>
          ))}
        </div>
      </div>

      <div className={styles.timeBlock}>
        <h3>☀️ Afternoon (9:00-1:00 PM)</h3>
        <div className={styles.activities}>
          {plan.afternoon_session?.map((activity, i) => (
            <div key={i} className={styles.activity}>{activity}</div>
          ))}
        </div>
      </div>

      <div className={styles.timeBlock}>
        <h3>🌆 Evening (2:00-6:00 PM)</h3>
        <div className={styles.activities}>
          {plan.evening_session?.map((activity, i) => (
            <div key={i} className={styles.activity}>{activity}</div>
          ))}
        </div>
      </div>

      <div className={styles.timeBlock}>
        <h3>🌙 Night (7:00-10:00 PM)</h3>
        <div className={styles.activities}>
          {plan.night_routine?.map((activity, i) => (
            <div key={i} className={styles.activity}>{activity}</div>
          ))}
        </div>
      </div>

      <div className={styles.weekPriorities}>
        <h3>⭐ Priority Modules This Week</h3>
        <ul>
          {plan.priority_modules?.map((module, i) => (
            <li key={i}>{module}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
