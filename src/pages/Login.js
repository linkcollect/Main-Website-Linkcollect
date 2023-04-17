import React from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import mainLogo from "../assets/mainLogo.svg";
import Input from "../components/Input/Input";
import googleIcon from "../assets/googleIcon.svg";
const LoginPage = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-gradinetInitial to-gradientEnd from-50% h-screen">
        <div className="w-[50%] m-auto">
          <img src={mainLogo} alt="" />
        </div>
        <div className="flex flex-row justify-evenly items-center">
          <Banner />
          <div className="flex items-center justify-center pt-6 ">
            <div className="rounded-2xl bg-bgPrimary shadow-2xl p-10 w-[410px] height[600px]">
              <div>
                <img
                  className="mx-auto h-16 w-36"
                  src={mainLogo}
                  alt="LinkCollect"
                />
                <h2 className="mt-2 mb-3 text-center text-3xl font-bold tracking-tight">
                  Welcome
                </h2>
                <p
                  className="text-center text-lg para -mt-2"
                  style={{ color: "#747474" }}
                >
                  Log in to linkCollect
                </p>
              </div>
              <div className="mt-8 mb-3">
                <div className="mb-3">
                  <Input
                    id="email"
                    name="emial"
                    type="email"
                    placeholder="homelander@gmail.com"
                  />
                </div>
                <div className="mb-4">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                  />
                </div>

                {/* Need to add link after adding the api for forget pass */}
                <p className="text-textSecondary text-left mb-4 font-light">
                  Forget Your Password?
                </p>
                <button className="w-full rounded-lg bg-primary font-bold text-bgPrimary py-3">
                  Login
                </button>
                <p className="font-light text-left text-textSecondary mt-1">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary font-bold">
                    Sign Up
                  </Link>
                </p>
              </div>
              <hr class="hr-text mt-4" data-content="OR" />
              <button className="w-full rounded-lg font-bold text-textPrimary border-2 border-[#ededed] rounded-lg py-3 flex justify-center mt-4">
                <img src={googleIcon} alt="" width="26px" />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
