import { Injectable } from '@angular/core';
import { Credentials } from './credentials';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { IUser } from '../../../../core-state/src/lib/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authenticated = new BehaviorSubject(false);

  get authenticated() {
    return this._authenticated.asObservable();
  }

  constructor( ) {
    if(localStorage.getItem('TOKEN'))
      this._authenticated.next(true);
  }

  isAuthenticated() {
    return localStorage.getItem('TOKEN');
  }

  authenticate({name, password}: Credentials): Observable<IUser> {
    if(name && password) {
      localStorage.setItem('TOKEN', 'AUTHED');
      this._authenticated.next(true);
      return of({name, token: 'AUTHED'});
    } else {
      localStorage.removeItem('TOKEN');
      return throwError('Bad Credentials');
    }
    /*return new Observable(subscriber => {
      if(name && password) {
        localStorage.setItem('TOKEN', 'AUTHED');
        this._authenticated.next(true);
        subscriber.next({name, token: 'AUTHED'});
      } else {
        localStorage.removeItem('TOKEN');
        subscriber.error('bad credentials');
      }
      subscriber.complete();
      return su
    });*/
  }

  logout(): Observable<any> {
    localStorage.removeItem('TOKEN');
    this._authenticated.next(false);
    return of('ok');
  }
}
