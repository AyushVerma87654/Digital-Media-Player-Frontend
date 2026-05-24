import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";

import userReducer from "./slice/userSlice";
import trackReducer from "./slice/trackSlice";
import podcastReducer from "./slice/podcastSlice";
import playlistReducer from "./slice/playlistSlice";
import recentlyPlayedReducer from "./slice/recentlyPlayedSlice";
import uploadReducer from "./slice/uploadSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    track: trackReducer,
    podcast: podcastReducer,
    playlist: playlistReducer,
    recentlyPlayed: recentlyPlayedReducer,
    upload: uploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;

export default store;
