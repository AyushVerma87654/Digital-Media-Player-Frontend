import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddPlaylistPayload,
  Playlist,
  PlaylistMap,
  Playlists,
  PlaylistAudio,
  UpdatePlaylistPayload,
} from "../../models/playlists";

/* -------------------- State -------------------- */

export type PlaylistState = {
  allPlaylists: Playlists;
  selectedPlaylistId: string;
  playlistAudios: Record<string, PlaylistAudio[]>;
  selectedPlaylistAudioId: string;
  loading: boolean;
  message: string;
};

const initialState: PlaylistState = {
  allPlaylists: {},
  selectedPlaylistId: "",
  playlistAudios: {},
  selectedPlaylistAudioId: "",
  loading: false,
  message: "",
};

/* -------------------- Slice -------------------- */

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    /* ---------- Playlists ---------- */
    getAllPlaylistsInitiated,
    getAllPlaylistsCompleted,
    getAllPlaylistsError,

    getPlaylistByIdInitiated,
    getPlaylistByIdCompleted,
    getPlaylistByIdError,

    getPlaylistsByUserIdInitiated,
    getPlaylistsByUserIdCompleted,
    getPlaylistsByUserIdError,

    addPlaylistInitiated,
    addPlaylistCompleted,
    addPlaylistError,

    editPlaylistInitiated,
    editPlaylistCompleted,
    editPlaylistError,

    deletePlaylistInitiated,
    deletePlaylistCompleted,
    deletePlaylistError,

    setSelectedPlaylistId,

    /* ---------- Playlist Audios ---------- */
    getPlaylistAudiosInitiated,
    getPlaylistAudiosCompleted,
    getPlaylistAudiosError,

    addAudioToPlaylistInitiated,
    addAudioToPlaylistCompleted,
    addAudioToPlaylistError,

    removeAudioFromPlaylistInitiated,
    removeAudioFromPlaylistCompleted,
    removeAudioFromPlaylistError,

    setSelectedPlaylistAudioId,
  },
});

const { actions, reducer: playlistReducer } = playlistSlice;

/* -------------------- Exports -------------------- */

export const {
  /* Playlists */
  getAllPlaylistsInitiated: getAllPlaylistsInitiatedAction,
  getAllPlaylistsCompleted: getAllPlaylistsCompletedAction,
  getAllPlaylistsError: getAllPlaylistsErrorAction,

  getPlaylistByIdInitiated: getPlaylistByIdInitiatedAction,
  getPlaylistByIdCompleted: getPlaylistByIdCompletedAction,
  getPlaylistByIdError: getPlaylistByIdErrorAction,

  getPlaylistsByUserIdInitiated: getPlaylistsByUserIdInitiatedAction,
  getPlaylistsByUserIdCompleted: getPlaylistsByUserIdCompletedAction,
  getPlaylistsByUserIdError: getPlaylistsByUserIdErrorAction,

  addPlaylistInitiated: addPlaylistInitiatedAction,
  addPlaylistCompleted: addPlaylistCompletedAction,
  addPlaylistError: addPlaylistErrorAction,

  editPlaylistInitiated: editPlaylistInitiatedAction,
  editPlaylistCompleted: editPlaylistCompletedAction,
  editPlaylistError: editPlaylistErrorAction,

  deletePlaylistInitiated: deletePlaylistInitiatedAction,
  deletePlaylistCompleted: deletePlaylistCompletedAction,
  deletePlaylistError: deletePlaylistErrorAction,

  setSelectedPlaylistId: setSelectedPlaylistIdAction,

  /* Playlist Audios */
  getPlaylistAudiosInitiated: getPlaylistAudiosInitiatedAction,
  getPlaylistAudiosCompleted: getPlaylistAudiosCompletedAction,
  getPlaylistAudiosError: getPlaylistAudiosErrorAction,

  addAudioToPlaylistInitiated: addAudioToPlaylistInitiatedAction,
  addAudioToPlaylistCompleted: addAudioToPlaylistCompletedAction,
  addAudioToPlaylistError: addAudioToPlaylistErrorAction,

  removeAudioFromPlaylistInitiated: removeAudioFromPlaylistInitiatedAction,
  removeAudioFromPlaylistCompleted: removeAudioFromPlaylistCompletedAction,
  removeAudioFromPlaylistError: removeAudioFromPlaylistErrorAction,

  setSelectedPlaylistAudioId: setSelectedPlaylistAudioIdAction,
} = actions;

export default playlistReducer;

/* -------------------- Reducers -------------------- */
/* ---------- Playlists ---------- */

function getAllPlaylistsInitiated(
  state: PlaylistState,
  _action: PayloadAction<{ userId: string }>,
) {
  state.loading = true;
}

function getAllPlaylistsCompleted(
  state: PlaylistState,
  action: PayloadAction<{ allPlaylists: PlaylistMap }>,
) {
  state.loading = false;
  action.payload.allPlaylists.forEach(
    (playlist) =>
      (state.allPlaylists = {
        ...state.allPlaylists,
        [playlist.id]: playlist,
      }),
  );
}

function getAllPlaylistsError(
  state: PlaylistState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function getPlaylistByIdInitiated(
  state: PlaylistState,
  action: PayloadAction<{ id: string }>,
) {
  state.loading = true;
  state.selectedPlaylistId = action.payload.id;
}

function getPlaylistByIdCompleted(
  state: PlaylistState,
  action: PayloadAction<{ playlist: Playlist }>,
) {
  state.loading = false;
  state.allPlaylists[action.payload.playlist.id] = action.payload.playlist;
}

function getPlaylistByIdError(
  state: PlaylistState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function getPlaylistsByUserIdInitiated(state: PlaylistState) {
  state.loading = true;
}

function getPlaylistsByUserIdCompleted(
  state: PlaylistState,
  action: PayloadAction<{ playlists: Playlist[] }>,
) {
  state.loading = false;
  action.payload.playlists.forEach(
    (playlist) => (state.allPlaylists[playlist.id] = playlist),
  );
}

function getPlaylistsByUserIdError(
  state: PlaylistState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function addPlaylistInitiated(
  state: PlaylistState,
  _action: PayloadAction<{ playlist: AddPlaylistPayload }>,
) {
  state.loading = true;
}

function addPlaylistCompleted(
  state: PlaylistState,
  action: PayloadAction<{ playlist: Playlist }>,
) {
  state.loading = false;
  state.allPlaylists[action.payload.playlist.id] = action.payload.playlist;
}

function addPlaylistError(
  state: PlaylistState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function editPlaylistInitiated(
  state: PlaylistState,
  _action: PayloadAction<{ playlist: UpdatePlaylistPayload }>,
) {
  state.loading = true;
}

function editPlaylistCompleted(
  state: PlaylistState,
  action: PayloadAction<{ playlist: Playlist }>,
) {
  state.loading = false;
  state.allPlaylists[action.payload.playlist.id] = action.payload.playlist;
}

function editPlaylistError(
  state: PlaylistState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function deletePlaylistInitiated(state: PlaylistState) {
  state.loading = true;
}

function deletePlaylistCompleted(
  state: PlaylistState,
  action: PayloadAction<{ id: string; message: string }>,
) {
  state.loading = false;
  delete state.allPlaylists[action.payload.id];
  delete state.playlistAudios[action.payload.id];
  state.message = action.payload.message;
}

function deletePlaylistError(
  state: PlaylistState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function setSelectedPlaylistId(
  state: PlaylistState,
  action: PayloadAction<string>,
) {
  state.selectedPlaylistId = action.payload;
}

/* ---------- Playlist Audios ---------- */

function getPlaylistAudiosInitiated(
  state: PlaylistState,
  _action: PayloadAction<{ playlistId: string }>,
) {
  state.loading = true;
}

function getPlaylistAudiosCompleted(
  state: PlaylistState,
  action: PayloadAction<{
    playlistId: string;
    audios: PlaylistAudio[];
  }>,
) {
  state.loading = false;
  state.playlistAudios[action.payload.playlistId] = action.payload.audios;
}

function getPlaylistAudiosError(
  state: PlaylistState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function addAudioToPlaylistInitiated(
  state: PlaylistState,
  _action: PayloadAction<{
    playlistId: string;
    audioId: string;
  }>,
) {
  state.loading = true;
}

function addAudioToPlaylistCompleted(
  state: PlaylistState,
  action: PayloadAction<{
    playlistId: string;
    audio: PlaylistAudio;
  }>,
) {
  state.loading = false;
  state.playlistAudios[action.payload.playlistId] = [
    ...(state.playlistAudios[action.payload.playlistId] || []),
    action.payload.audio,
  ];
}

function addAudioToPlaylistError(
  state: PlaylistState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function removeAudioFromPlaylistInitiated(
  state: PlaylistState,
  _action: PayloadAction<{
    playlistAudioId: string;
  }>,
) {
  state.loading = true;
}

function removeAudioFromPlaylistCompleted(
  state: PlaylistState,
  action: PayloadAction<{
    playlistAudioId: string;
  }>,
) {
  state.loading = false;
  state.playlistAudios[state.selectedPlaylistId] =
    state.playlistAudios[state.selectedPlaylistId]?.filter(
      (audio) => audio.audioId !== action.payload.playlistAudioId,
    ) || [];
}

function removeAudioFromPlaylistError(
  state: PlaylistState,
  action: PayloadAction<{ error: string }>,
) {
  state.loading = false;
  state.message = action.payload.error;
}

function setSelectedPlaylistAudioId(
  state: PlaylistState,
  action: PayloadAction<string>,
) {
  state.selectedPlaylistAudioId = action.payload;
}
