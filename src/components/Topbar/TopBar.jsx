import React, { useState } from "react";
import Search from "../Search/Search";
import backarrow from "../../assets/back-arrow.svg";
import profileImage from "../../assets/profileImage.svg";
import { Link } from "react-router-dom";
import MainLogo from "../../assets/mainLogo.svg";
import { on } from "process";
import { useSelector } from "react-redux";
const TopBar = ({
  windowWidth,
  onBack,
  collectionName,
  collectionDesc,
  noOfLinks,
}) => {
  const [display, setDisplay] = useState(false);
  const auth = useSelector((state) => state.auth);

  const clickhandler = () => {
    setDisplay(!display);
  };

  return (
    <>
      <div className="w-full px-8 bg-bgPrimary py-2 sm:py-4">
        {/* Actions */}
        <div className="flex justify-between bg-bgPrimary mb-5 sm:mb-2">
          {/* <div className='border-2'>Sidebar</div> */}
          <div className="flex items-center">
            <button onClick={onBack}>
              <img src={backarrow} className="rotate-[268deg] w-8" alt="" />
            </button>
          </div>
          {windowWidth < 600 && (
            <div className="w-32 h-10 flex items-center justify-end">
              <Link to="/">
                <img src={MainLogo} alt="" className="w-32 h-14 ml-2" />
              </Link>
            </div>
          )}
          {windowWidth > 600 && !auth.token && (
            <div className="flex space-x-2">
              <button className="lexend text-base text-primary rounded-lg border-primary border-2 px-3 py-2 sm:px-7 sm:py-2">
                Log in
              </button>
              <button className="lexend text-base bg-primary rounded-lg border-primary border-2 px-3 py-2 sm:px-7 sm:py-2  text-bgPrimary">
                Sign up
              </button>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row justify-between  sm:ml-10 sm:mt-2">
          <div className="flex">
            <div className="flex justify-between w-full h-[80px] sm:w-[140px] sm:h-[89px]">
              <img
                src={profileImage}
                className="rounded w-[140px] h-[70px]  sm:w-[270px] sm:h-[89px] object-cover"
                alt=""
              />
            </div>
            <div className="flex flex-col text-left sm:ml-10">
              <h1 className="lexend text-xl font-bold">{collectionName}</h1>
              <p className="w-10/12 mt-2 text-sm break-all">{collectionDesc}</p>
            </div>
          </div>

          {windowWidth < 600 && (
            <div className="">
              <p className="w-20 h-6">{noOfLinks} Links</p>
            </div>
          )}

          {windowWidth > 600 && (
            <div className="sm:mr-20 w-28 mt-1">
              <p className="w-20 h-6">{noOfLinks} Links</p>
            </div>
          )}
        </div>

        {/* Search Bar and Filter */}
        <div className="sm:ml-10 mt-5 sm:mr-10  flex ">
          <Search />
          <div className="relative">
            <button
              onClick={clickhandler}
              className="inline-flex border-grey border-2 text  items-center py-2.5 px-3 ml-2  rounded-xl"
            >
              <svg
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="bg-transparent w-4 h-4 sm:w-6 sm:h-6 "
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.8377 3.54075H22.224C21.6564 1.93468 20.1246 0.783997 18.3242 0.783997C16.5238 0.783997 14.992 1.93468 14.4243 3.54075H1.78365C1.0224 3.54075 0.405273 4.15788 0.405273 4.91913C0.405273 5.68038 1.0224 6.29751 1.78365 6.29751H14.4243C14.992 7.90358 16.5238 9.05427 18.3242 9.05427C20.1246 9.05427 21.6564 7.90358 22.224 6.29751H23.8377C24.599 6.29751 25.2161 5.68038 25.2161 4.91913C25.2161 4.15788 24.599 3.54075 23.8377 3.54075ZM18.3242 6.29751C19.0855 6.29751 19.7026 5.68038 19.7026 4.91913C19.7026 4.15788 19.0855 3.54075 18.3242 3.54075C17.5629 3.54075 16.9458 4.15788 16.9458 4.91913C16.9458 5.68038 17.5629 6.29751 18.3242 6.29751ZM0.405273 13.1894C0.405273 12.4281 1.0224 11.811 1.78365 11.811H3.39733C3.96499 10.205 5.4967 9.05427 7.29717 9.05427C9.09763 9.05427 10.6294 10.205 11.197 11.811H23.8377C24.599 11.811 25.2161 12.4281 25.2161 13.1894C25.2161 13.9507 24.599 14.5678 23.8377 14.5678H11.197C10.6294 16.1739 9.09763 17.3245 7.29717 17.3245C5.4967 17.3245 3.96499 16.1739 3.39733 14.5678H1.78365C1.0224 14.5678 0.405273 13.9507 0.405273 13.1894ZM7.29717 14.5678C8.05843 14.5678 8.67554 13.9507 8.67554 13.1894C8.67554 12.4281 8.05843 11.811 7.29717 11.811C6.53591 11.811 5.91879 12.4281 5.91879 13.1894C5.91879 13.9507 6.53591 14.5678 7.29717 14.5678ZM1.78365 20.0813C1.0224 20.0813 0.405273 20.6984 0.405273 21.4597C0.405273 22.221 1.0224 22.8381 1.78365 22.8381H14.4243C14.992 24.4441 16.5238 25.5948 18.3242 25.5948C20.1246 25.5948 21.6564 24.4441 22.224 22.8381H23.8377C24.599 22.8381 25.2161 22.221 25.2161 21.4597C25.2161 20.6984 24.599 20.0813 23.8377 20.0813H22.224C21.6564 18.4752 20.1246 17.3245 18.3242 17.3245C16.5238 17.3245 14.992 18.4752 14.4243 20.0813H1.78365ZM19.7026 21.4597C19.7026 22.221 19.0855 22.8381 18.3242 22.8381C17.5629 22.8381 16.9458 22.221 16.9458 21.4597C16.9458 20.6984 17.5629 20.0813 18.3242 20.0813C19.0855 20.0813 19.7026 20.6984 19.7026 21.4597Z"
                  fill="#6166F1"
                />
              </svg>
            </button>

            {display && (
              <div className="w-[11rem] absolute block right-7  ">
                <div className="mr-2 cursor-pointer bg-bgPrimary p-2 mt-2 rounded-xl border-grey border-2 leading-6 shadow-xl">
                  <p className="cursor-pointer">Newest To Oldest </p>
                  <p className="cursor-pointer">Oldest To Newest</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
