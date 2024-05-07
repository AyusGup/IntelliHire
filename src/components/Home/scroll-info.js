import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal.tsx";
// import Image from "next/image";

const content = [
  {
    title: "AI and Manual Interviews",
    description:
      "Embrace a comprehensive interview experience that combines cutting-edge AI technology with expert manual evaluations. Our innovative approach ensures thorough assessments of your skills and capabilities, providing detailed feedback to help you excel in your career journey.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Seamless Company Interview Platform",
    description:
      "Simplify and streamline your hiring process with our intuitive platform designed to meet all your interviewing needs. From scheduling and conducting interviews to managing candidate interactions and making informed hiring decisions, our platform offers a seamless experience every step of the way. With everything in one place, you can focus on finding the best talent for your team.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <img
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Company-Specific Question Datasets",
    description:
      "Elevate your interview preparation with access to our extensive library of company-specific question sets. Whether you're targeting a specific industry or role, our curated datasets provide invaluable insights into the types of questions you can expect during the interview process. By practicing with real-world scenarios tailored to your desired company, you'll be well-equipped to showcase your skills and stand out from the competition.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Version control
      </div>
    ),
  },
  {
    title: "Industry Standard Benchmark Scores",
    description:
      "Ditch the uncertainty and gain clarity on your performance with our precise scoring system. Our benchmark scores are meticulously calibrated against industry standards, offering invaluable insights into your strengths and areas for development. With this knowledge, you can confidently navigate the competitive landscape of the job market.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Running out of content
      </div>
    ),
  },
  {
    title: "Tailored Candidate Recommendations",
    description:
      "Say goodbye to the tedious process of sifting through countless resumes. Our platform delivers a personalized selection of potential candidates perfectly aligned with your company's unique requirements. By leveraging advanced algorithms and targeted criteria, we streamline the candidate selection process, saving you valuable time and resources.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Running out of content
      </div>
    ),
  },
];
export default function StickyScrollRevealDemo() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}
