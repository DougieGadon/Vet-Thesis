import React from "react";
import { bannerImg } from "../../../assets/index";

const RightBanner = () => {
  return (
    <div className="w-full lgl:w-1/2 flex justify-center items-center relative">
      {/* <img
        className="w-[300px] h-[400px] lgl:w-[500px] lgl:h-[680px] z-10"
        src={bannerImg}
        alt="bannerImg"
      />
      <div className="absolute bottom-0 w-[350px] h-[300px] lgl:w-[500px] lgl:h-[500px] bg-gradient-to-r from-[#1e2024] to-[#202327] shadow-shadowOne flex justify-center items-center"></div> */}
      <h1 className="w-full text-[4rem] font-bold leading-[4.2rem] text-secGreen sm:text-[6rem] sm:leading-[5rem] md:text-[7rem] md:leading-[6rem] lg:flex lg:flex-col lg:items-start lg:justify-start lg:text-[9rem] lg:leading-[7.8rem]">
        <div className="">
          Q<span className="text-[#0057B8]">U</span>
          <span className="text-[#FFD500]">A</span>LITY
        </div>
        <div className="gap-64 lg:flex lg:items-center lg:justify-between">
          <div className="">VET</div>
        </div>
        <div className="justify-between lg:flex lg:w-full lg:items-center">
          <p>CARE</p>
        </div>
      </h1>
    </div>
  );
};

export default RightBanner;
