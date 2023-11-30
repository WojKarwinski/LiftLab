import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  @Input() exercise: any; // The exercise data passed in should be typed correctly

  constructor() { }

  ngOnInit(): void {
  }

  addSet(): void {
    // Logic to add a new set to the exercise
  }
}