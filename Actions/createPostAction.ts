"use server";
import { storage } from "@/Firebase/firebase";
import { connectDB } from "@/MongoDb/db";
import { Post } from "@/MongoDb/models/post";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { revalidatePath } from "next/cache";

export default async function createPostAction(formData: FormData) {
  const user = await currentUser();
  await connectDB();

  if (!user) {
    throw new Error("User has not logged in");
  }

  const input = formData.get("post_content") as string;
  const image = formData.get("image") as File;
  let imageUrl: string | undefined;

  if (!input) {
    throw new Error("please provide an input");
  }

  // Define the user
  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastname: user.lastName || "",
  };
  try {
    if (image.size > 0) {
      // upload image if there is one
      const fileref = ref(storage, `${image.name}`);
      await uploadBytes(fileref, image).then(async (snapshot) => {
        imageUrl = await getDownloadURL(fileref);
      });
      // upload to database
      const body = {
        user: userDB,
        text: input,
        imageUrl: imageUrl,
      };
      await Post.create(body);
    } else {
      // upload to database
      const body = {
        user: userDB,
        text: input,
      };
      await Post.create(body);
    }
  } catch (error) {
    console.log("Failed to create post", error);
  }

  // revalidate the home path
  revalidatePath("/");
}
