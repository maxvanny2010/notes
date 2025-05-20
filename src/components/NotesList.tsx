import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Box from '@mui/material/Box';

import type { Note } from '../db/NotesDB';
import { TITLES } from '../constants';
import { useEffect, useRef } from 'react';

interface NotesListProps {
	notes: Note[];
	selectedNoteId: number | string | null;
	onSelectNote: (note: Note) => void;
	newNoteId?: number | string | null;
}

export default function NotesList({ notes, selectedNoteId, onSelectNote, newNoteId }: NotesListProps) {
	const newNoteRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		if (newNoteRef.current) {
			newNoteRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}, [newNoteId]);
	return (
		<Box
			sx={{
				width: '100%',
				maxHeight: '100%',
				overflowY: 'auto',
				scrollbarWidth: 'thin',
				scrollbarColor: (theme) => `${theme.palette.primary.main} transparent`,
				'&::-webkit-scrollbar': {
					width: 8,
				},
				'&::-webkit-scrollbar-thumb': {
					backgroundColor: (theme) => theme.palette.primary.main,
					borderRadius: 4,
				},
				'&::-webkit-scrollbar-track': {
					backgroundColor: 'transparent',
				},
			}}
		>
			<List sx={{ p: 0 }}>
				{notes.map((note) => {
					const isNew = newNoteId === note.id;
					return (
						<ListItem
							key={note.id}
							disablePadding
							sx={{ px: { xs: 1, sm: 2 } }}
							ref={isNew ? newNoteRef : undefined}
						>
							<ListItemButton
								selected={selectedNoteId === note.id}
								onClick={() => onSelectNote(note)}
								sx={{
									borderRadius: 1,
									py: 1,
									px: 2,
									'&.Mui-selected': {
										bgcolor: 'primary.main',
										color: 'white',
										'&:hover': {
											bgcolor: 'primary.dark',
										},
									},
								}}
							>
								<ListItemText
									primary={note.title}
									secondary={new Date(note.createdAt).toLocaleString()}
									sx={{
										'.MuiTypography-root': {
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
										},
									}}
								/>
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>

			{notes.length === 0 && (
				<Box sx={{ mt: 2, textAlign: 'center' }}>
					<Typography variant="body2"
								color="text.secondary">
						{TITLES.NOTHING_FOUND}
					</Typography>
				</Box>
			)}
		</Box>
	);
}
