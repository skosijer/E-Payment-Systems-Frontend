import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceComponentSuccessComponent } from './insurance-component-success.component';

describe('InsuranceComponentSuccessComponent', () => {
  let component: InsuranceComponentSuccessComponent;
  let fixture: ComponentFixture<InsuranceComponentSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceComponentSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceComponentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
