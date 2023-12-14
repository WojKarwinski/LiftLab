import { Component, OnInit } from '@angular/core';
import { LiftLabService } from '../services/LiftLab.service';
import { WorkoutData } from '../interfaces/workout.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  constructor(private liftLabService: LiftLabService, private router: Router) {}

  startWorkoutFromHistory(workoutId: number) {
    this.router.navigate(['/workout', workoutId]);
  }

  workoutData: WorkoutData[] = [
    {
      id: 78,
      date: '2023-05-29T00:00:00',
      name: 'Legs',
      note: 'null',
      exercises: [
        {
          exerciseId: 258,
          exerciseOrder: 1,
          name: 'Deadlift',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 115,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 180,
              rpe: null,
            },
            {
              setNumber: 1,
              reps: 10,
              weight: 115,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 180,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 259,
          exerciseOrder: 1,
          name: 'Reverse Lunge',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 105,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 135,
              rpe: null,
            },
            {
              setNumber: 1,
              reps: 10,
              weight: 105,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 135,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 260,
          exerciseOrder: 1,
          name: 'Front Squat',
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
              weight: 150,
              rpe: null,
            },
            {
              setNumber: 3,
              reps: 10,
              weight: 100,
              rpe: null,
            },
            {
              setNumber: 1,
              reps: 10,
              weight: 130,
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
              weight: 100,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 261,
          exerciseOrder: 1,
          name: 'Goblet Squat',
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
              weight: 180,
              rpe: null,
            },
            {
              setNumber: 3,
              reps: 10,
              weight: 140,
              rpe: null,
            },
            {
              setNumber: 1,
              reps: 10,
              weight: 180,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 180,
              rpe: null,
            },
            {
              setNumber: 3,
              reps: 10,
              weight: 140,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 262,
          exerciseOrder: 1,
          name: 'Step-ups',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 140,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 110,
              rpe: null,
            },
            {
              setNumber: 1,
              reps: 10,
              weight: 140,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 110,
              rpe: null,
            },
          ],
        },
      ],
    },
    {
      id: 79,
      date: '2023-06-01T00:00:00',
      name: 'Arms',
      note: 'null',
      exercises: [
        {
          exerciseId: 263,
          exerciseOrder: 1,
          name: 'Bench Press',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 105,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 145,
              rpe: null,
            },
            {
              setNumber: 1,
              reps: 10,
              weight: 105,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 145,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 264,
          exerciseOrder: 1,
          name: 'Hammer Curl with Rope',
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
              weight: 105,
              rpe: null,
            },
            {
              setNumber: 3,
              reps: 10,
              weight: 80,
              rpe: null,
            },
            {
              setNumber: 1,
              reps: 10,
              weight: 180,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 105,
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
          exerciseId: 265,
          exerciseOrder: 1,
          name: 'Cable Preacher Curl',
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
              weight: 100,
              rpe: null,
            },
            {
              setNumber: 1,
              reps: 10,
              weight: 170,
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
          exerciseId: 266,
          exerciseOrder: 1,
          name: 'Dumbbell Curl',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 85,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 110,
              rpe: null,
            },
            {
              setNumber: 1,
              reps: 10,
              weight: 85,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 110,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 267,
          exerciseOrder: 1,
          name: 'Concentration Curl',
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
              weight: 90,
              rpe: null,
            },
            {
              setNumber: 3,
              reps: 10,
              weight: 100,
              rpe: null,
            },
            {
              setNumber: 1,
              reps: 10,
              weight: 110,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 90,
              rpe: null,
            },
            {
              setNumber: 3,
              reps: 10,
              weight: 100,
              rpe: null,
            },
          ],
        },
      ],
    },
    {
      id: 80,
      date: '2023-06-03T00:00:00',
      name: 'Core',
      note: 'null',
      exercises: [
        {
          exerciseId: 268,
          exerciseOrder: 1,
          name: 'Squat',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 120,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 90,
              rpe: null,
            },
            {
              setNumber: 3,
              reps: 10,
              weight: 85,
              rpe: null,
            },
            {
              setNumber: 1,
              reps: 10,
              weight: 120,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 90,
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
          exerciseId: 269,
          exerciseOrder: 1,
          name: 'Plank with Elbow to Knee',
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
              weight: 130,
              rpe: null,
            },
            {
              setNumber: 1,
              reps: 10,
              weight: 100,
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
        {
          exerciseId: 270,
          exerciseOrder: 1,
          name: 'Plank',
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
              weight: 160,
              rpe: null,
            },
            {
              setNumber: 1,
              reps: 10,
              weight: 165,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 160,
              rpe: null,
            },
          ],
        },
        {
          exerciseId: 271,
          exerciseOrder: 1,
          name: 'Russian Twist',
          sets: [
            {
              setNumber: 1,
              reps: 10,
              weight: 80,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 10,
              weight: 130,
              rpe: null,
            },
            {
              setNumber: 1,
              reps: 10,
              weight: 80,
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
        {
          exerciseId: 272,
          exerciseOrder: 1,
          name: 'Alternating Plank',
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
              weight: 165,
              rpe: null,
            },
            {
              setNumber: 1,
              reps: 10,
              weight: 175,
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
  ];

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
