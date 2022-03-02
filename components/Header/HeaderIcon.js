import React from "react";

function HeaderIcon({ Icon, active }) {
  return (
    <div className="flex items-center cursor-pointer sm:h-14 md:px-10 md:hover:bg-gray-100 rounded-xl active:border-b-2 active:border-b-blue-500 group">
      <Icon
        className={`h-5 sm:h-7 text-center mx-auto text-gray-500 ${
          active && "text-blue-500"
        } group-hover:text-blue-500`}
      ></Icon>
    </div>
  );
}

export default HeaderIcon;
