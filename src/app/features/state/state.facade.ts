import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addState,
  deleteState,
  loadState,
  loadStateFail,
  loadStates,
  unloadState,
  updateState,
} from './state.actions';
import {
  isProcessing,
  selectedState,
  selectStates,
  statesExist,
} from './state.selectors';

@Injectable({
  providedIn: 'root',
})
export class StateFacade {
  states$;
  state$;
  isProcessing$;
  statesExist$;

  constructor(private store: Store) {
    this.states$ = this.store.select(selectStates);
    this.state$ = this.store.select(selectedState);
    this.isProcessing$ = this.store.select(isProcessing);
    this.statesExist$ = this.store.select(statesExist);
  }

  loadStates() {
    this.store.dispatch(loadStates());
  }

  loadState(id: number) {
    this.store.dispatch(loadState({ stateId: id }));
  }

  unloadState() {
    this.store.dispatch(unloadState());
  }

  deleteState() {
    this.store.dispatch(deleteState());
  }

  addState() {
    this.store.dispatch(addState());
  }

  updateState(name: string, abbreviation: string) {
    this.store.dispatch(updateState({ name, abbreviation }));
  }

  loadStateFailed() {
    this.store.dispatch(loadStateFail());
  }
}
