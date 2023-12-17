import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WorkoutData } from '../interfaces/workout.interface';
@Injectable({
  providedIn: 'root',
})
export class LiftLabService {
  private apiUrl = 'http://192.168.1.2:5132';

  constructor(private http: HttpClient) {}

  getAllExercises(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/LiftLab/exercises`);
  }

  getWorkoutById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/LiftLab/workouts/${id}`);
  }

  getWorkoutDays(): Observable<Set<string>> {
    return this.http
      .get<any[]>(`${this.apiUrl}/api/LiftLab`)
      .pipe(
        map(
          (workouts: any) =>
            new Set(workouts.map((w: any) => w.date.split('T')[0]))
        )
      );
  }

  getAllWorkouts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/LiftLab/workouts`);
  }

  getAllTemplates(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/LiftLab/templates`);
  }

  createWorkoutFromTemplate(template: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/LiftLab/workouts/from-template`,
      template
    );
  }

  updateWorkout(id: number, workout: WorkoutData): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/LiftLab/workouts/${id}`, workout);
  }

  createWorkout(workout: WorkoutData): Observable<WorkoutData> {
    return this.http.post<WorkoutData>(
      `${this.apiUrl}/api/LiftLab/workouts`,
      workout
    );
  }

  deleteWorkout(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/LiftLab/workouts/${id}`);
  }
}
