import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import getUser from '../features/counter/getUser';

export const store = configureStore({
  reducer: {
    users: getUser
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
