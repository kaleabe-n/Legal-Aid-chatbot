import { configureStore } from "@reduxjs/toolkit";
import { exampleApi } from "./example-api/example-api";
import { loginApi } from "./login/loginApi";
import authApi from "./signup/signup-api";
import { chatApi } from "./chat/chatApi";

export const store = configureStore({
  reducer: {
    [exampleApi.reducerPath]: exampleApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    // add your apis here
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      exampleApi.middleware,
      loginApi.middleware,
      authApi.middleware,
      chatApi.middleware
    );
    // concat your api middleware here
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
