import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import MediaPlayer from "./pages/MediaPlayer";
import TracksPage from "./pages/TracksPage";
import PodcastsPage from "./pages/PodcastsPage";
import Signup from "./pages/Signup";
import CreatorStudioPage from "./pages/CreatorStudioPage";
import MediaEditorPage from "./pages/MediaEditorPage";
import RecentlyPlayedPage from "./pages/RecentlyPlayedPage";
import PlaylistDetailPage from "./pages/PlaylistDetailPage";
import PlaylistsPage from "./pages/PlaylistsPage";

const App: FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-col justify-center bg-gray-100 grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/studio" element={<CreatorStudioPage />} />
          <Route path="/studio/:type/:task/:id" element={<MediaEditorPage />} />
          <Route path="/tracks" element={<TracksPage />} />
          <Route path="/podcasts" element={<PodcastsPage />} />
          <Route path="/recently-played" element={<RecentlyPlayedPage />} />
          <Route path="/media/:type/:id" element={<MediaPlayer />} />
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/playlists/:id" element={<PlaylistDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
