import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const userStateSelector = (state: AppState) => state.user;

export const userSelector = createSelector(
  [userStateSelector],
  (state) => state.user
);

export const isLoggedInSelector = createSelector(
  [userStateSelector],
  (state) => state.isLoggedIn
);

export const userLoadingSelector = createSelector(
  [userStateSelector],
  (state) => state.loading
);

export const userMessageSelector = createSelector(
  [userStateSelector],
  (state) => state.message
);
