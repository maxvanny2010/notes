import Dexie, { type Table } from 'dexie';

export interface Note {
	id?: number;
	user: string;
	title: string;
	content: string;
	createdAt: Date;
}

export class NotesDB extends Dexie {
	notes!: Table<Note, number>;

	constructor() {
		super('notesDB');
		this.version(1).stores({
			notes: '++id, user, title, content, createdAt',
		});
	}
}

export const db = new NotesDB();
