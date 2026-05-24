import { AddRecentlyPlayedPayload } from "../models/recentlyPlayed";
import instance from "./axios";

// Get user history
export const getRecentlyPlayed = async (userId: string) =>
  instance.get(`/recently-played/${userId}`).then((res) => res.data);

// Add recently played item
export const addRecentlyPlayed = async (data: AddRecentlyPlayedPayload) =>
  instance.post("/recently-played", data).then((res) => res.data);
