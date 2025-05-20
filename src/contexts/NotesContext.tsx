import React, { createContext, use, useEffect, useState } from 'react';
import { db, type Note } from '../db/NotesDB';
import { TITLES } from '../constants';

type NewNoteData = Omit<Note, 'id' | 'createdAt' | 'user'> & { user?: string };

interface NotesContextType {
	notes: Note[];
	addNote: (note: NewNoteData) => Promise<Note>;
	updateNote: (id: number, updatedNote: Partial<Note>) => Promise<void>;
	deleteNote: (id: number) => Promise<void>;
}

const NotesContext = createContext<NotesContextType | null>(null);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [user, setUser] = useState<string>(() => localStorage.getItem(TITLES.USER) || '');

	useEffect(() => {
		const handleStorageChange = () => {
			const storedUser = localStorage.getItem(TITLES.USER) || '';
			setUser(storedUser);
		};

		window.addEventListener('storage', handleStorageChange);
		return () => window.removeEventListener('storage', handleStorageChange);
	}, []);

	useEffect(() => {
		if (user) {
			db.notes.where(TITLES.USER).equals(user).toArray().then(setNotes);
		} else {
			setNotes([]);
		}
	}, [user]);

	const addNote = async (note: NewNoteData): Promise<Note> => {
		const currentUser = user || localStorage.getItem(TITLES.USER) || '';
		const newNote: Omit<Note, 'id'> = {
			user: currentUser,
			createdAt: new Date(),
			...note,
		};
		const id = await db.notes.add(newNote);
		setNotes(await db.notes.where(TITLES.USER).equals(currentUser).toArray());
		return { ...newNote, id };
	};

	const updateNote = async (id: number, updatedNote: Partial<Note>) => {
		const currentUser = user || localStorage.getItem(TITLES.USER) || '';
		await db.notes.update(id, {
			...updatedNote,
			user: updatedNote.user || currentUser,
		});
		setNotes(await db.notes.where(TITLES.USER).equals(currentUser).toArray());
	};

	const deleteNote = async (id: number) => {
		const currentUser = user || localStorage.getItem(TITLES.USER) || '';
		await db.notes.delete(id);
		setNotes(await db.notes.where(TITLES.USER).equals(currentUser).toArray());
	};

	return (
		<NotesContext value={{ notes, addNote, updateNote, deleteNote }}>
			{children}
		</NotesContext>
	);
};

export const useNotes = () => {
	const context = use(NotesContext);
	if (!context) {
		throw new Error(TITLES.PROVIDER_WARNING);
	}
	return context;
};
