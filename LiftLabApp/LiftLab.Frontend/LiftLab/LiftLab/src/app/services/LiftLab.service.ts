import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  // get all workouts
  getAllWorkouts(): Observable<any> {
    console.log('start fetch');
    let rere = this.http.get<any>(`${this.apiUrl}/api/LiftLab`);
    console.log('rere');
    return rere;
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
}
