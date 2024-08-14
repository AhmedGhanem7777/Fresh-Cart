import { TestBed } from '@angular/core/testing';

import { GoBackService } from './go-back.service';

describe('GoBackService', () => {
  let service: GoBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
