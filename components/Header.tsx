import Image from "next/image";
import React from "react";
import LinkedinLogo from "@/public/linkedin.png";
import Link from "next/link";
import {
  Bell,
  BriefcaseBusinessIcon,
  HomeIcon,
  MessageCircleMoreIcon,
  SearchIcon,
  Users2,
} from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <div className="flex p-2 space-x-3  max-w-7xl mx-auto items-center ">
      <div className="flex flex-1 space-x-3">
        <Link href={"/"}>
          <Image
            src={LinkedinLogo}
            height={35}
            width={35}
            alt="linkedin logo"
          />
        </Link>
        <form action="" className="flex flex-1">
          <div className="flex flex-1 bg-gray-200 space-x-2 items-center pl-2">
            <SearchIcon height={15} width={15} />
            <input
              type="search"
              name="search"
              id="search"
              className="bg-transparent p-1 focus:outline-none flex-1"
            />
          </div>
        </form>
      </div>
      <div className="flex space-x-4">
        <div className="flex flex-col items-center">
          <HomeIcon />
          <p className="hidden md:inline">Home</p>
        </div>
        <div className="flex flex-col items-center">
          <Users2 />
          <p className="hidden md:inline">My Network</p>
        </div>
        <div className="flex flex-col items-center">
          <BriefcaseBusinessIcon />
          <p className="hidden md:inline">Jobs</p>
        </div>
        <div className="flex flex-col items-center">
          <MessageCircleMoreIcon />
          <p className="hidden md:inline">Messaging</p>
        </div>
        <div className="flex flex-col items-center">
          <Bell />
          <p className="hidden md:inline">Notification</p>
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
