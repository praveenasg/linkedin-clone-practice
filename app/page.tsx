import Banner from "@/components/Banner";
import LinkedinNews from "@/components/LinkedinNews";
import PostCard from "@/components/PostCard";
import Posts from "@/components/Posts";

export default async function Home() {
  return (
    <div className="flex flex-col max-w-7xl mx-auto">
      <div className="grid md:grid-cols-6 gap-2 mt-3 md:p-1 ">
        {/* name and bio banner  */}
        <div className="md:col-span-2 lg:col-span-1">
          <Banner />
        </div>

        <div className="md:col-span-4 space-y-3">
          {/* post card */}
          <PostCard />
          <hr className="max-w-xl mx-auto lg:max-w-3xl border-1 border-gray-400" />
          {/* posts */}
          <Posts />
        </div>
        {/* News */}
        <div className="hidden lg:col-span-1 lg:inline">
          <LinkedinNews />
        </div>
      </div>
    </div>
  );
}
