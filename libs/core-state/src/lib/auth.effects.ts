import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@mdv8/core-data';
import { Store } from '@ngrx/store';
import { State } from '@mdv8/core-state';
import { catchError, delay, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  authenticate,
  authenticateFailure,
  authenticateSuccess,
  logout,
  logoutFailure,
  logoutSuccess
} from './auth.actions';
import { IUser } from './auth.reducer';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private service: AuthService,
    private store: Store<State>,
    private router: Router
  ) {}

  authenticate$ = createEffect(
    () => this.actions$.pipe(
      ofType(authenticate),
      delay(500),
      switchMap(({type, credentials}) => {
        return this.service.authenticate(credentials).pipe(
          map((user: IUser) => authenticateSuccess({user})),
          catchError(error => of(authenticateFailure({error})))
        )
      })
    )
  );

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(logout),
      switchMap(() => {
        return this.service.logout().pipe(
          map((user: IUser) => logoutSuccess()),
          catchError(error => of(logoutFailure()))
        )
      })
    )
  );

  logoutSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(logoutSuccess),
      tap(() => {
        this.router.navigateByUrl('/login')
      })
    )
  , {dispatch: false});

  authenticateSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(authenticateSuccess),
      tap(() => {
        this.router.navigateByUrl('/')
      })
    )
  , {dispatch: false});
}
