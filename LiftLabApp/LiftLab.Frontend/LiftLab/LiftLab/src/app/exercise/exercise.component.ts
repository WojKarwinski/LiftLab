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
import { ExerciseSelectionModalComponent } from '../exercise-selection-modal/exercise-selection-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  @Input() exercise: any;
  @Output() addSetEvent = new EventEmitter<number>();
  @Output() replaceExerciseEvent = new EventEmitter<{
    oldExerciseId: number;
    newExercise: any;
  }>();

  @Output() removeExerciseEvent = new EventEmitter<number>();
  @Output() removeSetEvent = new EventEmitter<{
    exerciseId: any;
    setIndex: number;
  }>();
  swipeStyles: any[] = [];
  ngOnInit(): void {
    this.swipeStyles = this.exercise.sets.map(() => ({}));
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
      }
      if (distance > 150) {
        this.removeSetEvent.emit({
          exerciseId: this.exercise.exerciseId,
          setIndex,
        });
        this.swipeStyles.splice(setIndex, 1);
      }
    }
  }

  resetSwipeStyle(setIndex: number): void {
    this.swipeStyles[setIndex] = {};
  }
  removeExercise(): void {
    this.removeExerciseEvent.emit(this.exercise.exerciseId);
  }
  replaceExercise(): void {
    const modalRef = this.modalService.open(ExerciseSelectionModalComponent);
    modalRef.componentInstance.exerciseSelected.subscribe(
      (selectedExercise: any) => {
        this.replaceExerciseEvent.emit({
          oldExerciseId: this.exercise.exerciseId,
          newExercise: selectedExercise,
        });
        modalRef.close();
      }
    );
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
  constructor(private eRef: ElementRef, private modalService: NgbModal) {}
}
