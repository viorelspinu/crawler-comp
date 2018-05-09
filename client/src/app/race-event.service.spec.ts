import { TestBed, inject } from '@angular/core/testing';

import { RaceEventService } from './race-event.service';

describe('RaceEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaceEventService]
    });
  });

  it('should be created', inject([RaceEventService], (service: RaceEventService) => {
    expect(service).toBeTruthy();
  }));
});
