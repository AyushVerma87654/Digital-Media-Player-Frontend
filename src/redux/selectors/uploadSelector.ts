import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const uploadStateSelector = (state: AppState) => state.upload;

export const coverImageUrlSelector = createSelector(
  [uploadStateSelector],
  (state) => state.imageUrl
);

export const audioUrlSelector = createSelector(
  [uploadStateSelector],
  (state) => state.audioUrl
);

export const uploadLoadingSelector = createSelector(
  [uploadStateSelector],
  (state) => state.loading
);

export const uploadMessageSelector = createSelector(
  [uploadStateSelector],
  (state) => state.message
);
