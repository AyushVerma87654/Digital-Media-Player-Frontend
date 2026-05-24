import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getRecentlyPlaylistInitiatedAction,
  getRecentlyPlaylistCompletedAction,
  getRecentlyPlaylistErrorAction,
  addRecentlyPlayedInitiatedAction,
  addRecentlyPlayedCompletedAction,
  addRecentlyPlayedErrorAction,
} from "../slice/recentlyPlayedSlice";
import {
  AddRecentlyPlayedPayload,
  RecentlyPlayed,
  RecentlyPlayedMap,
} from "../../models/recentlyPlayed";
import { getRecentlyPlayed, addRecentlyPlayed } from "../../api/recentlyPlayed";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { ResponsePayload } from "../../models/response";

function* fetchAllRecentlyPlayed(
  action: PayloadAction<{ userId: string }>
): Generator {
  try {
    const response = (yield call(
      getRecentlyPlayed,
      action.payload.userId
    )) as ResponsePayload<{ items: RecentlyPlayedMap }>;
    yield put(getRecentlyPlaylistCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(getRecentlyPlaylistErrorAction({ error }));
  }
}

function* addRecentlyPlayedItem(
  action: PayloadAction<AddRecentlyPlayedPayload>
): Generator {
  try {
    const response = (yield call(
      addRecentlyPlayed,
      action.payload
    )) as ResponsePayload<{
      item: RecentlyPlayed;
    }>;
    yield put(addRecentlyPlayedCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(addRecentlyPlayedErrorAction({ error }));
  }
}

function* recentlyPlayedSaga() {
  yield takeEvery(getRecentlyPlaylistInitiatedAction, fetchAllRecentlyPlayed);
  yield takeEvery(addRecentlyPlayedInitiatedAction, addRecentlyPlayedItem);
}

export default recentlyPlayedSaga;
