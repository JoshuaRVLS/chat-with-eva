import React, { useContext } from "react";
import Characters from "./components/Home/Characters/Characters";

const HomePage = () => {
  return (
    <div className="pt-24 flex mt-5 justify-center">
      <div className="lg:w-1/2">
        <Characters />
      </div>
    </div>
  );
};

export default HomePage;
