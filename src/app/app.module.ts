import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStore, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthEffects } from './features/auth/auth.effects';
import { authReducer } from './features/auth/auth.state';
import { stateReducer } from './features/state/state.state';
import { StateEffects } from './features/state/state.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot({ mode: 'md' }),
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
  ],
  providers: [
    provideEffects(AuthEffects, StateEffects),
    provideHttpClient(),
    provideStore(),
    importProvidersFrom(
      StoreModule.forRoot({
        auth: authReducer,
        state: stateReducer,
      })
    ),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
