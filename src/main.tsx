import React from 'react';
import ReactDOM from 'react-dom/client';
import { NotesProvider } from './contexts/NotesContext';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<NotesProvider>
				<App />
			</NotesProvider>
		</ThemeProvider>
	</React.StrictMode>,
);

