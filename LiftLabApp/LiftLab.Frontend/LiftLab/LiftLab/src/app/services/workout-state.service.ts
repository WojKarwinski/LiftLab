// workout-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutStateService {
  private workoutActive = new BehaviorSubject<boolean>(false);

  setWorkoutActive(isActive: boolean) {
    this.workoutActive.next(isActive);
  }

  getWorkoutActive() {
    return this.workoutActive.asObservable();
  }
}
