import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousStatisticComponent } from './miscellaneous-statistic.component';

describe('MiscellaneousStatisticComponent', () => {
  let component: MiscellaneousStatisticComponent;
  let fixture: ComponentFixture<MiscellaneousStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscellaneousStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
