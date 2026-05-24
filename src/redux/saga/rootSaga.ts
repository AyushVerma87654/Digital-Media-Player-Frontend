import { all, fork } from "redux-saga/effects";

import userSaga from "./userSaga";
import trackSaga from "./trackSaga";
import podcastSaga from "./podcastSaga";
import playlistSaga from "./playlistSaga";
import recentlyPlayedSaga from "./recentlyPlayedSaga";
import uploadSaga from "./uploadSaga";

function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(trackSaga),
    fork(podcastSaga),
    fork(playlistSaga),
    fork(recentlyPlayedSaga),
    fork(uploadSaga),
  ]);
}

export default rootSaga;
