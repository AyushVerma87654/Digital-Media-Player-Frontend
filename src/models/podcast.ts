export type Podcast = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImageUrl: string;
  audioUrl: string;
  episodeTitle: string;
  episodeNumber?: number;
  duration: number;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
};

export type Podcasts = Record<string, Podcast>;
export type PodcastMap = Podcast[];

export type CreatePodcastPayload = {
  title: string;
  author: string;
  description: string;
  coverImageUrl: string;
  audioUrl: string;
  episodeTitle: string;
  episodeNumber?: number;
  duration: number;
  createdBy: string;
};

export type UpdatePodcastPayload = CreatePodcastPayload & {
  id: string;
};
