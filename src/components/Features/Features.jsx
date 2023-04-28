import React from "react";
import Card from "./Card";
import BookmarkIcon from "../../assets/Frame 40250.svg";
import ShareIcon from "../../assets/Frame 40250share.svg";
import SearchIcon from "../../assets/Frame 40250search.svg";
import CommandIcon from "../../assets/Frame 40250command.svg";
import Card1 from "../../assets/Card.mp4";
import LCLogo from "../../assets/LCLogo.svg";
import mainlogoWhite from "../../assets/mainlogoWhite.svg";
import instagram from "../../assets/instagram.svg";
import medium from "../../assets/medium.svg";
import discord from "../../assets/discord.svg";
import twitter from "../../assets/twitter.svg";
import Grill from "../../assets/Grill.svg";
import Vector from '../../assets/Vector.png'
import { Link } from "react-router-dom";
import FamewallEmbed from 'react-famewall'

const Features = ({ windowWidth }) => {
  return (
    <>
      <div id="how-it-works" className={`flex flex-wrap ${windowWidth < 700 ? 'flex-col' : ""} w-[100%] gap-[26px] items-center justify-center mx-auto mt-[50px] lg:w-[800px] lg:mt-[200px] xl:w-[780px] xl:mt-[400px] 2xl:-[800px]`}>
        <Card
          img={BookmarkIcon}
          title={"Save from anywhere"}
          details={
            "Use our browser extension on any browser to save any link to your collection with just a right click ✅"
          }
        />
        <Card
          img={ShareIcon}
          title={"Share to anyone"}
          details={
            "we create a shareable link instantly so you can share your bookmarks with your friends supa fast "
          }
        />
        <Card
          img={SearchIcon}
          title={"Discover the best"}
          details={
            "Explore what people are liking the most, upvote and save collections you like 💼"
          }
        />
        {windowWidth > 700 &&
          <Card
            img={CommandIcon}
            title={"Access bookmarks using commands"}
            details={
              "Use our commands and key shortcuts anywhere on your browser to save your time, do shit that matters instead 👀"
            }
          />}
      </div>
      {/* Card Animation Section  */}


      {/*Mobile design only*** */}
      <div className="flex  flex-col justify-center items-center mx-auto my-12  xl:ml-48 xl:flex-row">
        <div className="block sm:hidden">
          <div className="flex  flex-col items-center justify-center gap-2 mx-auto w-72">
            <img src={Vector} alt='banner image' className="w-64 h-60" />
            <h1 className="w-72 h-[3.4rem] lexend font-semibold text-center text-textPrimary mx-auto">Stay organized, save
              your web links</h1>
          </div>
          <div className="w-[21.8rem] h-44 mx-auto  py-6 flex flex-col items-center justify-cemter gap-2 rounded-md my-6 border-solid border-[1px] border-primary">
            <div className="flex items-center justify-start gap-2">
              <img src={LCLogo} alt="" className="w-[1.3rem] h-[1.3rem] ml-4" />
              <h1 className="text-primary lexend text-[1.2rem] leading-5 w-[21.7rem] h-5 font-bold text-start">
                Share your LinkCollect profile
              </h1>
            </div>
            <p className="text-textPrimary text-sm text-left lexend font-light mt-4  mx-auto w-[18.4rem] h-[5.32rem] flex items-center justify-center">
              with anyone and they can view all your public collections that you have created, do research and curate good collections and share with the worlds
            </p>
          </div>

          {/*Create Aweasome collection of links */}
          <div className="w-[21.8rem] h-44 mx-auto  py-6 flex flex-col items-center justify-cemter gap-3 rounded-md my-6 border-solid border-[1px] border-primary">
            <div className="flex items-center justify-start gap-2">
              <img src={LCLogo} alt="" className="w-[1.3rem] h-[1.3rem] ml-4" />
              <h1 className="text-primary lexend text-[1.2rem] leading-5 w-[21.7rem] h-5 font-bold text-start">
                Create awesome collections of links                </h1>
            </div>
            <p className="text-textPrimary text-sm text-left lexend font-light mt-4  mx-auto w-[18.4rem] h-[5.32rem] flex items-center justify-center">
              maybe your favourite videos, blogs, twitter threads, ai tools or learning resources and share these collections with your friends in just one click right from our browser extension, yes it's that simple 😉

            </p>
          </div>

        </div>

        {/* Dekstop Design*** */}
        <div className="hidden sm:flex sm:items-center sm:justify-between sm:w-11/12 sm:flex-row">
          <div className="mt-10 ">
            <video
              style={{ width: "825px", height: "448px" }}
              src={Card1}
              muted
              autoPlay
              loop
            ></video>
          </div>
          <div className="main-div  mx-auto mt-4  xl:mt-24">
            <div className="sub-div flex">
              <div>
                <img src={LCLogo} alt="" className="sm:w-[20px] xl:w-[30px]" />
              </div>
              <div>
                <h1 className=" text-[#6166F1] font-bold sm:text-2xl xl:text-4xl xl:ml-5">
                  Create awesome collections of links
                </h1>
              </div>
            </div>
            <div className="w-3/5 text-left leading-8 xl:ml-9">
              <p className="">
                maybe your favourite videos, blogs, twitter threads, ai tools or
                learning resources and share these collections with your friends
                in just one click right from our browser extension, yes it's that
                simple 😉{" "}
              </p>
            </div>
            <div className="main-div mt-8 ">
              <div className="sub-div flex ">
                <div>
                  <img src={LCLogo} alt="" className="sm:w-[20px] xl:w-[30px]" />
                </div>
                <div>
                  <h1 className="ml-5 text-[#6166F1] font-bold sm:text-2xl xl:text-4xl">
                    Share your LinkCollect profile
                  </h1>
                </div>
              </div>
              <div className="w-3/5 text-left ml-9 leading-8">
                <p>
                  with anyone and they can view all your public collections that
                  you have created or if you will create later{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className='mx-auto w-full'>
                <FamewallEmbed
                    wallUrl="linkcollect"
                    carouselMode={true}
                />
            </div>
      {/* Footer */}
      <img src={Grill} alt="" className="mt-16 xl:mt-32" />
      <div className="main-footer">
        <div className="sub-footer flex flex-col justify-around items-center gap-0 xl:gap-12 bg-[#6166F1] py-2 h-[7.5rem] xl:h-max w-[100%]">
          <div className="flex w-full items-center justify-around">
            <div className="flex flex-col">
              <img src={mainlogoWhite} alt="logo" className="w-[5.3rem] mt-4 xl:w-60" />
              <p className="text-left ml-2 w-[8.1rem] h-10 text-[#FFF] lexend font-light text-[8px] leading-3 xl:text-[18px] xl:leading-[30px] xl:w-[442px] xl:h-[28px] xl:ml-7 ">
                When you find something you like on the internet, save it with
                linkcollect before you forget
              </p>
              <div className="loco-tray flex gap-4 mt-4 ml-3 cursor-pointer items-center xl:gap-7 xl:ml-7 xl:mt-14">
                <a href="https://twitter.com/linkcollect_io" target="_blank" className="xl:w-auto w-[0.48rem] h-[0.4rem]"><img src={twitter} alt="" /></a>
                <a href="https://www.instagram.com/linkcollect/" target="_blank" className="xl:w-auto w-[0.48rem] h-[0.4rem]"><img src={instagram} alt="" /></a>
                <a href="https://medium.com/@askwhyharsh" target="_blank" className="xl:w-auto w-[0.48rem] h-[0.4rem]"><img src={medium} alt="" /></a>
                <a href="https://discord.gg/Pt9b4AefE9" target="_blank" className="xl:w-auto w-[0.48rem] h-[0.4rem]"><img src={discord} alt="" /></a>
              </div>
            </div>

            <div className=" flex flex-col text-left space-y-2 text-[0.45rem] leading-[0.5rem] xl:gap-4 font-light xl:text-[18px] xl:leading-[22px] xl:text-left text-bgPrimary xl:mb-15 lexend">
              <p>How it works</p>
              <p>FAQs</p>
              <p>Request demo</p>
              <Link to='/privacy'><p>Privacy Policy</p></Link>
              <p>Contact us</p>
            </div>
          </div>
          <div className="w-full flex text-[5px] items-center justify-end  mb-6 mt-2  space-x-16 pr-12  leading-[6px]  text-bgPrimary font-thin xl:text-xs xl:gap-60 xl:pr-60 lexend">
            <div>2023 @linkcollect.io</div>
            <div>linkcollect.io@gmail.com</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
