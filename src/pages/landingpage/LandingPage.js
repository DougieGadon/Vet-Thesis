import React from "react";
import Banner from "../../components/landingpage/banner/Banner";
import Contact from "../../components/landingpage/contact/Contact";
import Features from "../../components/landingpage/features/Features";
import Footer from "../../components/landingpage/footer/Footer";
import FooterBottom from "../../components/landingpage/footer/FooterBottom";
import Navbar from "../../components/landingpage/navbar/Navbar";
import Projects from "../../components/landingpage/projects/Projects";
import Resume from "../../components/landingpage/resume/Resume";
import Testimonial from "../../components/landingpage/tesimonial/Testimonial";
import FacebookMsg from "../chatbox/FacebookMsg";

function LandingPage() {
  return (
    <div className="w-full h-auto bg-bodyColor text-lightText px-4">
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        <Banner />
        <Features />
        <Projects />
        <Resume />
        {/* <Testimonial /> */}
        <Contact />
        {/* <Footer /> */}
        {/* <FooterBottom /> */}
        <FacebookMsg />
      </div>
    </div>
  );
}

export default LandingPage;
