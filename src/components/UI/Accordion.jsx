import React, { useState } from "react";

const Tab = ({ title, content }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <div className="py-2">
      <button
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        className="w-full flex justify-between"
      >
        <span>{title}</span>
        <div
          className={`w-2 h-2 border-t-2 border-r-2 border-slate-800 transition-all duration-300 ease-in-out ${
            isAccordionOpen ? "rotate-[135deg]" : "rotate-[45deg]"
          } `}
        ></div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out text-sm text-gray-900 ${
          isAccordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{content}</div>
      </div>
    </div>
  );
};

const Accordion = () => {
  const accordionData = [
    {
      id: 1,
      title: "Section 1",
      content:
        "This is the content for Section 1. Here you can put any relevant information.",
    },
    {
      id: 2,
      title: "Section 2",
      content:
        "This is the content for Section 2. You can also include images, links, or any other HTML content here.",
    },
    {
      id: 3,
      title: "Section 3",
      content:
        "This is the content for Section 3. Adding detailed information here helps users understand the context better.",
    },
  ];

  return (
    <div className="bg-violet-50 min-h-screen mt-10">
      <div className="bg-slate-300 w-[80%] m-auto p-6 rounded-lg shadow-xl">
        {accordionData.map((item) => {
          return (
            <Tab key={item.id} title={item.title} content={item.content} />
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
