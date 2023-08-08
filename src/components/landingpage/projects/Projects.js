import React from "react";
import Title from "../layouts/Title";
import { projectOne, projectTwo, projectThree } from "../../../assets/index";
import ProjectsCard from "./ProjectsCard";

const Projects = () => {
  return (
    <section
      id="projects"
      className="w-full py-20 border-b-[1px] border-b-black"
    >
      {/* <div className="flex justify-center items-center text-center">
        <Title
          title="VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK"
          des="My Projects"
        />
      </div> */}
      <Title title="Doctors" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-14">
        <ProjectsCard
          title="DR. HANS JOSHUA AGGABAO"
          des=" Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo quibusdam voluptate sapiente voluptatibus harum quidem!"
          src="/assets/doctors/william.jpg"
        />
        <ProjectsCard
          title="DR. JOSH RYAN AGGABAO"
          des=" Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo quibusdam voluptate sapiente voluptatibus harum quidem!"
          src="/assets/doctors/milton.jpg"
        />
      </div>
    </section>
  );
};

export default Projects;
