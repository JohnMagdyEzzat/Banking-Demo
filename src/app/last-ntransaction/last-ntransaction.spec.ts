import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastNTransaction } from './last-ntransaction';

describe('LastNTransaction', () => {
  let component: LastNTransaction;
  let fixture: ComponentFixture<LastNTransaction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastNTransaction],
    }).compileComponents();

    fixture = TestBed.createComponent(LastNTransaction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
