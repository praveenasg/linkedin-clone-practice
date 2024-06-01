import { connectDB } from "@/MongoDb/db";
import { IPost, Post } from "@/MongoDb/models/post";

export async function GET(
  request: Request,
  { params: { post_id } }: { params: { post_id: string } }
) {
  await connectDB();
  try {
    const post: IPost | null = await Post.findById(post_id);
    if (!post) {
      return Response.json({ error: "Post not found", status: 404 });
    }
    return Response.json(post);
  } catch (error) {
    return Response.json({
      message: "Error, uable to like the post",
      status: 500,
    });
  }
}
