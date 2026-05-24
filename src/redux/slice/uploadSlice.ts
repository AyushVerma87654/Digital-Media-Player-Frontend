import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UploadState = {
  imageUrl: string;
  audioUrl: string;
  loading: {
    image: boolean;
    audio: boolean;
  };
  message: string;
};

const initialState: UploadState = {
  imageUrl: "",
  audioUrl: "",
  loading: {
    image: false,
    audio: false,
  },
  message: "",
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    uploadCoverImageInitiated,
    uploadCoverImageCompleted,
    uploadCoverImageError,
    uploadAudioInitiated,
    uploadAudioCompleted,
    uploadAudioError,
  },
});

const { actions, reducer: uploadReducer } = uploadSlice;

export const {
  uploadCoverImageInitiated: uploadCoverImageInitiatedAction,
  uploadCoverImageCompleted: uploadCoverImageCompletedAction,
  uploadCoverImageError: uploadCoverImageErrorAction,
  uploadAudioInitiated: uploadAudioInitiatedAction,
  uploadAudioCompleted: uploadAudioCompletedAction,
  uploadAudioError: uploadAudioErrorAction,
} = actions;

export default uploadReducer;

function uploadCoverImageInitiated(
  state: UploadState,
  _action: PayloadAction<{ file: File }>
) {
  state.loading.image = true;
}

function uploadCoverImageCompleted(
  state: UploadState,
  action: PayloadAction<{ coverImageUrl: string }>
) {
  state.imageUrl = action.payload.coverImageUrl;
  state.loading.image = false;
}

function uploadCoverImageError(
  state: UploadState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading.image = false;
}

function uploadAudioInitiated(
  state: UploadState,
  _action: PayloadAction<{ file: File }>
) {
  state.loading.audio = true;
}

function uploadAudioCompleted(
  state: UploadState,
  action: PayloadAction<{ audioUrl: string }>
) {
  state.audioUrl = action.payload.audioUrl;
  state.loading.audio = false;
}

function uploadAudioError(
  state: UploadState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading.audio = false;
}
