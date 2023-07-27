import React from "react";

const Navabar = () => {
  const navabrItem = [
    {
      name: "Contact us",
    },
    {
      name: "FAQs",
    },
    {
      name: "Feedback",
    },
  ];
  return (
    <nav className="flex items-center justify-end w-full gap-5 px-20 py-3 border-b border-neutral-200 bg-neutral-50">
      {navabrItem.map(({ name }) => (
        <div className="flex items-center justify-center rounded">
          <span className="text-base font-normal text-center text-neutral-600">
            {name}
          </span>
        </div>
      ))}
    </nav>
  );
};

export default Navabar;
