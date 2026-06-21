import styles from './NoteKeeping.module.css'

export default function MindMapView({ note }) {
  if (!note) return <div className={styles.emptyState}>Select a note to view mind map</div>

  return (
    <div className={styles.mindMapContainer}>
      <h2>{note.topic}</h2>
      <p>Mind Map visualization would be rendered here using a library like GoJS or similar</p>
      
      <div className={styles.mindMapPlaceholder}>
        <svg viewBox="0 0 400 300" className={styles.svg}>
          {/* Central topic */}
          <circle cx="200" cy="150" r="40" fill="#4CAF50" />
          <text x="200" y="155" textAnchor="middle" fill="white" fontSize="12">
            {note.topic?.substring(0, 12)}
          </text>

          {/* Branches (simplified) */}
          <line x1="240" y1="150" x2="320" y2="100" stroke="#999" strokeWidth="2" />
          <circle cx="330" cy="90" r="30" fill="#2196F3" />
          
          <line x1="240" y1="150" x2="320" y2="200" stroke="#999" strokeWidth="2" />
          <circle cx="330" cy="210" r="30" fill="#2196F3" />
        </svg>
      </div>
    </div>
  )
}
