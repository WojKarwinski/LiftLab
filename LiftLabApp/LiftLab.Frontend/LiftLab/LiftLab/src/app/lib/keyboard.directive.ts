import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAdjustForKeyboard]',
})
export class AdjustForKeyboardDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('focus', ['$event.target'])
  onFocus(target: any) {
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 0);
  }
}
