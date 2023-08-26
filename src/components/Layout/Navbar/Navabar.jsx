import React from "react";
import Button from "../../UI/Button/Button";
import MainLogo from "../../../assets/mainLogo.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navabar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navabrItem = [
    {
      name: "Contact us",
      link: "https://linktr.ee/askwhyharsh"
    },
    {
      name: "FAQs",
      link: "https://linkcollect.super.site/help"
    },
    {
      name: "Feedback",
      link: "https://forms.gle/Dg5ehCAR4AEZBnF89"
    },
  ];
  return (
    <div className="flex justify-between w-full border-b border-neutral-200 bg-neutral-50">
            <div className="my-auto px-4 flex items-center align-center justify-start sm:w-32 sm:h-10">
              <Link to="/">
                <img src={MainLogo} alt="" className="w-32 sm:ml-2 h-14" />
              </Link>
            </div>
    <nav className="flex items-center justify-end w-full gap-5 px-8 max-w-[1500px] py-3 ">
      {(navabrItem.map(({ name, link }) => (
        <a href={link} target="_blank" className=" hidden sm:flex items-center justify-center rounded" key={link} rel="noreferrer">
          <span className="text-base font-normal text-center text-neutral-600">
            {name}
          </span>
        </a>
      )))} 
        {!isLoggedIn && <a href="https://chrome.google.com/webstore/detail/linkcollect/knekpacpcgkieomkhhngenjeeokddkif" rel="noreferrer" target="_blank"><Button className="px-[9.6px] py-[1rem] rounded-[4.8px] text-[0.75rem] font-normal h-6 w-max">Try LinkCollect</Button></a>}
    </nav>
    </div>
  );
};

export default Navabar;
