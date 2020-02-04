import { Shoe } from '@mdv8/core-data';
import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { deleteKick, deleteSuccess, load, loadSuccess, reset, select } from './kicks.actions';
import { State } from '@mdv8/core-state';

export interface IKicksState {
  data: Shoe[];
  selected: Shoe;
  loading: boolean;
  error: string;
}

const initialState: IKicksState = {
  data: null,
  selected: null,
  loading: false,
  error: null
};

const reducer = createReducer(
  initialState,
  on(reset, (state) => ({
    ...state,
    selected: null,
    error: null,
    loading: false
  })),
  on(load, (state) => ({
    ...state,
    data: null,
    error: null,
    loading: true
  })),
  on(loadSuccess, (state, {data}) => ({
    ...state, error: null, data, loading: false
  })),
  on(select, (state, {entity}) => ({
    ...state,
    selected: entity
  })),
  on(deleteKick, (state) => ({
    ...state,
    loading: true
  })),
  on(deleteSuccess, (state, {id}) => ({
    ...state,
    data: state.data.filter((x) => x.id !== id),
    selected: null,
    error: null,
    loading: false
  })),
);

export function kicksReducer(state = initialState, action: Action): IKicksState {
  return reducer(state, action);
}

export const getKicksState = (state: State) => state.kicks;
export const mapToCurrentKicks = (state: IKicksState) => state.data;
export const mapToHasCurrentKicks = (state: IKicksState) => !!state.data;
export const mapToLoading = (state: IKicksState) => state.loading;
export const mapToHasSelection = (state: IKicksState) => !!state.selected;
export const mapToSelection = (state: IKicksState) => state.selected;
export const currentKicks = createSelector(getKicksState, mapToCurrentKicks);
export const hasCurrentKicks = createSelector(getKicksState, mapToHasCurrentKicks);
export const hasCurrentSelection = createSelector(getKicksState, mapToHasSelection);
export const currentSelection = createSelector(getKicksState, mapToSelection);
export const loading = createSelector(getKicksState, mapToLoading);

