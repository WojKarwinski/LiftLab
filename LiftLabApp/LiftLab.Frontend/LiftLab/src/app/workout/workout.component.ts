import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
  @Input() workout: any;

  ngOnInit(): void {
    // Initialization code here
  }

  finishWorkout(): void {
    // Logic to handle finishing the workout
  }
}
