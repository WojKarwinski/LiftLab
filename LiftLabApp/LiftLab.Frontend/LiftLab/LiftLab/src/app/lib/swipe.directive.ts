import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appSwipe]',
})
export class SwipeDirective {
  @Output() swiping = new EventEmitter<number>();
  @Output() swipeLeft = new EventEmitter<void>(); // Emit for a successful swipe left
  @Output() swipeEnd = new EventEmitter<void>(); // Emit when swipe ends

  private touchStartX: number = 0;
  private swipeThreshold: number = 100; // Threshold for a successful swipe

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    const touchCurrentX = event.changedTouches[0].screenX;
    const distance = this.touchStartX - touchCurrentX;
    this.swiping.emit(distance);
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0].screenX;
    const distance = this.touchStartX - touchEndX;

    if (distance > this.swipeThreshold) {
      this.swipeLeft.emit(); // Emit if the swipe is long enough
    } else {
      this.swipeEnd.emit(); // Emit to reset the style
    }
  }
}
