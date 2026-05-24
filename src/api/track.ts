import { AddTrackPayload, UpdateTrackPayload } from "../models/track";
import instance from "./axios";

// Get all tracks
export const getAllTracks = async () =>
  instance.get("/tracks").then((res) => res.data);

// Get track by ID
export const getTrackById = async (id: string) =>
  instance.get(`/tracks/${id}`).then((res) => res.data);

// Admin only
export const createTrack = async (track: AddTrackPayload) =>
  instance.post("/tracks", { track }).then((res) => res.data);

// Admin only
export const updateTrack = async (data: UpdateTrackPayload) =>
  instance.put(`/tracks/${data.id}`, data).then((res) => res.data);

// Admin only
export const deleteTrack = async (id: string) =>
  instance.delete(`/tracks/${id}`).then((res) => res.data);
