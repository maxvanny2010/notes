import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useNotes } from '../contexts/NotesContext';
import type { Note } from '../db/NotesDB';

import DeleteConfirmDialog from './DeleteConfirmDialog';
import NoteHeader from './NoteHeader';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';

interface NoteDetailProps {
	note: Note | null;
	onNoteDeleted: () => void;
	onNoteCreated: (note: Note) => void;
	isCreating: boolean;
	onStartCreating: () => void;
}

export default function NoteDetail({
									   note,
									   onNoteDeleted,
									   onNoteCreated,
									   isCreating,
									   onStartCreating,
								   }: NoteDetailProps) {
	const { updateNote, deleteNote, addNote } = useNotes();
	const [isEditing, setIsEditing] = useState(false);
	const [text, setText] = useState('');
	const [title, setTitle] = useState('');
	const [openConfirm, setOpenConfirm] = useState(false);
	const [isNew, setIsNew] = useState(false);

	useEffect(() => {
		if (note) {
			setText(note.content || '');
			setTitle(note.title || '');
			setIsEditing(false);
			setIsNew(false);
		}
	}, [note]);

	useEffect(() => {
		if (isCreating) {
			handleCreate();
			onStartCreating();
		}
	}, [isCreating]);

	useEffect(() => {
		if (!note || !isEditing || isNew || note.id === undefined) return;
		const interval = setInterval(() => {
			updateNote(note.id!, { title, content: text });
		}, 1000);
		return () => clearInterval(interval);
	}, [note, text, title, isEditing, isNew]);

	const handleDelete = () => {
		if (!note?.id) return;
		deleteNote(note.id).then(() => {
			setText('');
			setTitle('');
			setIsNew(true);
			onNoteDeleted();
		});
		setOpenConfirm(false);
	};

	const handleCreate = () => {
		onNoteDeleted();
		setText('');
		setTitle('');
		setIsEditing(true);
		setIsNew(true);
	};

	const handleSaveNewNote = async () => {
		if (!title.trim() || !text.trim()) return;
		const newNote = await addNote({ title, content: text });
		setIsEditing(false);
		setIsNew(false);
		onNoteCreated(newNote);
	};

	return (
		<Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<NoteHeader
				note={note}
				title={title}
				isEditing={isEditing}
				isNew={isNew}
				onToggleEdit={() => setIsEditing(!isEditing)}
				onDeleteClick={() => setOpenConfirm(true)}
			/>

			<Box
				sx={{
					flexGrow: 1,
					overflowY: 'auto',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{isEditing ? (
					<NoteEditor
						title={title}
						text={text}
						isNew={isNew}
						onChangeTitle={setTitle}
						onChangeText={setText}
						onSave={handleSaveNewNote}
						onCancel={() => {
							setIsEditing(false);
							setIsNew(false);
							onNoteDeleted();
						}}
					/>
				) : (
					<NoteViewer text={text} />
				)}
			</Box>

			<DeleteConfirmDialog
				open={openConfirm}
				onClose={() => setOpenConfirm(false)}
				onConfirm={handleDelete}
			/>
		</Box>
	);
}
