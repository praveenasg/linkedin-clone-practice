"use server";
import { storage } from "@/Firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateBioPostAction } from "./updateBioPostAction";
import { IBioBase } from "@/types/profile";

export default async function createChangeProfileImagePostAction(
  formData: FormData,
  bio: IBioBase
) {
  const image = formData.get("image") as File;
  let imageUrl: string | undefined;

  try {
    // upload image if there is one
    const fileref = ref(storage, `${image.name}`);
    await uploadBytes(fileref, image).then(async (snapshot) => {
      imageUrl = await getDownloadURL(fileref);
    });
    // upload to database
    const updated_bio = await updateBioPostAction(
      bio,
      bio.userId,
      imageUrl || "",
      bio.profileBackgroundURL
    );

    return updated_bio;
  } catch (error) {
    console.log("Failed to create post", error);
    throw new Error("Failed to create post");
  }
}
