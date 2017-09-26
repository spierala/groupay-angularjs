import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewExpensesComponent } from './overview-expenses.component';

describe('OverviewExpensesComponent', () => {
  let component: OverviewExpensesComponent;
  let fixture: ComponentFixture<OverviewExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
