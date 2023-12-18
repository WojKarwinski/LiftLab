import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseSelectionModalComponent } from './exercise-selection-modal.component';

describe('ExerciseSelectionModalComponent', () => {
  let component: ExerciseSelectionModalComponent;
  let fixture: ComponentFixture<ExerciseSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExerciseSelectionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
