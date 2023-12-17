import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { WorkoutData } from '../interfaces/workout.interface';
import { DataCacheService } from '../services/DataCache.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    // Configure your chart options here
  };

  public barChartLabels = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  public barChartData: ChartDataset[] = [];
  public lineChartData: ChartDataset[] = [];
  public lineChartOptions: ChartOptions = {
    // Define your line chart options here
  };

  public lineChartLabels: string[] = ['Top 4', 'Top 3', 'Top 2', 'Top 1'];

  workoutData: WorkoutData[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dataCacheService: DataCacheService // Use DataCacheService
  ) {}

  ngOnInit(): void {
    this.dataCacheService
      .fetchWorkoutsIfNeeded()
      .subscribe((data: WorkoutData[]) => {
        this.workoutData = data;
        this.processWorkoutData();
      });
  }

  processWorkoutData(): void {
    const workoutFrequency: { [key: string]: number } = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };

    this.workoutData.forEach((workout) => {
      const dayOfWeek = new Date(workout.date).toLocaleString('en-US', {
        weekday: 'long',
      });
      workoutFrequency[dayOfWeek]++;
    });

    this.barChartData = [
      {
        data: Object.values(workoutFrequency),
        label: 'Workout Frequency',
      },
    ];
    this.updateChartData();
  }
  updateChartData(): void {
    this.lineChartData = [
      {
        data: this.getWeightProgression('Bench Press'),
        label: 'Bench Press',
        borderColor: 'rgba(0, 191, 255, 1)', // Example color for Bench Press
        backgroundColor: 'rgba(0, 191, 255, 0.2)', // Translucent background (area fill)
        borderWidth: 2,
      },
      {
        data: this.getWeightProgression('Deadlift'),
        label: 'Deadlift',
        borderColor: 'rgba(225, 185, 65, 1)', // Example color for Deadlift
        backgroundColor: 'rgba(225, 185, 65, 0.2)',
        borderWidth: 2,
      },
      {
        data: this.getWeightProgression('Squat'),
        label: 'Squat',
        borderColor: 'rgba(255, 90, 158,1)', // Example color for Squat
        backgroundColor: 'rgba(255, 90, 158,0.2)',
        borderWidth: 2,
      },
    ];

    this.changeDetector.detectChanges();
  }
  getWeightProgression(exerciseName: string): number[] {
    let weights = this.workoutData
      .flatMap((workout) => workout.exercises)
      .filter(
        (exercise) => exercise.name.toLowerCase() === exerciseName.toLowerCase()
      )
      .flatMap((exercise) => exercise.sets)
      .map((set) => set.weight)
      .filter((weight) => weight > 0); // Filter out zero weights

    // Remove duplicates, sort in descending order, and get top four weights
    weights = Array.from(new Set(weights))
      .sort((a, b) => b - a)
      .slice(0, 4)
      .reverse();

    return weights;
  }

  getMaxWeight(exerciseName: string): number {
    if (!exerciseName) return 0;
    const weights = this.getWeightProgression(exerciseName);
    return weights.length > 0 ? Math.max(...weights) : 0;
  }
}
