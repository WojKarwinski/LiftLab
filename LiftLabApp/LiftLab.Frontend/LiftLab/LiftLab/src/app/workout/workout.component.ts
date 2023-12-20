import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faHourglass3 } from '@fortawesome/free-solid-svg-icons';
import { WorkoutStateService } from '../services/workout-state.service';
import { TimerService } from '../services/timer.service';
import { LiftLabService } from '../services/LiftLab.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WarningModalComponent } from '../warning-modal/warning-modal.component';
import { ExerciseSelectionModalComponent } from '../exercise-selection-modal/exercise-selection-modal.component';
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
  editingWorkout: boolean = false;
  @Input() workoutData: WorkoutData = {
    id: 0,
    date: new Date().toISOString(),
    name: 'New Workout',
    note: 'Empty Workout',
  } as WorkoutData;
  allExercises: any[] = [];
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
    private route: ActivatedRoute,
    private router: Router,
    private timerService: TimerService,
    private modalService: NgbModal,
    private liftLabService: LiftLabService,
    private workoutStateService: WorkoutStateService
  ) {}

  ngOnInit(): void {
    this.subscribeToTimer();
    this.loadWorkoutData();
  }

  private subscribeToTimer(): void {
    this.timerService.timerValue$.subscribe((value) =>
      this.updateTimerDisplay(value)
    );
  }

  private loadWorkoutData(): void {
    this.route.paramMap.subscribe((params) => {
      const workoutId = params.get('id');
      const currentRoute = this.router.url;

      if (workoutId && workoutId !== 'new') {
        this.liftLabService
          .getWorkoutById(Number(workoutId))
          .subscribe((data) => {
            if (data && data.id) {
              if (currentRoute.includes('/perform/')) {
                const newWorkout = JSON.parse(JSON.stringify(data));
                newWorkout.id = 0;
                newWorkout.date = new Date().toISOString();
                this.setAllSetsChecked(newWorkout);
                this.workoutData = newWorkout;
              } else {
                if (currentRoute.includes('/edit/')) {
                  this.editingWorkout = true;
                }

                this.setAllSetsChecked(data);
                this.workoutData = data;
              }
            }
          });
      } else {
        this.workoutData = this.createNewWorkoutData();
      }
    });
  }

  private createNewWorkoutData(): WorkoutData {
    return {
      id: 0,
      date: new Date().toISOString(),
      name: 'New Workout',
      note: '',
      exercises: [],
    };
  }
  private setAllSetsChecked(workout: WorkoutData): void {
    workout.exercises.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        set.checked = true;
      });
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
    this.workoutData.exercises.forEach((exercise) => {
      exercise.sets = exercise.sets.filter((set) => set.checked);
    });

    this.timerService.stopTimer();

    if (this.workoutData.id == 0) {
      this.liftLabService.createWorkout(this.workoutData).subscribe({
        next: (response) => {
          this.workoutStateService.setWorkoutActive(false);
          this.router.navigate(['/history']);
        },
      });
    } else {
      this.liftLabService
        .updateWorkout(this.workoutData.id, this.workoutData)
        .subscribe({
          next: (response) => {
            this.workoutStateService.setWorkoutActive(false);
            this.router.navigate(['/history']);
          },
        });
    }
  }

  cancelWorkout(id: number): void {
    if (this.workoutData.id !== 0) {
      this.router.navigate(['/history']);
      this.workoutStateService.setWorkoutActive(false);
    } else {
      const modalRef = this.modalService.open(WarningModalComponent);
      modalRef.componentInstance.modalMessage = 'cancel the workout';
      modalRef.result.then(
        (result) => {
          if (result === 'confirm') {
            this.workoutStateService.setWorkoutActive(false);
            this.liftLabService.deleteWorkout(id).subscribe({
              next: (response) => {
                this.router.navigate(['/history']);
              },
            });
          }
        },
        (reason) => {}
      );
    }
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
    }
    this.editMode = false;
  }

  saveNote(): void {
    if (this.workoutData.note.trim().length > 0) {
    }
    this.noteMode = false;
  }

  cancelEdit(): void {
    this.editMode = false;
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

      const newSet: ExerciseSet = {
        setNumber: newSetNumber,
        reps: 0,
        weight: 0,
        rpe: 0,
        checked: false,
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
  replaceExerciseInWorkout(replacementInfo: {
    oldExerciseId: number;
    newExercise: any;
  }): void {
    const exerciseIndex = this.workoutData.exercises.findIndex(
      (exercise) => exercise.exerciseId === replacementInfo.oldExerciseId
    );
    if (exerciseIndex !== -1) {
      const newExercise: Exercise = {
        exerciseId: replacementInfo.newExercise.id,
        exerciseListId: replacementInfo.newExercise.listId,
        name: replacementInfo.newExercise.name,
        order: replacementInfo.newExercise.order,
        sets: this.workoutData.exercises[exerciseIndex].sets,
      };

      this.workoutData.exercises[exerciseIndex] = newExercise;
    }
  }

  openExerciseModal(): void {
    const modalRef = this.modalService.open(ExerciseSelectionModalComponent);
    modalRef.componentInstance.exerciseSelected.subscribe(
      (selectedExercise: any) => {
        this.addExerciseToWorkout(selectedExercise);
        modalRef.close();
      }
    );
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
      order: exerciseOrder,
      sets: [{ setNumber: 1, reps: 0, weight: 0, rpe: 0, checked: false }],
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
