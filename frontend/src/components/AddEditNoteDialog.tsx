import { Button, Form, Modal, ModalBody } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { createNote, NoteInput, updateNote } from '../api/notes.api'
import { Note } from '../models/note'
import TextInputField from './form/TextInputField'

interface AddEditNoteDialogProps {
  noteToEdit?: Note
  onDismiss: () => void
  onNoteSaved: (note: Note) => void
}

const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || '',
      text: noteToEdit?.text || '',
    },
  })

  const onSubmit = async (input: NoteInput) => {
    try {
      let noteRepsonse: Note

      if (noteToEdit) {
        noteRepsonse = await updateNote(noteToEdit._id, input)
      } else {
        noteRepsonse = await createNote(input)
      }

      onNoteSaved(noteRepsonse)
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? 'Edit Note' : 'Add Note'}</Modal.Title>
      </Modal.Header>
      <ModalBody>
        <Form id='noteForm' onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name='title'
            label='Title'
            type='text'
            placeholder='Title'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.title}
          />

          <TextInputField
            name='text'
            label='Text'
            as='textarea'
            rows={5}
            placeholder='Text'
            register={register}
            error={errors.text}
          />
        </Form>
      </ModalBody>
      <Modal.Footer>
        <Button type='submit' form='noteForm' disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddEditNoteDialog
