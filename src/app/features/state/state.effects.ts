import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, tap, withLatestFrom } from 'rxjs';
import {
  addState,
  deleteState,
  loadState,
  loadStateFail,
  loadStates,
  loadStatesFail,
  loadStatesSuccess,
  loadStateSuccess,
  updateState,
} from './state.actions';
import { State } from './state.entity';
import { selectedState } from './state.selectors';
import { StateService } from './state.service';

@Injectable()
export class StateEffects {
  router: Router = inject(Router);
  toast: ToastController = inject(ToastController);
  statesService: StateService = inject(StateService);

  constructor(private actions$: Actions, private store: Store) {}

  loadStates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStates),
      exhaustMap(() =>
        this.statesService.getStates().pipe(
          map((states: State[]) => loadStatesSuccess({ states: states })),
          catchError(() => of(loadStatesFail()))
        )
      )
    )
  );

  loadState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadState),
      map((payload) => loadStateSuccess({ stateId: payload.stateId }))
    )
  );

  loadStateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadStateSuccess),
        tap((payload) => {
          this.router.navigate(['dashboard', 'states', payload.stateId]);
        })
      ),
    { dispatch: false }
  );

  loadStateFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadStateFail),
        map(() =>
          this.toast
            .create({
              message: 'State not found',
              duration: 5000,
              position: 'bottom',
            })
            .then((res) => res.present())
        )
      ),
    { dispatch: false }
  );

  loadStatesFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadStatesFail),
        map(() =>
          this.toast
            .create({
              message: 'Network Error: States failed to load',
              duration: 5000,
              position: 'bottom',
            })
            .then((res) => res.present())
        )
      ),
    { dispatch: false }
  );

  deleteState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteState),
        map(() => {
          this.toast
            .create({
              message: 'State successfully deleted',
              duration: 3000,
              position: 'bottom',
            })
            .then((res) => res.present());
        })
      ),
    { dispatch: false }
  );

  addState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addState),
        map(() =>
          this.toast
            .create({
              message: 'State successfully created',
              duration: 3000,
              position: 'bottom',
            })
            .then((res) => res.present())
        )
      ),
    { dispatch: false }
  );

  updateState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateState),
        map(() =>
          this.toast
            .create({
              message: 'State successfully updated',
              duration: 3000,
              position: 'bottom',
            })
            .then((res) => res.present())
        )
      ),
    { dispatch: false }
  );

  navigateToNewState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addState),
        withLatestFrom(this.store.select(selectedState)),
        map(([_, state]) =>
          this.router.navigate(['dashboard', 'states', state ? state.id : ''])
        )
      ),
    { dispatch: false }
  );

  navigateHome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadStateFail, deleteState),
        tap(() => this.router.navigate(['dashboard']))
      ),
    { dispatch: false }
  );
}
