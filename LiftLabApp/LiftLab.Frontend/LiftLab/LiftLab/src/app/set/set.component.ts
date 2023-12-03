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
  value!: number;
  showValue: boolean = false; // Flag to show/hide the value
  ngAfterViewInit(): void {
    // Any DOM manipulation or access code that needs the view to be fully initialized
  }
  constructor() {}

  ngOnInit(): void {}

  showSliderValue(event: TouchEvent): void {
    this.showValue = true;
    setTimeout(() => {
      const slider = event.target as HTMLElement;
      const tooltip = document.getElementById('slider-tooltip');

      if (tooltip && slider) {
        const sliderRect = slider.getBoundingClientRect();
        const touch = event.touches[0];

        // Calculate position relative to the slider
        const tooltipX = 260;
        const tooltipY = sliderRect.top - 100; // Adjust '50' as needed

        tooltip.style.left = tooltipX + 'px';
        tooltip.style.top = tooltipY + 'px';
      }
    });
  }
  hideSliderValue(): void {
    this.showValue = false;
  }
  toggleCheckbox(set: any): void {
    set.checked = !set.checked;
  }
}
