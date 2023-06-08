import express from 'express';
import * as NoteControllers from '../controllers/notes';

const router = express.Router();

router.get('/', NoteControllers.getNotes);

router.get('/:noteId', NoteControllers.getNote);

router.post('/', NoteControllers.createNote);

router.patch('/:noteId', NoteControllers.updateNote);

router.delete('/:noteId', NoteControllers.deleteNote);


export default router;