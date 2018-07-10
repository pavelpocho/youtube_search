import { TestBed, inject } from '@angular/core/testing';

import { OpenVideoService } from './open-video.service';

describe('OpenVideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenVideoService]
    });
  });

  it('should be created', inject([OpenVideoService], (service: OpenVideoService) => {
    expect(service).toBeTruthy();
  }));
});
