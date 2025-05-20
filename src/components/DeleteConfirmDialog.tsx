import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { TITLES } from '../constants';

interface DeleteConfirmDialogProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export default function DeleteConfirmDialog({ open, onClose, onConfirm }: DeleteConfirmDialogProps) {
	return (
		<Dialog open={open}
				onClose={onClose}>
			<DialogTitle>{TITLES.REMOVE_NOTE}</DialogTitle>
			<DialogActions sx={{ justifyContent: 'center' }}>
				<Button onClick={onClose}>{TITLES.CANCEL}</Button>
				<Button color="error"
						onClick={onConfirm}>
					{TITLES.REMOVE}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
