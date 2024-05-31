import { ArrowDown } from "lucide-react";
import React from "react";

function LinkedinNews() {
  return (
    <div className="flex flex-col space-y-2 rounded-lg bg-white shadow-md">
      <div className="p-2">
        <h1 className="font-bold text-xl">LinkedIn News</h1>
        <h2 className="font-light">Top Stories</h2>
      </div>

      <div className="hover:bg-gray-300 p-2 cursor-pointer">
        <h2 className="text-sm font-bold">TikTok plans significant layoffs</h2>
        <p className="text-xs font-light">4h ago 35,442 readers</p>
      </div>

      <div className="hover:bg-gray-300 p-2 cursor-pointer">
        <h2 className="text-sm font-bold"> AI is coming to Alexa</h2>
        <p className="text-xs font-light">4h ago 35,442 readers</p>
      </div>

      <div className="hover:bg-gray-300 p-2 cursor-pointer">
        <h2 className="text-sm font-bold"> Nestle targets Ozempic users</h2>
        <p className="text-xs font-light">4h ago 35,442 readers</p>
      </div>

      <div className="hover:bg-gray-300 p-2 cursor-pointer">
        <h2 className="text-sm font-bold">Dimon hints at earlier retirement</h2>
        <p className="text-xs font-light">4h ago 35,442 readers</p>
      </div>

      <div className="hover:bg-gray-300 p-2 cursor-pointer">
        <h2 className="text-sm font-bold"> The highest paid CEOs of 2024</h2>
        <p className="text-xs font-light">4h ago 35,442 readers</p>
      </div>

      <div className="flex text-sm items-center p-2 cursor-pointer space-x-1">
        <span> Show More</span> <ArrowDown height={15} width={15} />
      </div>
    </div>
  );
}

export default LinkedinNews;
