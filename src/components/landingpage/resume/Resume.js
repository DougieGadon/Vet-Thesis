import Title from "../layouts/Title";
import LeftBanner from "./LeftBanner";
import RightBanner from "./RightBanner";

const Resume = () => {
  return (
    <section id="resume" className="w-full py-20 border-b-[1px] border-b-black">
      <Title title="About Us" />
      <LeftBanner />
      <RightBanner />
    </section>
  );
};

export default Resume;
