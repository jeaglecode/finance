import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IulCalculatorComponent } from './iul-calculator.component';

describe('IulCalculatorComponent', () => {
  let component: IulCalculatorComponent;
  let fixture: ComponentFixture<IulCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IulCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IulCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
