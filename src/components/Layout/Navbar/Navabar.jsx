import React from "react";
import Button from "../../UI/Button/Button";
import { useSelector } from "react-redux";

const Navabar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
    <nav className="flex items-center justify-end w-full gap-5 px-8 max-w-[1500px] py-3 border-b border-neutral-200 bg-neutral-50">
      {(navabrItem.map(({ name }) => (
        <div className=" hidden sm:flex items-center justify-center rounded" key={name}>
          <span className="text-base font-normal text-center text-neutral-600">
            {name}
          </span>
        </div>
      )))} 
        {!isLoggedIn && <a href="https://chrome.google.com/webstore/detail/linkcollect/knekpacpcgkieomkhhngenjeeokddkif" rel="noreferrer" target="_blank"><Button className="px-[9.6px] py-[1rem] rounded-[4.8px] text-[0.75rem] font-normal h-6 w-max">Try LinkCollect</Button></a>}
    </nav>
  );
};

export default Navabar;
