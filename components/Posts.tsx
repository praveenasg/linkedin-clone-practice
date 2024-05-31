import { connectDB } from "@/MongoDb/db";
import { IPostDocument, Post } from "@/MongoDb/models/post";
import React from "react";
import PostWidget from "./PostWidget";

// { posts }: { posts: IPostDocument[] }
async function Posts() {
  await connectDB();
  const posts = await Post.getAllPosts();
  return (
    <div className="max-w-xl mx-auto lg:max-w-3xl">
      {posts?.map((post: IPostDocument) => (
        <div key={post._id.toString()} className="mb-3">
          <PostWidget post={post} />
        </div>
      ))}
    </div>
  );
}

export default Posts;
