import { Component, OnInit } from '@angular/core';
import { DataCacheService } from '../services/DataCache.service';
import { Template, WorkoutData } from '../interfaces/workout.interface';
import { Router } from '@angular/router';
import { LiftLabService } from '../services/LiftLab.service';
import { WarningModalComponent } from '../warning-modal/warning-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-workout-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  searchTerm: string = '';
  workoutData: WorkoutData[] = [];
  selectedWorkoutIndex: number | null = null;

  constructor(
    private dataCacheService: DataCacheService,
    private router: Router,
    private liftLabService: LiftLabService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.dataCacheService.fetchWorkoutsIfNeeded().subscribe((data) => {
      this.workoutData = data.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });
    this.liftLabService.getAllWorkouts().subscribe((data: WorkoutData[]) => {
      this.workoutData = data.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });
  }
  filterWorkouts(): WorkoutData[] {
    if (!this.searchTerm) {
      return this.workoutData;
    }
    return this.workoutData.filter((workout) =>
      workout.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  startWorkoutFromHistory(workoutId: number) {
    this.router.navigate(['/workout/perform', workoutId]);
  }

  editWorkout(workoutId: number) {
    this.router.navigate(['/workout/edit', workoutId]);
  }
  deleteWorkout(workoutId: number): void {
    const modalRef = this.modalService.open(WarningModalComponent);

    modalRef.componentInstance.modalMessage = 'delete the workout';

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.liftLabService.deleteWorkout(workoutId).subscribe(
            () => {
              this.workoutData = this.workoutData.filter(
                (workout) => workout.id !== workoutId
              );
            },
            (error) => {
              // Handle error here if necessary
            }
          );
        }
      },
      (reason) => {}
    );
  }

  createTemplate(workout: WorkoutData): void {
    const template: Template = {
      id: 0, // Assuming new templates have id 0
      name: workout.name,
      description: workout.note, // Using note as the description
      exercises: workout.exercises.map((exercise, index) => ({
        exerciseListId: exercise.exerciseListId,
        exerciseName: exercise.name,
        sets: exercise.sets.length,
        order: index === 0 ? exercise.order : exercise.order + index,
      })),
    };

    this.liftLabService.createNewTemplate(template).subscribe(
      (response) => {
        // Handle the response, maybe update UI or give user feedback
      },
      (error) => {
        // Handle any errors
      }
    );
  }

  findBestSet(sets: any[]): string {
    const bestSet = sets.reduce((best, current) => {
      return current.weight > best.weight ? current : best;
    }, sets[0]);

    return `${bestSet.weight} kg x ${bestSet.reps}`;
  }
}
