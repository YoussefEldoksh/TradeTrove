import { TestBed } from '@angular/core/testing';

import { Stock5YDataService } from './stock5-ydata.service';

describe('Stock5YDataService', () => {
  let service: Stock5YDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Stock5YDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
