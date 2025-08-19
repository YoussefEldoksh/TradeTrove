import { TestBed } from '@angular/core/testing';

import { Stock1YDataService } from './stock1-ydata.service';

describe('Stock1YDataService', () => {
  let service: Stock1YDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Stock1YDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
