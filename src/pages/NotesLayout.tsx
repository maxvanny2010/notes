import { lazy, Suspense, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import type { Note } from '../db/NotesDB';
import { useNotes } from '../contexts/NotesContext';

import UserInfoBar from '../components/UserInfoBar.tsx';

const NotesSearch = lazy(() => import('../components/NotesSearch.tsx'));
const NotesList = lazy(() => import('../components/NotesList.tsx'));
const NoteDetail = lazy(() => import('../components/NoteDetail.tsx'));
export default function NotesLayout() {
	const { notes } = useNotes();
	const [rawSearch, setRawSearch] = useState('');
	const search = useDeferredValue(rawSearch);

	const addButtonRef = useRef<HTMLButtonElement | null>(null);
	const [newNoteId, setNewNoteId] = useState<number | string | null>(null);


	const [isCreating, setIsCreating] = useState(false);
	const [selectedNote, setSelectedNote] = useState<Note | null>(null);

	const filteredNotes = useMemo(() => {
		const query = search.toLowerCase();
		return notes.filter(
			(note) =>
				note.title.toLowerCase().includes(query) ||
				note.content.toLowerCase().includes(query),
		);
	}, [notes, search]);

	useEffect(() => {
		if (selectedNote && !notes.find(n => n.id === selectedNote.id)) {
			setSelectedNote(null);
			setTimeout(() => {
				addButtonRef.current?.focus();
			}, 0);
		}
	}, [notes, selectedNote]);


	const handleCreateNote = () => {
		setSelectedNote(null);
		setIsCreating(true);
	};

	const handleSearchChange = (value: string) => {
		setRawSearch(value);
	};

	const onNoteDeleted = () => {
		setSelectedNote(null);
		setTimeout(() => {
			addButtonRef.current?.focus();
		}, 0);
	};

	return (
		<Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Box sx={{ px: 2, py: 1, borderBottom: '1px solid #ccc' }}>
				<UserInfoBar
					onCreateNote={handleCreateNote}
					addButtonRef={addButtonRef}
				/>
			</Box>

			<Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
				<Grid container
					  sx={{ height: '100%' }}>
					<Grid
						item
						xs={12}
						md={4}
						sx={{
							borderRight: { xs: 'none', md: '1px solid #ccc' },
							borderBottom: { xs: '1px solid #ccc', md: 'none' },
							p: 0,
							height: { xs: '40vh', md: '100%' },
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Box sx={{ p: 2 }}>
							<Box
								sx={{
									position: 'sticky',
									top: 0,
									zIndex: 1,
									bgcolor: 'background.paper',
									pb: 1,
								}}
							>
								<Suspense fallback={<Skeleton height={32}
															  width="100%" />}>
									<NotesSearch
										search={rawSearch}
										onSearchChange={handleSearchChange}
									/>
								</Suspense>
							</Box>
						</Box>

						<Box
							sx={{
								px: 2,
								pb: 2,
								overflowY: 'auto',
								flexGrow: 1,
							}}
						>
							<Suspense fallback={null}>
								<NotesList
									notes={filteredNotes}
									selectedNoteId={selectedNote?.id ?? null}
									onSelectNote={(note) => {
										setSelectedNote(note);
										setIsCreating(false);
										setNewNoteId(null);
									}}
									newNoteId={newNoteId}
								/>
							</Suspense>
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						md={8}
						sx={{
							p: 2,
							height: { xs: '60vh', md: '100%' },
							overflowY: 'auto',
						}}
					>
						<Suspense fallback={<Skeleton variant="rectangular"
													  height="100%" />}>
							<NoteDetail
								note={selectedNote}
								onNoteDeleted={onNoteDeleted}
								onNoteCreated={(note) => {
									setSelectedNote(note);
									setIsCreating(false);
									setNewNoteId(note.id ?? null);
								}}
								isCreating={isCreating}
								onStartCreating={() => setIsCreating(false)}
							/>
						</Suspense>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
