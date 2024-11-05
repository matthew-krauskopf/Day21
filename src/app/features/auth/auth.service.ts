import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAPIService } from '../base-api.service';
import { Auth } from './auth.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseAPIService {
  endpoint = '/spotUsers';

  getUser(username: string): Observable<Auth[]> {
    return this.performGet(this.endpoint, { key: 'username', value: username });
  }
}
