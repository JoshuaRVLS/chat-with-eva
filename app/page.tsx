import React, { useContext } from "react";
import Characters from "./components/Home/Characters/Characters";
import History from "./components/Home/History/History";

const HomePage = () => {
  return (
    <div className="pt-30 px-12 flex mt-5 justify-center w-full h-full overflow-auto scrollbar-hide">
      <div className="lg:w-1/2 h-dvh pb-23 flex flex-col scrollbar-hide mb-32">
        <History />
        <Characters />
      </div>
    </div>
  );
};

export default HomePage;
