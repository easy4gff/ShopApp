import { Store, createStore } from 'redux';
import { ProductsState, ProductsReducer } from './product/products.reducer';
import { InjectionToken } from '@angular/core';

export const AppStore = new InjectionToken('App.store');

export function createAppStore(): Store<ProductsState> {
    return createStore<ProductsState>(
      ProductsReducer//,
      //compose(devtools)
    );
  }
  
  export const appStoreProviders = [
     { provide: AppStore, useFactory: createAppStore }
  ];
  
//export var AppStore: Store<ProductsState> = createStore<ProductsState>(ProductsReducer);