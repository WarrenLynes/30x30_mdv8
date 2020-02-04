import { appReducer, IAppState } from './app.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { IKicksState, kicksReducer } from './kicks.reducer';
import { authReducer, IAuthState } from './auth.reducer';

export interface State {
  app: IAppState;
  kicks: IKicksState;
  auth: IAuthState;
}

export const reducers: ActionReducerMap<State> = {
  app: appReducer,
  kicks: kicksReducer,
  auth: authReducer
};
