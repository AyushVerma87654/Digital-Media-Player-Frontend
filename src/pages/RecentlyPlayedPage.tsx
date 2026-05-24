import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../utils/formatDuration";
import { recentlyPlayedItemsMapSelector } from "../redux/selectors/recentlyPlayedSelector";
import { getTrackByIdInitiatedAction } from "../redux/slice/trackSlice";
import { getPodcastByIdInitiatedAction } from "../redux/slice/podcastSlice";
import { AudioContentType } from "../models/recentlyPlayed";

interface RecentlyPlayedPageProps extends ReduxProps {}

const RecentlyPlayedPage: FC<RecentlyPlayedPageProps> = ({
  recentlyPlayed,
  fetchTrackById,
  fetchPodcastById,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black px-6 py-8 text-white">
      <h1 className="text-2xl font-bold mb-6">🕘 Recently Played</h1>

      {recentlyPlayed.length === 0 ? (
        <div className="flex items-center justify-center text-gray-400">
          You haven’t played anything yet
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentlyPlayed.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.contentType === AudioContentType.TRACK) {
                  fetchTrackById({ id: item.content.id });
                  navigate(`/audio/track/${item.content.id}`);
                } else {
                  fetchPodcastById({ id: item.content.id });
                  navigate(`/audio/podcast/${item.content.id}`);
                }
              }}
              className="
                bg-gray-900 rounded-xl p-3
                hover:bg-gray-800 transition
                cursor-pointer
              "
            >
              {/* Cover */}
              <img
                src={item.content.coverImageUrl}
                alt={item.content.title}
                className="w-full h-40 object-cover rounded-lg"
              />

              {/* Info */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {item.content.title}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {item.content.createdBy}
                  </p>
                </div>

                <span className="text-lg text-gray-400 whitespace-nowrap pr-2">
                  {formatDuration(item.content.duration)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  recentlyPlayed: recentlyPlayedItemsMapSelector(state),
});

const mapDispatchToProps = {
  fetchTrackById: getTrackByIdInitiatedAction,
  fetchPodcastById: getPodcastByIdInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(RecentlyPlayedPage);
