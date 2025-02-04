import { Injectable } from '@angular/core';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private localStorageKey = 'notes';

  constructor() { }

  getAll(): Note[]{
    const notesJson = localStorage.getItem(this.localStorageKey);
    return notesJson ? JSON.parse(notesJson) : [];
  }

  get(id:number): Note | any{
    const notesJson = localStorage.getItem(this.localStorageKey);
    const notes : Note[] = notesJson ? JSON.parse(notesJson) : [];
    console.log(id, " ", notes, " ", notes.find(note => note.id === id));
    return notes.find(note => note.id === id) || null;
  }

  create(note: Note): Note{
    let notes: Note[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    note.id = this.generateId();
    if (!note.title || !note.description) {
      throw new Error("Title and content are required.");
    }
    notes.push(note);
    localStorage.setItem(this.localStorageKey, JSON.stringify(notes));
    return note;
  }

  update(note: Note): Note | undefined{
    let notes: Note[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const index = notes.findIndex(n => n.id === note.id);
    if(index !== -1){
      console.log("Note found");
      notes[index] = note;
      localStorage.setItem(this.localStorageKey, JSON.stringify(notes));
      return note;
    }
    return undefined;
  }

  delete(id:number): void{
    let notes : Note[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const index = notes.findIndex(n => n.id === id);
    if(index !== -1){
      notes.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(notes));
    }
  }

  private generateId(): number{
    let notes: Note[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    return notes.length ? Math.max(...notes.map(note => note.id)) + 1 : 1;
  }

}
