import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentKicks, currentSelection, loading, hasCurrentKicks } from './kicks.reducer';
import { Shoe } from '@mdv8/core-data';
import { State } from '@mdv8/core-state';
import { load, reset, select, deleteKick, save, create } from './kicks.actions';

@Injectable()
export class KicksFacade {
  get hasKicks$(): Observable<boolean> {
    return this.store.select(hasCurrentKicks);
  }

  get kicks$(): Observable<Shoe[]> {
    return this.store.select(currentKicks);
  }

  get selected$(): Observable<Shoe> {
    return this.store.select(currentSelection);
  }

  get loading$(): Observable<boolean> {
    return this.store.select(loading);
  }

  constructor(private store: Store<State>) {}


  load() {
    this.store.dispatch(load());
  }

  select(entity: Shoe) {
    this.store.dispatch(select({entity}));
  }

  delete(entity: Shoe) {
    this.store.dispatch(deleteKick({entity}))
  }

  reset() {
    this.store.dispatch(reset())
  }

  save(entity: Shoe) {
    if (!entity.id) {
      this.store.dispatch(create({entity}));
    } else {
      this.store.dispatch(save({entity}))
    }
  }
}
