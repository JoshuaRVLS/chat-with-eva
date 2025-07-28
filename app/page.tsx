import React, { useContext } from "react";
import Characters from "./components/Home/Characters/Characters";
import History from "./components/Home/History/History";

const HomePage = () => {
  return (
    <div className="mt-32 px-12 flex flex-col w-full h-full scrollbar-hide">
      <History />
      <Characters />
    </div>
  );
};

export default HomePage;
