"use client";
import { EditIcon, ImageIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/lib/hooks";
import { updateBioState } from "@/features/bio/bioSlice";
import Image from "next/image";
import { IBioBase } from "@/types/profile";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import createChangeProfileImagePostAction from "@/Actions/createChangeProfileImagePostAction";

function EditProfileImage(bio: IBioBase) {
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const [imageURL, setImageURL] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageURL(URL.createObjectURL(file));
    }
  };

  const handleFromSubmit = async (formData: FormData) => {
    const formDataCopy = formData;
    formRef.current?.reset();
    try {
      const updated_bio = await createChangeProfileImagePostAction(
        formDataCopy,
        bio
      );
      dispatch(updateBioState(updated_bio));
    } catch (error) {
      console.log("Error updating profile photo ", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-32 h-32 items-center flex bg-opacity-30  backdrop-blur-md justify-center absolute bg-gray-400 rounded-full -mt-12 ml-6  z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <EditIcon color="white" className="relative" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <div>
          <Image
            src={
              imageURL == "" ? bio.profileURL || user?.imageUrl || "" : imageURL
            }
            alt="Preview Image"
            width={1000}
            height={1000}
            className="rounded-lg"
          />
        </div>
        <div className="flex justify-between">
          <form
            action={(formData) => {
              handleFromSubmit(formData);
            }}
            ref={formRef}
            className="w-full"
          >
            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
            <div className="justify-between flex">
              <Button
                variant="secondary"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex space-x-2"
              >
                <ImageIcon />
                <span>Change Image</span>
              </Button>
              <DialogClose asChild>
                <Button variant="secondary" type="submit">
                  Save
                </Button>
              </DialogClose>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileImage;
