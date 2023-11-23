import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  @Input() exercise: any;

  ngOnInit(): void {
    // Initialization code for exercise component
  }

  addSet(): void {
    // Logic to add a new set
  }
}
