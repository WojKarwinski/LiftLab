import { Component, OnInit, Input } from '@angular/core';
import { TimerService } from '../services/timer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
})
export class WorkoutComponent implements OnInit {
  @Input() faHourglass3: any;
  @Input() workoutData: any; // Include your workout data structure here

  timerDisplay: string = '00:00';
  editMode: boolean = false;
  noteMode: boolean = false;
  showDropdownMenu: boolean = false;

  constructor(
    private timerService: TimerService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.timerService.timerValue$.subscribe((value: number) => {
      this.updateTimerDisplay(value);
    });
  }

  open(content: any): void {
    this.modalService.open(content);
  }

  setTimer(seconds: number): void {
    this.timerService.setTimer(seconds);
    this.timerService.startTimer();
  }

  finishWorkout(): void {
    this.timerService.stopTimer();
    // Additional logic to handle the completion of the workout
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  updateTimerDisplay(value: number): void {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value % 60;
    this.timerDisplay = `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  }

  toggleDropdownMenu(): void {
    console.log('Toggling dropdown menu');
    this.showDropdownMenu = !this.showDropdownMenu;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.showDropdownMenu = false;
    this.noteMode = false; // Close note mode if open
  }

  toggleNoteMode(): void {
    this.noteMode = !this.noteMode;
    this.showDropdownMenu = false;
    this.editMode = false; // Close edit mode if open
  }

  saveName(): void {
    if (this.workoutData.name.trim().length > 0) {
      // Save or process the edited name
    }
    this.editMode = false;
  }

  saveNote(): void {
    if (this.workoutData.note.trim().length > 0) {
      // Save or process the note
    }
    this.noteMode = false;
  }

  cancelEdit(): void {
    this.editMode = false;
    // Optionally reset the name to original if edit is canceled
  }

  cancelNote(): void {
    this.noteMode = false;
  }

  addSetToExercise(exerciseId: number): void {
    const exercise = this.workoutData.exercises.find(
      (e: any) => e.exerciseId === exerciseId
    );
    if (exercise) {
      const newSetNumber = exercise.sets.length + 1;
      const newSet = { setNumber: newSetNumber, reps: 0, weight: 0 };
      exercise.sets.push(newSet);
    }
  }
  removeSetFromExercise(event: { exerciseId: number; setIndex: number }): void {
    const exercise = this.workoutData.exercises.find(
      (e: any) => e.exerciseId === event.exerciseId
    );
    if (exercise) {
      exercise.sets.splice(event.setIndex, 1);
    }
  }
}
