import React from "react";
import Image from "next/image";

function SidebarRow({ title, src, Icon }) {
  return (
    <div className="flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer">
      {src && (
        <Image
          src={src}
          height={32}
          width={32}
          className="rounded-full"
        ></Image>
      )}
      {Icon && <Icon className="h-8 w-8 text-blue-500"></Icon>}
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
}

export default SidebarRow;
