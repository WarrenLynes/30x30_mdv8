import { createAction, props } from '@ngrx/store';
import { Shoe } from '@mdv8/core-data';

export const load = createAction(
  '[KICKS][LOAD][REQUEST]'
);

export const loadSuccess = createAction(
  '[KICKS][LOAD][SUCCESS]',
  props<{ data: Shoe[] }>()
);

export const loadFailure = createAction(
  '[KICKS][LOAD][FAILURE]',
  props<{ error: any }>()
);

export const select = createAction(
  '[KICKS][SELECT]',
  props<{ entity: Shoe }>()
);

export const reset = createAction(
  '[KICKS][RESET]'
);

export const deleteKick = createAction(
  '[KICKS][DELETE][REQUEST]',
  props<{entity: Shoe}>()
);
export const deleteSuccess = createAction(
  '[KICKS][DELETE][SUCCESS]',
  props<{id: number}>()
);
export const deleteFailure = createAction(
  '[KICKS][DELETE][FAILURE]',
  props<{error: any}>()
);


export const save = createAction(
  '[KICKS][SAVE][REQUEST]',
  props<{entity: Shoe}>()
);
export const saveSuccess = createAction(
  '[KICKS][SAVE][SUCCESS]',
  props<{entity: Shoe}>()
);
export const saveFailure = createAction(
  '[KICKS][SAVE][FAILURE]',
  props<{error: any}>()
);


