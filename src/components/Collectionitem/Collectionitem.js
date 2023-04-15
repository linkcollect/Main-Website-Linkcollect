import React from "react";
import { Link } from "react-router-dom";
import collectionImage from "../../assets/collectionImage.png";
import upvote from "../../assets/Upvote.svg";
import dot from "../../assets/3dot.svg";
import noUpvote from "../../assets/Vector.svg";
const Collectionitem = ({
  id,
  image,
  title,
  links,
  type,
  explore,
  isUpvoted,
  upVote,
}) => {
  return (
    <>
      <div className="bg-bgPrimary border-2 border-bgSecondary rounded-lg overflow-hidden w-[269px]">
        <div>
          <Link to={`/${id}`}>
            <img src={image || collectionImage} />
            <div className="flex justify-between items-center m-3">
              <p className="font-semibold text-textPrimary text-[14px]">
                {title}
              </p>
              <p className="text-textPrimary font-light text-[12px]">
                {links} Links
              </p>
            </div>
          </Link>

          {/* Condional rendering based on tabs 
            if explore tab opens
              ==> Show Upvote button
            if My collections tab open
              ==> show public or private option
          */}
          <div className="flex justify-between m-3 items-center">
            {explore ? (
              <button
                className={`rounded-lg w-[50%] transition duration-200 ease-in-out ${
                  isUpvoted
                    ? "bg-primary text-bgPrimary"
                    : "bg-bgPrimary text-textPrimary"
                } font-normal py-2 px-4 flex items-center justify-center gap-2 border border-primary`}
                onClick={() => upVote(id)}
              >
                <span className="text-[13px]">Upvote</span>{" "}
                <img src={isUpvoted ? upvote : noUpvote} alt="upvote" />
              </button>
            ) : (
              <div>
                <p className="px-6  border border-textSecondary rounded-full text-sm font-light">
                  {type}
                </p>
              </div>
            )}

            <button className="rounded-md border-2 border-secondary py-3 px-4">
              <img src={dot} alt="menu" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collectionitem;
