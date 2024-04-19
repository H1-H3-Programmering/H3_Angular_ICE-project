import { TestBed } from '@angular/core/testing';

import { ICEServiceService } from './ice-service.service';

describe('ICEServiceService', () => {
  let service: ICEServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ICEServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
