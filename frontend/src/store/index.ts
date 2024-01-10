import { configureStore } from "@reduxjs/toolkit";
import { exampleApi } from "./example-api/example-api";

export const store = configureStore({
  reducer: {
    [exampleApi.reducerPath]: exampleApi.reducer,
    // add your apis here
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(exampleApi.middleware);
    // concat your api middleware here
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
