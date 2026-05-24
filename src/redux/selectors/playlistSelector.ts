import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const playlistStateSelector = (state: AppState) => state.playlist;

/* ---------- Playlists ---------- */
export const allPlaylistsSelector = createSelector(
  [playlistStateSelector],
  (state) => state.allPlaylists,
);

export const allPlaylistsMapSelector = createSelector(
  [allPlaylistsSelector],
  (playlists) => Object.values(playlists),
);

export const selectedPlaylistIdSelector = createSelector(
  [playlistStateSelector],
  (state) => state.selectedPlaylistId,
);

export const selectedPlaylistSelector = createSelector(
  [allPlaylistsSelector, selectedPlaylistIdSelector],
  (playlists, selectedId) => (selectedId ? playlists[selectedId] : undefined),
);

export const selectedPlaylistAudioTypeSelector = createSelector(
  [selectedPlaylistSelector],
  (selectedPlaylist) => selectedPlaylist?.contentType,
);

/* ---------- Playlist Audios ---------- */
export const selectedPlaylistAudioIdSelector = createSelector(
  [playlistStateSelector],
  (state) => state.selectedPlaylistAudioId,
);

export const playlistAudiosEntitySelector = createSelector(
  [playlistStateSelector],
  (state) => state.playlistAudios,
);

export const playlistWithAudiosSelector = (playlistId: string) =>
  createSelector(
    [allPlaylistsSelector, playlistAudiosEntitySelector],
    (playlists, audiosEntity) => {
      const playlist = playlists[playlistId];
      const audios = playlist ? audiosEntity[playlistId] || [] : [];
      return playlist ? { ...playlist, audios } : undefined;
    },
  );

export const selectedPlaylistAudiosSelector = createSelector(
  [playlistAudiosEntitySelector, selectedPlaylistIdSelector],
  (audiosEntity, playlistId) =>
    playlistId ? audiosEntity[playlistId] || [] : [],
);

export const selectedPlaylistWithAudiosSelector = createSelector(
  [selectedPlaylistSelector, selectedPlaylistAudiosSelector],
  (selectedPlaylist, selectedPlaylistAudios) =>
    selectedPlaylist
      ? { ...selectedPlaylist, audios: selectedPlaylistAudios }
      : undefined,
);

/* ---------- UI state ---------- */
export const playlistLoadingSelector = createSelector(
  [playlistStateSelector],
  (state) => state.loading,
);

export const playlistMessageSelector = createSelector(
  [playlistStateSelector],
  (state) => state.message,
);
