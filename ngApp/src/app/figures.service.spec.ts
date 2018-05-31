import { TestBed, inject } from '@angular/core/testing';

import { FiguresService } from './figures.service';

describe('FiguresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiguresService]
    });
  });

  it('should be created', inject([FiguresService], (service: FiguresService) => {
    expect(service).toBeTruthy();
  }));
});
