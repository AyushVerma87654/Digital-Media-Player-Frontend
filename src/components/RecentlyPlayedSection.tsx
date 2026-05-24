import type { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { recentlyPlayedItemsMapSelector } from "../redux/selectors/recentlyPlayedSelector";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../utils/formatDuration";
import { getTrackByIdInitiatedAction } from "../redux/slice/trackSlice";
import { getPodcastByIdInitiatedAction } from "../redux/slice/podcastSlice";
import { AudioContentType } from "../models/recentlyPlayed";
import Button from "./Button";

interface RecentlyPlayedSectionProps extends ReduxProps {}

const RecentlyPlayedSection: FC<RecentlyPlayedSectionProps> = ({
  recentlyPlayed,
  fetchTrackById,
  fetchPodcastById,
}) => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Recently Played</h2>
        <div>
          <Button
            onClick={() => navigate("/recently-played")}
            className="hover:underline"
          >
            View All
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {recentlyPlayed.map((list) => (
          <div
            key={list.id}
            onClick={() => {
              if (list.contentType === AudioContentType.TRACK) {
                fetchTrackById({ id: list.content.id });
                navigate(`/audio/track/${list.content.id}`);
              } else {
                fetchPodcastById({ id: list.content.id });
                navigate(`/audio/podcast/${list.content.id}`);
              }
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
                src={list.content.coverImageUrl}
                alt={list.content.title}
                className="w-full h-36 object-cover rounded-lg"
              />
            </div>

            {/* Info Row */}
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {list.content.title}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {list.content.createdBy}
                </p>
              </div>

              {/* Duration */}
              <span className="text-xl text-gray-400 whitespace-nowrap pt-1 pr-2">
                {formatDuration(list.content.duration)}
              </span>
            </div>
          </div>
        ))}
      </div>
      {recentlyPlayed.length === 0 && (
        <div className="flex items-center justify-center">
          You haven’t played anything yet
        </div>
      )}
    </section>
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

export default connector(RecentlyPlayedSection);
