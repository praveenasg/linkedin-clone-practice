import About from "@/components/profile/About";
import Activity from "@/components/profile/Activity";
import Analytics from "@/components/profile/Analytics";
import Education from "@/components/profile/Education";
import Experience from "@/components/profile/Experience";
import HonorsAwards from "@/components/profile/HonorsAwards";
import LanguageAndURL from "@/components/profile/LanguageAndURL";
import LicencesCertifications from "@/components/profile/LicencesCertifications";
import ProfileCard from "@/components/profile/ProfileCard";
import Recommendations from "@/components/profile/Recommendations";
import Resources from "@/components/profile/Resources";
import Skills from "@/components/profile/Skills";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function page({ params }: { params: { profilename: string } }) {
  const user = await currentUser();
  if (!user) {
    console.log("inisde if redirect");
    return redirect("/");
  }
  return (
    <div className="grid md:grid-cols-3 gap-1 xl:max-w-6xl lg:max-w-4xl sm:max-w-xl md:max-w-3xl  mx-auto">
      <div className="md:col-span-2 space-y-2">
        {/* Profile card */}
        <ProfileCard />
        {/* Analytics */}
        <Analytics />
        {/* Resources */}
        <Resources />
        {/* About */}
        <About />
        {/* Activity */}
        <Activity />
        {/* Experience */}
        <Experience />
        {/* Education */}
        <Education />
        {/* Licences & certifications */}
        <LicencesCertifications />
        {/* skills */}
        <Skills />
        {/* Recommendations */}
        <Recommendations />
        {/* Honors & Awards */}
        <HonorsAwards />
      </div>
      {/* profile language and profile url */}
      <LanguageAndURL />
    </div>
  );
}

export default page;
