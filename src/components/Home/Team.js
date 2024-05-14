import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip.tsx";
const people = [
  {
    id: 1,
    name: "Abhimanyu Kumar Jha",
    designation: "Frontend Developer",
    image:
      "/abhimanyu.jpg",
  },
  {
    id: 2,
    name: "Ayush Gupta",
    designation: "Backend Developer",
    image: "/ayush.png",
  },
  {
    id: 3,
    name: "Hardik Garg",
    designation: "WebRTC Expert",
    image:
      "/hardik.jpg",
  },
  {
    id: 4,
    name: "Ayush Anand",
    designation: "ML Expert",
    image:
      "/anand.jpg",
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
