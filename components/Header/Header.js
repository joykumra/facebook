import React from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  MenuIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";

function Header() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center sticky top-0 z-50 p-2 lg:px-5 bg-white shadow-md">
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layouts="fixed"
        ></Image>

        <div className="flex items-center rounded-full ml-2 bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600"></SearchIcon>
          <input
            type="text"
            placeholder="search facebook"
            className="hidden md:inline-flex items-center flex-shrink ml-2 bg-transparent outline-none placeholder:text-gray-500"
          ></input>
        </div>
      </div>

      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active Icon={HomeIcon} active></HeaderIcon>
          <HeaderIcon Icon={PlayIcon}></HeaderIcon>
          <HeaderIcon Icon={ShoppingCartIcon}></HeaderIcon>
          <HeaderIcon Icon={UserGroupIcon}></HeaderIcon>
          <HeaderIcon Icon={MenuIcon}></HeaderIcon>
        </div>
      </div>

      <div className="flex items-center justify-end sm:space-x-2">
        <Image
          onClick={signOut}
          className="rounded-full cursor-pointer"
          src={session.user.image}
          width={40}
          height={40}
          layouts="fixed"
        ></Image>

        <ViewGridIcon className="icon"></ViewGridIcon>
        <ChatIcon className="icon"></ChatIcon>
        <BellIcon className="icon"></BellIcon>
        <ChevronDownIcon className="icon"></ChevronDownIcon>
      </div>
    </div>
  );
}

export default Header;
