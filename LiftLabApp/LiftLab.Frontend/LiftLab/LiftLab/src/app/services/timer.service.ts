import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerValue = 0;
  private countDown: number | null = null; // countDown is either a number or null
  public timerValue$ = new Subject<number>();

  constructor() { }
  setTimer(seconds: number): void {
    this.timerValue = seconds;
    this.timerValue$.next(this.timerValue);
  }

  startTimer(): void {
    if (this.countDown) {
      clearInterval(this.countDown);
    }

    this.countDown = setInterval(() => {
      if (this.timerValue > 0) {
        this.timerValue--;
        this.timerValue$.next(this.timerValue);
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.countDown) {
      clearInterval(this.countDown);
      this.countDown = null;
    }
    this.timerValue$.next(this.timerValue); // Emit one last time to ensure the component updates
  }

  getCurrentTimerValue(): number {
    return this.timerValue;
  }
}
