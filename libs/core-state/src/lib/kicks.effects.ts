import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Shoe, ShoesService } from '@mdv8/core-data';
import { Store } from '@ngrx/store';
import { State } from '@mdv8/core-state';
import {
  load,
  loadSuccess,
  loadFailure,
  deleteKick,
  deleteSuccess,
  deleteFailure,
  save,
  saveSuccess, saveFailure
} from './kicks.actions';
import { catchError, delay, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class KicksEffects {
  constructor(
    private actions$: Actions,
    private service: ShoesService,
    private store: Store<State>,
    private router: Router
  ) {}

  load$ = createEffect(
    () => this.actions$.pipe(
      ofType(load),
      //DELAY TO NOTICE AWESOME PROGRESS BAR
      delay(5000),
      exhaustMap(() =>
        this.service.all().pipe(
          map((kicks: Shoe[]) => loadSuccess({data: kicks})),
          catchError(error => of(loadFailure({error})))
        )
      )
    )
  );

  save$ = createEffect(
    () => this.actions$.pipe(
      ofType(save),
      //DELAY TO NOTICE AWESOME PROGRESS BAR
      delay(1500),
      exhaustMap(({type, entity}) =>
        this.service.update(entity).pipe(
          map((update: Shoe) => saveSuccess({entity: update})),
          catchError(error => of(saveFailure({error})))
        )
      )
    )
  );

  delete$ = createEffect(
    () => this.actions$.pipe(
      ofType(deleteKick),
      delay(1500),
      switchMap(({type, entity}) =>
        this.service.delete(entity.id).pipe(
          map(() => deleteSuccess({id: entity.id})),
          catchError(error => of(deleteFailure({error})))
        )
      )
    )
  );

  deleteSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(deleteSuccess),
      map(({type, id}) =>
        this.router.navigateByUrl('/kicks')
      )
    )
  , {dispatch: false});

  saveSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(saveSuccess),
      // tap(() => this.store.dispatch(load())),
      map(({type, entity}) => {
        this.router.navigateByUrl('/kicks');
        // return load();
      })
    )
  , {dispatch: false});
}
