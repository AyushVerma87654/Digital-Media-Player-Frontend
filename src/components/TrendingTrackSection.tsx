import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { formatDuration } from "../utils/formatDuration";
import { useNavigate } from "react-router-dom";
import { getTrackByIdInitiatedAction } from "../redux/slice/trackSlice";
import Button from "./Button";
import { allTracksMapSelector } from "../redux/selectors/trackSelector";

interface TrendingTrackSectionProps extends ReduxProps {}

const TrendingTrackSection: FC<TrendingTrackSectionProps> = ({
  tracks,
  fetchTrackById,
}) => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">🔥 Trending Tracks</h2>
        <div>
          <Button
            onClick={() => navigate("/tracks")}
            className="hover:underline"
          >
            View All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => {
              fetchTrackById({ id: track.id });
              navigate(`/audio/track/${track.id}`);
            }}
            className="
              group bg-gray-900 rounded-xl p-3
              hover:bg-gray-800 transition
              cursor-pointer
            "
          >
            {/* Cover */}
            <div className="relative">
              <img
                src={track.coverImageUrl}
                alt={track.title}
                className="w-full h-36 object-cover rounded-lg"
              />
            </div>

            {/* Info Row */}
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {track.title}
                </p>
                <p className="text-xs text-gray-400 truncate">{track.artist}</p>
              </div>

              {/* Duration */}
              <span className="text-xl text-gray-400 whitespace-nowrap pt-1 pr-2">
                {formatDuration(track.duration)}
              </span>
            </div>
          </div>
        ))}
        {tracks.length === 0 && (
          <div className="flex items-center justify-center">
            No Tracks Found
          </div>
        )}
      </div>
    </section>
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

export default connector(TrendingTrackSection);
