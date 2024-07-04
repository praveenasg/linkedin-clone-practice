import { IBioBase } from "@/types/profile";
import mongoose, { Model, Schema, Types, models } from "mongoose";

interface IBioMethods {
  updateBio(data: IBioBase): Promise<IBioBase>;
}

export interface IBio extends IBioBase, Document {
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
}

export interface IBioDocument extends IBio, IBioMethods {}
interface IBioModel extends Model<IBioDocument, IBioMethods> {}

const BioSchema = new Schema<IBioDocument>(
  {
    userId: { type: String, required: true },
    profileURL: { type: String, required: false },
    profileBackgroundURL: { type: String, required: false },
    name: { type: String, required: true },
    country: { type: String, required: false },
    bio: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
    school: { type: String, required: false },
    pronouns: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

BioSchema.methods.updateBio = async function (data: IBioBase) {
  console.log("inside the update bio");
  const updateDocument = {
    $set: {
      userId: data.userId,
      name: data.name,
      profileBackgroundURL: data.profileBackgroundURL,
      profileURL: data.profileURL,
      country: data.country,
      bio: data.bio,
      state: data.state,
      city: data.city,
      school: data.school,
      pronouns: data.pronouns,
    },
  };
  // console.log("hello");
  // console.log("Filter", filter);
  // console.log("update document", updateDocument);
  console;
  try {
    // console.log("updateDocument in updateBio in profile.ts", updateDocument);
    await Bio.updateOne({ userId: data.userId }, updateDocument);
    return data;
  } catch (error) {
    console.log("Failed to update Profile", error);
  }
};

export async function createBio(userId: string, name: string) {
  const data: IBioBase = {
    userId: userId,
    name: name,
    profileBackgroundURL: "",
    profileURL: "",
    country: "",
    bio: "",
    state: "",
    city: "",
    school: "",
    pronouns: "",
  };
  try {
    await Bio.create(data);
    return data;
  } catch (error) {
    console.log("Failed to create User", error);
  }
}

export const Bio =
  (models.Bio as IBioModel) ||
  mongoose.model<IBioDocument, IBioModel>("Bio", BioSchema);
