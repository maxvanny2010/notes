import { useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import { ROUTES, TITLES } from '../constants';

const AuthForm = lazy(() => import('../components/AuthForm.tsx'));
export default function RegisterPage() {
	const navigate = useNavigate();

	const handleRegister = (username: string) => {
		if (localStorage.getItem(TITLES.USER) !== username) {
			localStorage.setItem(TITLES.USER, username);
			navigate(ROUTES.LOGIN);
		}
	};

	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				p: 2,
				bgcolor: 'background.default',
			}}
		>

			<Box sx={{ width: { xs: '100%', sm: 400 } }}>
				<Suspense fallback={null}>
					<AuthForm
						title={TITLES.REGISTER}
						buttonLabel={TITLES.SIGN_UP}
						onSubmit={handleRegister}
					/>
				</Suspense>
			</Box>
		</Box>
	);
}
