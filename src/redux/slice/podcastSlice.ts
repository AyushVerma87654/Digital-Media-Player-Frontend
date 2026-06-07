import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreatePodcastPayload,
  Podcast,
  PodcastMap,
  Podcasts,
  UpdatePodcastPayload,
} from "../../models/podcast";

export type PodcastState = {
  allPodcasts: Podcasts;
  selectedPodcastId: string;
  loading: boolean;
  message: string;
};

const initialState: PodcastState = {
  allPodcasts: {},
  selectedPodcastId: "",
  loading: false,
  message: "",
};

const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {
    getAllPodcastsInitiated,
    getAllPodcastsCompleted,
    getAllPodcastsError,

    getPodcastByIdInitiated,
    getPodcastByIdCompleted,
    getPodcastByIdError,

    getPodcastsByUserIdInitiated,
    getPodcastsByUserIdCompleted,
    getPodcastsByUserIdError,

    createPodcastInitiated,
    createPodcastCompleted,
    createPodcastError,

    updatePodcastInitiated,
    updatePodcastCompleted,
    updatePodcastError,

    deletePodcastInitiated,
    deletePodcastCompleted,
    deletePodcastError,
  },
});

const { actions, reducer: podcastReducer } = podcastSlice;

export const {
  getAllPodcastsInitiated: getAllPodcastsInitiatedAction,
  getAllPodcastsCompleted: getAllPodcastsCompletedAction,
  getAllPodcastsError: getAllPodcastsErrorAction,

  getPodcastByIdInitiated: getPodcastByIdInitiatedAction,
  getPodcastByIdCompleted: getPodcastByIdCompletedAction,
  getPodcastByIdError: getPodcastByIdErrorAction,

  getPodcastsByUserIdInitiated: getPodcastsByUserIdInitiatedAction,
  getPodcastsByUserIdCompleted: getPodcastsByUserIdCompletedAction,
  getPodcastsByUserIdError: getPodcastsByUserIdErrorAction,

  createPodcastInitiated: createPodcastInitiatedAction,
  createPodcastCompleted: createPodcastCompletedAction,
  createPodcastError: createPodcastErrorAction,

  updatePodcastInitiated: updatePodcastInitiatedAction,
  updatePodcastCompleted: updatePodcastCompletedAction,
  updatePodcastError: updatePodcastErrorAction,

  deletePodcastInitiated: deletePodcastInitiatedAction,
  deletePodcastCompleted: deletePodcastCompletedAction,
  deletePodcastError: deletePodcastErrorAction,
} = actions;

export default podcastReducer;

/* -------------------- Reducers -------------------- */

function getAllPodcastsInitiated(state: PodcastState) {
  state.loading = true;
}

function getAllPodcastsCompleted(
  state: PodcastState,
  action: PayloadAction<{ allPodcasts: PodcastMap }>,
) {
  state.loading = false;
  action.payload.allPodcasts.forEach(
    (podcast) =>
      (state.allPodcasts = { ...state.allPodcasts, [podcast.id]: podcast }),
  );
}

function getAllPodcastsError(
  state: PodcastState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function getPodcastByIdInitiated(
  state: PodcastState,
  action: PayloadAction<{ id: string }>,
) {
  state.loading = true;
  state.selectedPodcastId = action.payload.id;
}

function getPodcastByIdCompleted(
  state: PodcastState,
  action: PayloadAction<{ podcast: Podcast }>,
) {
  state.loading = false;
  state.allPodcasts = {
    ...state.allPodcasts,
    [action.payload.podcast.id]: action.payload.podcast,
  };
}

function getPodcastByIdError(
  state: PodcastState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function getPodcastsByUserIdInitiated(
  state: PodcastState,
  _action: PayloadAction<{ userId: string }>,
) {
  state.loading = true;
}

function getPodcastsByUserIdCompleted(
  state: PodcastState,
  action: PayloadAction<{ podcasts: Podcast[] }>,
) {
  state.loading = false;
  action.payload.podcasts.forEach(
    (podcast) =>
      (state.allPodcasts = { ...state.allPodcasts, [podcast.id]: podcast }),
  );
}

function getPodcastsByUserIdError(
  state: PodcastState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function createPodcastInitiated(
  state: PodcastState,
  _action: PayloadAction<{ podcast: CreatePodcastPayload }>,
) {
  state.loading = true;
}

function createPodcastCompleted(
  state: PodcastState,
  action: PayloadAction<{ podcast: Podcast }>,
) {
  state.loading = false;
  state.allPodcasts = {
    ...state.allPodcasts,
    [action.payload.podcast.id]: action.payload.podcast,
  };
}

function createPodcastError(
  state: PodcastState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function updatePodcastInitiated(
  state: PodcastState,
  _action: PayloadAction<{ podcast: UpdatePodcastPayload }>,
) {
  state.loading = true;
}

function updatePodcastCompleted(
  state: PodcastState,
  action: PayloadAction<{ podcast: Podcast }>,
) {
  state.loading = false;
  state.allPodcasts = {
    ...state.allPodcasts,
    [action.payload.podcast.id]: action.payload.podcast,
  };
  state.selectedPodcastId = "";
}

function updatePodcastError(
  state: PodcastState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function deletePodcastInitiated(
  state: PodcastState,
  _action: PayloadAction<string>,
) {
  state.loading = true;
}

function deletePodcastCompleted(
  state: PodcastState,
  action: PayloadAction<{ id: string; message: string }>,
) {
  state.loading = false;
  delete state.allPodcasts[action.payload.id];
  state.message = action.payload.message;
}

function deletePodcastError(
  state: PodcastState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}
