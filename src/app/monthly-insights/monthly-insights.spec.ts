import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyInsights } from './monthly-insights';

describe('MonthlyInsights', () => {
  let component: MonthlyInsights;
  let fixture: ComponentFixture<MonthlyInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyInsights],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlyInsights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
