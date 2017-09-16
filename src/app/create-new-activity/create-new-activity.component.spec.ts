import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewActivityComponent } from './create-new-activity.component';

describe('CreateNewActivityComponent', () => {
  let component: CreateNewActivityComponent;
  let fixture: ComponentFixture<CreateNewActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
