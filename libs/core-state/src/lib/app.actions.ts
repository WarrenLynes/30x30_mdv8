import { createAction, props } from '@ngrx/store';

export const appInit = createAction( '[APP][INIT]' );

export const addLoad = createAction(
  '[APP][LOAD][ADD]',
  props<{load: string}>()
);

export const removeLoad = createAction(
  '[APP][LOAD][REMOVE]',
  props<{load: string}>()
);
