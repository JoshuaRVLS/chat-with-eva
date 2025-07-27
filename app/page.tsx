import React, { useContext } from "react";
import Characters from "./components/Home/Characters/Characters";
import History from "./components/Home/History/History";

const HomePage = () => {
  return (
    <div className="pt-30 px-12 flex justify-center w-full h-full scrollbar-hide">
      <div className="lg:w-1/2 h-fit flex flex-col scrollbar-hide">
        <History />
        <Characters />
      </div>
    </div>
  );
};

export default HomePage;
