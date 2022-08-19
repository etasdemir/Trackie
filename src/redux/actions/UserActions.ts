import {createAction} from '@reduxjs/toolkit';

function withPayloadType<T>() {
  return (t: T) => ({payload: t});
}

export const setThemeAction = createAction(
  'SET_USER_THEME',
  withPayloadType<{theme: string}>(),
);

export const setLanguageAction = createAction(
  'SET_LANGUAGE_ACTION',
  withPayloadType<{language: string}>(),
);

export const setIsFirstInstallAction = createAction(
  'SET_USER_IS_FIRST_INSTALL',
  withPayloadType<boolean>(),
);
