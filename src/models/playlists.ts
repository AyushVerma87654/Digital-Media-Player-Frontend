import { AudioContentType } from "./recentlyPlayed";

/* -------------------- Playlist -------------------- */
export type Playlist = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  isPublic: boolean;
  contentType: AudioContentType;
  createdAt: string;
  updatedAt: string;
};

export type Playlists = Record<string, Playlist>;
export type PlaylistMap = Playlist[];

/* ---------- Payloads ---------- */
export type AddPlaylistPayload = {
  title: string;
  userId: string;
  description?: string;
  isPublic: boolean;
  contentType: AudioContentType;
};

export type UpdatePlaylistPayload = AddPlaylistPayload & {
  id: string;
};

/* -------------------- PlaylistAudio (generic) -------------------- */
export type PlaylistAudio = {
  id: string; // unique id for playlist-audio mapping
  playlistId: string;
  audioId: string; // id of track, podcast, etc
  contentType: AudioContentType;
  addedAt: string;
};

export type PlaylistAudios = Record<string, PlaylistAudio[]>; // group by playlistId
export type PlaylistAudioMap = PlaylistAudio[];

/* ---------- Payloads ---------- */
export type AddPlaylistAudioPayload = {
  playlistId: string;
  audioId: string;
};

export type RemovePlaylistAudioPayload = AddPlaylistAudioPayload;
