import { connectDB } from "@/MongoDb/db";
import { Bio, createBio } from "@/MongoDb/models/profile";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(
  request: Request,
  { params: { profile_id } }: { params: { profile_id: string } }
) {
  await connectDB();

  const user = await currentUser();
  const name = user?.firstName || "Update";
  console.log(user?.id);
  if (!user) {
    return;
  }
  const bio = await Bio.findOne({ userId: user.id });

  if (!bio) {
    const bio = await createBio(user?.id as string, name);
    console.log(bio);
    return Response.json(bio);
  }
  return Response.json(bio);
}
