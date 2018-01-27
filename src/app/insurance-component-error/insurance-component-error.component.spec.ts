import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceComponentErrorComponent } from './insurance-component-error.component';

describe('InsuranceComponentErrorComponent', () => {
  let component: InsuranceComponentErrorComponent;
  let fixture: ComponentFixture<InsuranceComponentErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceComponentErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceComponentErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
