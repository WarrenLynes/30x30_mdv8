import { Action, createReducer, createSelector, on } from '@ngrx/store';
import {
  authenticate,
  authenticateSuccess,
  authenticateFailure,
  reset,
  logout,
  logoutSuccess,
  logoutFailure
} from './auth.actions';
import { State } from '@mdv8/core-state';

export interface IUser {
  name: string;
  token: string;
}

export interface IAuthState {
  user: IUser;
  token: string;
  authenticated: boolean;
  loading: boolean;
}

const initialState: IAuthState = {
  user: null,
  token: null,
  authenticated: false,
  loading: false
};

const reducer = createReducer(
  initialState,
  on(reset, (state) => ({ ...initialState })),
  on(authenticateSuccess, (state, {user}) => ({ user, token: user.token, authenticated: true, loading: false })),
  on(authenticateFailure, (state, {error}) => ({ ...initialState })),
  on(logout, (state) => ({ ...state, loading: true })),
  on(logoutSuccess, (state) => ({ ...initialState })),
  on(logoutFailure, (state) => ({ ...initialState }))
);

export function authReducer(state = initialState, action: Action): IAuthState {
  return reducer(state, action);
}

export const getAuthState = (state: State) => state.auth;
export const mapToAuthenticated = (state: IAuthState) => state.authenticated;
export const mapToLoading = (state: IAuthState) => state.loading;
export const authenticated = createSelector(getAuthState, mapToAuthenticated);
export const loading = createSelector(getAuthState, mapToLoading);

