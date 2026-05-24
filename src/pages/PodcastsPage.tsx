import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../utils/formatDuration";
import { AppState } from "../redux/store";
import { getPodcastByIdInitiatedAction } from "../redux/slice/podcastSlice";
import { connect, ConnectedProps } from "react-redux";
import { allPodcastsMapSelector } from "../redux/selectors/podcastSelector";

interface PodcastsPageProps extends ReduxProps {}

const PodcastsPage: FC<PodcastsPageProps> = ({
  podcasts,
  fetchPodcastById,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black px-6 py-8 text-white">
      <h1 className="text-2xl font-bold mb-6">🎙 Podcasts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            onClick={() => {
              fetchPodcastById({ id: podcast.id });
              navigate(`/audio/podcast/${podcast.id}`);
            }}
            className="
              bg-gray-900 rounded-xl p-3
              hover:bg-gray-800 transition
              cursor-pointer
            "
          >
            {/* Cover */}
            <img
              src={podcast.coverImageUrl}
              alt={podcast.episodeTitle}
              className="w-full h-40 object-cover rounded-lg"
            />

            {/* Info */}
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">
                  {podcast.episodeTitle}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {podcast.author}
                </p>
              </div>

              <span className="text-lg text-gray-400 whitespace-nowrap pr-2">
                {formatDuration(podcast.duration)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
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

export default connector(PodcastsPage);
