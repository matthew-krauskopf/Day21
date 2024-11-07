import { createFeatureSelector, createSelector } from '@ngrx/store';
import { stateKey, StateState } from './state.state';

export const selectStateState = createFeatureSelector<StateState>(stateKey);

export const selectStates = createSelector(selectStateState, (stateState) =>
  stateState.states
    .filter((s) => s.deleted != true)
    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
);

export const statesExist = createSelector(
  selectStates,
  (states) => states.length > 0
);

export const selectedState = createSelector(
  selectStateState,
  selectStates,
  (state, states) => states.find((s) => s.id == state.selectedState)
);

export const isProcessing = createSelector(
  selectStateState,
  (state) => state.isDeleting || state.isLoading || state.isSaving
);
