import { Component } from '@angular/core';
import { LiftLabService } from './services/LiftLab.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // This would be replaced with the actual data fetched from a service or a backend
  title = 'LiftLab';
  workoutData = {
    id: 1,
    date: '2022-09-16T23:07:39',
    name: 'Ass Workout',
    note: '',
    exercises: [
      {
        exerciseId: 1,
        exerciseOrder: 1,
        name: 'Glute Spread',
        sets: [
          {
            setNumber: 1,
            reps: 12,
            weight: 100,
            rpe: 2,
          },
          {
            setNumber: 2,
            reps: 12,
            weight: 120,
            rpe: 5,
          },
          {
            setNumber: 3,
            reps: 12,
            weight: 140,
            rpe: 8,
          },
        ],
      },
      {
        exerciseId: 2,
        exerciseOrder: 2,
        name: 'Pull-up',
        sets: [
          {
            setNumber: 1,
            reps: 10,
            weight: 150,
            rpe: null,
          },
          {
            setNumber: 2,
            reps: 8,
            weight: 170,
            rpe: null,
          },
          {
            setNumber: 3,
            reps: 6,
            weight: 200,
            rpe: null,
          },
        ],
      },
      {
        exerciseId: 3,
        exerciseOrder: 3,
        name: 'Squat',
        sets: [
          {
            setNumber: 1,
            reps: 10,
            weight: 200,
            rpe: null,
          },
          {
            setNumber: 2,
            reps: 10,
            weight: 200,
            rpe: null,
          },
        ],
      },
      {
        exerciseId: 4,
        exerciseOrder: 4,
        name: 'Deadlift',
        sets: [
          {
            setNumber: 3,
            reps: 10,
            weight: 200,
            rpe: null,
          },
          {
            setNumber: 1,
            reps: 12,
            weight: 80,
            rpe: null,
          },
        ],
      },
      {
        exerciseId: 5,
        exerciseOrder: 5,
        name: 'Bench press',
        sets: [
          {
            setNumber: 2,
            reps: 10,
            weight: 100,
            rpe: null,
          },
          {
            setNumber: 3,
            reps: 8,
            weight: 80,
            rpe: null,
          },
        ],
      },
    ],
  };
  allExercises: any[] = [];

  constructor(private LiftLabService: LiftLabService) {}

  ngOnInit(): void {
    this.LiftLabService.getAllExercises().subscribe({
      next: (exercises) => {
        this.allExercises = exercises;
      },
      error: (err) => {
        this.allExercises = [
          {
            id: 21,
            name: 'Glute-spread',
            muscleGroup: 'Arms',
          },
          {
            id: 22,
            name: 'Pull-up',
            muscleGroup: 'Back',
          },
          {
            id: 23,
            name: 'Squat',
            muscleGroup: 'Legs',
          },
          {
            id: 24,
            name: 'Bicep Curl',
            muscleGroup: 'Arms',
          },
          {
            id: 25,
            name: 'Plank',
            muscleGroup: 'Core',
          },
          {
            id: 26,
            name: 'Deadlift',
            muscleGroup: 'Back',
          },
          {
            id: 27,
            name: 'Lunges',
            muscleGroup: 'Legs',
          },
          {
            id: 28,
            name: 'Tricep Dip',
            muscleGroup: 'Arms',
          },
          {
            id: 29,
            name: 'Sit-up',
            muscleGroup: 'Core',
          },
          {
            id: 30,
            name: 'Bench Press',
            muscleGroup: 'Chest',
          },
          {
            id: 31,
            name: 'Row',
            muscleGroup: 'Back',
          },
          {
            id: 32,
            name: 'Leg Press',
            muscleGroup: 'Legs',
          },
          {
            id: 33,
            name: 'Hammer Curl',
            muscleGroup: 'Arms',
          },
          {
            id: 34,
            name: 'Russian Twist',
            muscleGroup: 'Core',
          },
          {
            id: 35,
            name: 'Overhead Press',
            muscleGroup: 'Shoulders',
          },
          {
            id: 36,
            name: 'Lat Pulldown',
            muscleGroup: 'Back',
          },
          {
            id: 37,
            name: 'Leg Curl',
            muscleGroup: 'Legs',
          },
          {
            id: 38,
            name: 'Skull Crusher',
            muscleGroup: 'Arms',
          },
          {
            id: 39,
            name: 'Mountain Climbers',
            muscleGroup: 'Core',
          },
          {
            id: 40,
            name: 'Incline Bench Press',
            muscleGroup: 'Chest',
          },
          {
            id: 41,
            name: 'Chin-up',
            muscleGroup: 'Back',
          },
          {
            id: 42,
            name: 'Calf Raise',
            muscleGroup: 'Legs',
          },
          {
            id: 43,
            name: 'Preacher Curl',
            muscleGroup: 'Arms',
          },
          {
            id: 44,
            name: 'Hanging Leg Raise',
            muscleGroup: 'Core',
          },
          {
            id: 45,
            name: 'Front Raise',
            muscleGroup: 'Shoulders',
          },
          {
            id: 46,
            name: 'Face Pull',
            muscleGroup: 'Back',
          },
          {
            id: 47,
            name: 'Step-ups',
            muscleGroup: 'Legs',
          },
          {
            id: 48,
            name: 'Dumbbell Curl',
            muscleGroup: 'Arms',
          },
          {
            id: 49,
            name: 'Plank with Shoulder Taps',
            muscleGroup: 'Core',
          },
          {
            id: 50,
            name: 'Decline Bench Press',
            muscleGroup: 'Chest',
          },
          {
            id: 51,
            name: 'T-Bar Row',
            muscleGroup: 'Back',
          },
          {
            id: 52,
            name: 'Leg Extension',
            muscleGroup: 'Legs',
          },
          {
            id: 53,
            name: 'Concentration Curl',
            muscleGroup: 'Arms',
          },
          {
            id: 54,
            name: 'Flutter Kicks',
            muscleGroup: 'Core',
          },
          {
            id: 55,
            name: 'Lateral Raise',
            muscleGroup: 'Shoulders',
          },
          {
            id: 56,
            name: 'Bent Over Row',
            muscleGroup: 'Back',
          },
          {
            id: 57,
            name: 'Hack Squat',
            muscleGroup: 'Legs',
          },
          {
            id: 58,
            name: 'Close Grip Bench Press',
            muscleGroup: 'Arms',
          },
          {
            id: 59,
            name: 'Side Plank',
            muscleGroup: 'Core',
          },
          {
            id: 60,
            name: 'Pec Deck Machine',
            muscleGroup: 'Chest',
          },
          {
            id: 61,
            name: 'Reverse Fly',
            muscleGroup: 'Back',
          },
          {
            id: 62,
            name: 'Walking Lunge',
            muscleGroup: 'Legs',
          },
          {
            id: 63,
            name: 'Wrist Curl',
            muscleGroup: 'Arms',
          },
          {
            id: 64,
            name: 'V-ups',
            muscleGroup: 'Core',
          },
          {
            id: 65,
            name: 'Shrugs',
            muscleGroup: 'Shoulders',
          },
          {
            id: 66,
            name: 'One-Arm Row',
            muscleGroup: 'Back',
          },
          {
            id: 67,
            name: 'Leg Raises',
            muscleGroup: 'Legs',
          },
          {
            id: 68,
            name: 'Pushdown',
            muscleGroup: 'Arms',
          },
          {
            id: 69,
            name: 'Russian Twist with Medicine Ball',
            muscleGroup: 'Core',
          },
          {
            id: 70,
            name: 'Machine Chest Press',
            muscleGroup: 'Chest',
          },
          {
            id: 71,
            name: 'Pull-over',
            muscleGroup: 'Back',
          },
          {
            id: 72,
            name: 'Sissy Squat',
            muscleGroup: 'Legs',
          },
          {
            id: 73,
            name: 'Barbell Curl',
            muscleGroup: 'Arms',
          },
          {
            id: 74,
            name: 'Hollow Body Hold',
            muscleGroup: 'Core',
          },
          {
            id: 75,
            name: 'Arnold Press',
            muscleGroup: 'Shoulders',
          },
          {
            id: 76,
            name: 'Seated Cable Row',
            muscleGroup: 'Back',
          },
          {
            id: 77,
            name: 'Bulgarian Split Squat',
            muscleGroup: 'Legs',
          },
          {
            id: 78,
            name: 'Hammer Curl with Rope',
            muscleGroup: 'Arms',
          },
          {
            id: 79,
            name: 'Plank with Knee to Elbow',
            muscleGroup: 'Core',
          },
          {
            id: 80,
            name: 'Dips',
            muscleGroup: 'Chest',
          },
          {
            id: 81,
            name: 'Face Pull with Rope',
            muscleGroup: 'Back',
          },
          {
            id: 82,
            name: 'Leg Press Machine',
            muscleGroup: 'Legs',
          },
          {
            id: 83,
            name: 'Reverse Curl',
            muscleGroup: 'Arms',
          },
          {
            id: 84,
            name: 'Russian Twist with Twist Bar',
            muscleGroup: 'Core',
          },
          {
            id: 85,
            name: 'Military Press',
            muscleGroup: 'Shoulders',
          },
          {
            id: 86,
            name: 'Lat Pulldown with Wide Grip',
            muscleGroup: 'Back',
          },
          {
            id: 87,
            name: 'Squat Jump',
            muscleGroup: 'Legs',
          },
          {
            id: 88,
            name: 'Close Grip Pull-up',
            muscleGroup: 'Arms',
          },
          {
            id: 89,
            name: 'Sit-up with Twist',
            muscleGroup: 'Core',
          },
          {
            id: 90,
            name: 'Incline Dumbbell Press',
            muscleGroup: 'Chest',
          },
          {
            id: 91,
            name: 'Cable Row',
            muscleGroup: 'Back',
          },
          {
            id: 92,
            name: 'Leg Curl Machine',
            muscleGroup: 'Legs',
          },
          {
            id: 93,
            name: 'Spider Curl',
            muscleGroup: 'Arms',
          },
          {
            id: 94,
            name: 'Plank with Leg Lift',
            muscleGroup: 'Core',
          },
          {
            id: 95,
            name: 'Upright Row',
            muscleGroup: 'Shoulders',
          },
          {
            id: 96,
            name: 'Deadlift with Dumbbells',
            muscleGroup: 'Back',
          },
          {
            id: 97,
            name: 'Front Squat',
            muscleGroup: 'Legs',
          },
          {
            id: 98,
            name: 'Tricep Kickback',
            muscleGroup: 'Arms',
          },
          {
            id: 99,
            name: 'Side Plank with Hip Dip',
            muscleGroup: 'Core',
          },
          {
            id: 100,
            name: 'Machine Fly',
            muscleGroup: 'Chest',
          },
          {
            id: 101,
            name: 'Pull-up with Leg Raise',
            muscleGroup: 'Back',
          },
          {
            id: 102,
            name: 'Reverse Lunge',
            muscleGroup: 'Legs',
          },
          {
            id: 103,
            name: 'EZ Bar Curl',
            muscleGroup: 'Arms',
          },
          {
            id: 104,
            name: 'Russian Twist with Kettlebell',
            muscleGroup: 'Core',
          },
          {
            id: 105,
            name: 'Shoulder Press Machine',
            muscleGroup: 'Shoulders',
          },
          {
            id: 106,
            name: 'Burpee',
            muscleGroup: 'Full Body',
          },
          {
            id: 107,
            name: 'Renegade Rows',
            muscleGroup: 'Back',
          },
          {
            id: 108,
            name: 'Box Jump',
            muscleGroup: 'Legs',
          },
          {
            id: 109,
            name: 'Kettlebell Swing',
            muscleGroup: 'Hips',
          },
          {
            id: 110,
            name: 'Hanging Knee Raise',
            muscleGroup: 'Core',
          },
          {
            id: 111,
            name: 'Front Squat with Barbell',
            muscleGroup: 'Legs',
          },
          {
            id: 112,
            name: 'Dumbbell Pullover',
            muscleGroup: 'Back',
          },
          {
            id: 113,
            name: 'Jumping Lunges',
            muscleGroup: 'Legs',
          },
          {
            id: 114,
            name: 'Battle Ropes',
            muscleGroup: 'Arms',
          },
          {
            id: 115,
            name: 'Russian Twist with Medicine Ball',
            muscleGroup: 'Core',
          },
          {
            id: 116,
            name: 'Clean and Jerk',
            muscleGroup: 'Full Body',
          },
          {
            id: 117,
            name: 'Kettlebell Turkish Get-up',
            muscleGroup: 'Full Body',
          },
          {
            id: 118,
            name: 'Cable Crunch',
            muscleGroup: 'Core',
          },
          {
            id: 119,
            name: 'Box Squat',
            muscleGroup: 'Legs',
          },
          {
            id: 120,
            name: 'Rowing Machine',
            muscleGroup: 'Back',
          },
          {
            id: 121,
            name: 'Reverse Hyperextension',
            muscleGroup: 'Back',
          },
          {
            id: 122,
            name: 'Jump Rope',
            muscleGroup: 'Full Body',
          },
          {
            id: 123,
            name: 'Single-Leg Romanian Deadlift',
            muscleGroup: 'Legs',
          },
          {
            id: 124,
            name: 'TRX Rows',
            muscleGroup: 'Back',
          },
          {
            id: 125,
            name: 'Leg Press 45-Degree',
            muscleGroup: 'Legs',
          },
          {
            id: 126,
            name: 'Zottman Curl',
            muscleGroup: 'Arms',
          },
          {
            id: 127,
            name: 'Dragon Flags',
            muscleGroup: 'Core',
          },
          {
            id: 128,
            name: 'Landmine Press',
            muscleGroup: 'Shoulders',
          },
          {
            id: 129,
            name: 'Roman Chair Leg Raise',
            muscleGroup: 'Core',
          },
          {
            id: 130,
            name: 'Sled Push',
            muscleGroup: 'Legs',
          },
          {
            id: 131,
            name: 'Barbell Hip Thrust',
            muscleGroup: 'Hips',
          },
          {
            id: 132,
            name: 'Face Pull with Bands',
            muscleGroup: 'Back',
          },
          {
            id: 133,
            name: 'Sumo Deadlift',
            muscleGroup: 'Legs',
          },
          {
            id: 134,
            name: 'Battle Ropes Slam',
            muscleGroup: 'Arms',
          },
          {
            id: 135,
            name: 'Plank with Alternating Arm and Leg Lift',
            muscleGroup: 'Core',
          },
          {
            id: 136,
            name: 'Medicine Ball Slams',
            muscleGroup: 'Full Body',
          },
          {
            id: 137,
            name: 'Romanian Deadlift with Dumbbells',
            muscleGroup: 'Legs',
          },
          {
            id: 138,
            name: 'Seated Cable Crunch',
            muscleGroup: 'Core',
          },
          {
            id: 139,
            name: 'Sissy Squat Machine',
            muscleGroup: 'Legs',
          },
          {
            id: 140,
            name: 'Plate Pinch Carry',
            muscleGroup: 'Arms',
          },
          {
            id: 141,
            name: 'Hollow Body Rock',
            muscleGroup: 'Core',
          },
          {
            id: 142,
            name: 'Lateral Dumbbell Raise',
            muscleGroup: 'Shoulders',
          },
          {
            id: 143,
            name: 'Hyperextension',
            muscleGroup: 'Back',
          },
          {
            id: 144,
            name: 'Seated Leg Press',
            muscleGroup: 'Legs',
          },
          {
            id: 145,
            name: 'Wrist Roller',
            muscleGroup: 'Arms',
          },
          {
            id: 146,
            name: 'Russian Twist with Stability Ball',
            muscleGroup: 'Core',
          },
          {
            id: 147,
            name: 'Squat and Press',
            muscleGroup: 'Full Body',
          },
          {
            id: 148,
            name: 'Hanging Leg Curl',
            muscleGroup: 'Legs',
          },
          {
            id: 149,
            name: 'Single-Arm Dumbbell Row',
            muscleGroup: 'Back',
          },
          {
            id: 150,
            name: 'Goblet Squat',
            muscleGroup: 'Legs',
          },
          {
            id: 151,
            name: 'Barbell Curl with Chains',
            muscleGroup: 'Arms',
          },
          {
            id: 152,
            name: 'Plank with Side Reach',
            muscleGroup: 'Core',
          },
          {
            id: 153,
            name: 'Handstand Push-up',
            muscleGroup: 'Shoulders',
          },
          {
            id: 154,
            name: 'Reverse Grip Bent Over Rows',
            muscleGroup: 'Back',
          },
          {
            id: 155,
            name: 'Smith Machine Squat',
            muscleGroup: 'Legs',
          },
          {
            id: 156,
            name: 'Hammer Curl with Dumbbells',
            muscleGroup: 'Arms',
          },
          {
            id: 157,
            name: 'Leg Press Calf Raise',
            muscleGroup: 'Legs',
          },
          {
            id: 158,
            name: 'Cable Face Pull',
            muscleGroup: 'Shoulders',
          },
          {
            id: 159,
            name: 'Inverted Row',
            muscleGroup: 'Back',
          },
          {
            id: 160,
            name: 'Zercher Squat',
            muscleGroup: 'Legs',
          },
          {
            id: 161,
            name: 'Tricep Dips on Parallel Bars',
            muscleGroup: 'Arms',
          },
          {
            id: 162,
            name: 'Plank with Feet on Swiss Ball',
            muscleGroup: 'Core',
          },
          {
            id: 163,
            name: 'Single-Arm Kettlebell Press',
            muscleGroup: 'Shoulders',
          },
          {
            id: 164,
            name: 'Cable Woodchopper',
            muscleGroup: 'Core',
          },
          {
            id: 165,
            name: 'Barbell Bent Over Rows',
            muscleGroup: 'Back',
          },
          {
            id: 166,
            name: 'Hack Squat Machine',
            muscleGroup: 'Legs',
          },
          {
            id: 167,
            name: 'Rope Hammer Curl',
            muscleGroup: 'Arms',
          },
          {
            id: 168,
            name: 'Mountain Climbers on Sliders',
            muscleGroup: 'Core',
          },
          {
            id: 169,
            name: 'Dumbbell Shoulder Press',
            muscleGroup: 'Shoulders',
          },
          {
            id: 170,
            name: 'Pull-up with Wide Grip',
            muscleGroup: 'Back',
          },
          {
            id: 171,
            name: 'Banded Hip Thrust',
            muscleGroup: 'Hips',
          },
          {
            id: 172,
            name: 'Leg Extension Machine',
            muscleGroup: 'Legs',
          },
          {
            id: 173,
            name: 'Concentration Curl with Dumbbell',
            muscleGroup: 'Arms',
          },
          {
            id: 174,
            name: 'Side Plank with Rotation',
            muscleGroup: 'Core',
          },
          {
            id: 175,
            name: 'Dumbbell Flyes',
            muscleGroup: 'Chest',
          },
          {
            id: 176,
            name: 'Pull-up with Narrow Grip',
            muscleGroup: 'Back',
          },
          {
            id: 177,
            name: 'Cable Kickbacks',
            muscleGroup: 'Legs',
          },
          {
            id: 178,
            name: 'Cable Preacher Curl',
            muscleGroup: 'Arms',
          },
          {
            id: 179,
            name: 'Plank with Elbow to Knee',
            muscleGroup: 'Core',
          },
          {
            id: 180,
            name: 'Decline Push-up',
            muscleGroup: 'Chest',
          },
          {
            id: 181,
            name: 'Lat Pulldown with Reverse Grip',
            muscleGroup: 'Back',
          },
          {
            id: 182,
            name: 'Single-Leg Press',
            muscleGroup: 'Legs',
          },
          {
            id: 183,
            name: 'Reverse Curl with Barbell',
            muscleGroup: 'Arms',
          },
          {
            id: 184,
            name: 'Twisting Hanging Leg Raise',
            muscleGroup: 'Core',
          },
          {
            id: 185,
            name: 'Smith Machine Incline Bench Press',
            muscleGroup: 'Chest',
          },
          {
            id: 186,
            name: 'Face Pull with Resistance Band',
            muscleGroup: 'Back',
          },
          {
            id: 187,
            name: 'Walking Dumbbell Lunges',
            muscleGroup: 'Legs',
          },
          {
            id: 188,
            name: 'Cable Curl',
            muscleGroup: 'Arms',
          },
          {
            id: 189,
            name: 'Russian Twist',
            muscleGroup: 'Core',
          },
          {
            id: 190,
            name: 'Pike Push-up',
            muscleGroup: 'Shoulders',
          },
        ];
      },
    });
  }
}
