import { TestBed } from '@angular/core/testing';

import { RoundLogicService } from './round-logic.service';

describe('RoundLogicService', () => {
  let service: RoundLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoundLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
