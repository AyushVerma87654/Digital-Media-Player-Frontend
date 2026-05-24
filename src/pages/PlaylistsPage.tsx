import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import {
  allPlaylistsMapSelector,
  playlistWithAudiosSelector,
} from "../redux/selectors/playlistSelector";

interface PlaylistsPageProps extends ReduxProps {}

const PlaylistsPage: FC<PlaylistsPageProps> = ({ playlists }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-black px-6 py-8 text-white">
      <h1 className="text-2xl font-bold mb-6">🎶 Your Playlists</h1>

      {playlists.length === 0 ? (
        <div className="text-gray-400">No playlists yet</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => navigate(`/playlists/${playlist.id}`)}
              className="
                bg-gray-900 rounded-xl p-3
                hover:bg-gray-800 transition cursor-pointer
              "
            >
              <div className="w-full h-40 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
                Playlist
              </div>

              <p className="mt-3 text-sm font-semibold truncate">
                {playlist.title}
              </p>
              <p className="text-xs text-gray-400">
                {playlist.audiosCount} tracks
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  const playlists = allPlaylistsMapSelector(state).map((playlist) => {
    const audios = playlistWithAudiosSelector(playlist.id)(state)?.audios || [];
    return {
      ...playlist,
      audiosCount: audios.length,
    };
  });
  return {
    playlists,
  };
};

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(PlaylistsPage);
