import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFormDialogComponent } from './student-form-dialog.component';

describe('StudentFormDialogComponent', () => {
  let component: StudentFormDialogComponent;
  let fixture: ComponentFixture<StudentFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentFormDialogComponent]
    });
    fixture = TestBed.createComponent(StudentFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
