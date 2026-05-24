import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllTracksInitiatedAction,
  getAllTracksCompletedAction,
  getAllTracksErrorAction,
  getTrackByIdInitiatedAction,
  getTrackByIdCompletedAction,
  getTrackByIdErrorAction,
  addTrackInitiatedAction,
  addTrackCompletedAction,
  addTrackErrorAction,
  editTrackCompletedAction,
  editTrackErrorAction,
  editTrackInitiatedAction,
  deleteTrackInitiatedAction,
  deleteTrackErrorAction,
  deleteTrackCompletedAction,
} from "../slice/trackSlice";
import {
  AddTrackPayload,
  UpdateTrackPayload,
  Track,
  TrackMap,
} from "../../models/track";
import {
  getAllTracks,
  getTrackById,
  createTrack,
  updateTrack,
  deleteTrack,
} from "../../api/track";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { ResponsePayload } from "../../models/response";

function* fetchAllTracks(): Generator {
  try {
    const response = (yield call(getAllTracks)) as ResponsePayload<{
      allTracks: TrackMap;
    }>;
    yield put(getAllTracksCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(getAllTracksErrorAction({ error }));
  }
}

function* addNewTrack(
  action: PayloadAction<{ track: AddTrackPayload }>
): Generator {
  try {
    const response = (yield call(
      createTrack,
      action.payload.track
    )) as ResponsePayload<{ track: Track }>;
    yield put(addTrackCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(addTrackErrorAction({ error }));
  }
}

function* fetchTrackById(
  action: PayloadAction<{ id: string }>
): Generator {
  try {
    const response = (yield call(
      getTrackById,
      action.payload.id
    )) as ResponsePayload<{ track: Track }>;
    yield put(getTrackByIdCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(getTrackByIdErrorAction({ error }));
  }
}

function* updateExistingTrack(
  action: PayloadAction<{ track: UpdateTrackPayload }>
): Generator {
  try {
    const response = (yield call(
      updateTrack,
      action.payload.track
    )) as ResponsePayload<{ track: Track }>;
    yield put(editTrackCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(editTrackErrorAction({ error }));
  }
}

function* deletingTrack(action: PayloadAction<string>): Generator {
  try {
    const response = (yield call(
      deleteTrack,
      action.payload
    )) as ResponsePayload<{
      id: string;
      message: string;
    }>;
    yield put(deleteTrackCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(deleteTrackErrorAction({ error }));
  }
}

function* trackSaga() {
  yield takeEvery(getAllTracksInitiatedAction, fetchAllTracks);
  yield takeEvery(getTrackByIdInitiatedAction, fetchTrackById);
  yield takeEvery(addTrackInitiatedAction, addNewTrack);
  yield takeEvery(editTrackInitiatedAction, updateExistingTrack);
  yield takeEvery(deleteTrackInitiatedAction, deletingTrack);
}

export default trackSaga;
