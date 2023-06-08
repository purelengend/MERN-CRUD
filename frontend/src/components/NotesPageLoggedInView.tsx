import { useEffect, useState } from 'react'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import AddEditNoteDialog from './AddEditNoteDialog'
import { Note as NoteModel } from '../models/note'
import styleUtils from '../styles/utils.module.css'
import { fetchNotes, deleteNote } from '../api/notes.api'
import styles from '../styles/NotePage.module.css'
import Note from './Note'

const NotesPageLoggedInView = () => {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [showDialog, setShowDialog] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)
  const [notesLoading, setNotesLoading] = useState(true)
  const [loadingError, setLoadingError] = useState(false)

  useEffect(() => {
    async function loadNotes() {
      try {
        setLoadingError(false)
        setNotesLoading(true)
        const notes = await fetchNotes()
        setNotes(notes)
      } catch (error) {
        console.error(error)
        alert(error)
        setLoadingError(true)
      } finally {
        setNotesLoading(false)
      }
    }
    loadNotes()
  }, [])

  async function onDelete(noteId: string) {
    try {
      await deleteNote(noteId)
      setNotes(notes.filter((note) => note._id !== noteId))
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            onNoteClicked={setNoteToEdit}
            onDeleteNoteClicked={onDelete}
            note={note}
            className={styles.note}
          />
        </Col>
      ))}
    </Row>
  )
  return (
    <>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowDialog(true)}
      >
        <FaPlus />
        Add new note
      </Button>
      {notesLoading && <Spinner animation='border' variant='primary' />}
      {loadingError && <p>Something went wrong. Please refresh the page.</p>}
      {!notesLoading && !loadingError && (
        <>
          {notes.length > 0 ? notesGrid : <p>You don't have any notes yet.</p>}
        </>
      )}
      {showDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote])
            setShowDialog(false)
          }}
        />
      )}

      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((note) =>
                note._id === updatedNote._id ? updatedNote : note
              )
            )
            setNoteToEdit(null)
          }}
        />
      )}
    </>
  )
}

export default NotesPageLoggedInView
