import { CreatePodcastPayload, UpdatePodcastPayload } from "../models/podcast";
import instance from "./axios";

// Public
export const getAllPodcasts = async () =>
  instance.get("/podcasts").then((res) => res.data);

export const getPodcastById = async (id: string) =>
  instance.get(`/podcasts/${id}`).then((res) => res.data);

export const getPodcastEpisodes = async (groupId: string) =>
  instance.get(`/podcasts/${groupId}/episodes`).then((res) => res.data);

// Admin only
export const createPodcast = async (podcast: CreatePodcastPayload) =>
  instance.post("/podcasts", { podcast }).then((res) => res.data);

// Admin only
export const updatePodcast = async (data: UpdatePodcastPayload) =>
  instance.put(`/podcasts/${data.id}`, data).then((res) => res.data);

// Admin only
export const deletePodcast = async (id: string) =>
  instance.delete(`/podcasts/${id}`).then((res) => res.data);
