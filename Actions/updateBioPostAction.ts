"use server";
import { connectDB } from "@/MongoDb/db";
import { Bio } from "@/MongoDb/models/profile";
import { IBioBase } from "@/types/profile";

export async function updateBioPostAction(formdata: IBioBase, userId: string) {
  // console.log(formdata);
  await connectDB();
  const bio = await Bio.findOne({ userId: userId });
  if (!bio) {
    throw new Error("Cannot update Bio");
  }
  // console.log("upated bio in updateBioPostAction", formdata);
  const result = await bio.updateBio(formdata);
  // console.log("result im updateBioPostAction", result);
  return result;
}
