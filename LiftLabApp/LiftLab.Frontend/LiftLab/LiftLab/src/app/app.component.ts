import { Component } from '@angular/core';
import { LiftLabService } from './services/LiftLab.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showMainPage = true;
  title = 'LiftLab';
  workoutData = {};
  allExercises: any[] = [];

  constructor(private LiftLabService: LiftLabService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showMainPage = !event.url.includes('/workout/start'); // Adjusted condition
      }
    });
  }

  ngOnInit(): void {
    this.LiftLabService.getAllExercises().subscribe({
      next: (exercises) => {
        this.allExercises = exercises;
      },
      error: (err) => {},
    });
  }
}
