import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css'],
})
export class SetComponent implements OnInit {
  @Input() set!: any;
  @Input() setNumber!: number;
  @Output() removeSetEvent = new EventEmitter<void>();
  @Output() rpeSliderActive = new EventEmitter<boolean>();
  value!: number;
  showValue: boolean = false;
  ngAfterViewInit(): void {}
  constructor() {}

  ngOnInit(): void {}

  showSliderValue(event: TouchEvent): void {
    this.rpeSliderActive.emit(true);
    this.showValue = true;
    setTimeout(() => {
      const slider = event.target as HTMLElement;
      const tooltip = document.getElementById('slider-tooltip');

      if (tooltip && slider) {
        const sliderRect = slider.getBoundingClientRect();
        const touch = event.touches[0];

        const tooltipX = 260;
        const tooltipY = sliderRect.top - 100;

        tooltip.style.left = tooltipX + 'px';
        tooltip.style.top = tooltipY + 'px';
      }
    });
  }
  hideSliderValue(): void {
    this.rpeSliderActive.emit(false);
    this.showValue = false;
  }
  toggleCheckbox(set: any): void {
    set.checked = !set.checked;
  }
}
