import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { selectItemGuard } from './select-item.guard';

describe('selectItemGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => selectItemGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
