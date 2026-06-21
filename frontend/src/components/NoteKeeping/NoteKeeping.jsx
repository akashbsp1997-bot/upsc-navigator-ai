import { useEffect, useState } from 'react'
import axios from 'axios'
import NoteEditor from './NoteEditor'
import MindMapView from './MindMapView'
import styles from './NoteKeeping.module.css'

export default function NoteKeeping() {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [viewMode, setViewMode] = useState('editor') // 'editor', 'mindmap'

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await axios.get('/api/notes')
      setNotes(response.data)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  const handleSaveNote = async (noteData) => {
    try {
      if (selectedNote?.id) {
        await axios.put(`/api/notes/${selectedNote.id}`, noteData)
      } else {
        await axios.post('/api/notes', noteData)
      }
      fetchNotes()
    } catch (error) {
      console.error('Error saving note:', error)
    }
  }

  return (
    <div className={styles.container}>
      <h1>📝 Note Keeping & Organization</h1>
      
      <div className={styles.layout}>
        <div className={styles.notesList}>
          <h3>Your Notes</h3>
          {notes.map(note => (
            <div
              key={note.id}
              className={`${styles.noteItem} ${selectedNote?.id === note.id ? styles.active : ''}`}
              onClick={() => setSelectedNote(note)}
            >
              {note.topic}
            </div>
          ))}
          <button onClick={() => setSelectedNote(null)} className={styles.newButton}>
            + New Note
          </button>
        </div>

        <div className={styles.editor}>
          <div className={styles.viewToggle}>
            <button 
              className={viewMode === 'editor' ? styles.active : ''}
              onClick={() => setViewMode('editor')}
            >
              📝 Editor
            </button>
            <button 
              className={viewMode === 'mindmap' ? styles.active : ''}
              onClick={() => setViewMode('mindmap')}
            >
              🗺️ Mind Map
            </button>
          </div>

          {viewMode === 'editor' ? (
            <NoteEditor note={selectedNote} onSave={handleSaveNote} />
          ) : (
            <MindMapView note={selectedNote} />
          )}
        </div>
      </div>
    </div>
  )
}
