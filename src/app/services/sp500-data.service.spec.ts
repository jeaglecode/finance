import { TestBed } from '@angular/core/testing';

import { SP500DATAService } from './sp500-data.service';

describe('SP500DATAService', () => {
  let service: SP500DATAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SP500DATAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
