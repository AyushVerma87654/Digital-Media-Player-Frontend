import { FC, useEffect, useMemo, useRef, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiGlobe,
  FiHash,
  FiLock,
  FiMove,
  FiMusic,
  FiPlay,
  FiPlus,
} from "react-icons/fi";
import Button from "../components/Button";
import AddAudioToPlaylistModal from "../components/AddAudioToPlaylistModal";
import { PlaylistAudio } from "../models/playlists";
import { Podcast } from "../models/podcast";
import { AudioContentType } from "../models/recentlyPlayed";
import { Track } from "../models/track";
import {
  selectedPlaylistAudioIdSelector,
  selectedPlaylistAudiosSelector,
  selectedPlaylistSelector,
} from "../redux/selectors/playlistSelector";
import { allPodcastsSelector } from "../redux/selectors/podcastSelector";
import { allTracksSelector } from "../redux/selectors/trackSelector";
import { isLoggedInSelector } from "../redux/selectors/userSelector";
import { getPodcastByIdInitiatedAction } from "../redux/slice/podcastSlice";
import {
  getPlaylistAudiosInitiatedAction,
  setSelectedPlaylistAudioIdAction,
  setSelectedPlaylistIdAction,
} from "../redux/slice/playlistSlice";
import { getTrackByIdInitiatedAction } from "../redux/slice/trackSlice";
import { AppState } from "../redux/store";
import { formatDuration } from "../utils/formatDuration";

type AudioDetails = Track | Podcast;
type PlaylistAudioWithDetails = PlaylistAudio & {
  audioDetails?: AudioDetails;
};

interface PlaylistDetailPageProps extends ReduxProps {}

const PlaylistDetailPage: FC<PlaylistDetailPageProps> = ({
  playlist,
  audios,
  selectedPlaylistAudioId,
  fetchAudios,
  setSelectedPlaylistId,
  setSelectedPlaylistAudioId,
  fetchTrackById,
  fetchPodcastById,
  isLoggedIn,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [localAudios, setLocalAudios] =
    useState<PlaylistAudioWithDetails[]>(audios);
  const [modalOpen, setModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const requestedAudioDetailsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    setLocalAudios(audios);
  }, [audios]);

  useEffect(() => {
    if (!id || !isLoggedIn) return;
    requestedAudioDetailsRef.current.clear();
    setSelectedPlaylistId(id);
    fetchAudios({ playlistId: id });
  }, [id, isLoggedIn, setSelectedPlaylistId, fetchAudios]);

  useEffect(() => {
    if (!playlist) return;

    localAudios.forEach((playlistAudio) => {
      if (playlistAudio.audioDetails) return;
      if (requestedAudioDetailsRef.current.has(playlistAudio.audioId)) return;

      requestedAudioDetailsRef.current.add(playlistAudio.audioId);
      if (playlist.contentType === AudioContentType.TRACK) {
        fetchTrackById({ id: playlistAudio.audioId });
        return;
      }
      fetchPodcastById({ id: playlistAudio.audioId });
    });
  }, [playlist, localAudios, fetchTrackById, fetchPodcastById]);

  const selectedAudio = useMemo(
    () =>
      localAudios.find(
        (playlistAudio) => playlistAudio.audioId === selectedPlaylistAudioId,
      )?.audioDetails,
    [localAudios, selectedPlaylistAudioId],
  );

  useEffect(() => {
    if (!audioRef.current || !selectedAudio?.audioUrl) return;
    const playPromise = audioRef.current.play();
    if (playPromise) playPromise.catch(() => undefined);
  }, [selectedAudio]);

  function moveAudio(from: number, to: number) {
    if (from === to) return;
    const updated = [...localAudios];
    const [item] = updated.splice(from, 1);
    updated.splice(to, 0, item);
    setLocalAudios(updated);
  }

  function playAudio(audioId: string) {
    setSelectedPlaylistAudioId(audioId);
  }

  function playAll() {
    if (!localAudios.length) return;
    playAudio(localAudios[0].audioId);
  }

  function playNextAudio() {
    if (!selectedPlaylistAudioId) return;
    const currentIndex = localAudios.findIndex(
      (playlistAudio) => playlistAudio.audioId === selectedPlaylistAudioId,
    );
    if (currentIndex < 0) return;
    const nextAudio = localAudios[currentIndex + 1];
    if (!nextAudio) return;
    playAudio(nextAudio.audioId);
  }

  const contentTypeLabel = useMemo(() => {
    if (!playlist) return "Content";
    return playlist.contentType === AudioContentType.TRACK
      ? "Tracks"
      : "Podcasts";
  }, [playlist]);

  const totalDurationLabel = useMemo(() => {
    const totalSeconds = localAudios.reduce((sum, playlistAudio) => {
      const duration = Number(playlistAudio.audioDetails?.duration || 0);
      return Number.isFinite(duration) ? sum + duration : sum;
    }, 0);
    return formatDuration(totalSeconds);
  }, [localAudios]);

  const createdOnLabel = useMemo(() => {
    if (!playlist?.createdAt) return "--";
    return new Date(playlist.createdAt).toLocaleDateString();
  }, [playlist?.createdAt]);

  if (!id) return null;

  if (!playlist) {
    return (
      <div className="bg-linear-to-br from-zinc-50 via-orange-50 to-amber-100 px-4 py-8 md:px-8">
        <div className="mx-auto w-full max-w-6xl animate-pulse rounded-3xl border border-orange-200 bg-white/80 p-8 shadow-sm">
          <div className="h-4 w-40 rounded bg-orange-200" />
          <div className="mt-4 h-9 w-2/3 rounded bg-orange-300" />
          <div className="mt-6 h-4 w-full rounded bg-orange-200" />
          <div className="mt-2 h-4 w-5/6 rounded bg-orange-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-zinc-100 via-orange-50 to-amber-200 px-4 py-6 text-zinc-900 sm:px-6 md:px-10 md:py-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <section className="relative overflow-hidden rounded-3xl border border-orange-200 bg-white/90 p-6 shadow-lg sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-200/50 blur-2xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-amber-200/40 blur-2xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
                Playlist Overview
              </p>
              <h1 className="mt-3 pb-1 truncate text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
                {playlist.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-700 sm:text-base">
                {playlist.description || "No description added yet."}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-700">
                  {playlist.isPublic ? <FiGlobe /> : <FiLock />}
                  {playlist.isPublic ? "Public Playlist" : "Private Playlist"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-orange-300 bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-800">
                  <FiMusic />
                  {contentTypeLabel}
                </span>
              </div>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-3 lg:max-w-md">
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Items
                </p>
                <p className="mt-1 text-2xl font-black text-zinc-900">
                  {localAudios.length}
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Estimated Time
                </p>
                <p className="mt-1 text-2xl font-black text-zinc-900">
                  {totalDurationLabel}
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Created
                </p>
                <p className="mt-1 text-2xl font-black text-zinc-900">
                  {createdOnLabel}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white/95 p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 font-semibold text-zinc-700">
                <FiHash />
                {localAudios.length} items
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 font-semibold text-zinc-700">
                <FiCalendar />
                Updated {new Date(playlist.updatedAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex w-full gap-2 sm:w-auto">
              <Button
                onClick={() => navigate("/playlists")}
                className="h-10 w-full rounded-xl bg-zinc-200 text-zinc-800 hover:bg-zinc-300 sm:w-auto"
              >
                Back
              </Button>
              <Button
                onClick={playAll}
                disabled={localAudios.length === 0}
                className="h-10 w-full gap-2 rounded-xl sm:w-auto"
              >
                <FiPlay />
                Play All
              </Button>
              <Button
                onClick={() => setModalOpen(true)}
                className="h-10 w-full gap-2 rounded-xl sm:w-auto"
              >
                <FiPlus />
                Add {contentTypeLabel}
              </Button>
            </div>
          </div>

          {selectedPlaylistAudioId && (
            <div className="mb-5 rounded-2xl border border-orange-200 bg-orange-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">
                Now Playing
              </p>
              <p className="mt-1 text-sm font-bold text-zinc-900">
                {selectedAudio
                  ? selectedAudio.title
                  : "Fetching audio details..."}
              </p>
              <audio
                ref={audioRef}
                controls
                autoPlay
                onEnded={playNextAudio}
                className="mt-3 w-full"
                src={selectedAudio?.audioUrl || ""}
              />
            </div>
          )}

          {localAudios.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center">
              <p className="text-lg font-bold text-zinc-900">
                No {contentTypeLabel.toLowerCase()} in this playlist
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                Click add to start building this collection.
              </p>
              <div className="mx-auto mt-5 w-full max-w-xs">
                <Button
                  onClick={() => setModalOpen(true)}
                  className="h-10 gap-2 rounded-xl"
                >
                  <FiPlus />
                  Add {contentTypeLabel}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {localAudios.map((playlistAudio, index) => (
                <div
                  key={playlistAudio.id}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("audio-index", index.toString())
                  }
                  onDrop={(e) => {
                    const from = Number(e.dataTransfer.getData("audio-index"));
                    moveAudio(from, index);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  className={
                    "group rounded-2xl border bg-zinc-50/70 p-4 transition hover:border-orange-300 hover:bg-orange-50 " +
                    (selectedPlaylistAudioId === playlistAudio.audioId
                      ? "border-orange-400"
                      : "border-zinc-200")
                  }
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        {contentTypeLabel === "Tracks" ? "Track" : "Podcast"} #
                        {index + 1}
                      </p>
                      <p className="mt-1 truncate text-sm font-bold text-zinc-900 sm:text-base">
                        {playlistAudio.audioDetails?.title ||
                          playlistAudio.audioId}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-zinc-600">
                        <FiClock />
                        Added{" "}
                        {new Date(playlistAudio.addedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        title="Play this audio"
                        onClick={() => playAudio(playlistAudio.audioId)}
                        className="h-auto w-auto gap-2 rounded-xl px-4 py-2 text-xs"
                      >
                        <FiPlay />
                        {selectedPlaylistAudioId === playlistAudio.audioId &&
                        !selectedAudio
                          ? "Loading..."
                          : "Play"}
                      </Button>
                      <button
                        type="button"
                        title="Drag to reorder"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 transition group-hover:border-orange-300 group-hover:text-orange-700"
                      >
                        <FiMove />
                        Drag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {modalOpen && (
        <AddAudioToPlaylistModal
          playlistId={playlist.id}
          contentType={playlist.contentType}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  const selectedPlaylistAudioId = selectedPlaylistAudioIdSelector(state);
  const playlist = selectedPlaylistSelector(state);
  const allTracks = allTracksSelector(state);
  const allPodcasts = allPodcastsSelector(state);
  const audios = selectedPlaylistAudiosSelector(state).map((playlistAudio) => ({
    ...playlistAudio,
    audioDetails:
      playlist?.contentType === AudioContentType.TRACK
        ? allTracks[playlistAudio.audioId]
        : playlist?.contentType === AudioContentType.PODCAST
          ? allPodcasts[playlistAudio.audioId]
          : allTracks[playlistAudio.audioId] ||
            allPodcasts[playlistAudio.audioId],
  }));

  return {
    playlist,
    audios,
    selectedPlaylistAudioId,
    isLoggedIn: isLoggedInSelector(state),
  };
};

const mapDispatchToProps = {
  fetchAudios: getPlaylistAudiosInitiatedAction,
  setSelectedPlaylistId: setSelectedPlaylistIdAction,
  setSelectedPlaylistAudioId: setSelectedPlaylistAudioIdAction,
  fetchTrackById: getTrackByIdInitiatedAction,
  fetchPodcastById: getPodcastByIdInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(PlaylistDetailPage);
