import { Card } from 'react-bootstrap'
import { Note as NoteModel } from '../models/note'
import styles from '../styles/Note.module.css'
import styleUtils from '../styles/utils.module.css'
import formatDate from '../utils/formatDate'
import { MdDelete } from 'react-icons/md'

interface NoteProps {
  note: NoteModel
  onNoteClicked: (note: NoteModel) => void
  onDeleteNoteClicked: (noteId: string) => void
  className?: string
}

export default function Note({
  note,
  onNoteClicked,
  onDeleteNoteClicked,
  className,
}: NoteProps) {
  let createdUpdatedText: string

  if (note.updatedAt > note.createdAt) {
    createdUpdatedText = 'Updated: ' + formatDate(note.updatedAt)
  } else {
    createdUpdatedText = 'Created: ' + formatDate(note.createdAt)
  }
  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={() => onNoteClicked(note)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {note.title}
          <MdDelete
            onClick={(e) => {
              onDeleteNoteClicked(note._id)
              e.stopPropagation()
            }}
            className='text-muted ms-auto'
          />
        </Card.Title>
        <Card.Text className={styles.noteText}>{note.text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
    </Card>
  )
}
