import { Component, OnInit } from '@angular/core';
import { ExerciseList } from '../interfaces/workout.interface';
import { DataCacheService } from '../services/DataCache.service';

@Component({
  selector: 'app-exercise-menu',
  templateUrl: './exercise-menu.component.html',
  styleUrl: './exercise-menu.component.css',
})
export class ExerciseMenuComponent implements OnInit {
  exercises: ExerciseList[] = [];

  constructor(private dataCacheService: DataCacheService) {}

  ngOnInit() {
    this.dataCacheService.fetchExercisesIfNeeded().subscribe((data) => {
      this.exercises = data;
    });
  }
}
