import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { ResponsePayload } from "../../models/response";
import {
  uploadAudioCompletedAction,
  uploadAudioErrorAction,
  uploadAudioInitiatedAction,
  uploadCoverImageCompletedAction,
  uploadCoverImageErrorAction,
  uploadCoverImageInitiatedAction,
} from "../slice/uploadSlice";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { audioUpload, imageUpload } from "../../api/upload";

function* uploadCoverImage(action: PayloadAction<{ file: File }>): Generator {
  try {
    const response = (yield call(
      imageUpload,
      action.payload.file
    )) as ResponsePayload<{
      coverImageUrl: string;
    }>;
    yield put(uploadCoverImageCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(uploadCoverImageErrorAction({ error }));
  }
}

function* uploadAudio(action: PayloadAction<{ file: File }>): Generator {
  try {
    const response = (yield call(
      audioUpload,
      action.payload.file
    )) as ResponsePayload<{
      audioUrl: string;
    }>;
    yield put(uploadAudioCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(uploadAudioErrorAction({ error }));
  }
}

function* uploadSaga() {
  yield takeEvery(uploadCoverImageInitiatedAction, uploadCoverImage);
  yield takeEvery(uploadAudioInitiatedAction, uploadAudio);
}

export default uploadSaga;
