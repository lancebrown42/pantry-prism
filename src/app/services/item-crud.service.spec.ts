import { TestBed } from '@angular/core/testing';

import { ItemCrudService } from './item-crud.service';

describe('ItemCrudService', () => {
  let service: ItemCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
