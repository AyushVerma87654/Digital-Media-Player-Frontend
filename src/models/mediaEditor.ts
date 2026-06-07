export interface MediaEditorValues {
  title: string;
  coverImageUrl: string;
  audioUrl: string;
  duration: number;

  // track
  artist?: string;
  album?: string;

  // podcast
  author?: string;
  description?: string;
  episodeTitle?: string;
  episodeNumber?: number;
}
