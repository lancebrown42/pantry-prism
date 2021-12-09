import { TestBed } from '@angular/core/testing';

import { RecipeCrudService } from './recipe-crud.service';

describe('RecipeCrudService', () => {
  let service: RecipeCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
