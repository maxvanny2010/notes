import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTES, TITLES } from './constants';
import { ProtectedRoute } from './components/ProtectedRoute';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const NotesLayout = lazy(() => import('./pages/NotesLayout'));
export default function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>{TITLES.LOADING}</div>}>
				<Routes>
					<Route path={ROUTES.LOGIN}
						   element={<LoginPage />} />
					<Route path={ROUTES.REGISTER}
						   element={<RegisterPage />} />
					<Route
						path={ROUTES.ALL}
						element={
							<ProtectedRoute>
								<NotesLayout />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
