import { memo, FC } from "react";
import { TbLoader3 } from "react-icons/tb";

interface LoadingProps {
  className?: string;
}

const Loading: FC<LoadingProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ` + className}>
      <TbLoader3 className="text-red-500 animate-spin text-7xl" />
    </div>
  );
};

export default memo(Loading);
