import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateTrackPayload,
  Track,
  TrackMap,
  Tracks,
  UpdateTrackPayload,
} from "../../models/track";

export type TrackState = {
  allTracks: Tracks;
  selectedTrackId: string;
  loading: boolean;
  message: string;
};

const initialState: TrackState = {
  allTracks: {},
  selectedTrackId: "",
  loading: false,
  message: "",
};

const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    getAllTracksInitiated,
    getAllTracksCompleted,
    getAllTracksError,
    getTrackByIdInitiated,
    getTrackByIdCompleted,
    getTrackByIdError,
    createTrackInitiated,
    createTrackCompleted,
    createTrackError,
    updateTrackInitiated,
    updateTrackCompleted,
    updateTrackError,
    deleteTrackInitiated,
    deleteTrackCompleted,
    deleteTrackError,
  },
});

const { actions, reducer: trackReducer } = trackSlice;

export const {
  getAllTracksInitiated: getAllTracksInitiatedAction,
  getAllTracksCompleted: getAllTracksCompletedAction,
  getAllTracksError: getAllTracksErrorAction,
  getTrackByIdInitiated: getTrackByIdInitiatedAction,
  getTrackByIdCompleted: getTrackByIdCompletedAction,
  getTrackByIdError: getTrackByIdErrorAction,
  createTrackInitiated: createTrackInitiatedAction,
  createTrackCompleted: createTrackCompletedAction,
  createTrackError: createTrackErrorAction,
  updateTrackInitiated: updateTrackInitiatedAction,
  updateTrackCompleted: updateTrackCompletedAction,
  updateTrackError: updateTrackErrorAction,
  deleteTrackInitiated: deleteTrackInitiatedAction,
  deleteTrackCompleted: deleteTrackCompletedAction,
  deleteTrackError: deleteTrackErrorAction,
} = actions;

export default trackReducer;

function getAllTracksInitiated(state: TrackState) {
  state.loading = true;
}

function getAllTracksCompleted(
  state: TrackState,
  action: PayloadAction<{ allTracks: TrackMap }>,
) {
  state.loading = false;
  action.payload.allTracks.forEach(
    (track) => (state.allTracks = { ...state.allTracks, [track.id]: track }),
  );
}

function getAllTracksError(
  state: TrackState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function getTrackByIdInitiated(
  state: TrackState,
  action: PayloadAction<{ id: string }>,
) {
  state.loading = true;
  state.selectedTrackId = action.payload.id;
}

function getTrackByIdCompleted(
  state: TrackState,
  action: PayloadAction<{ track: Track }>,
) {
  state.loading = false;
  state.allTracks = {
    ...state.allTracks,
    [action.payload.track.id]: action.payload.track,
  };
}

function getTrackByIdError(
  state: TrackState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function createTrackInitiated(
  state: TrackState,
  _action: PayloadAction<{ track: CreateTrackPayload }>,
) {
  state.loading = true;
}

function createTrackCompleted(
  state: TrackState,
  action: PayloadAction<{ track: Track }>,
) {
  state.loading = false;
  state.allTracks[action.payload.track.id] = action.payload.track;
}

function createTrackError(
  state: TrackState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function updateTrackInitiated(
  state: TrackState,
  _action: PayloadAction<{ track: UpdateTrackPayload }>,
) {
  state.loading = true;
}

function updateTrackCompleted(
  state: TrackState,
  action: PayloadAction<{ track: Track }>,
) {
  state.loading = false;
  state.allTracks[action.payload.track.id] = action.payload.track;
  state.selectedTrackId = "";
}

function updateTrackError(
  state: TrackState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function deleteTrackInitiated(
  state: TrackState,
  _action: PayloadAction<string>,
) {
  state.loading = true;
}

function deleteTrackCompleted(
  state: TrackState,
  action: PayloadAction<{ id: string; message: string }>,
) {
  delete state.allTracks[action.payload.id];
  state.message = action.payload.message;
  state.loading = false;
}

function deleteTrackError(
  state: TrackState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}
