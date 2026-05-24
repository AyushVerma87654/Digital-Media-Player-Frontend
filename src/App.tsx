import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import AudioPlayer from "./pages/AudioPlayer";
import TracksPage from "./pages/TracksPage";
import PodcastsPage from "./pages/PodcastsPage";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import AudioFormPage from "./pages/AudioFormPage";
import RecentlyPlayedPage from "./pages/RecentlyPlayedPage";
import PlaylistDetailPage from "./pages/PlaylistDetailPage";
import PlaylistsPage from "./pages/PlaylistsPage";

const App: FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-col justify-center bg-gray-100 grow">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/:type/:task/:id" element={<AudioFormPage />} />
          <Route path="/tracks" element={<TracksPage />} />
          <Route path="/podcasts" element={<PodcastsPage />} />
          <Route path="/recently-played" element={<RecentlyPlayedPage />} />
          <Route path="/audio/:type/:id" element={<AudioPlayer />} />
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
