import * as React from "react";

export const TabSelector = ({
  isActive,
  children,
  onClick,
}: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    className={` group inline-flex items-center px-2 py-4 border-b-2 font-poppins font-normal text-[16px] leading-[24px] cursor-pointer whitespace-nowrap ${
      isActive
        ? "border-purple-500 text-purple-600 focus:outline-none focus:text-purple-800 focus:border-purple-700"
        : "border-transparent text-dimWhite hover:text-gray-600 hover:border-gray-300 focus:text-gray-600 focus:border-gray-300"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);