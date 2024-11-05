import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreType } from '../model/storeType';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  storeService: StoreService = inject(StoreService);
  router: Router = inject(Router);

  canActivate() {
    if (this.storeService.getItem(StoreType.USER) !== null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
