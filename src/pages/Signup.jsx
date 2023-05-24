import React, { useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import mainLogo from "../assets/mainLogo.svg";
import Input from "../components/Input/Input";
import GoogleAuthBtn from "../components/GoogleAuthBtn";
import { register } from "../api-services/authService";
import Emailsent from "../components/EmialVerified/Emailsent";
import Loader from "../components/Loader/Loader";

const Signup = ({windowWidth}) => {
  const [verifying, setVerifying] = useState(false)
  const [isSiging,setIsSigning] = useState(false)

  const handleRegister = async(e)=>{
    e.preventDefault();
    setIsSigning(true);
    try {
      
      const {name, email, password} = e.target;
  
      const {data} = await register(name.value, email.value, password.value.trim());
      setIsSigning(false);
      setVerifying(true);
    } catch (error) {
      setIsSigning(false)
    }
  }

  return (
    <>
      <div className="bg-gradient-to-r from-gradinetInitial to-gradientEnd from-50%">
      <div className="flex flex-col items-center justify-evenly min-h-screen gap-2 pb-12 lg:gap-0 sm:flex-wrap lg:flex-nowrap sm:flex-row md:justify-center md:gap-12 lg:justify-evenly max-w-[2000px] mx-auto">
        {windowWidth > 600 && <Banner />}
          {windowWidth < 600 &&
            <Link to={'/'}>
              <div className="flex items-center justify-center w-full">
                <img src={mainLogo} alt="" className="h-16 w-36" />
              </div>
            </Link>
          }          {!verifying?
            <div className="flex items-center justify-center w-[90%] sm:w-2/3 md:w-1/2 max-w-[420px] sm:max-w-[600px] md:max-w-[420px] ">
            <div className="rounded-2xl bg-bgPrimary shadow-2xl px-10 pt-[40px] pb-[60px] w-full md:w-[410px]">
              <div>
                <img
                  className="h-16 mx-auto w-36"
                  src={mainLogo}
                  alt="LinkCollect"
                />
                <h2 className="mt-2 mb-3 text-xl font-bold tracking-tight text-center sm:text-3xl">
                  Welcome
                </h2>
                <p
                  className="-mt-2 text-sm text-center sm:text-lg para"
                  style={{ color: "#747474" }}
                >
                  Sign Up to LinkCollect
                </p>
              </div>
              <div className="mt-8 mb-3">
                <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name (Water White)"
                  />
                </div>
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
                {/* <p className="mb-4 font-light text-left text-textSecondary">
                  Forget Your Password?
                </p> */}

                <button className="flex items-center justify-center w-full py-3 font-bold rounded-lg bg-primary text-bgPrimary">
                  {!isSiging ? "Sign Up" : <Loader/>}
                </button>
                <p className="mt-1 font-light text-left text-textSecondary">
                  Already have an account?{" "}
                  <Link to="/login" className="font-bold text-primary">
                    Log in
                  </Link>
                </p>
                </form>
              </div>
              <hr className="mt-4 hr-text" data-content="OR" />
              <GoogleAuthBtn />
            </div>
          </div>
          :
        <div>
          <Emailsent/>
        </div>}
        </div>
      </div>
    </>
  );
};

export default Signup;
