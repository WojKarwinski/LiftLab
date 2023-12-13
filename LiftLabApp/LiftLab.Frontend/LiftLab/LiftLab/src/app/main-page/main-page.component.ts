import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
export class MainPageComponent {
  faUser = faUser;
  faHistory = faHistory;
  faPlusCircle = faPlusCircle;
  faDumbbell = faDumbbell;
  faChartLine = faChartLine;

  constructor(private router: Router) {}

  navigate(path: string): void {
    this.router.navigateByUrl(path);
  }
}
