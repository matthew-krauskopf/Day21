import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, logout, relogin } from './auth.actions';
import {
  isProcessing,
  selectAuthState,
  selectAuthUserId,
} from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  authUserId$;
  isProcessing$;

  constructor(private store: Store) {
    this.authUserId$ = this.store.select(selectAuthUserId);
    this.isProcessing$ = this.store.select(isProcessing);
  }

  login(username: string, password: string) {
    this.store.dispatch(login({ username, password }));
  }

  performCachedLogin() {
    this.store.dispatch(relogin());
  }

  logout() {
    this.store.dispatch(logout());
  }
}
