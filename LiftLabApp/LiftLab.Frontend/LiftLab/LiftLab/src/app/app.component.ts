import { Component } from '@angular/core';
import { faHourglass3 } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // This would be replaced with the actual data fetched from a service or a backend
  faHourglass3 = faHourglass3;
  title = 'LiftLab';
  workoutData = {
    id: 1,
    date: '2022-09-16T23:07:39',
    name: 'Evening Workout',
    note: '',
    exercises: [
      {
        exerciseId: 1,
        exerciseOrder: 1,
        name: 'Push-up',
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
        name: 'Bicep Curl',
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
        name: 'Plank',
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
}
