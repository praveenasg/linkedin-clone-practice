"use client";
import Image from "next/image";
import React from "react";
import defaultbg from "@/public/default-bg.svg";
import ProfileInformation from "./ProfileInformation";
import EditProfileBgImage from "./EditProfileBgImage";
import { useUser } from "@clerk/nextjs";
import { IBioBase } from "@/types/profile";
import { useAppSelector } from "@/lib/hooks";
import { selectBio } from "@/features/bio/bioSlice";
import EditProfileImage from "./EditProfileImage";

function ProfileCard() {
  const { user } = useUser();
  const bio: IBioBase = useAppSelector(selectBio);
  return (
    <div className="bg-white mt-4 relative rounded-xl">
      {/* background image */}
      <div className="hover:cursor-pointer relative group">
        <EditProfileBgImage {...bio} />
        <Image
          src={bio.profileBackgroundURL ? bio.profileBackgroundURL : defaultbg}
          alt="default bg"
          width={1000}
          height={1000}
          className="rounded-t-xl max-h-48 object-cover"
        />
      </div>
      {/* profile picture */}
      <div className="hover:cursor-pointer group">
        <EditProfileImage {...bio} />
        <Image
          src={bio.profileURL ? bio.profileURL : user?.imageUrl || ""}
          alt="user photo"
          width={125}
          height={125}
          className="w-32 h-32 object-cover rounded-full absolute -mt-12 ml-6 shadow-2xl"
        />
      </div>
      {/* Details card - client component */}
      <ProfileInformation />
    </div>
  );
}

export default ProfileCard;
