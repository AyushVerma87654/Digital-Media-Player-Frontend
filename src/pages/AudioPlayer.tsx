import { FC, useEffect, useRef, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { useParams } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa";
import { formatDuration } from "../utils/formatDuration";
import Loading from "../components/Loading";
import { selectedTrackSelector } from "../redux/selectors/trackSelector";
import { selectedPodcastSelector } from "../redux/selectors/podcastSelector";
import { AudioContentType } from "../models/recentlyPlayed";
import { getTrackByIdInitiatedAction } from "../redux/slice/trackSlice";
import { getPodcastByIdInitiatedAction } from "../redux/slice/podcastSlice";
import { Track } from "../models/track";
import { Podcast } from "../models/podcast";
import { addRecentlyPlayedInitiatedAction } from "../redux/slice/recentlyPlayedSlice";
import { userSelector } from "../redux/selectors/userSelector";

interface AudioPlayerProps extends ReduxProps {}

const AudioPlayer: FC<AudioPlayerProps> = ({
  selectedTrack,
  selectedPodcast,
  fetchPodcastById,
  fetchTrackById,
  user,
  addToHistory,
}) => {
  const { type, id } = useParams<{
    type: AudioContentType;
    id: string;
  }>();

  const [audio, setAudio] = useState<Track | Podcast>();

  useEffect(() => {
    if (type === AudioContentType.PODCAST) {
      if (selectedPodcast && id === selectedPodcast.id)
        setAudio(selectedPodcast);
      id && fetchPodcastById({ id });
    } else {
      if (selectedTrack && id === selectedTrack.id) setAudio(selectedTrack);
      id && fetchTrackById({ id });
    }
  }, []);

  useEffect(() => {
    id &&
      type &&
      addToHistory({ contentId: id, contentType: type, userId: user.id });
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  if (!audio) return <Loading />;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <img
          src={audio.coverImageUrl}
          alt={audio.title}
          className="w-64 h-64 rounded-xl"
        />

        <h1 className="mt-6 text-2xl font-bold">{audio.title}</h1>
        {/* {audio?.album ? <p className="text-sm text-gray-500">{audio?.album}</p>} */}

        <button
          onClick={togglePlay}
          className="mt-6 w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <div className="w-full mt-6">
          <input
            type="range"
            min={0}
            max={audio.duration}
            value={currentTime}
            onChange={(e) => {
              if (!audioRef.current) return;
              const t = Number(e.target.value);
              audioRef.current.currentTime = t;
              setCurrentTime(t);
            }}
            className="w-full"
          />

          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatDuration(currentTime)}</span>
            <span>{formatDuration(audio.duration)}</span>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={audio.audioUrl}
          onTimeUpdate={() =>
            setCurrentTime(Math.floor(audioRef.current?.currentTime || 0))
          }
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedTrack: selectedTrackSelector(state),
  selectedPodcast: selectedPodcastSelector(state),
  user: userSelector(state),
});

const mapDispatchToProps = {
  fetchTrackById: getTrackByIdInitiatedAction,
  fetchPodcastById: getPodcastByIdInitiatedAction,
  addToHistory: addRecentlyPlayedInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AudioPlayer);
