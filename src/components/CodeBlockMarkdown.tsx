import type { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';

interface CodeBlockProps {
	node?: any;
	inline?: boolean;
	className?: string;
	children?: ReactNode;
}

const CodeBlockMarkdown: FC<CodeBlockProps> = ({
												   inline,
												   className,
												   children,
												   ...props
											   }) => {
	if (!inline) {
		return (
			<Box
				component="pre"
				className={className}
				sx={{
					width: '100%',
					overflowX: 'auto',
					my: 2,
					borderRadius: 1,
					fontSize: { xs: '0.8rem', sm: '0.9rem' },
					backgroundColor: '#2d2d2d',
					color: '#fff',
					padding: '1rem',
				}}
				{...props}
			>
				<code>{children}</code>
			</Box>
		);
	}

	return (
		<code
			className={className}
			{...props}
			style={{
				backgroundColor: '#2d2d2d',
				color: '#fff',
				padding: '0.2em 0.4em',
				borderRadius: '4px',
				fontSize: '0.85em',
			}}
		>
			{children}
		</code>
	);
};

export default CodeBlockMarkdown;
