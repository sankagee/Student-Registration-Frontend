import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableDetailComponent } from './user-table-detail.component';

describe('UserTableDetailComponent', () => {
  let component: UserTableDetailComponent;
  let fixture: ComponentFixture<UserTableDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTableDetailComponent]
    });
    fixture = TestBed.createComponent(UserTableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
