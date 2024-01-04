import { TestBed } from '@angular/core/testing';

import { AdditionalRolesService } from './additional-roles.service';

describe('AdditionalRolesService', () => {
  let service: AdditionalRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
