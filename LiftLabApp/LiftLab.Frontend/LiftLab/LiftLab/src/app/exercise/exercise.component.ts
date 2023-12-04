import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  faEllipsisV = faEllipsisV;
  @Input() exercise: any; // The exercise data passed in should be typed correctly
  @Output() addSetEvent = new EventEmitter<number>(); // Emitting exercise ID
  @Output() removeExerciseEvent = new EventEmitter<number>();
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
    if (distance > 100) {
      this.removeSetEvent.emit({
        exerciseId: this.exercise.exerciseId,
        setIndex,
      });
      this.swipeStyles.splice(setIndex, 1);
    }
  }

  resetSwipeStyle(setIndex: number): void {
    this.swipeStyles[setIndex] = {};
  }
  removeExercise(): void {
    this.removeExerciseEvent.emit(this.exercise.exerciseId);
  }

  constructor() {}
}
