import { connectDB } from "@/MongoDb/db";
import { Post } from "@/MongoDb/models/post";

export interface like_Post_request_body {
  userid: string;
}

export async function POST(
  request: Request,
  { params: { post_id } }: { params: { post_id: string } }
) {
  await connectDB();
  const { userid }: like_Post_request_body = await request.json();
  try {
    const post = await Post.findById(post_id);
    if (!post) {
      return Response.json({ error: "Post not found", status: 404 });
    }
    await post.likePost(userid);
    return Response.json({ message: "post liked succesfully", status: 200 });
  } catch (error) {
    return Response.json({
      message: "Error, unable to like the post",
      status: 500,
    });
  }
}
