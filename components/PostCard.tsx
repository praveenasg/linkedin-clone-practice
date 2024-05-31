"use client";
import { useUser } from "@clerk/nextjs";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import createPostAction from "@/Actions/createPostAction";
import { toast } from "./ui/use-toast";

function PostCard() {
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleFromSubmit = async (formData: FormData) => {
    const formDataCopy = formData;
    formRef.current?.reset();
    const inputText = formDataCopy.get("post_content") as string;
    if (!inputText) {
      throw new Error("Please provide a post input");
    }
    setImageUrl(null);

    try {
      await createPostAction(formDataCopy);
    } catch (error) {
      console.log("Error creating a post", error);
    }
  };

  return (
    <div className=" max-w-xl mx-auto lg:max-w-3xl bg-white shadow-md rounded-lg p-3">
      <form
        action={(formData) => {
          handleFromSubmit(formData);
          // give toast notification
          toast({
            description: "Your message has been sent.",
          });
        }}
        ref={formRef}
        className="space-y-3"
      >
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src={user?.imageUrl || ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <input
            className="flex-1 outline-none border rounded-full p-2"
            type="text"
            name="post_content"
            id="post_content"
            placeholder="Write a post...."
          />
        </div>

        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Preview Image"
            width={100}
            height={100}
            className="object-cover w-full rounded-lg"
          />
        )}

        <div className="flex justify-between">
          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />

          <Button
            variant="secondary"
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex space-x-2"
          >
            <ImageIcon />
            <span>{imageUrl ? "Change Image" : "Add Image"}</span>
          </Button>

          <Button variant="secondary" type="submit">
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostCard;
