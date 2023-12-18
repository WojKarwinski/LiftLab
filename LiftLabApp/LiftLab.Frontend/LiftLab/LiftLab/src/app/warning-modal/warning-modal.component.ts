import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.css'],
})
export class WarningModalComponent {
  @Input() modalMessage: string = ''; // Add this line

  constructor(public activeModal: NgbActiveModal) {}

  dismiss() {
    this.activeModal.dismiss('cancel');
  }

  confirm() {
    this.activeModal.close('confirm');
  }
}
