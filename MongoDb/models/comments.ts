import { IComment } from "@/types/comments";
import mongoose, { Schema, models } from "mongoose";

const commentSchema = new Schema<IComment>(
  {
    user: {
      userId: { type: String, required: true },
      userImage: { type: String, required: true },
      firstName: { type: String, required: true },
      lastname: { type: String },
    },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Comment =
  models.Comment || mongoose.model<IComment>("Comment", commentSchema);
