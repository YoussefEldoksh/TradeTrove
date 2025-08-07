import { TestBed } from '@angular/core/testing';

import { StockDayDataService } from './stock-day-data.service';

describe('StockDayDataService', () => {
  let service: StockDayDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockDayDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
