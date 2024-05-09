import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-w3';

  notes: Note[] = [];
  selectedNote: Note | null = null;
  index : number = -1;

  tempTitle: string = '';
  tempContent: string = '';
  errorMessage1: string = '';
  errorMessage2: string = '';
  titleText = '';
  descText = '';

  processInputTitle(event: any) 
  {
    this.tempTitle = event.target.value;
    
  }

  processInputNote(event: any) 
  {
    this.tempContent = event.target.value;
  }

  private resetTempData() 
  {
    this.tempTitle = '';
    this.tempContent  = '';
    this.errorMessage1 = ''; 
    this.errorMessage2 = '';
    this.titleText = '';
    this.descText = '';
  }

  saveNote() 
  {
    if(this.index >= 0)
    {
      if(this.tempTitle.trim().length >= 5 && this.tempContent.trim().length >= 7)
      {
      this.selectedNote=this.notes[this.index];
      this.selectedNote.title=this.tempTitle;
      this.selectedNote.content=this.tempContent;
      this.index = -1;
      this.resetTempData();
      }
      else
      {
        this.errorMessage1 = 'Заглавието трябва да съдържа поне 5 символа';
        this.errorMessage2 = 'Съдържанието трябва да съдържа поне 7 символа.';
      }
    }
    else 
    {
      if (this.tempTitle.trim().length >= 5 && this.tempContent.trim().length >= 7) 
      {
      this.notes.push({ title: this.tempTitle, content: this.tempContent });
      this.resetTempData();
      }
      else 
      {
        this.errorMessage1 = 'Заглавието трябва да съдържа поне 5 символа';
        this.errorMessage2 = 'Съдържанието трябва да съдържа поне 7 символа.';
      }
    }
  }

  editNote() 
  {
    
    if (this.selectedNote) 
    {
      this.tempTitle = this.selectedNote.title;
      this.tempContent = this.selectedNote.content;
      this.titleText = this.selectedNote.title;
      this.descText = this.selectedNote.content;
      this.index = this.notes.indexOf(this.selectedNote);
    }
  }

  deleteNote() {
    if (this.selectedNote) 
    {
      const index = this.notes.indexOf(this.selectedNote);
      if (index !== -1) 
      {
        this.notes.splice(index, 1);
        this.selectedNote = null;
        this.resetTempData();
      }
    }
  }

  selectNote(note: Note) 
  {
    this.tempTitle = note.title;
    this.tempContent = note.content;
    this.selectedNote = note;
  }
}

interface Note 
{
  title: string;
  content: string;
}