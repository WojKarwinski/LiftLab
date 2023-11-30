import { Component, OnInit, Input } from '@angular/core';
import { TimerService } from '../services/timer.service';
declare var bootstrap: any;

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
   @Input() workoutData: any; // Add your workout data structure here
  timerDisplay: string = '00:00';

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.timerService.timerValue$.subscribe((value: number) => {
      this.updateTimerDisplay(value);
    });
  }

  updateTimerDisplay(value: number): void {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value - minutes * 60;
    this.timerDisplay = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  setTimer(seconds: number): void {
    this.timerService.setTimer(seconds);
    this.timerService.startTimer();
  }

  // Call this method when the FINISH button is clicked
  finishWorkout(): void {
    this.timerService.stopTimer();
    // Additional logic to handle the completion of the workout
  }

  closeModal(): void {
    const timerModal = bootstrap.Modal.getInstance(document.getElementById('timerModal'));
    timerModal.hide();
  }
}