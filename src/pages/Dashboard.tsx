import type { FC } from "react";
import DashboardHeader from "../components/DashboardHeader";
import RecentlyPlayedSection from "../components/RecentlyPlayedSection";
import PlaylistSection from "../components/PlaylistSection";
import TrendingTrackSection from "../components/TrendingTrackSection";
import TrendingPodcastSection from "../components/TrendingPodcastSection";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  return (
    <div className="p-4 sm:p-6 space-y-8 bg-gray-500">
      <DashboardHeader />
      <RecentlyPlayedSection />
      <PlaylistSection />
      <TrendingTrackSection />
      <TrendingPodcastSection />
    </div>
  );
};

export default Dashboard;
