import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementincomeComponent } from './retirementincome.component';

describe('RetirementincomeComponent', () => {
  let component: RetirementincomeComponent;
  let fixture: ComponentFixture<RetirementincomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirementincomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetirementincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
