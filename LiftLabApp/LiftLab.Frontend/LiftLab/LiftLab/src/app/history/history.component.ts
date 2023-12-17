import { Component, OnInit } from '@angular/core';
import { DataCacheService } from '../services/DataCache.service';
import { WorkoutData } from '../interfaces/workout.interface';
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
  }

  startWorkoutFromHistory(workoutId: number) {
    // Navigate to the workout start component with the workoutId as a parameter
    this.router.navigate(['/workout/start', workoutId]);
  }

  editWorkout(workoutId: number) {
    // Navigate to the workout edit component with the workoutId as a parameter
    this.router.navigate(['/workout/edit', workoutId]);
  }
  deleteWorkout(workoutId: number): void {
    // Open the confirmation modal
    const modalRef = this.modalService.open(WarningModalComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          // User confirmed, proceed with deletion
          this.liftLabService.deleteWorkout(workoutId).subscribe(
            () => {
              // Successfully deleted the workout, update the workoutData array to reflect the deletion
              this.workoutData = this.workoutData.filter(
                (workout) => workout.id !== workoutId
              );
            },
            (error) => {
              // Handle error scenario
              // Maybe show an error message to the user
            }
          );
        }
      },
      (reason) => {
        // Modal dismissed, no action required or handle accordingly
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
