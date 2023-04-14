import React from "react";
import "./styles.css";
import collectionImage from "../../assets/collectionImage.png";


const Collectionitem = (props) => {
  return (
    <>
      <div
        className=" col-2 h-14 bg-white border-gray-200 "
        style={{ maxWidth: "16rem" }}
      >
        <img
          src={props.image || collectionImage}
          alt=""
          style={{
            width: "286px",
            maxWidth: "inherit",
            borderRadius: "7px 7px 0px 0px",
          }}
        />
        <div className="flex flex-row justify-around bg-white">
          <h5 className="mb-2 font-semibold tracking-tight text-gray-900 bg-transparent flex mt-2 pl-2 pt-2 cardTitle">
            {props.title}
          </h5>
          <p className="mb-2 text tracking-tight text-gray-900 bg-transparent flex m-2 onlyFont ml-10 mt-4">
            {props.links}
          </p>
        </div>
        <div className="bg-white p-3 flex">
          <p
            href="/"
            className="inline-flex items-center onlyFont bg-transparent border-gray-500 border-solid border-2 rounded-3xl privacyFont  pl-6 pr-6 leading-4"
          >
            {props.type}
          </p>
        </div>
      </div>
    </>
  );
};

export default Collectionitem;
