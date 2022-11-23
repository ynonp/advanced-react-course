import { createStore } from './store';
import { decrement, increment } from './slices/counter';

test('initial state', () => {
  const store = createStore();  
  expect(store.getState().counter).toEqual({ value: 0 });
});

test('inc', () => {
  const store = createStore();
  store.dispatch(increment());
  expect(store.getState().counter).toEqual({ value: 1 });
})

test('inc from 10 to 11', () => {
  const store = createStore({ counter: { value: 10 }});
  store.dispatch(increment());
  expect(store.getState().counter).toEqual({ value: 11 });
});
