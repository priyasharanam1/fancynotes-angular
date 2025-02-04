import { Injectable } from '@angular/core';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private localStorageKey = 'notes';

  constructor() {}

  // Get all notes
  getAll(): Note[] {
    const notesJson = localStorage.getItem(this.localStorageKey);
    return notesJson ? JSON.parse(notesJson) : [];
  }

  // Get a single note by ID
  get(id: number): Note | null {
    const notes = this.getAll();
    return notes.find(note => note.id === id) || null;
  }

  // Create a new note
  create(note: Note): Note {
    const notes = this.getAll();
    note.id = this.generateId(notes);
    if (!note.title || !note.description) {
      throw new Error('Title and description are required.');
    }
    notes.push(note);
    localStorage.setItem(this.localStorageKey, JSON.stringify(notes));
    return note;
  }

  // Update an existing note
  update(note: Note): Note | undefined {
    const notes = this.getAll();
    const index = notes.findIndex(n => n.id === note.id);
    if (index !== -1) {
      notes[index] = note;
      localStorage.setItem(this.localStorageKey, JSON.stringify(notes));
      return note;
    }
    return undefined;
  }

  // Delete a note by ID
  delete(id: number): void {
    const notes = this.getAll();
    const updatedNotes = notes.filter(note => note.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedNotes));
  }

  // Generate a new unique ID for a note
  private generateId(notes: Note[]): number {
    return notes.length ? Math.max(...notes.map(note => note.id)) + 1 : 1;
  }
}
