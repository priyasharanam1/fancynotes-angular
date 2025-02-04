import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  newNote : Note = {
    id: 0,
    title: '',
    description: '',
    date: new Date(),
    color: ''
  }

  componentCreated = false;

  constructor(
      private noteService: NoteService,
      private activatedRoute: ActivatedRoute,
      private router: Router
    ) {}

    createNew(): void{
      console.log(this.newNote);
      this.noteService.create(this.newNote);
      console.log(this.newNote)
      alert('Note created successfully');
      this.newNote={
        id: 0,
        title: '',
        description: '',
        date: new Date(),
        color: ''
      }
    }

    goBack(): void {
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });
    }
}
