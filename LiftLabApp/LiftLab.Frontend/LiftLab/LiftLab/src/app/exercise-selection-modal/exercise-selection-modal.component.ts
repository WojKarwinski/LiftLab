import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LiftLabService } from '../services/LiftLab.service';

@Component({
  selector: 'app-exercise-selection-modal',
  templateUrl: './exercise-selection-modal.component.html',
  // styleUrls if necessary
})
export class ExerciseSelectionModalComponent implements OnInit {
  searchTerm: string = '';
  selectedMuscleGroup: string = 'All';
  muscleGroups: string[] = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Core'];
  showMuscleGroupDropdown: boolean = false;
  allExercises: any[] = []; // Populate this with your exercise data

  @Output() exerciseSelected = new EventEmitter<any>();

  constructor(
    private modalService: NgbModal,
    private liftLabService: LiftLabService
  ) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  toggleMuscleGroupDropdown(): void {
    this.showMuscleGroupDropdown = !this.showMuscleGroupDropdown;
  }

  selectMuscleGroup(group: string): void {
    this.selectedMuscleGroup = group;
    this.showMuscleGroupDropdown = false;
  }

  get filteredExercises(): any[] {
    return this.allExercises.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.selectedMuscleGroup === 'All' ||
          exercise.muscleGroup === this.selectedMuscleGroup)
    );
  }

  selectExercise(exercise: any): void {
    this.exerciseSelected.emit(exercise);
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }
  private loadExercises() {
    this.liftLabService.getAllExercises().subscribe((data) => {
      this.allExercises = data;
    });
  }
}
