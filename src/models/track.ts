export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverImageUrl: string;
  audioUrl: string;
  duration: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type Tracks = Record<string, Track>;
export type TrackMap = Track[];

export type AddTrackPayload = {
  title: string;
  artist: string;
  album: string;
  coverImageUrl: string;
  audioUrl: string;
  duration: number;
  createdBy: string;
};

export type UpdateTrackPayload = AddTrackPayload & {
  id: string;
};
