import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { counterReducer } from './store/counter.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(
      { count: counterReducer },
      { metaReducers }
    ),
    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Limit state history in DevTools to 25 actions
        logOnly: environment.production, // Log-only mode in production
        trace: true
      })
    ),
  ],
};
