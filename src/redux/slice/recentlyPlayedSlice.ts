import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddRecentlyPlayedPayload,
  RecentlyPlayed,
  RecentlyPlayedItems,
  RecentlyPlayedMap,
} from "../../models/recentlyPlayed";

export type RecentlyPlayedState = {
  items: RecentlyPlayedItems;
  loading: boolean;
  message: string;
};

const initialState: RecentlyPlayedState = {
  items: {},
  loading: false,
  message: "",
};

const recentlyPlayedSlice = createSlice({
  name: "recentlyPlayed",
  initialState,
  reducers: {
    getRecentlyPlaylistInitiated,
    getRecentlyPlaylistCompleted,
    getRecentlyPlaylistError,
    addRecentlyPlayedInitiated,
    addRecentlyPlayedCompleted,
    addRecentlyPlayedError,
  },
});

const { actions, reducer: recentlyPlayedReducer } = recentlyPlayedSlice;

export const {
  getRecentlyPlaylistInitiated: getRecentlyPlaylistInitiatedAction,
  getRecentlyPlaylistCompleted: getRecentlyPlaylistCompletedAction,
  getRecentlyPlaylistError: getRecentlyPlaylistErrorAction,
  addRecentlyPlayedInitiated: addRecentlyPlayedInitiatedAction,
  addRecentlyPlayedCompleted: addRecentlyPlayedCompletedAction,
  addRecentlyPlayedError: addRecentlyPlayedErrorAction,
} = actions;

export default recentlyPlayedReducer;

/* -------------------- Reducers -------------------- */

function getRecentlyPlaylistInitiated(
  state: RecentlyPlayedState,
  _action: PayloadAction<{ userId: string }>
) {
  state.loading = true;
}

function getRecentlyPlaylistCompleted(
  state: RecentlyPlayedState,
  action: PayloadAction<{ items: RecentlyPlayedMap }>
) {
  state.loading = false;
  state.items = {};

  action.payload.items.forEach((item) => {
    state.items[item.id] = item;
  });
}

function getRecentlyPlaylistError(
  state: RecentlyPlayedState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function addRecentlyPlayedInitiated(
  state: RecentlyPlayedState,
  _action: PayloadAction<AddRecentlyPlayedPayload>
) {
  state.loading = true;
}

function addRecentlyPlayedCompleted(
  state: RecentlyPlayedState,
  action: PayloadAction<{ item: RecentlyPlayed }>
) {
  state.loading = false;
  state.items[action.payload.item.id] = action.payload.item;
}

function addRecentlyPlayedError(
  state: RecentlyPlayedState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}
