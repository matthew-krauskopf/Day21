import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authKey, AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>(authKey);

export const selectAuthUserId = createSelector(
  selectAuthState,
  (authState) => authState.id
);

export const isProcessing = createSelector(
  selectAuthState,
  (authState) => authState.isLoading
);
