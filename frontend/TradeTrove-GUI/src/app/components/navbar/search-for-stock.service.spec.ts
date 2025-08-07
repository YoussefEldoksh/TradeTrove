import { TestBed } from '@angular/core/testing';

import { SearchForStockService } from './search-for-stock.service';

describe('SearchForStockService', () => {
  let service: SearchForStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchForStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
