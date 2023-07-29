import NavBar from "../../NavBar/NavBar";
import Hero from "./Hero/Hero";
import Doctors from "./Doctors/Doctors";
import SomeServices from "./SomeServices/SomeServices";
import QNA from "./QNA/QNA";
import Testimonials from "./Testimonials/Testimonials";
import Footer from "./Footer/Footer";
import FacebookMsg from "../ChatBox/FacebookMsg";

const Main = () => {
  return (
    <div className="bg-bgGreen">
      <NavBar />
      <Hero />
      <SomeServices />
      <QNA />
      <Testimonials />
      <Footer />
      <FacebookMsg/>
    </div>

  );
};

export default Main;
