import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { formatDuration } from "../utils/formatDuration";
import { useNavigate } from "react-router-dom";
import { getPodcastByIdInitiatedAction } from "../redux/slice/podcastSlice";
import Button from "./Button";
import { allPodcastsMapSelector } from "../redux/selectors/podcastSelector";

interface TrendingPodcastSectionProps extends ReduxProps {}

const TrendingPodcastSection: FC<TrendingPodcastSectionProps> = ({
  podcasts,
  fetchPodcastById,
}) => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">
          🎙 Trending Podcasts
        </h2>
        <div>
          <Button
            onClick={() => navigate("/podcasts")}
            className="hover:underline"
          >
            View All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            onClick={() => {
              fetchPodcastById({ id: podcast.id });
              navigate(`/audio/podcast/${podcast.id}`);
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
                src={podcast.coverImageUrl}
                alt={podcast.title}
                className="w-full h-36 object-cover rounded-lg"
              />
            </div>

            {/* Info */}
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {podcast.episodeTitle}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {podcast.author}
                </p>
              </div>

              {/* Duration */}
              <span className="text-lg text-gray-400 whitespace-nowrap pt-1 pr-2">
                {formatDuration(podcast.duration)}
              </span>
            </div>
          </div>
        ))}
        {podcasts.length === 0 && (
          <div className="flex items-center justify-center">
            No Podcasts Found
          </div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state: AppState) => ({
  podcasts: allPodcastsMapSelector(state),
});

const mapDispatchToProps = {
  fetchPodcastById: getPodcastByIdInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(TrendingPodcastSection);
