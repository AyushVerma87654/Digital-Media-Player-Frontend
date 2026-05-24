import { FC, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { allPlaylistsMapSelector } from "../redux/selectors/playlistSelector";
import { FaPlus } from "react-icons/fa";
import Button from "./Button";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { getPlaylistByIdInitiatedAction } from "../redux/slice/playlistSlice";

interface PlaylistSectionProps extends ReduxProps {}

const PlaylistSection: FC<PlaylistSectionProps> = ({
  playlists,
  fetchPlaylistById,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section>
      {isModalOpen && (
        <CreatePlaylistModal onClose={() => setIsModalOpen(false)} />
      )}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-white grow">
          Your Playlists
        </h2>
        <div>
          <Button
            onClick={() => navigate("/playlists")}
            className="hover:underline"
          >
            View All
          </Button>
        </div>
      </div>

      {playlists.length === 0 ? (
        <div className="flex items-center justify-center gap-6">
          <div className="bg-gray-900 rounded-xl py-6 px-12 text-center text-gray-400">
            You haven’t created any playlists yet
          </div>
          <div
            className="flex items-center justify-center bg-gray-900 rounded-xl py-6 px-12 text-center text-gray-400"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus className="mr-2" size={12} />
            <span>Create one now</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {playlists.slice(0, 4).map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => {
                fetchPlaylistById({ id: playlist.id });
                navigate(`/playlists/${playlist.id}`);
              }}
              className="
                bg-gray-900 rounded-xl p-3
                hover:bg-gray-800 transition cursor-pointer
              "
            >
              {/* Cover */}
              <div className="w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                Playlist
              </div>

              <p className="mt-2 text-sm font-semibold truncate">
                {playlist.title}
              </p>
              <p className="text-xs text-gray-400">
                {playlist.description} tracks
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const mapStateToProps = (state: AppState) => ({
  playlists: allPlaylistsMapSelector(state),
});

const mapDispatchToProps = {
  fetchPlaylistById: getPlaylistByIdInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(PlaylistSection);
