import { createAction, props } from '@ngrx/store';
import { Auth } from './auth.entity';

export const login = createAction(
  '[Login] Login',
  props<{ username: string; password: string }>()
);

export const relogin = createAction('[Startup] Relogin');

export const loginSuccessful = createAction(
  '[Login] Login Successful',
  props<{ user: Auth }>()
);

export const loginFailed = createAction('[Login] Login Failed');

export const loginRejected = createAction('[Login] Login Rejected');

export const logout = createAction('[Login] Logout');
