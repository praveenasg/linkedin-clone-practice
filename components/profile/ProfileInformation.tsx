"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { EditProfile } from "./EditProfile";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchBio, selectBio } from "@/features/bio/bioSlice";

function ProfileInformation() {
  const { user } = useUser();
  const bio = useAppSelector(selectBio);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      dispatch(fetchBio(user.id as string)).then(() => {
        setLoading(false);
      });
    }
  }, [dispatch, user]);

  if (loading) {
    return (
      <div className="flex m-8  flex-col">
        <div className="ml-auto">
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <div className="mt-10 text-sm space-y-3 font-light">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div>
              <Skeleton className="h-4 w-[250px]" />
            </div>
            <div>
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
          <div className="flex sm:max-w-md space-x-1 items-center pb-3 ">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex m-8 flex-col">
      <div className="ml-auto">
        <EditProfile {...bio} />
      </div>
      <div className="mt-8 text-sm font-light space-y-2">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <p className="font-bold text-3xl">
              {bio?.name}
              {bio?.pronouns && (
                <span className="font-extralight text-lg">
                  ({bio?.pronouns})
                </span>
              )}
            </p>
            <p className="font-light text-lg">{bio?.bio}</p>
          </div>
          <div>
            <p className="font-light text-sm sm:font-bold">{bio?.school}</p>
          </div>
        </div>
        <p>
          {bio?.city} {bio?.state} {bio?.country}
        </p>
        <p className="text-[#0B65C2] font-bold">273 connection</p>
        <div className="flex sm:max-w-md space-x-1 items-center pb-3 ">
          <Button
            variant="default"
            className="flex-grow  bg-[#0B65C2] text-white hover:bg-blue-600 p-0 h-8 rounded-full"
          >
            Open to
          </Button>
          <Button
            variant="default"
            className="flex-grow  bg-[#0B65C2] text-white hover:bg-blue-600 p-0 h-8  rounded-full"
          >
            Add profile section
          </Button>
          <Button
            variant="default"
            className=" bg-[#0B65C2] text-white hover:bg-blue-600 h-8  rounded-full"
          >
            More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileInformation;
