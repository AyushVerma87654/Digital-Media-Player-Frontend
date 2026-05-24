import instance from "./axios";
import {
  AddPlaylistAudioPayload,
  AddPlaylistPayload,
  UpdatePlaylistPayload,
} from "../models/playlists";

// Get logged-in user's playlists
export const getUserPlaylists = async (userId: string) =>
  instance.get(`/playlists/${userId}`).then((res) => res.data);

// Get playlist by ID
export const getPlaylistById = async (id: string) =>
  instance.get(`/playlists/${id}`).then((res) => res.data);

// Create playlist
export const createPlaylist = async (playlist: AddPlaylistPayload) =>
  instance.post("/playlists", { playlist }).then((res) => res.data);

// Update playlist
export const updatePlaylist = async (data: UpdatePlaylistPayload) =>
  instance.put(`/playlists/${data.id}`, data).then((res) => res.data);

// Delete playlist
export const deletePlaylist = async (id: string) =>
  instance.delete(`/playlists/${id}`).then((res) => res.data);

// Playlist tracks
export const getPlaylistTracks = async (playlistId: string) =>
  instance.get(`/playlists/${playlistId}/tracks`).then((res) => res.data);

export const addTrackToPlaylist = async (data: AddPlaylistAudioPayload) =>
  instance
    .post(`/playlists/${data.playlistId}/tracks`, {
      audio: data,
    })
    .then((res) => res.data);

export const removeTrackFromPlaylist = async (playlistTrackId: string) =>
  instance
    .delete(`/playlists/tracks/${playlistTrackId}`)
    .then((res) => res.data);
