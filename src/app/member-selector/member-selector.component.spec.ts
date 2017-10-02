import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSelectorComponent } from './member-selector.component';

describe('MemberSelectorComponent', () => {
  let component: MemberSelectorComponent;
  let fixture: ComponentFixture<MemberSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
