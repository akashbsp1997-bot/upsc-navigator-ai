import { Link, useLocation } from 'react-router-dom'
import styles from './Common.module.css'

export default function Sidebar() {
  const location = useLocation()

  const menuItems = [
    { path: '/', label: '📊 Dashboard', icon: '📊' },
    { path: '/modules', label: '📚 Modules (3+3+1)', icon: '📚' },
    { path: '/news', label: '📰 News & Current Affairs', icon: '📰' },
    { path: '/notes', label: '📝 Note Keeping', icon: '📝' },
    { path: '/pyqs', label: '❓ PYQs & Trends', icon: '❓' },
    { path: '/recommendations', label: '🤖 AI Recommendations', icon: '🤖' },
    { path: '/reality-check', label: '✅ Reality Check', icon: '✅' },
  ]

  return (
    <aside className={styles.sidebar}>
      {menuItems.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={`${styles.menuItem} ${location.pathname === item.path ? styles.active : ''}`}
        >
          {item.icon} {item.label}
        </Link>
      ))}
    </aside>
  )
}
