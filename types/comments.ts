import { Types } from "mongoose";
import { IUser } from "./user";

export interface ICommentBase {
  user: IUser;
  text: string;
}

export interface IComment extends Document, ICommentBase {
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
}
