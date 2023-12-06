import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LiftLabService {
  private apiUrl = 'http://localhost:5132';

  constructor(private http: HttpClient) {}

  getAllExercises(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/LiftLab/exercises`);
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
}
