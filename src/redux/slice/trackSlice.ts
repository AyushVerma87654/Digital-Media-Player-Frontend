import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddTrackPayload,
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
    addTrackInitiated,
    addTrackCompleted,
    addTrackError,
    editTrackInitiated,
    editTrackCompleted,
    editTrackError,
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
  addTrackInitiated: addTrackInitiatedAction,
  addTrackCompleted: addTrackCompletedAction,
  addTrackError: addTrackErrorAction,
  editTrackInitiated: editTrackInitiatedAction,
  editTrackCompleted: editTrackCompletedAction,
  editTrackError: editTrackErrorAction,
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
  action: PayloadAction<{ allTracks: TrackMap }>
) {
  state.loading = false;
  action.payload.allTracks.forEach(
    (track) => (state.allTracks = { ...state.allTracks, [track.id]: track })
  );
}

function getAllTracksError(
  state: TrackState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function getTrackByIdInitiated(
  state: TrackState,
  action: PayloadAction<{ id: string }>
) {
  state.loading = true;
  state.selectedTrackId = action.payload.id;
}

function getTrackByIdCompleted(
  state: TrackState,
  action: PayloadAction<{ track: Track }>
) {
  state.loading = false;
  state.allTracks = {
    ...state.allTracks,
    [action.payload.track.id]: action.payload.track,
  };
}

function getTrackByIdError(
  state: TrackState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function addTrackInitiated(
  state: TrackState,
  _action: PayloadAction<{ track: AddTrackPayload }>
) {
  state.loading = true;
}

function addTrackCompleted(
  state: TrackState,
  action: PayloadAction<{ track: Track }>
) {
  state.loading = false;
  state.allTracks[action.payload.track.id] = action.payload.track;
}

function addTrackError(
  state: TrackState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function editTrackInitiated(
  state: TrackState,
  _action: PayloadAction<{ track: UpdateTrackPayload }>
) {
  state.loading = true;
}

function editTrackCompleted(
  state: TrackState,
  action: PayloadAction<{ track: Track }>
) {
  state.loading = false;
  state.allTracks[action.payload.track.id] = action.payload.track;
  state.selectedTrackId = "";
}

function editTrackError(
  state: TrackState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function deleteTrackInitiated(
  state: TrackState,
  _action: PayloadAction<string>
) {
  state.loading = true;
}

function deleteTrackCompleted(
  state: TrackState,
  action: PayloadAction<{ id: string; message: string }>
) {
  delete state.allTracks[action.payload.id];
  state.message = action.payload.message;
  state.loading = false;
}

function deleteTrackError(
  state: TrackState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}
