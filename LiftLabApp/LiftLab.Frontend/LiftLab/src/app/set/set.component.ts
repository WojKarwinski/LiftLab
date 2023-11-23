import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
  @Input() set: any;

  ngOnInit(): void {
    // Initialization code for set component
  }

  confirmSet(): void {
    // Logic to confirm the set details
  }
}
