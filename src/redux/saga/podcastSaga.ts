import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllPodcastsInitiatedAction,
  getAllPodcastsCompletedAction,
  getAllPodcastsErrorAction,
  getPodcastByIdInitiatedAction,
  getPodcastByIdCompletedAction,
  getPodcastByIdErrorAction,
  addPodcastInitiatedAction,
  addPodcastCompletedAction,
  addPodcastErrorAction,
  editPodcastCompletedAction,
  editPodcastErrorAction,
  editPodcastInitiatedAction,
} from "../slice/podcastSlice";
import {
  AddPodcastPayload,
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

function* fetchAllPodcasts(): Generator {
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

function* addNewPodcast(
  action: PayloadAction<{ podcast: AddPodcastPayload }>
): Generator {
  try {
    const response = (yield call(
      createPodcast,
      action.payload.podcast
    )) as ResponsePayload<{
      podcast: Podcast;
    }>;
    yield put(addPodcastCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(addPodcastErrorAction({ error }));
  }
}

function* fetchPodcastById(
  action: PayloadAction<{ id: string }>
): Generator {
  try {
    const response = (yield call(
      getPodcastById,
      action.payload.id
    )) as ResponsePayload<{
      podcast: Podcast;
    }>;
    yield put(getPodcastByIdCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(getPodcastByIdErrorAction({ error }));
  }
}

function* updateExistingPodcast(
  action: PayloadAction<{ podcast: UpdatePodcastPayload }>
): Generator {
  try {
    const response = (yield call(
      updatePodcast,
      action.payload.podcast
    )) as ResponsePayload<{
      podcast: Podcast;
    }>;
    yield put(editPodcastCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(editPodcastErrorAction({ error }));
  }
}

function* podcastSaga() {
  yield takeEvery(getAllPodcastsInitiatedAction, fetchAllPodcasts);
  yield takeEvery(getPodcastByIdInitiatedAction, fetchPodcastById);
  yield takeEvery(addPodcastInitiatedAction, addNewPodcast);
  yield takeEvery(editPodcastInitiatedAction, updateExistingPodcast);
}

export default podcastSaga;
