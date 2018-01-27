import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceComponentFailedComponent } from './insurance-component-failed.component';

describe('InsuranceComponentFailedComponent', () => {
  let component: InsuranceComponentFailedComponent;
  let fixture: ComponentFixture<InsuranceComponentFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceComponentFailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceComponentFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
