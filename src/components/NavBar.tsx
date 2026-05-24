import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import {
  isLoggedInSelector,
  userSelector,
} from "../redux/selectors/userSelector";
import Button from "./Button";
import {
  fetchMeInitiatedAction,
  logoutInitiatedAction,
} from "../redux/slice/userSlice";
import { UserRole } from "../models/user";
import { getAllTracksInitiatedAction } from "../redux/slice/trackSlice";
import { getAllPodcastsInitiatedAction } from "../redux/slice/podcastSlice";
import { getRecentlyPlaylistInitiatedAction } from "../redux/slice/recentlyPlayedSlice";
import { getAllPlaylistsInitiatedAction } from "../redux/slice/playlistSlice";

interface NavBarProps extends ReduxProps {}

const NavBar: FC<NavBarProps> = ({
  user,
  isLoggedIn,
  initiateLogout,
  fetchProfile,
  fetchAllTracks,
  fetchAllPodcasts,
  fetchRecentlyPlaylist,
  fetchAllPlaylists,
}) => {
  useEffect(() => {
    !isLoggedIn && fetchProfile();
    isLoggedIn && fetchRecentlyPlaylist({ userId: user.id });
    isLoggedIn && fetchAllPlaylists({ userId: user.id });
  }, [isLoggedIn]);

  useEffect(() => {
    fetchAllTracks();
    fetchAllPodcasts();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-teal-700 via-blue-800 to-indigo-900 shadow-md">
      <div className="mx-auto p-4 flex justify-between items-center gap-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-orange-500"
          >
            Digital Media Player
          </Link>
        </div>

        <div>
          {isLoggedIn && user.role === UserRole.ADMIN && (
            <Link
              to="/admin/dashboard"
              className="text-orange-500 hover:text-orange-600 hover:underline font-bold transition"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Right */}
        {isLoggedIn ? (
          <div className="sm:hidden rounded-full bg-blue-500 text-rose-700 min-w-9! min-h-9! flex items-center justify-center text-xl font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        ) : (
          <Link to="/login">
            <Button className="sm:hidden">Login</Button>
          </Link>
        )}
        <div className="hidden sm:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className="rounded-full bg-blue-500 text-rose-700 w-9 h-9 flex items-center justify-center text-xl font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <div>
                <Button onClick={() => initiateLogout()} className="text-sm">
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: userSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  initiateLogout: logoutInitiatedAction,
  fetchProfile: fetchMeInitiatedAction,
  fetchAllTracks: getAllTracksInitiatedAction,
  fetchAllPodcasts: getAllPodcastsInitiatedAction,
  fetchRecentlyPlaylist: getRecentlyPlaylistInitiatedAction,
  fetchAllPlaylists: getAllPlaylistsInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(NavBar);
