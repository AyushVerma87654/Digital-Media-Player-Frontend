import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { FaPlus } from "react-icons/fa";
import Button from "../components/Button";
import {
  deleteTrackInitiatedAction,
  getTrackByIdInitiatedAction,
} from "../redux/slice/trackSlice";
import {
  deletePodcastInitiatedAction,
  getPodcastByIdInitiatedAction,
} from "../redux/slice/podcastSlice";
import { useNavigate } from "react-router-dom";
import { allTracksMapSelector } from "../redux/selectors/trackSelector";
import { allPodcastsMapSelector } from "../redux/selectors/podcastSelector";

interface AdminDashboardProps extends ReduxProps {}

const AdminDashboard: FC<AdminDashboardProps> = ({
  tracks,
  podcasts,
  deleteTrack,
  deletePodcast,
  fetchTrackById,
  fetchPodcastById,
}) => {
  console.log("tracks", tracks);
  const navigate = useNavigate();
  return (
    <div className="bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-400 p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {/* ================= TRACKS ================= */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">🎵 Tracks</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Add Track */}
          <div
            className="
              flex flex-col items-center justify-center
              rounded-xl shadow-lg h-64
              bg-linear-to-r from-orange-400 via-pink-400 to-yellow-300
              text-white cursor-pointer
              hover:shadow-2xl hover:scale-105 transition
            "
            onClick={() => navigate("/admin/track/add/0")}
          >
            <FaPlus className="text-4xl mb-2" />
            <div className="text-xl font-semibold">Add New Track</div>
          </div>

          {tracks.length === 0 && (
            <div className="flex items-center justify-center">
              No Tracks Found
            </div>
          )}

          {/* Track Cards */}
          {tracks.map((track) => (
            <div
              key={track.id}
              className="
                rounded-xl shadow-lg p-4
                hover:shadow-2xl transition
                flex flex-col justify-between h-64 relative 
              "
            >
              <img
                className="absolute inset-0 w-full h-full rounded-xl"
                src={track.coverImageUrl}
              />
              <div className="flex flex-col justify-between h-full z-10">
                <div className="font-bold">
                  <h3 className="text-xl mb-1">{track.title}</h3>
                  <p>{track.artist}</p>
                  <p className="text-sm mt-1">Album: {track.album}</p>
                </div>

                <div className="flex justify-between gap-4 mt-auto">
                  <Button
                    className="bg-green-500 text-white hover:bg-green-600"
                    onClick={() => {
                      fetchTrackById({ id: track.id });
                      navigate("");
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-500 text-white hover:bg-red-600"
                    onClick={() => deleteTrack(track.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PODCASTS ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          🎙 Podcasts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Add Podcast */}
          <div
            className="
              flex flex-col items-center justify-center
              rounded-xl shadow-lg h-64
              bg-linear-to-r from-cyan-400 via-sky-400 to-blue-500
              text-white cursor-pointer
              hover:shadow-2xl hover:scale-105 transition
            "
            onClick={() => navigate("/admin/podcast/add/0")}
          >
            <FaPlus className="text-4xl mb-2" />
            <div className="text-xl font-semibold">Add New Podcast</div>
          </div>

          {podcasts.length === 0 && (
            <div className="flex items-center justify-center">
              No Podcasts Found
            </div>
          )}

          {/* Podcast Cards */}
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="
                rounded-xl shadow-lg p-4
                hover:shadow-2xl transition
                flex flex-col justify-between h-64 relative
              "
            >
              <img
                className="absolute inset-0 w-full h-full rounded-xl"
                src={podcast.coverImageUrl}
              />
              <div className="flex flex-col justify-between h-full z-10">
                <div className="font-bold">
                  <h3 className="text-lg mb-1">{podcast.episodeTitle}</h3>
                  <p>{podcast.author}</p>
                  <p className="text-sm mt-1">
                    Duration: {Math.floor(podcast.duration / 60)}m
                  </p>
                </div>

                <div className="flex justify-between gap-4 mt-auto">
                  <Button
                    className="bg-green-500 text-white hover:bg-green-600"
                    onClick={() => {
                      fetchPodcastById({ id: podcast.id });
                      navigate("");
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-500 text-white hover:bg-red-600"
                    onClick={() => deletePodcast(podcast.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  tracks: allTracksMapSelector(state),
  podcasts: allPodcastsMapSelector(state),
});

const mapDispatchToProps = {
  deleteTrack: deleteTrackInitiatedAction,
  deletePodcast: deletePodcastInitiatedAction,
  fetchTrackById: getTrackByIdInitiatedAction,
  fetchPodcastById: getPodcastByIdInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AdminDashboard);
