import { Component, OnInit } from '@angular/core';
import { LiftLabService } from '../services/LiftLab.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
})
export class HeatmapComponent implements OnInit {
  workoutDays = new Set<string>();
  dateRange: string[] = [];
  months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  constructor(private LiftLabService: LiftLabService) {}

  ngOnInit(): void {
    this.LiftLabService.getWorkoutDays().subscribe((days) => {
      this.workoutDays = days;
      this.dateRange = this.generateDateRange(
        new Date('2023-01-01'),
        new Date()
      );
    });
  }

  isWorkoutDay(date: string): boolean {
    return this.workoutDays.has(date);
  }

  // Generate a range of dates for the heatmap
  generateDateRange(startDate: Date, endDate: Date): string[] {
    let dates = [];
    for (
      let dt = new Date(startDate);
      dt <= endDate;
      dt.setDate(dt.getDate() + 1)
    ) {
      dates.push(dt.toISOString().split('T')[0]);
    }
    return dates;
  }
}
