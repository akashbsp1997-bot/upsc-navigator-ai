import { useState, useEffect } from 'react'
import styles from './NoteKeeping.module.css'

export default function NoteEditor({ note, onSave }) {
  const [content, setContent] = useState('')
  const [topic, setTopic] = useState('')
  const [mnemonics, setMnemonics] = useState('')

  useEffect(() => {
    if (note) {
      setTopic(note.topic)
      setContent(note.content)
      setMnemonics(note.mnemonics?.text || '')
    } else {
      setTopic('')
      setContent('')
      setMnemonics('')
    }
  }, [note])

  const handleSave = () => {
    onSave({
      topic,
      content,
      mnemonics: { text: mnemonics },
      noteType: 'text'
    })
  }

  return (
    <div className={styles.editor}>
      <input
        type="text"
        placeholder="Topic/Heading"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className={styles.topicInput}
      />

      <textarea
        placeholder="Write your notes here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.contentArea}
      />

      <div className={styles.mnemonicsSection}>
        <h4>🎯 Mnemonics & Memory Aids</h4>
        <textarea
          placeholder="Add mnemonics, acronyms, or memory tricks..."
          value={mnemonics}
          onChange={(e) => setMnemonics(e.target.value)}
          className={styles.mnemonicsArea}
        />
      </div>

      <button onClick={handleSave} className={styles.saveButton}>
        💾 Save Note
      </button>
    </div>
  )
}
