import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllPlaylistsInitiatedAction,
  getAllPlaylistsCompletedAction,
  getAllPlaylistsErrorAction,
  addPlaylistInitiatedAction,
  addPlaylistCompletedAction,
  addPlaylistErrorAction,
  editPlaylistCompletedAction,
  editPlaylistErrorAction,
  addAudioToPlaylistErrorAction,
  addAudioToPlaylistCompletedAction,
  editPlaylistInitiatedAction,
  addAudioToPlaylistInitiatedAction,
  getPlaylistAudiosInitiatedAction,
  getPlaylistAudiosCompletedAction,
  getPlaylistAudiosErrorAction,
  removeAudioFromPlaylistInitiatedAction,
  removeAudioFromPlaylistCompletedAction,
  removeAudioFromPlaylistErrorAction,
} from "../slice/playlistSlice";
import {
  getUserPlaylists,
  createPlaylist,
  updatePlaylist,
  addTrackToPlaylist,
  getPlaylistTracks,
  removeTrackFromPlaylist,
} from "../../api/playlists";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { ResponsePayload } from "../../models/response";
import {
  AddPlaylistPayload,
  AddPlaylistAudioPayload,
  Playlist,
  PlaylistMap,
  PlaylistAudio,
  UpdatePlaylistPayload,
  PlaylistAudioMap,
} from "../../models/playlists";

function* fetchAllPlaylists(
  action: PayloadAction<{ userId: string }>
): Generator {
  try {
    const response = (yield call(
      getUserPlaylists,
      action.payload.userId
    )) as ResponsePayload<{
      allPlaylists: PlaylistMap;
    }>;
    yield put(getAllPlaylistsCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(getAllPlaylistsErrorAction({ error }));
  }
}

function* addNewPlaylist(
  action: PayloadAction<{ playlist: AddPlaylistPayload }>
): Generator {
  try {
    const response = (yield call(
      createPlaylist,
      action.payload.playlist
    )) as ResponsePayload<{
      playlist: Playlist;
    }>;
    yield put(addPlaylistCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(addPlaylistErrorAction({ error }));
  }
}

function* updateExistingPlaylist(
  action: PayloadAction<{ playlist: UpdatePlaylistPayload }>
): Generator {
  try {
    const response = (yield call(
      updatePlaylist,
      action.payload.playlist
    )) as ResponsePayload<{
      playlist: Playlist;
    }>;
    yield put(editPlaylistCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(editPlaylistErrorAction({ error }));
  }
}

function* fetchPlaylistAudios(
  action: PayloadAction<{
    playlistId: string;
  }>
): Generator {
  try {
    const response = (yield call(
      getPlaylistTracks,
      action.payload.playlistId
    )) as ResponsePayload<{
      playlistId: string;
      audios: PlaylistAudioMap;
    }>;
    yield put(getPlaylistAudiosCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(getPlaylistAudiosErrorAction({ error }));
  }
}

function* addingAudioToPlaylist(
  action: PayloadAction<AddPlaylistAudioPayload>
): Generator {
  try {
    const response = (yield call(
      addTrackToPlaylist,
      action.payload
    )) as ResponsePayload<{
      playlistId: string;
      audio: PlaylistAudio;
    }>;
    yield put(addAudioToPlaylistCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(addAudioToPlaylistErrorAction({ error }));
  }
}

function* removePlaylistAudio(
  action: PayloadAction<{
    playlistAudioId: string;
  }>
): Generator {
  try {
    const response = (yield call(
      removeTrackFromPlaylist,
      action.payload.playlistAudioId
    )) as ResponsePayload<{
      playlistAudioId: string;
    }>;
    yield put(removeAudioFromPlaylistCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(removeAudioFromPlaylistErrorAction({ error }));
  }
}

function* playlistSaga() {
  yield takeEvery(getAllPlaylistsInitiatedAction, fetchAllPlaylists);
  yield takeEvery(addPlaylistInitiatedAction, addNewPlaylist);
  yield takeEvery(editPlaylistInitiatedAction, updateExistingPlaylist);
  yield takeEvery(getPlaylistAudiosInitiatedAction, fetchPlaylistAudios);
  yield takeEvery(addAudioToPlaylistInitiatedAction, addingAudioToPlaylist);
  yield takeEvery(removeAudioFromPlaylistInitiatedAction, removePlaylistAudio);
}

export default playlistSaga;
