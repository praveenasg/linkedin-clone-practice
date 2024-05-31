import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

async function Banner() {
  const user = await currentUser();
  return (
    <div className="bg-white pt-5 pb-5 max-w-xl mx-auto shadow-md rounded-lg">
      {/* profile image */}
      {user ? (
        <>
          <div className="flex flex-col items-center text-center space-y-5 mb-3">
            <Image
              src={user?.imageUrl || ""}
              alt="user image"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <p className="font-bold">
                {user?.firstName?.toUpperCase()} {user?.lastName?.toUpperCase()}
              </p>
              <p>React | Next js | Full Stack Developer</p>
            </div>
          </div>
          <hr />
          {/* Profile Visits */}

          <div className="flex flex-col text-xs space-y-1 mt-1 mb-3">
            <div className="flex space-x-2 justify-between p-1 hover:bg-gray-400 cursor-pointer">
              <p className="">profile viewers</p>
              <span className="text-blue-500">23</span>
            </div>
            <div className=" hover:bg-gray-400 p-1 cursor-pointer">
              <p>view all analytics</p>
            </div>
          </div>

          {/* premium card */}

          {/* saved items */}
        </>
      ) : (
        <div className="flex justify-center align-middle">
          <Button variant={"secondary"}>
            <SignInButton mode="modal" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default Banner;
