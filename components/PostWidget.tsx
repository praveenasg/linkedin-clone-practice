"use client";
import { IPost, IPostDocument } from "@/MongoDb/models/post";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@clerk/nextjs";
import TimeAgo from "react-timeago";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  MessageSquareTextIcon,
  Send,
  ThumbsUpIcon,
  Trash2Icon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { like_Post_request_body } from "@/app/api/posts/[post_id]/like/route";
import { toast } from "sonner";
import { deletePostAction } from "@/Actions/deletePostAction";
import commentPostAction from "@/Actions/commentPostAction";
import ReactTimeago from "react-timeago";

function PostWidget({ post }: { post: IPostDocument }) {
  const { user } = useUser();
  const isAuthor = user?.id === post.user.userId;
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [commentsopen, setCommentsOpen] = useState(false);
  const commentref = useRef<HTMLInputElement>(null);

  //to set initial values on load
  useEffect(() => {
    if (user?.id && post.likes?.includes(user.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post, user]);

  //like unlike function
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

  //handle add comment function
  async function handlecomment() {
    const comment = commentref.current?.value;
    if (commentref.current) {
      commentref.current.value = "";
    }
    if (!comment) {
      return;
    }
    commentPostAction(comment, post._id.toString());
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
                <TimeAgo date={post.createdAt} />
              </p>
            </div>
          </div>
        </div>

        {/* delete button */}
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

        <Button
          variant="secondary"
          className="space-x-1"
          onClick={() => {
            setCommentsOpen(!commentsopen);
          }}
        >
          <MessageSquareTextIcon size={16} /> <span>Comment</span>
        </Button>
      </div>
      {commentsopen && (
        // comments section
        <>
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
              ref={commentref}
            />
            <Button variant="link" onClick={handlecomment}>
              <Send size={16} />
            </Button>
          </div>
          {/* show list of comments on the UI */}
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {post.comments?.map((comment) => (
              <div key={comment._id.toString()}>
                <div className="bg-gray-100 px-4 py-2 rounded-md">
                  <div className="flex items-center space-x-1">
                    <Avatar>
                      <AvatarImage src={comment.user.userImage} />
                      <AvatarFallback>
                        {comment.user.firstName?.charAt(0)}
                        {comment.user.lastname?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div>
                        <p className="font-semibold">
                          {comment.user.firstName} {comment.user.lastname}
                        </p>
                      </div>

                      <p className="text-xs text-gray-400">
                        <ReactTimeago date={new Date(comment.createdAt)} />
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PostWidget;
