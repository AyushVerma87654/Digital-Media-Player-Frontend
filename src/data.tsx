import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { useParams } from "react-router-dom";
import {
  selectedPlaylistAudiosSelector,
  selectedPlaylistSelector,
} from "../redux/selectors/playlistSelector";
import { formatDuration } from "../utils/formatDuration";
import Button from "../components/Button";
import { getPlaylistAudiosInitiatedAction } from "../redux/slice/playlistSlice";
import { AudioContentType } from "../models/recentlyPlayed";
import AddAudioToPlaylistModal from "../components/AddAudioToPlaylistModal";

interface PlaylistDetailPageProps extends ReduxProps {}

const PlaylistDetailPage: FC<PlaylistDetailPageProps> = ({
  playlist,
  audios,
  fetchAudios,
}) => {
  const { id } = useParams<{ id: string }>();
  const [localAudios, setLocalAudios] = useState(audios);
  const [modalOpen, setModalOpen] = useState(false);

  /* Sync local draggable state */
  useEffect(() => {
    setLocalAudios(audios);
  }, [audios]);

  useEffect(() => {
    if (id) fetchAudios({ playlistId: id });
  }, [id]);

  function moveAudio(from: number, to: number) {
    const updated = [...localAudios];
    const [item] = updated.splice(from, 1);
    updated.splice(to, 0, item);
    setLocalAudios(updated);
  }

  if (!playlist) return null;

  return (
    <div className="bg-black px-6 py-8 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{playlist.title}</h1>

        {playlist.description && (
          <p className="text-gray-400 mb-2 max-w-2xl">{playlist.description}</p>
        )}

        <span
          className={`inline-block text-xs px-2 py-1 rounded-full ${
            playlist.isPublic
              ? "bg-green-600/20 text-green-400"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {playlist.isPublic ? "Public Playlist" : "Private Playlist"}
        </span>
      </div>

      {/* Audios */}
      {localAudios.length === 0 ? (
        <div className="bg-gray-900 rounded-xl p-8 text-center">
          <p className="text-gray-400 mb-4">This playlist is empty</p>

          <Button
            onClick={() => setModalOpen(true)}
            className="max-w-xs mx-auto"
          >
            Add audios
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-400">{localAudios.length} audios</p>
            <Button onClick={() => setModalOpen(true)}>Add audios</Button>
          </div>

          <div className="space-y-2">
            {localAudios.map((a, index) => (
              <div
                key={a.id}
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData("i", index.toString())
                }
                onDrop={(e) => {
                  const from = Number(e.dataTransfer.getData("i"));
                  moveAudio(from, index);
                }}
                onDragOver={(e) => e.preventDefault()}
                className="
                  bg-gray-900 p-3 rounded-lg
                  flex items-center justify-between
                  hover:bg-gray-800 transition
                "
              >
                {/* Audio info */}
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{a.audioId}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {a.createdAt}
                  </p>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 cursor-grab">☰</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
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

const mapStateToProps = (state: AppState) => ({
  playlist: selectedPlaylistSelector(state),
  audios: selectedPlaylistAudiosSelector(state),
});

const mapDispatchToProps = {
  fetchAudios: getPlaylistAudiosInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(PlaylistDetailPage);
