import { memo } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import { TITLES } from '../constants';
import type { Note } from '../db/NotesDB';

interface NoteHeaderProps {
	note: Note | null;
	title: string;
	isEditing: boolean;
	isNew: boolean;
	onToggleEdit: () => void;
	onDeleteClick: () => void;
}

const NoteHeader = memo(({
							 note,
							 title,
							 isEditing,
							 isNew,
							 onToggleEdit,
							 onDeleteClick
						 }: NoteHeaderProps) => {
	return (
		<Box
			display="flex"
			flexDirection={{ xs: 'column', sm: 'row' }}
			justifyContent="space-between"
			alignItems={{ xs: 'flex-start', sm: 'center' }}
			gap={2}
			mb={2}
			flexShrink={0}
		>
			{(title || note || isNew) && (
				<Typography variant="h5" sx={{ wordBreak: 'break-word' }}>
					{title || (note ? note.title : isNew ? TITLES.CREATE_NOTE : '')}
				</Typography>
			)}

			<Box display="flex" gap={1} flexWrap="wrap">
				{!isNew && note && (
					<Tooltip title={isEditing ? TITLES.PREVIEW : TITLES.EDIT}>
						<IconButton onClick={onToggleEdit}>
							{isEditing ? <PreviewIcon /> : <EditIcon />}
						</IconButton>
					</Tooltip>
				)}
				{note && (
					<Tooltip title={TITLES.REMOVE}>
						<IconButton color="error" onClick={onDeleteClick}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				)}
			</Box>
		</Box>
	);
});

export default NoteHeader;
