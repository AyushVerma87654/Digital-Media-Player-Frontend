import { Podcast } from "./podcast";
import { Track } from "./track";

export enum AudioContentType {
  TRACK = "track",
  PODCAST = "podcast",
}

export type RecentlyPlayed = {
  id: string;
  userId: string;
  contentType: AudioContentType;
  contentId: string;
  lastPlayedPosition: number;
  createdAt: string;
  updatedAt: string;
  content: Track | Podcast;
};

export type RecentlyPlayedItems = Record<string, RecentlyPlayed>;
export type RecentlyPlayedMap = RecentlyPlayed[];

export type AddRecentlyPlayedPayload = {
  contentType: AudioContentType;
  contentId: string;
  userId: string;
};
