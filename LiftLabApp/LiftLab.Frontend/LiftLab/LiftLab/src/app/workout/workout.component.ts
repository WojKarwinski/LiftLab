import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faHourglass3 } from '@fortawesome/free-solid-svg-icons';
import { WorkoutStateService } from '../services/workout-state.service';
import { TimerService } from '../services/timer.service';
import { LiftLabService } from '../services/LiftLab.service';
import { Router } from '@angular/router';
import {
  Exercise,
  ExerciseSet,
  WorkoutData,
} from '../interfaces/workout.interface';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
})
export class WorkoutComponent implements OnInit {
  @Input() workoutData: WorkoutData = {
    id: 0,
    date: new Date().toISOString(),
    name: 'New Workout',
    note: 'Empty Workout',
  } as WorkoutData;
  allExercises: any[] = []; // Define a more specific type if possible
  @ViewChild('exerciseModal', { static: true }) exerciseModal: any; // Define a more specific type if possible

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
    private router: Router,
    private timerService: TimerService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private liftLabService: LiftLabService,
    private workoutStateService: WorkoutStateService
  ) {}

  ngOnInit(): void {
    this.subscribeToTimer();
    this.loadWorkoutData();
    this.loadExercises();
  }

  private loadExercises() {
    this.liftLabService.getAllExercises().subscribe((data) => {
      this.allExercises = data;
    });
  }

  private subscribeToTimer(): void {
    this.timerService.timerValue$.subscribe((value) =>
      this.updateTimerDisplay(value)
    );
  }

  private loadWorkoutData(): void {
    this.route.paramMap.subscribe((params) => {
      const workoutId = Number(params.get('id'));
      if (workoutId) {
        this.liftLabService
          .getWorkoutById(workoutId)
          .subscribe((data) => (this.workoutData = data));
      }
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
    if (this.workoutData.id === 0) {
      this.liftLabService.createWorkout(this.workoutData).subscribe(
        (response) => {
          this.workoutStateService.setWorkoutActive(false);
          this.router.navigate(['/history']);
        },
        (error) => {
          // Handle error
        }
      );
    } else {
      this.liftLabService
        .updateWorkout(this.workoutData.id, this.workoutData)
        .subscribe(
          (response) => {
            this.workoutStateService.setWorkoutActive(false);
            this.router.navigate(['/history']);
          },
          (error) => {
            // Handle errors here, e.g., show an error message
          }
        );
    }
  }
  cancelWorkout(id: number): void {
    // Set the service property to false to show the workout menu again
    this.workoutStateService.setWorkoutActive(false);

    // Call deleteWorkout from LiftLabService
    this.liftLabService.deleteWorkout(id).subscribe(
      (response) => {
        this.router.navigate(['/history']);
      },
      (error) => {
        // Handle error if needed
      }
    );
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
    this.showDropdownMenu = !this.showDropdownMenu;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.showDropdownMenu = false;
    this.noteMode = false;
  }

  toggleNoteMode(): void {
    this.noteMode = !this.noteMode;
    this.showDropdownMenu = false;
    this.editMode = false;
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
      (e) => e.exerciseId === exerciseId
    );
    if (exercise) {
      const newSetNumber = exercise.sets.length + 1;

      // Create a new set with default values, including the 'rpe' property
      const newSet: ExerciseSet = {
        setNumber: newSetNumber,
        reps: 0,
        weight: 0,
        rpe: 0,
      };
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

      if (exercise.sets.length === 0) {
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
    this.loadExercises();
    this.modalService.open(this.exerciseModal);
  }

  addExerciseToWorkout(selectedExercise: any): void {
    if (!this.workoutData.exercises) {
      this.workoutData.exercises = [];
    }
    const exerciseOrder = this.workoutData.exercises.length + 1;
    const newExercise: Exercise = {
      exerciseId: this.workoutData.exercises.length + 1,
      exerciseListId: selectedExercise.id,
      name: selectedExercise.name,
      exerciseOrder: exerciseOrder, // Set the exerciseOrder property
      sets: [{ setNumber: 1, reps: 0, weight: 0, rpe: 0 }],
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
