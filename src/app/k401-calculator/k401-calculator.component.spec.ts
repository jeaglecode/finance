import { ComponentFixture, TestBed } from '@angular/core/testing';

import { K401CalculatorComponent } from './k401-calculator.component';

describe('K401CalculatorComponent', () => {
  let component: K401CalculatorComponent;
  let fixture: ComponentFixture<K401CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ K401CalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(K401CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
