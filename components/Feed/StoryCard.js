import React from "react";
import Image from "next/image";

function StoryCard({ profile, src, name }) {
  return (
    <div className="relative h-14 w-14 md:h-20 md:w-20 lg:h-56 lg:w-40 p-3 hover:brightness-110 transition duration-150 hover:scale-105 cursor-pointer">
      <Image
        className="object-cover filter brightness-75 rounded-full lg:rounded-3xl"
        src={src}
        layout="fill"
      ></Image>
      <Image
        className="absolute top-10 opacity-0 lg:opacity-100 rounded-full z-40"
        src={profile}
        width={40}
        height={40}
        layout="fixed"
        objectFit="cover"
      ></Image>
    </div>
  );
}

export default StoryCard;
