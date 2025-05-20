import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { TITLES } from '../constants';

interface AuthFormProps {
	title: string;
	buttonLabel: string;
	onSubmit: (username: string) => void;
	linkTo?: string;
	linkText?: string;
	error?: string | null;
}

export default function AuthForm({
									 title,
									 buttonLabel,
									 onSubmit,
									 linkTo,
									 linkText,
									 error,
								 }: AuthFormProps) {
	const [username, setUsername] = useState('');

	const handleSubmit = () => {
		if (username.trim()) {
			onSubmit(username.trim());
		}
	};

	return (
		<Paper
			elevation={0}
			sx={{
				px: { xs: 2, sm: 3, md: 4 },
				py: { xs: 3, sm: 4 },
				width: '100%',
				maxWidth: 400,
				mx: 'auto',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: { xs: 2, sm: 3 },
			}}
		>
			<Typography
				variant="h5"
				component="h2"
				align="center"
				sx={{
					fontSize: { xs: '1.5rem', sm: '1.75rem' },
				}}
			>
				{title}
			</Typography>

			<TextField
				label={TITLES.USERNAME}
				placeholder={TITLES.ENTER_USERNAME}
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
				fullWidth
				error={!!error}
				helperText={error}
			/>

			<Button
				variant="contained"
				fullWidth
				onClick={handleSubmit}
				disabled={!username.trim()}
				sx={{
					fontSize: { xs: '0.9rem', sm: '1rem' },
					py: { xs: 1.25, sm: 1.5 },
				}}
			>
				{buttonLabel}
			</Button>

			{linkTo && linkText && (
				<Typography variant="body2"
							align="center">
					<Link
						component={RouterLink}
						to={linkTo}
						underline="hover"
						sx={{
							fontSize: { xs: '0.85rem', sm: '0.95rem' },
						}}
					>
						{linkText}
					</Link>
				</Typography>
			)}
		</Paper>
	);
}
