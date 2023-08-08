import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Media from "./Media";

const LeftBanner = () => {
  const [text] = useTypewriter({
    words: ["Professional Coder.", "Full Stack Developer.", "UI Designer."],
    loop: true,
    typeSpeed: 20,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });
  return (
    <div className="w-full lgl:w-1/2 flex flex-col gap-20">
      <div className="flex flex-col gap-5">
        <h4 className=" text-lg font-normal">WELCOME TO BLESSED GERWEL</h4>
        {/* <h1 className="text-6xl font-bold text-white">
          Hi, I'm <span className="text-designColor capitalize">John doe</span>
        </h1>
        <h2 className="text-4xl font-bold text-white">
          a <span>{text}</span>
          <Cursor
            cursorBlinking="false"
            cursorStyle="|"
            cursorColor="#ff014f"
          />
        </h2> */}
        <p className="text-base font-bodyFont leading-6 tracking-wide">
          Welcome to Blessed Gerwel Veteriary Clinic, where the health and
          well-being of your furry friend is our top priority. Our experienced
          and compassionate team of veterinary professionals is dedicated to
          providing high-quality, comprehensive care for all of your pet's
          needs. At our clinic, we offer a wide range of services to meet the
          diverse needs of our patients, including routine check-ups,
          vaccinations, diagnostic testing, surgical procedures, and much more.
          We understand the special bond that exists between a pet and their
          owner, and we are committed to building strong, lasting relationships
          with all of our clients
        </p>
      </div>
      {/* Media */}
      {/* <Media /> */}
    </div>
  );
};

export default LeftBanner;
