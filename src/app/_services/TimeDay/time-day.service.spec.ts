import { TestBed } from '@angular/core/testing';

import { TimeDayService } from './time-day.service';

describe('TimeDayService', () => {
  let service: TimeDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
