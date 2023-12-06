import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { TimerService } from '../services/timer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faHourglass3 } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
})
export class WorkoutComponent implements OnInit {
  @Input() workoutData: any; // Include your workout data structure here
  @Input() allExercises: any[] = [];
  @ViewChild('exerciseModal', { static: true }) exerciseModal: any;
  searchTerm: string = '';
  selectedMuscleGroup: string = 'All';
  muscleGroups: string[] = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Core'];
  faHourglass3 = faHourglass3;
  timerDisplay: string = '00:00';
  editMode: boolean = false;
  noteMode: boolean = false;
  showDropdownMenu: boolean = false;
  showMuscleGroupDropdown: boolean = false;
  constructor(
    private timerService: TimerService,
    private modalService: NgbModal,
    private eRef: ElementRef
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
    const exerciseIndex = this.workoutData.exercises.findIndex(
      (e: any) => e.exerciseId === event.exerciseId
    );
    if (exerciseIndex !== -1) {
      const exercise = this.workoutData.exercises[exerciseIndex];
      exercise.sets.splice(event.setIndex, 1);

      // Check if there are no sets left in the exercise
      if (exercise.sets.length === 0) {
        // Remove the exercise itself
        this.workoutData.exercises.splice(exerciseIndex, 1);
      }
    }
  }
  removeExercise(exerciseId: number): void {
    const exerciseIndex = this.workoutData.exercises.findIndex(
      (e: any) => e.exerciseId === exerciseId
    );
    if (exerciseIndex !== -1) {
      this.workoutData.exercises.splice(exerciseIndex, 1);
    }
  }
  openExerciseModal(): void {
    this.modalService.open(this.exerciseModal);
  }

  addExerciseToWorkout(selectedExercise: any): void {
    const newExercise = {
      exerciseId: selectedExercise.id,
      name: selectedExercise.name,
      sets: [0], // Initialize one eet
      // ... any other initial exercise properties
    };

    this.workoutData.exercises.push(newExercise);
    this.modalService.dismissAll();
  }
  get filteredExercises(): any[] {
    return this.allExercises.filter((exercise) => {
      return (
        exercise.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.selectedMuscleGroup === 'All' ||
          exercise.muscleGroup === this.selectedMuscleGroup)
      );
    });
  }

  selectMuscleGroup(group: string): void {
    this.selectedMuscleGroup = group;
    this.showMuscleGroupDropdown = !this.showMuscleGroupDropdown;
  }

  toggleMuscleGroupDropdown(): void {
    this.showMuscleGroupDropdown = !this.showMuscleGroupDropdown;
  }
}
