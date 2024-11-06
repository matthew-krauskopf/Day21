import { createReducer, on } from '@ngrx/store';
import {
  addState,
  deleteState,
  loadState,
  loadStates,
  loadStatesFail,
  loadStatesSuccess,
  unloadState,
  updateState,
} from './state.actions';
import { State } from './state.entity';
import {
  assignIds,
  createNewState,
  markStateDeleted,
  updateStateDetails,
} from './state.utils';

export interface StateState {
  states: State[];
  selectedState?: number;
  isLoading: boolean;
  isSaving: boolean;
  isDeleting: boolean;
}

export const stateState: StateState = {
  states: [],
  isLoading: false,
  isSaving: false,
  isDeleting: false,
};

export const stateKey = 'state';

export const stateReducer = createReducer(
  stateState,
  on(loadStates, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadStatesSuccess, (state, { states }) => ({
    ...state,
    isLoading: false,
    states: assignIds(states),
  })),
  on(loadStatesFail, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(loadState, (state, { stateId }) => ({
    ...state,
    selectedState: stateId,
  })),
  on(unloadState, (state) => ({
    ...state,
    selectedState: undefined,
  })),
  on(updateState, (state, { name, abbreviation }) => ({
    ...state,
    states: updateStateDetails(
      state.states,
      state.selectedState,
      name,
      abbreviation
    ),
  })),
  on(deleteState, (state) => ({
    ...state,
    states: markStateDeleted(state.states, state.selectedState),
  })),
  on(addState, (state) => ({
    ...state,
    states: [...state.states, createNewState(state.states)],
    selectedState:
      state.states.map((s) => s.id).reduce((max, a) => (max > a ? max : a), 0) +
      1,
  }))
);
