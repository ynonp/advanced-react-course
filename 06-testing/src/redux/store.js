import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counter'

export function createStore(initialState) {
  return configureStore(Object.assign({}, {
    reducer: {
      counter: counterReducer,
    },
  },
  initialState ? { preloadedState: initialState } : {}));
}

export const store = createStore();