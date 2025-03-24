import React from "react";
import TopCategory from "../components/TopCategory";
import Trending from "../components/Trending";
import Latest from "../components/Latest";
import Ads from "../components/Ads";
const Home = () => {
  return (
    <div className="h-screen-[25%] flex flex-col">
         <TopCategory />
        {/* Main Content Section */}
        <main className="w-full">
          <Trending />
          <div className="sticky flex flex-row gap-5">
          <Latest />
          <Ads />
          </div>
        </main>
      </div>
  );
};

export default Home;
