import { Component, OnInit } from '@angular/core';
import { DataCacheService } from '../services/DataCache.service';
import { WorkoutData } from '../interfaces/workout.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  workoutData: WorkoutData[] = [];

  constructor(
    private dataCacheService: DataCacheService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataCacheService.fetchWorkoutsIfNeeded().subscribe((data) => {
      this.workoutData = data.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });
  }

  startWorkoutFromHistory(workoutId: number) {
    this.router.navigate(['/workout', workoutId]);
  }

  findBestSet(sets: any[]): string {
    const bestSet = sets.reduce((best, current) => {
      return current.weight > best.weight ? current : best;
    }, sets[0]);

    return `${bestSet.weight} kg x ${bestSet.reps}`;
  }
}
