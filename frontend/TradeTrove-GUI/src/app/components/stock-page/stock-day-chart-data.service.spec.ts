import { TestBed } from '@angular/core/testing';

import { StockDayChartDataService } from './stock-day-chart-data.service';

describe('StockDayChartDataService', () => {
  let service: StockDayChartDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockDayChartDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
