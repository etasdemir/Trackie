import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider, useDispatch} from 'react-redux';
import {createLogger} from 'redux-logger';

import {categoryReducer} from './reducers/CategoryReducers';
import {mangaReducer} from './reducers/MangaReducers';
import {peopleReducer} from './reducers/PeopleReducers';
import {userReducer} from './reducers/UserReducer';

const logger = createLogger({
  level: {
    prevState: false,
    nextState: false,
  },
  colors: {
    title: () => 'inherit',
    prevState: () => '#9E9E9E',
    action: () => '#03A9F4',
    nextState: () => '#4CAF50',
    error: () => '#F20404',
  },
});

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    mangas: mangaReducer,
    people: peopleReducer,
    user: userReducer,
  },
  middleware: defaultMiddleware =>
    defaultMiddleware({serializableCheck: false}).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export function withAppStore<T>(WrappedComponent: React.FC<T>) {
  const ComponentWithStore = (props: T) => {
    return (
      <Provider store={store}>
        <WrappedComponent {...(props as T)} />
      </Provider>
    );
  };

  return ComponentWithStore;
}
