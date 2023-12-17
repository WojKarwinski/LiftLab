import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WorkoutStateService } from '../services/workout-state.service';
import {
  faUser,
  faHistory,
  faPlusCircle,
  faDumbbell,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit, OnDestroy {
  workoutStarted = false;
  private subscription: Subscription = new Subscription();

  faUser = faUser;
  faHistory = faHistory;
  faPlusCircle = faPlusCircle;
  faDumbbell = faDumbbell;
  faChartLine = faChartLine;

  ngOnInit() {
    this.subscription = this.workoutStateService
      .getWorkoutActive()
      .subscribe((isActive) => {
        this.workoutStarted = isActive;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  constructor(
    private router: Router,
    private workoutStateService: WorkoutStateService
  ) {}

  navigate(path: string): void {
    this.router.navigateByUrl(path);
  }
}
