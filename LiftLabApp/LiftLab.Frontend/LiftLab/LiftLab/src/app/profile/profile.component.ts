import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { LiftLabService } from '../services/LiftLab.service';

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
  public lineChartData: ChartDataset[] = []; // Add this line
  public lineChartOptions: ChartOptions = {
    // Define your line chart options here
  };

  public lineChartLabels: string[] = ['Top 4', 'Top 3', 'Top 2', 'Top 1'];

  // Example workout data (replace with your actual data fetching logic)
  workoutData = [
    {
      id: 1,
      date: '2023-01-01T00:00:00',
      name: 'Push',
      note: null,
      exercises: [
        {
          exerciseId: 1,
          exerciseOrder: 1,
          name: 'Bench Press',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 100,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 165,
              rpe: null,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      date: '2023-01-02T00:00:00',
      name: 'Pull',
      note: null,
      exercises: [
        {
          exerciseId: 2,
          exerciseOrder: 1,
          name: 'Deadlift',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 180,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 130,
              rpe: null,
            },
            {
              setNumber: 3,
              reps: 10,
              weight: 125,
              rpe: null,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      date: '2023-01-05T00:00:00',
      name: 'Legs',
      note: null,
      exercises: [
        {
          exerciseId: 3,
          exerciseOrder: 1,
          name: 'Bench Press',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 125,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 110,
              rpe: null,
            },
            {
              setNumber: 3,
              reps: 10,
              weight: 165,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 4,
          exerciseOrder: 1,
          name: 'Cable Kickbacks',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 100,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 155,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 5,
          exerciseOrder: 1,
          name: 'Squat',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 150,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 140,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 6,
          exerciseOrder: 1,
          name: 'Reverse Lunge',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 145,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 150,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 7,
          exerciseOrder: 1,
          name: 'Leg Extension Machine',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 155,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 140,
              rpe: null,
            },
          ],
        },
      ],
    },
    {
      id: 4,
      date: '2023-01-07T00:00:00',
      name: 'Arms',
      note: null,
      exercises: [
        {
          exerciseId: 8,
          exerciseOrder: 1,
          name: 'Deadlift',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 110,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 85,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 9,
          exerciseOrder: 1,
          name: 'Reverse Curl',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 175,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 100,
              rpe: null,
            },
            {
              setNumber: 3,
              reps: 10,
              weight: 130,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 10,
          exerciseOrder: 1,
          name: 'Hammer Curl with Dumbbells',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 110,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 150,
              rpe: null,
            },
            {
              setNumber: 3,
              reps: 10,
              weight: 85,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 11,
          exerciseOrder: 1,
          name: 'Barbell Curl with Chains',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 130,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 90,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 12,
          exerciseOrder: 1,
          name: 'Close Grip Bench Press',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 150,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 95,
              rpe: null,
            },
            {
              setNumber: 3,
              reps: 10,
              weight: 95,
              rpe: null,
            },
          ],
        },
      ],
    },
    {
      id: 5,
      date: '2023-01-08T00:00:00',
      name: 'Core',
      note: null,
      exercises: [
        {
          exerciseId: 13,
          exerciseOrder: 1,
          name: 'Squat',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 170,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 155,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 14,
          exerciseOrder: 1,
          name: 'Russian Twist with Kettlebell',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 165,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 150,
              rpe: null,
            },
            {
              setNumber: 3,
              reps: 10,
              weight: 80,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 15,
          exerciseOrder: 1,
          name: 'Russian Twist with Twist Bar',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 125,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 140,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 16,
          exerciseOrder: 1,
          name: 'Plank with Feet on Swiss Ball',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 180,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 100,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 17,
          exerciseOrder: 1,
          name: 'Plank with Leg Lift',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 135,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 130,
              rpe: null,
            },
          ],
        },
      ],
    },
  ];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private LiftLabService: LiftLabService
  ) {}

  ngOnInit(): void {
    this.processWorkoutData();
    // this.LiftLabService.getAllWorkouts().subscribe((data: any) => {
    //   console.log(data);
    //   this.workoutData = data;
    //   this.processWorkoutData();
    // });
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
        borderColor: 'rgba(255, 99, 132, 1)', // Example color for Bench Press
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Translucent background (area fill)
        borderWidth: 2,
      },
      {
        data: this.getWeightProgression('Deadlift'),
        label: 'Deadlift',
        borderColor: 'rgba(54, 162, 235, 1)', // Example color for Deadlift
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
      },
      {
        data: this.getWeightProgression('Squat'),
        label: 'Squat',
        borderColor: 'rgba(75, 192, 192, 1)', // Example color for Squat
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
