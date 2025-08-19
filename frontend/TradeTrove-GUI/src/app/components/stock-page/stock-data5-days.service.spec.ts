import { TestBed } from '@angular/core/testing';

import { StockData5DaysService } from './stock-data5-days.service';

describe('StockData5DaysService', () => {
  let service: StockData5DaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockData5DaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
