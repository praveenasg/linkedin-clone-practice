"use server";

import { Post } from "@/MongoDb/models/post";
import { ICommentBase } from "@/types/comments";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function commentPostAction(
  comment: string,
  post_id: string
) {
  const user = await currentUser();

  if (!post_id) throw new Error("Post id is required");
  if (!comment) throw new Error("Comment input is required");
  if (!user?.id) throw new Error("User not authenticated");

  const post = await Post.findById(post_id);

  if (!post) {
    throw new Error("Post not found");
  }

  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastname: user.lastName || "",
  };

  const commentToAdd: ICommentBase = {
    user: userDB,
    text: comment,
  };

  try {
    await post.commentOnPost(commentToAdd);
    revalidatePath("/");
  } catch (error) {
    throw new Error("An error occured while adding comment");
  }
}
