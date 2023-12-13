import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LiftLabService {
  private apiUrl = 'https://192.168.1.2:5132';

  constructor(private https: HttpClient) {}

  getAllExercises(): Observable<any> {
    return this.https.get<any>(`${this.apiUrl}/api/LiftLab/exercises`);
  }

  getWorkoutDays(): Observable<Set<string>> {
    return this.https
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
    let rere = this.https.get<any>(`${this.apiUrl}/api/LiftLab`);
    console.log('rere');
    return rere;
  }
}
