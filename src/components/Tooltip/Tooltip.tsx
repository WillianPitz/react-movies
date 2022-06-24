import { ReactNode } from "react";
export const Tooltip = ({
  tooltipMessage,
  children,
}: {
  tooltipMessage: string;
  children: ReactNode;
}) => {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div className="w-36 absolute top-6 right-[-14px] flex flex-col items-center hidden mb-6 group-hover:flex">
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">
          {tooltipMessage}
        </span>
        <div className="w-3 h-3 -mt-8 ml-24 rotate-45 bg-gray-600"></div>
      </div>
    </div>
  );
};