import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { TimerService } from '../services/timer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faHourglass3 } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
})
export class WorkoutComponent implements OnInit {
  @Input() workoutData: any; // Include your workout data structure here
  @Input() allExercises: any[] = [];
  @ViewChild('exerciseModal', { static: true }) exerciseModal: any;
  searchTerm: string = '';
  selectedMuscleGroup: string = 'All';
  muscleGroups: string[] = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Core'];
  faHourglass3 = faHourglass3;
  timerDisplay: string = '00:00';
  editMode: boolean = false;
  noteMode: boolean = false;
  showDropdownMenu: boolean = false;
  showMuscleGroupDropdown: boolean = false;
  constructor(
    private timerService: TimerService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.timerService.timerValue$.subscribe((value: number) => {
      this.updateTimerDisplay(value);
    });
    this.workoutData = {
      id: 1,
      date: '2022-09-16T23:07:39',
      name: 'Leg Day',
      note: 'Achieve failure',
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
          name: 'Leg extension',
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
              reps: 30,
              weight: 200,
              rpe: null,
            },
            {
              setNumber: 2,
              reps: 35,
              weight: 200,
              rpe: null,
            },
            {
              setNumber: 3,
              reps: 25,
              weight: 200,
              rpe: null,
            },
            {
              setNumber: 4,
              reps: 20,
              weight: 250,
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
          name: 'Leg Extension',
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
    this.allExercises = [
      {
        id: 21,
        name: 'Push-up',
        muscleGroup: 'Chest',
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
        name: 'Alternating Plank',
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
        name: 'Russian Twist',
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
        name: 'Hammer Curl',
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
        name: 'Leg Extension',
        muscleGroup: 'Legs',
      },
      {
        id: 173,
        name: 'Concentration Curl',
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
      {
        id: 191,
        name: 'Push-up',
        muscleGroup: 'Chest',
      },
      {
        id: 192,
        name: 'Pull-up',
        muscleGroup: 'Back',
      },
      {
        id: 193,
        name: 'Squat',
        muscleGroup: 'Legs',
      },
      {
        id: 194,
        name: 'Bicep Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 195,
        name: 'Plank',
        muscleGroup: 'Core',
      },
      {
        id: 196,
        name: 'Deadlift',
        muscleGroup: 'Back',
      },
      {
        id: 197,
        name: 'Lunges',
        muscleGroup: 'Legs',
      },
      {
        id: 198,
        name: 'Tricep Dip',
        muscleGroup: 'Arms',
      },
      {
        id: 199,
        name: 'Sit-up',
        muscleGroup: 'Core',
      },
      {
        id: 200,
        name: 'Bench Press',
        muscleGroup: 'Chest',
      },
      {
        id: 201,
        name: 'Row',
        muscleGroup: 'Back',
      },
      {
        id: 202,
        name: 'Leg Press',
        muscleGroup: 'Legs',
      },
      {
        id: 203,
        name: 'Hammer Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 204,
        name: 'Russian Twist',
        muscleGroup: 'Core',
      },
      {
        id: 205,
        name: 'Overhead Press',
        muscleGroup: 'Shoulders',
      },
      {
        id: 206,
        name: 'Lat Pulldown',
        muscleGroup: 'Back',
      },
      {
        id: 207,
        name: 'Leg Curl',
        muscleGroup: 'Legs',
      },
      {
        id: 208,
        name: 'Skull Crusher',
        muscleGroup: 'Arms',
      },
      {
        id: 209,
        name: 'Mountain Climbers',
        muscleGroup: 'Core',
      },
      {
        id: 210,
        name: 'Incline Bench Press',
        muscleGroup: 'Chest',
      },
      {
        id: 211,
        name: 'Chin-up',
        muscleGroup: 'Back',
      },
      {
        id: 212,
        name: 'Calf Raise',
        muscleGroup: 'Legs',
      },
      {
        id: 213,
        name: 'Preacher Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 214,
        name: 'Hanging Leg Raise',
        muscleGroup: 'Core',
      },
      {
        id: 215,
        name: 'Front Raise',
        muscleGroup: 'Shoulders',
      },
      {
        id: 216,
        name: 'Face Pull',
        muscleGroup: 'Back',
      },
      {
        id: 217,
        name: 'Step-ups',
        muscleGroup: 'Legs',
      },
      {
        id: 218,
        name: 'Dumbbell Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 219,
        name: 'Plank with Shoulder Taps',
        muscleGroup: 'Core',
      },
      {
        id: 220,
        name: 'Decline Bench Press',
        muscleGroup: 'Chest',
      },
      {
        id: 221,
        name: 'T-Bar Row',
        muscleGroup: 'Back',
      },
      {
        id: 222,
        name: 'Leg Extension',
        muscleGroup: 'Legs',
      },
      {
        id: 223,
        name: 'Concentration Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 224,
        name: 'Flutter Kicks',
        muscleGroup: 'Core',
      },
      {
        id: 225,
        name: 'Lateral Raise',
        muscleGroup: 'Shoulders',
      },
      {
        id: 226,
        name: 'Bent Over Row',
        muscleGroup: 'Back',
      },
      {
        id: 227,
        name: 'Hack Squat',
        muscleGroup: 'Legs',
      },
      {
        id: 228,
        name: 'Close Grip Bench Press',
        muscleGroup: 'Arms',
      },
      {
        id: 229,
        name: 'Side Plank',
        muscleGroup: 'Core',
      },
      {
        id: 230,
        name: 'Pec Deck Machine',
        muscleGroup: 'Chest',
      },
      {
        id: 231,
        name: 'Reverse Fly',
        muscleGroup: 'Back',
      },
      {
        id: 232,
        name: 'Walking Lunge',
        muscleGroup: 'Legs',
      },
      {
        id: 233,
        name: 'Wrist Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 234,
        name: 'V-ups',
        muscleGroup: 'Core',
      },
      {
        id: 235,
        name: 'Shrugs',
        muscleGroup: 'Shoulders',
      },
      {
        id: 236,
        name: 'One-Arm Row',
        muscleGroup: 'Back',
      },
      {
        id: 237,
        name: 'Leg Raises',
        muscleGroup: 'Legs',
      },
      {
        id: 238,
        name: 'Pushdown',
        muscleGroup: 'Arms',
      },
      {
        id: 239,
        name: 'Russian Twist with Medicine Ball',
        muscleGroup: 'Core',
      },
      {
        id: 240,
        name: 'Machine Chest Press',
        muscleGroup: 'Chest',
      },
      {
        id: 241,
        name: 'Pull-over',
        muscleGroup: 'Back',
      },
      {
        id: 242,
        name: 'Sissy Squat',
        muscleGroup: 'Legs',
      },
      {
        id: 243,
        name: 'Barbell Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 244,
        name: 'Hollow Body Hold',
        muscleGroup: 'Core',
      },
      {
        id: 245,
        name: 'Arnold Press',
        muscleGroup: 'Shoulders',
      },
      {
        id: 246,
        name: 'Seated Cable Row',
        muscleGroup: 'Back',
      },
      {
        id: 247,
        name: 'Bulgarian Split Squat',
        muscleGroup: 'Legs',
      },
      {
        id: 248,
        name: 'Hammer Curl with Rope',
        muscleGroup: 'Arms',
      },
      {
        id: 249,
        name: 'Plank with Knee to Elbow',
        muscleGroup: 'Core',
      },
      {
        id: 250,
        name: 'Dips',
        muscleGroup: 'Chest',
      },
      {
        id: 251,
        name: 'Face Pull with Rope',
        muscleGroup: 'Back',
      },
      {
        id: 252,
        name: 'Leg Press Machine',
        muscleGroup: 'Legs',
      },
      {
        id: 253,
        name: 'Reverse Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 254,
        name: 'Russian Twist with Twist Bar',
        muscleGroup: 'Core',
      },
      {
        id: 255,
        name: 'Military Press',
        muscleGroup: 'Shoulders',
      },
      {
        id: 256,
        name: 'Lat Pulldown with Wide Grip',
        muscleGroup: 'Back',
      },
      {
        id: 257,
        name: 'Squat Jump',
        muscleGroup: 'Legs',
      },
      {
        id: 258,
        name: 'Close Grip Pull-up',
        muscleGroup: 'Arms',
      },
      {
        id: 259,
        name: 'Sit-up with Twist',
        muscleGroup: 'Core',
      },
      {
        id: 260,
        name: 'Incline Dumbbell Press',
        muscleGroup: 'Chest',
      },
      {
        id: 261,
        name: 'Cable Row',
        muscleGroup: 'Back',
      },
      {
        id: 262,
        name: 'Leg Curl Machine',
        muscleGroup: 'Legs',
      },
      {
        id: 263,
        name: 'Spider Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 264,
        name: 'Plank with Leg Lift',
        muscleGroup: 'Core',
      },
      {
        id: 265,
        name: 'Upright Row',
        muscleGroup: 'Shoulders',
      },
      {
        id: 266,
        name: 'Deadlift with Dumbbells',
        muscleGroup: 'Back',
      },
      {
        id: 267,
        name: 'Front Squat',
        muscleGroup: 'Legs',
      },
      {
        id: 268,
        name: 'Tricep Kickback',
        muscleGroup: 'Arms',
      },
      {
        id: 269,
        name: 'Side Plank with Hip Dip',
        muscleGroup: 'Core',
      },
      {
        id: 270,
        name: 'Machine Fly',
        muscleGroup: 'Chest',
      },
      {
        id: 271,
        name: 'Pull-up with Leg Raise',
        muscleGroup: 'Back',
      },
      {
        id: 272,
        name: 'Reverse Lunge',
        muscleGroup: 'Legs',
      },
      {
        id: 273,
        name: 'EZ Bar Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 274,
        name: 'Russian Twist with Kettlebell',
        muscleGroup: 'Core',
      },
      {
        id: 275,
        name: 'Shoulder Press Machine',
        muscleGroup: 'Shoulders',
      },
      {
        id: 276,
        name: 'Burpee',
        muscleGroup: 'Full Body',
      },
      {
        id: 277,
        name: 'Renegade Rows',
        muscleGroup: 'Back',
      },
      {
        id: 278,
        name: 'Box Jump',
        muscleGroup: 'Legs',
      },
      {
        id: 279,
        name: 'Kettlebell Swing',
        muscleGroup: 'Hips',
      },
      {
        id: 280,
        name: 'Hanging Knee Raise',
        muscleGroup: 'Core',
      },
      {
        id: 281,
        name: 'Front Squat with Barbell',
        muscleGroup: 'Legs',
      },
      {
        id: 282,
        name: 'Dumbbell Pullover',
        muscleGroup: 'Back',
      },
      {
        id: 283,
        name: 'Jumping Lunges',
        muscleGroup: 'Legs',
      },
      {
        id: 284,
        name: 'Battle Ropes',
        muscleGroup: 'Arms',
      },
      {
        id: 285,
        name: 'Russian Twist with Medicine Ball',
        muscleGroup: 'Core',
      },
      {
        id: 286,
        name: 'Clean and Jerk',
        muscleGroup: 'Full Body',
      },
      {
        id: 287,
        name: 'Kettlebell Turkish Get-up',
        muscleGroup: 'Full Body',
      },
      {
        id: 288,
        name: 'Cable Crunch',
        muscleGroup: 'Core',
      },
      {
        id: 289,
        name: 'Box Squat',
        muscleGroup: 'Legs',
      },
      {
        id: 290,
        name: 'Rowing Machine',
        muscleGroup: 'Back',
      },
      {
        id: 291,
        name: 'Reverse Hyperextension',
        muscleGroup: 'Back',
      },
      {
        id: 292,
        name: 'Jump Rope',
        muscleGroup: 'Full Body',
      },
      {
        id: 293,
        name: 'Single-Leg Romanian Deadlift',
        muscleGroup: 'Legs',
      },
      {
        id: 294,
        name: 'TRX Rows',
        muscleGroup: 'Back',
      },
      {
        id: 295,
        name: 'Leg Press 45-Degree',
        muscleGroup: 'Legs',
      },
      {
        id: 296,
        name: 'Zottman Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 297,
        name: 'Dragon Flags',
        muscleGroup: 'Core',
      },
      {
        id: 298,
        name: 'Landmine Press',
        muscleGroup: 'Shoulders',
      },
      {
        id: 299,
        name: 'Roman Chair Leg Raise',
        muscleGroup: 'Core',
      },
      {
        id: 300,
        name: 'Sled Push',
        muscleGroup: 'Legs',
      },
      {
        id: 301,
        name: 'Barbell Hip Thrust',
        muscleGroup: 'Hips',
      },
      {
        id: 302,
        name: 'Face Pull with Bands',
        muscleGroup: 'Back',
      },
      {
        id: 303,
        name: 'Sumo Deadlift',
        muscleGroup: 'Legs',
      },
      {
        id: 304,
        name: 'Battle Ropes Slam',
        muscleGroup: 'Arms',
      },
      {
        id: 305,
        name: 'Alternating Plank',
        muscleGroup: 'Core',
      },
      {
        id: 306,
        name: 'Medicine Ball Slams',
        muscleGroup: 'Full Body',
      },
      {
        id: 307,
        name: 'Romanian Deadlift with Dumbbells',
        muscleGroup: 'Legs',
      },
      {
        id: 308,
        name: 'Seated Cable Crunch',
        muscleGroup: 'Core',
      },
      {
        id: 309,
        name: 'Sissy Squat Machine',
        muscleGroup: 'Legs',
      },
      {
        id: 310,
        name: 'Plate Pinch Carry',
        muscleGroup: 'Arms',
      },
      {
        id: 311,
        name: 'Hollow Body Rock',
        muscleGroup: 'Core',
      },
      {
        id: 312,
        name: 'Lateral Dumbbell Raise',
        muscleGroup: 'Shoulders',
      },
      {
        id: 313,
        name: 'Hyperextension',
        muscleGroup: 'Back',
      },
      {
        id: 314,
        name: 'Seated Leg Press',
        muscleGroup: 'Legs',
      },
      {
        id: 315,
        name: 'Wrist Roller',
        muscleGroup: 'Arms',
      },
      {
        id: 316,
        name: 'Russian Twist',
        muscleGroup: 'Core',
      },
      {
        id: 317,
        name: 'Squat and Press',
        muscleGroup: 'Full Body',
      },
      {
        id: 318,
        name: 'Hanging Leg Curl',
        muscleGroup: 'Legs',
      },
      {
        id: 319,
        name: 'Single-Arm Dumbbell Row',
        muscleGroup: 'Back',
      },
      {
        id: 320,
        name: 'Goblet Squat',
        muscleGroup: 'Legs',
      },
      {
        id: 321,
        name: 'Barbell Curl with Chains',
        muscleGroup: 'Arms',
      },
      {
        id: 322,
        name: 'Plank with Side Reach',
        muscleGroup: 'Core',
      },
      {
        id: 323,
        name: 'Handstand Push-up',
        muscleGroup: 'Shoulders',
      },
      {
        id: 324,
        name: 'Reverse Grip Bent Over Rows',
        muscleGroup: 'Back',
      },
      {
        id: 325,
        name: 'Smith Machine Squat',
        muscleGroup: 'Legs',
      },
      {
        id: 326,
        name: 'Hammer Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 327,
        name: 'Leg Press Calf Raise',
        muscleGroup: 'Legs',
      },
      {
        id: 328,
        name: 'Cable Face Pull',
        muscleGroup: 'Shoulders',
      },
      {
        id: 329,
        name: 'Inverted Row',
        muscleGroup: 'Back',
      },
      {
        id: 330,
        name: 'Zercher Squat',
        muscleGroup: 'Legs',
      },
      {
        id: 331,
        name: 'Tricep Dips on Parallel Bars',
        muscleGroup: 'Arms',
      },
      {
        id: 332,
        name: 'Plank with Feet on Swiss Ball',
        muscleGroup: 'Core',
      },
      {
        id: 333,
        name: 'Single-Arm Kettlebell Press',
        muscleGroup: 'Shoulders',
      },
      {
        id: 334,
        name: 'Cable Woodchopper',
        muscleGroup: 'Core',
      },
      {
        id: 335,
        name: 'Barbell Bent Over Rows',
        muscleGroup: 'Back',
      },
      {
        id: 336,
        name: 'Hack Squat Machine',
        muscleGroup: 'Legs',
      },
      {
        id: 337,
        name: 'Rope Hammer Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 338,
        name: 'Mountain Climbers on Sliders',
        muscleGroup: 'Core',
      },
      {
        id: 339,
        name: 'Dumbbell Shoulder Press',
        muscleGroup: 'Shoulders',
      },
      {
        id: 340,
        name: 'Pull-up with Wide Grip',
        muscleGroup: 'Back',
      },
      {
        id: 341,
        name: 'Banded Hip Thrust',
        muscleGroup: 'Hips',
      },
      {
        id: 342,
        name: 'Leg Extension',
        muscleGroup: 'Legs',
      },
      {
        id: 343,
        name: 'Concentration Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 344,
        name: 'Side Plank with Rotation',
        muscleGroup: 'Core',
      },
      {
        id: 345,
        name: 'Dumbbell Flyes',
        muscleGroup: 'Chest',
      },
      {
        id: 346,
        name: 'Pull-up with Narrow Grip',
        muscleGroup: 'Back',
      },
      {
        id: 347,
        name: 'Cable Kickbacks',
        muscleGroup: 'Legs',
      },
      {
        id: 348,
        name: 'Cable Preacher Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 349,
        name: 'Plank with Elbow to Knee',
        muscleGroup: 'Core',
      },
      {
        id: 350,
        name: 'Decline Push-up',
        muscleGroup: 'Chest',
      },
      {
        id: 351,
        name: 'Lat Pulldown with Reverse Grip',
        muscleGroup: 'Back',
      },
      {
        id: 352,
        name: 'Single-Leg Press',
        muscleGroup: 'Legs',
      },
      {
        id: 353,
        name: 'Reverse Curl with Barbell',
        muscleGroup: 'Arms',
      },
      {
        id: 354,
        name: 'Twisting Hanging Leg Raise',
        muscleGroup: 'Core',
      },
      {
        id: 355,
        name: 'Smith Machine Incline Bench Press',
        muscleGroup: 'Chest',
      },
      {
        id: 356,
        name: 'Face Pull with Resistance Band',
        muscleGroup: 'Back',
      },
      {
        id: 357,
        name: 'Walking Dumbbell Lunges',
        muscleGroup: 'Legs',
      },
      {
        id: 358,
        name: 'Cable Curl',
        muscleGroup: 'Arms',
      },
      {
        id: 359,
        name: 'Russian Twist',
        muscleGroup: 'Core',
      },
      {
        id: 360,
        name: 'Pike Push-up',
        muscleGroup: 'Shoulders',
      },
    ];
    this.route.paramMap.subscribe((params) => {
      const workoutId = params.get('id');
      if (workoutId) {
        console.log(workoutId);
      }
    });
  }

  open(content: any): void {
    this.modalService.open(content);
  }

  setTimer(seconds: number): void {
    this.timerService.setTimer(seconds);
    this.timerService.startTimer();
  }

  finishWorkout(): void {
    this.timerService.stopTimer();
    // Additional logic to handle the completion of the workout
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  updateTimerDisplay(value: number): void {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value % 60;
    this.timerDisplay = `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  }

  toggleDropdownMenu(): void {
    console.log('Toggling dropdown menu');
    this.showDropdownMenu = !this.showDropdownMenu;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.showDropdownMenu = false;
    this.noteMode = false; // Close note mode if open
  }

  toggleNoteMode(): void {
    this.noteMode = !this.noteMode;
    this.showDropdownMenu = false;
    this.editMode = false; // Close edit mode if open
  }

  saveName(): void {
    if (this.workoutData.name.trim().length > 0) {
      // Save or process the edited name
    }
    this.editMode = false;
  }

  saveNote(): void {
    if (this.workoutData.note.trim().length > 0) {
      // Save or process the note
    }
    this.noteMode = false;
  }

  cancelEdit(): void {
    this.editMode = false;
    // Optionally reset the name to original if edit is canceled
  }

  cancelNote(): void {
    this.noteMode = false;
  }

  addSetToExercise(exerciseId: number): void {
    const exercise = this.workoutData.exercises.find(
      (e: any) => e.exerciseId === exerciseId
    );
    if (exercise) {
      const newSetNumber = exercise.sets.length + 1;
      const newSet = { setNumber: newSetNumber, reps: 0, weight: 0 };
      exercise.sets.push(newSet);
    }
  }
  removeSetFromExercise(event: { exerciseId: number; setIndex: number }): void {
    const exerciseIndex = this.workoutData.exercises.findIndex(
      (e: any) => e.exerciseId === event.exerciseId
    );
    if (exerciseIndex !== -1) {
      const exercise = this.workoutData.exercises[exerciseIndex];
      exercise.sets.splice(event.setIndex, 1);

      // Check if there are no sets left in the exercise
      if (exercise.sets.length === 0) {
        // Remove the exercise itself
        this.workoutData.exercises.splice(exerciseIndex, 1);
      }
    }
  }
  removeExercise(exerciseId: number): void {
    const exerciseIndex = this.workoutData.exercises.findIndex(
      (e: any) => e.exerciseId === exerciseId
    );
    if (exerciseIndex !== -1) {
      this.workoutData.exercises.splice(exerciseIndex, 1);
    }
  }
  openExerciseModal(): void {
    this.modalService.open(this.exerciseModal);
  }

  addExerciseToWorkout(selectedExercise: any): void {
    const newExercise = {
      exerciseId: selectedExercise.id,
      name: selectedExercise.name,
      sets: [0], // Initialize one eet
      // ... any other initial exercise properties
    };

    this.workoutData.exercises.push(newExercise);
    this.modalService.dismissAll();
  }
  get filteredExercises(): any[] {
    return this.allExercises.filter((exercise) => {
      return (
        exercise.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.selectedMuscleGroup === 'All' ||
          exercise.muscleGroup === this.selectedMuscleGroup)
      );
    });
  }

  selectMuscleGroup(group: string): void {
    this.selectedMuscleGroup = group;
    this.showMuscleGroupDropdown = !this.showMuscleGroupDropdown;
  }

  toggleMuscleGroupDropdown(): void {
    this.showMuscleGroupDropdown = !this.showMuscleGroupDropdown;
  }
}
