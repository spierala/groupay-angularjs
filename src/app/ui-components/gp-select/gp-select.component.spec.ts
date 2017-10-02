import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpSelectComponent } from './gp-select.component';

describe('GpSelectComponent', () => {
  let component: GpSelectComponent;
  let fixture: ComponentFixture<GpSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
