import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Common.module.css'

export default function Navbar() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  window.addEventListener('online', () => setIsOnline(true))
  window.addEventListener('offline', () => setIsOnline(false))

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <h1>UPSC Navigator AI</h1>
        <div className={styles.navRight}>
          <span className={`${styles.status} ${isOnline ? styles.online : styles.offline}`}>
            {isOnline ? '🟢 Online' : '🔴 Offline'}
          </span>
          <Link to="/settings">⚙️ Settings</Link>
        </div>
      </div>
    </nav>
  )
}
