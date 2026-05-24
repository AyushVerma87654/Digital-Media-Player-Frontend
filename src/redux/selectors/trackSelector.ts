import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const trackStateSelector = (state: AppState) => state.track;

export const allTracksSelector = createSelector(
  [trackStateSelector],
  (state) => state.allTracks
);

export const allTracksMapSelector = createSelector(
  [allTracksSelector],
  (tracks) => Object.values(tracks)
);

export const selectedTrackIdSelector = createSelector(
  [trackStateSelector],
  (state) => state.selectedTrackId
);

export const selectedTrackSelector = createSelector(
  [allTracksSelector, selectedTrackIdSelector],
  (tracks, selectedTrackId) =>
    selectedTrackId ? tracks[selectedTrackId] : undefined
);

export const tracksListSelector = createSelector(
  [allTracksSelector],
  (tracks) => Object.values(tracks)
);

export const trackLoadingSelector = createSelector(
  [trackStateSelector],
  (state) => state.loading
);

export const trackMessageSelector = createSelector(
  [trackStateSelector],
  (state) => state.message
);
