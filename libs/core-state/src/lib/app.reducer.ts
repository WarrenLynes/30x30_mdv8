import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { addLoad, appInit, removeLoad } from './app.actions';
import { State } from '@mdv8/core-state';

export interface IAppState {
  initialized: boolean;
  loading: string[];
}

const initialState: IAppState = {
  initialized: false,
  loading: []
};

const reducer = createReducer(
  initialState,
  on(appInit, (state) => ({
    ...state,
    initialized: true
  })),
  on(addLoad, (state, {load}) => ({
    ...state,
    loading: [...state.loading, load]
  })),
  on(removeLoad, (state, {load}) => ({
    ...state,
    loading: state.loading.filter((x) => x !== load)
  })),
);

export function appReducer(state = initialState, action: Action): IAppState {
  return reducer(state, action);
}

export const getAppState = (state: State) => state.app;

export const mapToIsInitialized = (state: IAppState) => state.initialized === true;

export const mapToLoading = (state: IAppState) => state.loading.length > 0;

export const isInitialized = createSelector(
  getAppState,
  mapToIsInitialized
);

export const isLoading = createSelector(
  getAppState,
  mapToLoading
);
