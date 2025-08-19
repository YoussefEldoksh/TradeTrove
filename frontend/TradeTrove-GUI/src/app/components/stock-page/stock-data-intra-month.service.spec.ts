import { TestBed } from '@angular/core/testing';

import { StockDataIntraMonthService } from './stock-data-intra-month.service';

describe('StockDataIntraMonthService', () => {
  let service: StockDataIntraMonthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockDataIntraMonthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
