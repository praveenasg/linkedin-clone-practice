"use client";
import { IPost, IPostDocument } from "@/MongoDb/models/post";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@clerk/nextjs";
import TimeAgo from "react-timeago";
import Image from "next/image";
import { Button } from "./ui/button";
import { MessageSquareTextIcon, ThumbsUpIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { like_Post_request_body } from "@/app/api/posts/[post_id]/like/route";
import { toast } from "sonner";
import { deletePostAction } from "@/Actions/deletePostAction";

function PostWidget({ post }: { post: IPostDocument }) {
  const { user } = useUser();
  const isAuthor = user?.id === post.user.userId;
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    if (user?.id && post.likes?.includes(user.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post, user]);

  async function handleclicklike() {
    if (user) {
      const request_body: like_Post_request_body = {
        userid: user.id,
      };
      const res = await fetch(
        `api/posts/${post._id}/${liked ? "unlike" : "like"}`,
        {
          method: "POST",
          body: JSON.stringify(request_body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        return res.json();
      });

      if (res.status == 200) {
        const post_res: IPost = await fetch(`api/posts/${post._id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          return res.json();
        });

        setLikes(post_res.likes);
        setLiked(!liked);
      }
    }
  }

  return (
    <div className="bg-white rounded-lg p-3 shadow-md space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center  space-x-2 mb-3">
          <Avatar>
            <AvatarImage src={post.user.userImage || ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="font-semibold">
              {post.user.firstName} {post.user.lastname}
            </h3>
            <div className="text-xs font-light">
              {isAuthor && <span>Author</span>}
              <p>
                Posted : <TimeAgo date={post.createdAt} />
              </p>
            </div>
          </div>
        </div>
        {isAuthor && (
          <Button
            variant="secondary"
            onClick={() => {
              const promise = deletePostAction(post._id.toString());
              toast.promise(promise, {
                loading: "Deleting post...",
                success: "Post deleted!",
                error: "Error deleting post",
              });
            }}
          >
            <Trash2Icon />
          </Button>
        )}
      </div>
      <div>
        <h3>{post.text}</h3>
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt="Preview Image"
            width={1000}
            height={1000}
            className="object-cover w-full rounded-lg"
          />
        )}
      </div>
      <div className="flex justify-between text-sm font-light">
        <h4>{likes?.length} Likes</h4>
        <h4>{post.comments?.length} Comments</h4>
      </div>
      <hr />
      {/* likes button and comment button */}
      <div className="flex justify-between">
        <Button
          variant="secondary"
          className={cn("space-x-1", {
            "bg-blue-400 text-white hover:bg-blue-400": liked,
          })}
          onClick={handleclicklike}
        >
          <ThumbsUpIcon size={16} /> <span>{liked ? "liked" : "like"}</span>
        </Button>

        <Button variant="secondary" className="space-x-1">
          <MessageSquareTextIcon size={16} /> <span>Comment</span>
        </Button>
      </div>
      <div>
        <form action="">
          <div className="flex space-x-1">
            <Avatar>
              <AvatarImage src={user?.imageUrl || ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <input
              className="flex-1 outline-none border rounded-full p-2"
              type="text"
              name="post_content"
              id="post_content"
              placeholder="Write a comment...."
            />
          </div>
        </form>
      </div>
      {/* <CommentsWidget /> */}
    </div>
  );
}

export default PostWidget;
