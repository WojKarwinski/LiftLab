import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appSwipe]',
})
export class SwipeDirective {
  @Output() swiping = new EventEmitter<number>();
  @Output() swipeLeft = new EventEmitter<void>();
  @Output() swipeEnd = new EventEmitter<void>();

  private touchStartX: number = 0;
  private swipeThreshold: number = 150;

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
      this.swipeLeft.emit();
    } else {
      this.swipeEnd.emit();
    }
  }
}
