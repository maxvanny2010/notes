import { memo } from 'react';
import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import CodeBlockMarkdown from './CodeBlockMarkdown';
import 'highlight.js/styles/github-dark.css';

interface NoteViewerProps {
	text: string;
}

const NoteViewer = memo(({ text }: NoteViewerProps) => (
	<Box
		sx={{
			whiteSpace: 'pre-wrap',
			fontSize: { xs: '0.9rem', sm: '1rem' },
			flexGrow: 1,
			overflowY: 'auto',
			wordBreak: 'break-word',
			'& pre': {
				overflowX: 'auto',
				whiteSpace: 'pre-wrap',
				wordBreak: 'break-word',
				maxWidth: '100%',
				backgroundColor: '#282c34',
				borderRadius: 1,
				padding: 1,
			},
			'& code': {
				wordBreak: 'break-word',
				whiteSpace: 'pre-wrap',
			},
		}}
	>
		<ReactMarkdown
			remarkPlugins={[remarkBreaks]}
			rehypePlugins={[rehypeHighlight]}
			components={{ code: CodeBlockMarkdown }}
		>
			{text}
		</ReactMarkdown>
	</Box>
));

export default NoteViewer;
