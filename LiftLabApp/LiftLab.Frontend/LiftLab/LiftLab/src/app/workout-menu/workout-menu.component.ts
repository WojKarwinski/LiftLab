import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LiftLabService } from '../services/LiftLab.service';
import { WorkoutStateService } from '../services/workout-state.service';
import { Template } from '../interfaces/workout.interface';

@Component({
  selector: 'app-workout-menu',
  templateUrl: './workout-menu.component.html',
  styleUrls: [
    '../history/history.component.css',
    './workout-menu.component.css',
  ],
})
export class WorkoutMenuComponent implements OnInit {
  templates: Template[] = [];

  constructor(
    private liftLabService: LiftLabService,
    private router: Router,
    private workoutStateService: WorkoutStateService // Injecting the service
  ) {}

  startWorkoutFromMenu(template: any) {
    this.liftLabService
      .createWorkoutFromTemplate(template)
      .subscribe((response) => {
        this.workoutStateService.setWorkoutActive(true);
        this.router.navigate(['/workout/start', response.id]);
      });
  }

  startEmptyWorkout() {
    this.router.navigate(['/workout/start', 'new']);
  }

  ngOnInit() {
    this.liftLabService.getAllTemplates().subscribe((data) => {
      this.templates = data;
      console.log(data);
    });
  }
}
