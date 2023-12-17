import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { ExerciseList, WorkoutData } from '../interfaces/workout.interface';
import { DataCacheService } from '../services/DataCache.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  faCog = faCog;
  @ViewChild('exerciseModal') exerciseModal: any;
  allExercises: ExerciseList[] = []; // This should be populated with your exercises
  selectedExercises: string[] = ['Bench Press', 'Squat', 'Deadlift']; // Selected exercises for chart
  searchTerm: string = '';
  muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Core'];
  selectedMuscleGroup: string = 'All';
  showMuscleGroupDropdown = false;
  colors = [
    {
      solid: 'rgba(0, 191, 255, 1)', // Color for Bench Press
      translucent: 'rgba(0, 191, 255, 0.2)',
    },
    {
      solid: 'rgba(225, 185, 65, 1)', // Color for Deadlift
      translucent: 'rgba(225, 185, 65, 0.2)',
    },
    {
      solid: 'rgba(255, 107, 107, 1)', // Color for Squat
      translucent: 'rgba(255, 107, 107, 0.2)',
    },
  ];

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
    private dataCacheService: DataCacheService, // Use DataCacheService
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dataCacheService
      .fetchWorkoutsIfNeeded()
      .subscribe((data: WorkoutData[]) => {
        this.workoutData = data;
        this.processWorkoutData();
      });
    this.dataCacheService
      .fetchExercisesIfNeeded()
      .subscribe((data: ExerciseList[]) => {
        this.allExercises = data;
      });
  }
  isSelectedExercise(exerciseName: string): boolean {
    return this.selectedExercises.includes(exerciseName);
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
    this.lineChartData = this.selectedExercises.map((exercise, index) => {
      const color = this.colors[index % this.colors.length];
      return {
        data: this.getWeightProgression(exercise),
        label: exercise,
        borderColor: color.solid,
        backgroundColor: color.translucent,
        borderWidth: 2,
      };
    });

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

  openExerciseModal() {
    this.modalService.open(this.exerciseModal);
  }

  toggleMuscleGroupDropdown() {
    this.showMuscleGroupDropdown = !this.showMuscleGroupDropdown;
  }

  selectMuscleGroup(group: string) {
    this.selectedMuscleGroup = group;
    this.showMuscleGroupDropdown = false;
  }

  get filteredExercises() {
    return this.allExercises.filter((exercise) => {
      const maxWeight = this.getMaxWeight(exercise.name);
      return (
        maxWeight > 0 &&
        exercise.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.selectedMuscleGroup === 'All' ||
          exercise.muscleGroup === this.selectedMuscleGroup)
      );
    });
  }
  selectExercise(exercise: string) {
    if (!this.selectedExercises.includes(exercise)) {
      if (this.selectedExercises.length < 3) {
        this.selectedExercises.push(exercise);
      } else {
        // Handle the case where more than three exercises are selected
        // Perhaps show a message or replace the last one
      }
    }
  }
  addExerciseToChart(exercise: ExerciseList) {
    const exerciseIndex = this.selectedExercises.indexOf(exercise.name);
    if (exerciseIndex !== -1) {
      // Exercise is already selected, remove it
      this.selectedExercises.splice(exerciseIndex, 1);
    } else {
      // Exercise is not selected, add it
      if (this.selectedExercises.length >= 3) {
        // Optional: Remove the first exercise if there are already three selected
        this.selectedExercises.shift();
      }
      this.selectedExercises.push(exercise.name);
    }
    this.updateChartData();
  }
}
