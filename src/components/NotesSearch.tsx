import TextField from '@mui/material/TextField';
import { TITLES } from '../constants';

interface NotesSearchProps {
	search: string;
	onSearchChange: (value: string) => void;
}

export default function NotesSearch({ search, onSearchChange }: NotesSearchProps) {
	return (
		<TextField
			fullWidth
			placeholder={TITLES.SEARCH_PLACEHOLDER}
			variant="outlined"
			size="small"
			value={search}
			onChange={(e) => onSearchChange(e.target.value)}
			sx={{
				mb: 2,
				maxWidth: '100%',
				input: {
					fontSize: {
						xs: '0.9rem',
						sm: '1rem',
					},
				},
			}}
		/>
	);
}
