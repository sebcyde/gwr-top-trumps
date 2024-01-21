import { configureStore } from "@reduxjs/toolkit";
import { setUserName } from "./UserSlice";

export const store = configureStore({
  reducer: {},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
