import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const recentlyPlayedStateSelector = (state: AppState) =>
  state.recentlyPlayed;

export const recentlyPlayedItemsSelector = createSelector(
  [recentlyPlayedStateSelector],
  (state) => state.items
);

export const recentlyPlayedItemsMapSelector = createSelector(
  [recentlyPlayedItemsSelector],
  (recentlyPlayedItems) =>
    Object.values(recentlyPlayedItems).sort(
      (a, b) => b.lastPlayedPosition - a.lastPlayedPosition
    )
);

export const recentlyPlayedByIdSelector = (id: string) =>
  createSelector([recentlyPlayedItemsSelector], (items) => items[id]);

export const recentlyPlayedLoadingSelector = createSelector(
  [recentlyPlayedStateSelector],
  (state) => state.loading
);

export const recentlyPlayedMessageSelector = createSelector(
  [recentlyPlayedStateSelector],
  (state) => state.message
);
