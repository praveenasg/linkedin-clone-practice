"use server";
import { connectDB } from "@/MongoDb/db";
import { Bio } from "@/MongoDb/models/profile";
import { IBioBase } from "@/types/profile";

export async function updateBioPostAction(formdata: IBioBase, userId: string) {
  // console.log(formdata);
  const updated_bio: IBioBase = {
    bio: formdata.bio,
    city: formdata.city,
    country: formdata.country,
    name: formdata.name,
    pronouns: formdata.pronouns,
    school: formdata.school,
    state: formdata.state,
    userId: userId,
  };
  await connectDB();
  const bio = await Bio.findOne({ userId: userId });
  if (!bio) {
    throw new Error("Cannot update Bio");
  }
  // console.log("upated bio in updateBioPostAction", updated_bio);
  const result = await bio.updateBio(updated_bio);
  // console.log("result im updateBioPostAction", result);
  return result;
}
