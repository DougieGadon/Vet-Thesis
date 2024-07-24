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
// import FacebookMsg from "../chatbox/FacebookMsg";
// import { FloatingWhatsApp } from "react-floating-whatsapp";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const theme = {
  background: "#f5f8fb",
  headerBgColor: "rgb(110, 72, 170)",
  headerFontSize: "20px",
  botBubbleColor: "rgb(110, 72, 170)",
  headerFontColor: "white",
  botFontColor: "white",
  userBubbleColor: "#0F3789",
  userFontColor: "white",
};

const steps = [
  {
    id: "0",
    message: "Hi there!",
    trigger: "1",
  },
  {
    id: "1",
    message: "Please write your name.",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: " Hi {previousValue}, how can I help you?",
    trigger: 4,
  },
  {
    id: "4",
    options: [
      {
        value: 1,
        label: "View Schedules in San Francisco Branch",
        trigger: "5",
      },
      { value: 2, label: "View Schedules in Manggahan Branch", trigger: "6" },
    ],
    //end: true,
  },
  {
    id: "5",
    message:
      " San Francisco Branch: Monday to Saturday: 8AM to 6PM / Sunday: 8AM to 5PM",
    trigger: 7,
  },
  {
    id: "6",
    message:
      " Manggahan Branch: Monday to Saturday: 8AM to 6PM / Sunday: 8AM to 5PM",
    trigger: 7,
  },
  {
    id: "7",
    options: [
      {
        value: 1,
        label: "View Contact Details in San Francisco Branch",
        trigger: "8",
      },
      {
        value: 2,
        label: "View Contact Details in Manggahan Branch",
        trigger: "9",
      },
    ],
  },
  {
    id: "8",
    message:
      " San Francisco Branch: KK Building, Phase 3, Block 11A, Lot 7, Brookside Lane, Brgy. San Francisco, General Trias, Cavite /  Tel: +63 (970)-471-1390",
    trigger: 10,
  },
  {
    id: "9",
    message:
      "Manggahan Branch: A&C Building, Block 8, Lot 20, Sunshine Village, Brgy. Manggahan, General Trias, Cavite /  Tel: +63 (920)-476-1996",
    trigger: 10,
  },
  {
    id: "10",
    options: [
      { value: 1, label: "Continue Chatting?", trigger: "4" },
      { value: 2, label: "End this Chat?", trigger: "11" },
    ],
  },
  {
    id: "11",
    message: " Thank you for contacting us.",
    end: true,
  },
];
const config = {
  floating: true,
};

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
        {/* <FacebookMsg /> */}
        {/* <FloatingWhatsApp
          phoneNumber="+639228674055"
          accountName="Blessed Gerwel"
          allowEsc
          allowClickAway
          notification
          notificationSound
        /> */}
        <ThemeProvider theme={theme}>
          <ChatBot
            // This appears as the header
            // text for the chat bot
            headerTitle="Blessed Gerwel ChatBot"
            steps={steps}
            {...config}
          />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default LandingPage;
