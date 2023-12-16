import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LiftLabService } from '../services/LiftLab.service';
import { WorkoutStateService } from '../services/workout-state.service';

@Component({
  selector: 'app-workout-menu',
  templateUrl: './workout-menu.component.html',
  styleUrls: [
    '../history/history.component.css',
    './workout-menu.component.css',
  ],
})
export class WorkoutMenuComponent implements OnInit {
  templates: any[] = [];

  constructor(
    private liftLabService: LiftLabService,
    private router: Router,
    private workoutStateService: WorkoutStateService // Injecting the service
  ) {}

  startWorkoutFromMenu(template: any) {
    this.liftLabService
      .createWorkoutFromTemplate(template)
      .subscribe((response) => {
        // Update workout state to active
        this.workoutStateService.setWorkoutActive(true);
        this.router.navigate(['/workout/start', response.id]);
      });
  }

  startEmptyWorkout() {
    // Logic to start an empty workout
    // For example, navigate to a new workout route
    this.router.navigate(['/workout/start', 'new']);
  }

  ngOnInit() {
    this.liftLabService.getAllTemplates().subscribe((data) => {
      this.templates = data;
    });
  }
}
