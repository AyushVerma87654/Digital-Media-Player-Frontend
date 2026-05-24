import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../utils/formatDuration";
import { getTrackByIdInitiatedAction } from "../redux/slice/trackSlice";
import { allTracksMapSelector } from "../redux/selectors/trackSelector";

interface TracksPageProps extends ReduxProps {}

const TracksPage: FC<TracksPageProps> = ({ tracks, fetchTrackById }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black px-6 py-8 text-white">
      <h1 className="text-2xl font-bold mb-6">🎵 All Tracks</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => {
              fetchTrackById({ id: track.id });
              navigate(`/audio/track/${track.id}`);
            }}
            className="
              bg-gray-900 rounded-xl p-3
              hover:bg-gray-800 transition
              cursor-pointer
            "
          >
            {/* Cover */}
            <img
              src={track.coverImageUrl}
              alt={track.title}
              className="w-full h-40 object-cover rounded-lg"
            />

            {/* Info */}
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{track.title}</p>
                <p className="text-xs text-gray-400 truncate">{track.artist}</p>
              </div>

              <span className="text-lg text-gray-400 whitespace-nowrap pr-2">
                {formatDuration(track.duration)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  tracks: allTracksMapSelector(state),
});

const mapDispatchToProps = {
  fetchTrackById: getTrackByIdInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(TracksPage);
