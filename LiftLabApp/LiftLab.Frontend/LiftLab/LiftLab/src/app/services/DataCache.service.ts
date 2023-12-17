import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LiftLabService } from './LiftLab.service';
import {
  ExerciseList,
  WorkoutData,
  Template,
} from '../interfaces/workout.interface';

@Injectable({
  providedIn: 'root',
})
export class DataCacheService {
  private exercisesSubject: BehaviorSubject<ExerciseList[]> =
    new BehaviorSubject<ExerciseList[]>([]);
  private workoutsSubject: BehaviorSubject<WorkoutData[]> = new BehaviorSubject<
    WorkoutData[]
  >([]);
  private templates: Template[] = [];
  private templatesSubject: BehaviorSubject<Template[]> = new BehaviorSubject<
    Template[]
  >([]);

  constructor(private liftLabService: LiftLabService) {}

  fetchExercisesIfNeeded(): Observable<ExerciseList[]> {
    if (this.exercisesSubject.getValue().length === 0) {
      this.liftLabService.getAllExercises().subscribe(
        (data) => {
          this.exercisesSubject.next(data);
        },
        (error) => {
          console.error('Error fetching exercises:', error);
        }
      );
    }

    return this.exercisesSubject.asObservable();
  }

  fetchWorkoutsIfNeeded(): Observable<WorkoutData[]> {
    if (this.workoutsSubject.getValue().length === 0) {
      this.liftLabService.getAllWorkouts().subscribe(
        (data) => {
          this.workoutsSubject.next(data);
        },
        (error) => {
          console.error('Error fetching workouts:', error);
        }
      );
    }

    return this.workoutsSubject.asObservable();
  }

  fetchTemplatesIfNeeded(): Observable<Template[]> {
    if (this.templatesSubject.getValue().length === 0) {
      this.liftLabService.getAllTemplates().subscribe(
        (data) => {
          this.templates = data;
          this.templatesSubject.next(this.templates);
        },
        (error) => {
          console.error('Error fetching templates:', error);
        }
      );
    }

    return this.templatesSubject.asObservable();
  }
  // Additional methods to update or refresh the exercises and workouts arrays as needed
}
