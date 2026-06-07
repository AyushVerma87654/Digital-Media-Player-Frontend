import { FC, useEffect, useMemo, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { createPortal } from "react-dom";
import Button from "./Button";
import Input from "./Input";
import { AppState } from "../redux/store";
import { selectedPlaylistWithAudiosSelector } from "../redux/selectors/playlistSelector";
import { addAudioToPlaylistInitiatedAction } from "../redux/slice/playlistSlice";
import { AudioContentType } from "../models/recentlyPlayed";
import { allTracksMapSelector } from "../redux/selectors/trackSelector";
import { allPodcastsMapSelector } from "../redux/selectors/podcastSelector";
import { getAllTracksInitiatedAction } from "../redux/slice/trackSlice";
import { getAllPodcastsInitiatedAction } from "../redux/slice/podcastSlice";

interface AddMediaToPlaylistModalProps extends ReduxProps {
  playlistId: string;
  contentType: AudioContentType;
  onClose: () => void;
}

const AddMediaToPlaylistModal: FC<AddMediaToPlaylistModalProps> = ({
  playlistId,
  contentType,
  onClose,
  allTracks,
  allPodcasts,
  selectedPlaylist,
  fetchTracks,
  fetchPodcasts,
  addAudioToPlaylist,
}) => {
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  /* Fetch content based on type */
  useEffect(() => {
    if (contentType === AudioContentType.TRACK) {
      fetchTracks();
    } else {
      fetchPodcasts();
    }
  }, [contentType]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mounted, onClose]);

  const { items, existingIds, titleLabel } = useMemo(() => {
    if (contentType === AudioContentType.TRACK) {
      return {
        items: allTracks,
        existingIds: new Set(selectedPlaylist?.audios.map((t) => t.audioId)),
        titleLabel: "Add tracks",
        subtitleLabel: "artist",
      };
    }

    return {
      items: allPodcasts,
      existingIds: new Set(selectedPlaylist?.audios.map((p) => p.audioId)),
      titleLabel: "Add podcasts",
      subtitleLabel: "publisher",
    };
  }, [contentType, allTracks, allPodcasts, selectedPlaylist]);

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase();
    return items.filter((item) => item.title.toLowerCase().includes(q));
  }, [items, query]);

  //   function handleAdd(id: string) {
  //     setPending(id); // only one selection at a time
  //   }

  function handleAdd(audioId: string) {
    console.log("audioId", audioId);
    addAudioToPlaylist({
      playlistId,
      audioId,
    });
  }

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-100 bg-black/70 p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={titleLabel}
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-xl bg-gray-900 p-6"
          onClick={(event) => event.stopPropagation()}
        >
          {/* Header */}
          <h2 className="mb-4 text-lg font-semibold text-white">
            {titleLabel}
          </h2>

          {/* Search */}
          <Input
            placeholder={`Search ${contentType}s`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-4 bg-gray-800 border-gray-700 text-white"
          />

          {/* List */}
          <div className="flex-1 space-y-2 overflow-y-auto">
            {filteredItems.map((item) => {
              const isAdded = existingIds.has(item.id);

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-gray-800 p-3 hover:bg-gray-700"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                  </div>

                  <div>
                    <Button
                      disabled={isAdded}
                      onClick={() => handleAdd(item.id)}
                    >
                      {isAdded ? "Added" : "Add"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-end">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-700 w-24!"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

const mapState = (state: AppState) => ({
  allTracks: allTracksMapSelector(state),
  allPodcasts: allPodcastsMapSelector(state),
  selectedPlaylist: selectedPlaylistWithAudiosSelector(state),
});

const mapDispatch = {
  fetchTracks: getAllTracksInitiatedAction,
  fetchPodcasts: getAllPodcastsInitiatedAction,
  addAudioToPlaylist: addAudioToPlaylistInitiatedAction,
};

const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AddMediaToPlaylistModal);
