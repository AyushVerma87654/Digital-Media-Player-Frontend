import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllPodcastsInitiatedAction,
  getAllPodcastsCompletedAction,
  getAllPodcastsErrorAction,
  getPodcastByIdInitiatedAction,
  getPodcastByIdCompletedAction,
  getPodcastByIdErrorAction,
  createPodcastInitiatedAction,
  createPodcastCompletedAction,
  createPodcastErrorAction,
  updatePodcastCompletedAction,
  updatePodcastErrorAction,
  updatePodcastInitiatedAction,
} from "../slice/podcastSlice";
import {
  CreatePodcastPayload,
  UpdatePodcastPayload,
  Podcast,
  PodcastMap,
} from "../../models/podcast";
import {
  getAllPodcasts,
  getPodcastById,
  createPodcast,
  updatePodcast,
} from "../../api/podcast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { ResponsePayload } from "../../models/response";

function* fetchAllPodcastsSaga(): Generator {
  try {
    const response = (yield call(getAllPodcasts)) as ResponsePayload<{
      allPodcasts: PodcastMap;
    }>;
    yield put(getAllPodcastsCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(getAllPodcastsErrorAction({ error }));
  }
}

function* createPodcastSaga(
  action: PayloadAction<{ podcast: CreatePodcastPayload }>,
): Generator {
  try {
    const response = (yield call(
      createPodcast,
      action.payload.podcast,
    )) as ResponsePayload<{
      podcast: Podcast;
    }>;
    yield put(createPodcastCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(createPodcastErrorAction({ error }));
  }
}

function* fetchPodcastByIdSaga(
  action: PayloadAction<{ id: string }>,
): Generator {
  try {
    const response = (yield call(
      getPodcastById,
      action.payload.id,
    )) as ResponsePayload<{
      podcast: Podcast;
    }>;
    yield put(getPodcastByIdCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(getPodcastByIdErrorAction({ error }));
  }
}

function* updatePodcastSaga(
  action: PayloadAction<{ podcast: UpdatePodcastPayload }>,
): Generator {
  try {
    const response = (yield call(
      updatePodcast,
      action.payload.podcast,
    )) as ResponsePayload<{
      podcast: Podcast;
    }>;
    yield put(updatePodcastCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(updatePodcastErrorAction({ error }));
  }
}

function* podcastSaga() {
  yield takeEvery(getAllPodcastsInitiatedAction, fetchAllPodcastsSaga);
  yield takeEvery(getPodcastByIdInitiatedAction, fetchPodcastByIdSaga);
  yield takeEvery(createPodcastInitiatedAction, createPodcastSaga);
  yield takeEvery(updatePodcastInitiatedAction, updatePodcastSaga);
}

export default podcastSaga;
