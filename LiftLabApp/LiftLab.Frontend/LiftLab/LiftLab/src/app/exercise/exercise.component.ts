import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  HostListener,
} from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  faEllipsisV = faEllipsisV;
  isRpeSliderActive: boolean = false;
  isDropdownOpen = false;

  handleRpeSliderActive(active: boolean): void {
    this.isRpeSliderActive = active;
  }
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
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  addSet(): void {
    this.addSetEvent.emit(this.exercise.exerciseId);
  }
  handleSwipe(distance: number, setIndex: number): void {
    if (!this.isRpeSliderActive) {
      if (distance > 0) {
        this.swipeStyles[setIndex] = {
          transform: `translateX(-${distance}px)`,
          opacity: 1 - Math.min(distance / 160, 1),
        };
        console.log(distance);
      }
      if (distance > 150) {
        this.removeSetEvent.emit({
          exerciseId: this.exercise.exerciseId,
          setIndex,
        });
        this.swipeStyles.splice(setIndex, 1);
        console.log(distance);
      }
    }
  }

  resetSwipeStyle(setIndex: number): void {
    this.swipeStyles[setIndex] = {};
  }
  removeExercise(): void {
    this.removeExerciseEvent.emit(this.exercise.exerciseId);
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
  constructor(private eRef: ElementRef) {}
}