import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataCacheService } from '../services/DataCache.service';
import { WorkoutStateService } from '../services/workout-state.service';
import { Template } from '../interfaces/workout.interface';
import { LiftLabService } from '../services/LiftLab.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarningModalComponent } from '../warning-modal/warning-modal.component';

@Component({
  selector: 'app-workout-menu',
  templateUrl: './workout-menu.component.html',
  styleUrls: [
    '../history/history.component.css',
    './workout-menu.component.css',
  ],
})
export class WorkoutMenuComponent implements OnInit {
  templates: Template[] = [];
  selectedTemplateIndex: number | null = null;

  constructor(
    private dataCacheService: DataCacheService,
    private liftLabService: LiftLabService,
    private router: Router,
    private workoutStateService: WorkoutStateService,
    private modalService: NgbModal
  ) {}
  performTemplate(template: any): void {
    this.startWorkoutFromMenu(template);
  }

  deleteTemplate(templateId: number): void {
    const modalRef = this.modalService.open(WarningModalComponent);

    modalRef.componentInstance.modalMessage = 'delete the template';

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.liftLabService.deleteTemplate(templateId).subscribe({
            next: (response) => {
              this.liftLabService.getAllTemplates().subscribe({
                next: (data) => {
                  this.templates = data;
                },
              });
            },
          });
        }
      },
      (reason) => {}
    );
  }
  onTemplateClick(workoutElement: HTMLElement, index: number): void {
    this.selectedTemplateIndex =
      this.selectedTemplateIndex === index ? null : index;
    this.scrollToView(workoutElement);
  }
  private scrollToView(workoutElement: HTMLElement): void {
    workoutElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  startWorkoutFromMenu(template: any) {
    this.liftLabService
      .createWorkoutFromTemplate(template)
      .subscribe((response) => {
        this.workoutStateService.setWorkoutActive(true);

        this.router.navigate(['/workout/start', response.id]);
      });
  }

  startEmptyWorkout() {
    this.workoutStateService.setWorkoutActive(true);

    this.router.navigate(['/workout/start', 'new']);
  }

  ngOnInit() {
    this.dataCacheService.fetchTemplatesIfNeeded().subscribe((data) => {
      this.templates = data;
    });
  }
}
