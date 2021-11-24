import { TestBed } from '@angular/core/testing';

import { SpoonacularService } from './spoonacular.service';

describe('SpoonacularService', () => {
  let service: SpoonacularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpoonacularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
