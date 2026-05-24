import { FC, ButtonHTMLAttributes, memo } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={
        "bg-orange-500 text-white rounded-md flex items-center justify-center w-full h-10 font-semibold disabled:bg-orange-300 cursor-pointer px-4 py-2 " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
};

export default memo(Button);
