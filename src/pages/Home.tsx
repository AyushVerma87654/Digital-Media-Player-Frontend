import type { FC } from "react";
import HomePageHeader from "../components/HomePageHeader";
import RecentlyPlayedSection from "../components/RecentlyPlayedSection";
import PlaylistSection from "../components/PlaylistSection";
import TrendingTrackSection from "../components/TrendingTrackSection";
import TrendingPodcastSection from "../components/TrendingPodcastSection";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div className="p-4 sm:p-6 space-y-8 bg-gray-500">
      <HomePageHeader />
      <RecentlyPlayedSection />
      <PlaylistSection />
      <TrendingTrackSection />
      <TrendingPodcastSection />
    </div>
  );
};

export default HomePage;
