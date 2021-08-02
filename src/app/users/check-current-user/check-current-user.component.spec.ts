import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCurrentUserComponent } from './check-current-user.component';

describe('CheckCurrentUserComponent', () => {
  let component: CheckCurrentUserComponent;
  let fixture: ComponentFixture<CheckCurrentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckCurrentUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckCurrentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
