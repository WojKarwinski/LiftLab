import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  @Input() exercise: any; // The exercise data passed in should be typed correctly
  @Output() addSetEvent = new EventEmitter<number>(); // Emitting exercise ID
  @Output() removeSetEvent = new EventEmitter<{
    exerciseId: any;
    setIndex: number;
  }>();
  swipeStyles: any[] = [];
  ngOnInit(): void {
    this.swipeStyles = this.exercise.sets.map(() => ({})); // Initialize swipe styles
  }
  addSet(): void {
    this.addSetEvent.emit(this.exercise.exerciseId);
  }
  handleSwipe(distance: number, setIndex: number): void {
    if (distance > 0) {
      this.swipeStyles[setIndex] = {
        transform: `translateX(-${distance}px)`,
        opacity: 1 - Math.min(distance / 100, 1),
      };
    }
  }

  removeSet(setIndex: number): void {
    this.exercise.sets.splice(setIndex, 1);
    this.swipeStyles.splice(setIndex, 1); // Remove the style for the removed set
  }

  resetSwipeStyle(setIndex: number): void {
    this.swipeStyles[setIndex] = {};
  }
  constructor() {}
}
