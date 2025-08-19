import { TestBed } from '@angular/core/testing';

import { StockData3MService } from './stock-data3-m.service';

describe('StockData3MService', () => {
  let service: StockData3MService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockData3MService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
