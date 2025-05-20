import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { ROUTES, TITLES } from '../constants';

interface ProtectedRouteProps {
	children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const user = localStorage.getItem(TITLES.USER);
	return user ? children : <Navigate to={ROUTES.LOGIN}
									   replace />;
}
