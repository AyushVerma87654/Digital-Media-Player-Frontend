import { MediaEditorValues } from "../models/mediaEditor";
import { AddPodcastPayload, UpdatePodcastPayload } from "../models/podcast";
import { AddTrackPayload, UpdateTrackPayload } from "../models/track";

export const buildCreateTrackPayload = (
  values: MediaEditorValues,
  userId: string,
): AddTrackPayload => {
  if (!values.artist || !values.album) {
    throw new Error("Artist and Album is required");
  }

  return {
    title: values.title,
    artist: values.artist,
    album: values.album,
    coverImageUrl: values.coverImageUrl!,
    audioUrl: values.audioUrl,
    duration: values.duration!,
    createdBy: userId,
  };
};

export const buildEditTrackPayload = (
  values: MediaEditorValues,
  id: string,
  userId: string,
): UpdateTrackPayload => {
  if (!values.artist || !values.album) {
    throw new Error("Artist and Album is required");
  }

  return {
    id,
    title: values.title,
    artist: values.artist,
    album: values.album,
    coverImageUrl: values.coverImageUrl,
    audioUrl: values.audioUrl,
    duration: values.duration,
    createdBy: userId,
  };
};

export const buildCreatePodcastPayload = (
  values: MediaEditorValues,
  userId: string,
): AddPodcastPayload => {
  if (!values.author || !values.episodeTitle || !values.description) {
    throw new Error("Author, description and episode title are required");
  }

  return {
    title: values.title,
    author: values.author,
    description: values.description,
    coverImageUrl: values.coverImageUrl,
    audioUrl: values.audioUrl,
    episodeTitle: values.episodeTitle,
    episodeNumber: values.episodeNumber,
    duration: values.duration,
    createdBy: userId,
  };
};

export const buildEditPodcastPayload = (
  values: MediaEditorValues,
  id: string,
  userId: string,
): UpdatePodcastPayload => {
  if (!values.author || !values.episodeTitle || !values.description) {
    throw new Error("Author, description and episode title are required");
  }

  return {
    id,
    title: values.title,
    author: values.author,
    description: values.description,
    coverImageUrl: values.coverImageUrl,
    audioUrl: values.audioUrl,
    episodeTitle: values.episodeTitle,
    episodeNumber: values.episodeNumber,
    duration: values.duration,
    createdBy: userId,
  };
};
