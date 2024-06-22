import Image from "next/image";
import React from "react";
import defaultbg from "@/public/default-bg.svg";
import { currentUser } from "@clerk/nextjs/server";
import ProfileInformation from "./ProfileInformation";

async function ProfileCard() {
  const user = await currentUser();

  return (
    <div className="bg-white mt-4 relative rounded-xl">
      {/* background image */}
      <Image src={defaultbg} alt="default bg" className="w-full rounded-t-xl" />
      {/* profile picture */}
      <Image
        src={user?.imageUrl || ""}
        alt="user photo"
        width={125}
        height={125}
        className="rounded-full absolute -mt-12 ml-6"
      />
      {/* Details card - client component */}
      <ProfileInformation />
    </div>
  );
}

export default ProfileCard;
