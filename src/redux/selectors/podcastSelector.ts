import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const podcastStateSelector = (state: AppState) => state.podcast;

export const allPodcastsSelector = createSelector(
  [podcastStateSelector],
  (state) => state.allPodcasts
);

export const allPodcastsMapSelector = createSelector(
  [allPodcastsSelector],
  (podcasts) => Object.values(podcasts)
);

export const selectedPodcastIdSelector = createSelector(
  [podcastStateSelector],
  (state) => state.selectedPodcastId
);

export const selectedPodcastSelector = createSelector(
  [allPodcastsSelector, selectedPodcastIdSelector],
  (podcasts, selectedId) => (selectedId ? podcasts[selectedId] : undefined)
);

export const podcastLoadingSelector = createSelector(
  [podcastStateSelector],
  (state) => state.loading
);

export const podcastMessageSelector = createSelector(
  [podcastStateSelector],
  (state) => state.message
);
