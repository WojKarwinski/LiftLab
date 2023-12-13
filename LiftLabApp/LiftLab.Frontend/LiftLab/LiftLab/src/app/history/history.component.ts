import { Component, OnInit } from '@angular/core';
import { LiftLabService } from '../services/LiftLab.service';
import { WorkoutData } from '../interfaces/workout.interface';

@Component({
  selector: 'app-workout-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  constructor(private liftLabService: LiftLabService) {}

  workoutData: WorkoutData[] = [];

  ngOnInit() {
    this.liftLabService.getAllWorkouts().subscribe((data) => {
      this.workoutData = data.sort((a: any, b: any) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });
  }

  findBestSet(sets: any[]): string {
    const bestSet = sets.reduce((best, current) => {
      return current.weight > best.weight ? current : best;
    }, sets[0]);

    return `${bestSet.weight} kg x ${bestSet.reps}`;
  }
}
