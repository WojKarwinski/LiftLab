import { Component } from '@angular/core';
import { LiftLabService } from '../services/LiftLab.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-workout-menu',
  templateUrl: './workout-menu.component.html',
  styleUrls: [
    '../history/history.component.css',
    './workout-menu.component.css',
  ],
})
export class WorkoutMenuComponent {
  templates: any[] = [];

  constructor(private liftLabService: LiftLabService, private router: Router) {}

  startWorkoutFromMenu(templateId: number) {
    this.liftLabService
      .createWorkoutFromTemplate(templateId)
      .subscribe((workout) => {
        this.router.navigate(['/workout', workout.id]); // Assuming the response contains the new workout's ID
      });
  }

  ngOnInit() {
    this.liftLabService.getAllTemplates().subscribe((data) => {
      this.templates = data;
    });
  }
}
