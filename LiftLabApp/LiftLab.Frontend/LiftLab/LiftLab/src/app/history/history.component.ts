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
    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.liftLabService.deleteWorkout(workoutId).subscribe(
            () => {
              this.workoutData = this.workoutData.filter(
                (workout) => workout.id !== workoutId
              );
            },
            (error) => {}
          );
        }
      },
      (reason) => {}
    );
  }

  findBestSet(sets: any[]): string {
    const bestSet = sets.reduce((best, current) => {
      return current.weight > best.weight ? current : best;
    }, sets[0]);

    return `${bestSet.weight} kg x ${bestSet.reps}`;
  }
}
