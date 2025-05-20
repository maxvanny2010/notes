import { memo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TITLES } from '../constants';

interface NoteEditorProps {
	title: string;
	text: string;
	isNew: boolean;
	onChangeTitle: (value: string) => void;
	onChangeText: (value: string) => void;
	onSave: () => void;
	onCancel: () => void;
}

const NoteEditor = memo(({
							 title,
							 text,
							 isNew,
							 onChangeTitle,
							 onChangeText,
							 onSave,
							 onCancel,
						 }: NoteEditorProps) => (
	<Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>
		<Box sx={{ pr: 0.5 }}>
			<TextField
				placeholder={TITLES.TITLE_PLACEHOLDER}
				fullWidth
				size="small"
				value={title}
				onChange={(e) => onChangeTitle(e.target.value)}
				sx={{ mb: 2 }}
			/>
			<TextField
				placeholder={TITLES.NOTE_PLACEHOLDER}
				multiline
				fullWidth
				minRows={10}
				value={text}
				onChange={(e) => onChangeText(e.target.value)}
				sx={{
					mb: 2,
					'& .MuiInputBase-root': {
						padding: 1,
						overflow: 'auto',
						alignItems: 'flex-start',
					},
					'& .MuiInputBase-inputMultiline': {
						whiteSpace: 'pre-wrap',
						wordBreak: 'break-word',
						resize: 'vertical',
					},
				}}
			/>
		</Box>

		{isNew && (
			<Box
				sx={{
					display: 'flex',
					flexDirection: { xs: 'column', sm: 'row' },
					justifyContent: 'flex-end',
					gap: 1,
					pt: 2,
				}}
			>
				<Button variant="contained" onClick={onSave} sx={{ width: { xs: '100%', sm: 'auto' } }}>
					{TITLES.SAVE}
				</Button>
				<Button variant="outlined" onClick={onCancel} sx={{ width: { xs: '100%', sm: 'auto' } }}>
					{TITLES.CANCEL}
				</Button>
			</Box>
		)}
	</Box>
));

export default NoteEditor;
