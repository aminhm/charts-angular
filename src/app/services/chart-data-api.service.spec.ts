import { TestBed } from '@angular/core/testing';

import { ChartDataAPIService } from './chart-data-api.service';

describe('ChartDataService', () => {
  let service: ChartDataAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartDataAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
