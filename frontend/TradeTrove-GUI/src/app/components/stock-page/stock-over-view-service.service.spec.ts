import { TestBed } from '@angular/core/testing';

import { StockOverViewServiceService } from './stock-over-view-service.service';

describe('StockOverViewServiceService', () => {
  let service: StockOverViewServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockOverViewServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
