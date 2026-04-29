import { configureStore } from "@reduxjs/toolkit";

import { pollApi } from "../features/polls/pollApi";
import { voteApi } from "../features/votes/voteApi";

export const store = configureStore({
  reducer: {
    [pollApi.reducerPath]: pollApi.reducer,
    [voteApi.reducerPath]: voteApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      pollApi.middleware,
      voteApi.middleware
    ),
});