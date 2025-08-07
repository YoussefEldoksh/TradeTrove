import { TestBed } from '@angular/core/testing';

import { StockFinancialStatementsService } from './stock-financial-statements.service';

describe('StockFinancialStatementsService', () => {
  let service: StockFinancialStatementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockFinancialStatementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
