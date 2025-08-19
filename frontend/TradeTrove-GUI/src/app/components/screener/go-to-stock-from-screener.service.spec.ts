import { TestBed } from '@angular/core/testing';

import { GoToStockFromScreenerService } from './go-to-stock-from-screener.service';

describe('GoToStockFromScreenerService', () => {
  let service: GoToStockFromScreenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoToStockFromScreenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
