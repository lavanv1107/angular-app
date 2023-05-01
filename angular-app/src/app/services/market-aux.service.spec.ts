import { TestBed } from '@angular/core/testing';

import { MarketAuxService } from './market-aux.service';

describe('MarketAuxService', () => {
  let service: MarketAuxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketAuxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
