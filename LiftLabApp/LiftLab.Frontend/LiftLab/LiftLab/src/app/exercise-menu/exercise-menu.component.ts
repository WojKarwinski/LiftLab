import { Component, OnInit } from '@angular/core';
import { ExerciseList } from '../interfaces/workout.interface';
import { LiftLabService } from '../services/LiftLab.service';
@Component({
  selector: 'app-exercise-menu',
  templateUrl: './exercise-menu.component.html',
  styleUrl: './exercise-menu.component.css',
})
export class ExerciseMenuComponent implements OnInit {
  exercises: ExerciseList[] = [];

  constructor(private liftLabService: LiftLabService) {}

  ngOnInit() {
    this.liftLabService.getAllExercises().subscribe((data) => {
      this.exercises = data;
    });
  }
}
