import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddPodcastPayload,
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

    addPodcastInitiated,
    addPodcastCompleted,
    addPodcastError,

    editPodcastInitiated,
    editPodcastCompleted,
    editPodcastError,

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

  addPodcastInitiated: addPodcastInitiatedAction,
  addPodcastCompleted: addPodcastCompletedAction,
  addPodcastError: addPodcastErrorAction,

  editPodcastInitiated: editPodcastInitiatedAction,
  editPodcastCompleted: editPodcastCompletedAction,
  editPodcastError: editPodcastErrorAction,

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
  action: PayloadAction<{ allPodcasts: PodcastMap }>
) {
  state.loading = false;
  action.payload.allPodcasts.forEach(
    (podcast) =>
      (state.allPodcasts = { ...state.allPodcasts, [podcast.id]: podcast })
  );
}

function getAllPodcastsError(
  state: PodcastState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function getPodcastByIdInitiated(
  state: PodcastState,
  action: PayloadAction<{ id: string }>
) {
  state.loading = true;
  state.selectedPodcastId = action.payload.id;
}

function getPodcastByIdCompleted(
  state: PodcastState,
  action: PayloadAction<{ podcast: Podcast }>
) {
  state.loading = false;
  state.allPodcasts = {
    ...state.allPodcasts,
    [action.payload.podcast.id]: action.payload.podcast,
  };
}

function getPodcastByIdError(
  state: PodcastState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function getPodcastsByUserIdInitiated(
  state: PodcastState,
  _action: PayloadAction<{ userId: string }>
) {
  state.loading = true;
}

function getPodcastsByUserIdCompleted(
  state: PodcastState,
  action: PayloadAction<{ podcasts: Podcast[] }>
) {
  state.loading = false;
  action.payload.podcasts.forEach(
    (podcast) =>
      (state.allPodcasts = { ...state.allPodcasts, [podcast.id]: podcast })
  );
}

function getPodcastsByUserIdError(
  state: PodcastState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function addPodcastInitiated(
  state: PodcastState,
  _action: PayloadAction<{ podcast: AddPodcastPayload }>
) {
  state.loading = true;
}

function addPodcastCompleted(
  state: PodcastState,
  action: PayloadAction<{ podcast: Podcast }>
) {
  state.loading = false;
  state.allPodcasts = {
    ...state.allPodcasts,
    [action.payload.podcast.id]: action.payload.podcast,
  };
}

function addPodcastError(
  state: PodcastState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function editPodcastInitiated(
  state: PodcastState,
  _action: PayloadAction<{ podcast: UpdatePodcastPayload }>
) {
  state.loading = true;
}

function editPodcastCompleted(
  state: PodcastState,
  action: PayloadAction<{ podcast: Podcast }>
) {
  state.loading = false;
  state.allPodcasts = {
    ...state.allPodcasts,
    [action.payload.podcast.id]: action.payload.podcast,
  };
  state.selectedPodcastId = "";
}

function editPodcastError(
  state: PodcastState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function deletePodcastInitiated(
  state: PodcastState,
  _action: PayloadAction<string>
) {
  state.loading = true;
}

function deletePodcastCompleted(
  state: PodcastState,
  action: PayloadAction<{ id: string; message: string }>
) {
  state.loading = false;
  delete state.allPodcasts[action.payload.id];
  state.message = action.payload.message;
}

function deletePodcastError(
  state: PodcastState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}
