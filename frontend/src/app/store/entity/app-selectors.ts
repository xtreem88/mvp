import { Injectable } from '@angular/core';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store';

import { distinctUntilChanged } from 'rxjs/operators';
import { AppDataState, initialState } from './reducer';


const getAppState = createFeatureSelector<AppDataState>('appConfig');

const getDataSource = createSelector(getAppState, (state: AppDataState) => (state ? state.session.dataSource : initialState.dataSource));

@Injectable()
export class AppSelectors {
  constructor(private store: Store<AppDataState>) {}

  get dataSource$() {
    return this.store.select(getDataSource).pipe(distinctUntilChanged());
  }
}
