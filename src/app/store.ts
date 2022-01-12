import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import bertReducer from "../features/bert/bertSlice";
import mecabReducer from "../features/mecab/mecabSlice";
export const store = configureStore({
  reducer: {
    bert: bertReducer,
    mecab: mecabReducer,
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
