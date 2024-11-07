import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAPIService } from '../base-api.service';
import { State } from './state.entity';

@Injectable({
  providedIn: 'root',
})
export class StateService extends BaseAPIService {
  endpoint = '/states';

  getState(id: number): Observable<State[]> {
    return this.performGet<State>(this.endpoint, { key: 'id', value: '' + id });
  }

  getStates(): Observable<State[]> {
    return this.performGet<State>(this.endpoint);
  }
}
