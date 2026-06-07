import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllTracksInitiatedAction,
  getAllTracksCompletedAction,
  getAllTracksErrorAction,
  getTrackByIdInitiatedAction,
  getTrackByIdCompletedAction,
  getTrackByIdErrorAction,
  createTrackInitiatedAction,
  createTrackCompletedAction,
  createTrackErrorAction,
  updateTrackCompletedAction,
  updateTrackErrorAction,
  updateTrackInitiatedAction,
  deleteTrackInitiatedAction,
  deleteTrackErrorAction,
  deleteTrackCompletedAction,
} from "../slice/trackSlice";
import {
  CreateTrackPayload,
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

function* fetchAllTracksSaga(): Generator {
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

function* createTrackSaga(
  action: PayloadAction<{ track: CreateTrackPayload }>,
): Generator {
  try {
    const response = (yield call(
      createTrack,
      action.payload.track,
    )) as ResponsePayload<{ track: Track }>;
    yield put(createTrackCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(createTrackErrorAction({ error }));
  }
}

function* fetchTrackByIdSaga(action: PayloadAction<{ id: string }>): Generator {
  try {
    const response = (yield call(
      getTrackById,
      action.payload.id,
    )) as ResponsePayload<{ track: Track }>;
    yield put(getTrackByIdCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(getTrackByIdErrorAction({ error }));
  }
}

function* updateTrackSaga(
  action: PayloadAction<{ track: UpdateTrackPayload }>,
): Generator {
  try {
    const response = (yield call(
      updateTrack,
      action.payload.track,
    )) as ResponsePayload<{ track: Track }>;
    yield put(updateTrackCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(updateTrackErrorAction({ error }));
  }
}

function* deleteTrackSaga(action: PayloadAction<string>): Generator {
  try {
    const response = (yield call(
      deleteTrack,
      action.payload,
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
  yield takeEvery(getAllTracksInitiatedAction, fetchAllTracksSaga);
  yield takeEvery(getTrackByIdInitiatedAction, fetchTrackByIdSaga);
  yield takeEvery(createTrackInitiatedAction, createTrackSaga);
  yield takeEvery(updateTrackInitiatedAction, updateTrackSaga);
  yield takeEvery(deleteTrackInitiatedAction, deleteTrackSaga);
}

export default trackSaga;
