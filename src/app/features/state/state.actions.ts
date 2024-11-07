import { createAction, props } from '@ngrx/store';
import { State } from './state.entity';

export const loadStates = createAction('[Side Bar] Load States');

export const loadStatesSuccess = createAction(
  '[Side Bar] Load States Success',
  props<{ states: State[] }>()
);

export const loadStatesFail = createAction('[Side Bar] Load States Fail');

export const loadState = createAction(
  '[Main Panel] Load State',
  props<{ stateId: number }>()
);

export const loadStateSuccess = createAction(
  '[Main Panel] Load State Success',
  props<{ stateId: number }>()
);

export const loadStateFail = createAction('[Main Panel] Load State Failed');

export const unloadState = createAction('[Main Panel] Unload State');

export const updateState = createAction(
  '[Edit State] Save State Changes',
  props<{ name: string; abbreviation: string }>()
);

export const deleteState = createAction('[Delete State] Delete State');

export const addState = createAction('[Add State] Add State');
