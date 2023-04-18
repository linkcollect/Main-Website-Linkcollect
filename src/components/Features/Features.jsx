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

const Features = () => {
  return (
    <>
      <div className="flex flex-wrap  w-[780px] gap-[26px] items-center justify-center mx-auto mt-[400px]" id="how-it-works">
        <Card
          img={BookmarkIcon}
          title={"Save from anywhere"}
          details={
            "Use our chrome extension on any browser to save any link to your collection with just a right click"
          }
        />
        <Card
          img={ShareIcon}
          title={"Share to anyone"}
          details={
            "we create a shareable link instantly so you can share your bookmarks with your friends super fast"
          }
        />
        <Card
          img={SearchIcon}
          title={"Discover the best"}
          details={
            "Explore what people are liking the most, upvote collections you like "
          }
        />
        <Card
          img={CommandIcon}
          title={"Access bookmarks using commands"}
          details={
            "Share collectionName & instantly replace the text with a shareable link of the collection, to share it even faster"
          }
        />
      </div>
      {/* Card Animation Section  */}
      <div className="flex justify-center w-full items-center mt-24 mb-8 px-[170px]">
        <div className="flex-1 w-[200px] flex justify-center ml-10">
          <video
            style={{  height: "448px" }}
            src={Card1}
            muted
            autoPlay
            loop
          ></video>
        </div>
        <div className="flex flex-col gap-[60px] w-[50%]">
          <div>
          <div className="flex ">
            <div>
              <img src={LCLogo} alt="" />
            </div>
            <div>
              <h1 className="ml-5 text-[#6166F1] font-bold text-4xl">
                Create awesome collections of links
              </h1>
            </div>
          </div>
          <div className=" text-left ml-9 leading-8 font-light text-xl">
            <p>
              maybe your favourite videos, blogs, twitter threads, ai tools or
              learning resources and share these collections with your friends
              in just one click right from our browser extension, yes it's that
              simple 😉{" "}
            </p>
          </div>
          </div>
          <div>
            <div className="flex">
              <div>
                <img src={LCLogo} alt="" />
              </div>
              <div>
                <h1 className="ml-5 text-[#6166F1] font-bold text-4xl">
                  Share your LinkCollect profile
                </h1>
              </div>
            </div>
            <div className=" text-left ml-9 leading-8 font-light text-xl">
              <p>
                with anyone and they can view all your public collections that
                you have created or if you will create later{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <img src={Grill} alt="" className="mt-32" />
      <div className="main-footer ">
        <div className="sub-footer flex justify-around items-center bg-[#6166F1] pt-10 pb-10">
          <div className="flex flex-col">
            <img src={mainlogoWhite} width="241px" alt="" />
            <p className="text-left ml-7 w-3/4 text-[#FFF] ">
              When you find something you like on the internet, save it with
              linkcollect before you forget
            </p>
            <div className="loco-tray flex gap-7 ml-7 mt-14 cursor-pointer items-center">
              <a href="https://twitter.com/linkcollect_io" target="_blank"><img src={twitter} alt="" /></a>
              <a href="https://www.instagram.com/linkcollect/" target="_blank"><img src={instagram} alt="" /></a>
              <a href="https://medium.com/@askwhyharsh" target="_blank"><img src={medium} alt="" /></a>
              <a href="https://discord.gg/Pt9b4AefE9" target="_blank"><img src={discord} alt="" /></a>
            </div>
          </div>

          <div className=" flex flex-col gap-4 font-light text-left text-[#FFF] mb-15 ">
            <p>How it works</p>
            <p>FAQs</p>
            <p>Request demo</p>
            <p>Contact us</p>
          </div>
        </div>
        <div className="flex justify-around text-center bg-[#6166F1] text-[#fff] font-thin text-xs pb-5">
          <div>2023 @linkcollect.io</div>
          <div>Help@linkcollect.xyz</div>
        </div>
      </div>
    </>
  );
};

export default Features;
