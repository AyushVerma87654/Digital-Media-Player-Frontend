import type { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { userSelector } from "../redux/selectors/userSelector";

interface DashboardHeaderProps extends ReduxProps {}

const DashboardHeader: FC<DashboardHeaderProps> = ({ user }) => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white">
        {greeting}, {user.name || "Guest"} 👋
      </h1>
      <p className="text-gray-400 mt-1">Let’s continue where you left off</p>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: userSelector(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DashboardHeader);
