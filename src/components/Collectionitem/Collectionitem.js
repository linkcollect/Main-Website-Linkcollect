import React from "react";
import { Link } from "react-router-dom";
import collectionImage from "../../assets/collectionImage.png";
import upvote from "../../assets/Upvote.svg";
import dot from "../../assets/3dot.svg";
const Collectionitem = ({ id, image, title, links, type, explore }) => {
  return (
    <>
      <Link
        to={`/${id}`}
        className="bg-bgPrimary border border-textSecondary rounded-lg overflow-hidden w-[269px]"
      >
        <img src={image || collectionImage} />

        <div className="m-3">
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold text-textPrimary text-[14px]">
              {title}
            </p>
            <p className="text-textPrimary font-light text-[12px]">
              {links} Links
            </p>
          </div>
          <div className="bg-white flex mb-3">
            <p className="px-6 border border-textSecondary rounded-full text-sm font-light">
              {type}
            </p>
          </div>

          {/* It will be shown when we will be in explore section */}
          {explore && (
            <div className="flex justify-between">
              <button className="rounded-lg bg-primary font-normal text-bgPrimary py-2 px-4 flex items-center justify-center gap-2">
                <span className="text-[13px]">Upvote</span>{" "}
                <img src={upvote} alt="upvote" />
              </button>
              <button className="rounded-md border border-textSecondary py-2 px-4">
                <img src={dot} alt="menu" />
              </button>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default Collectionitem;
