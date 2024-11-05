import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginFailed,
  loginRejected,
  loginSuccessful,
  logout,
} from './auth.actions';

export interface AuthState {
  id?: number | undefined;
  isLoading: boolean;
}

export const authState: AuthState = {
  isLoading: false,
};

export const authKey = 'auth';

export const authReducer = createReducer(
  authState,
  on(login, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loginSuccessful, (state, { user }) => ({
    ...state,
    id: user.id,
    isLoading: false,
  })),
  on(loginFailed, loginRejected, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(logout, (state) => ({
    ...state,
    id: undefined,
  }))
);
