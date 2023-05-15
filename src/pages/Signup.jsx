import React, { useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import mainLogo from "../assets/mainLogo.svg";
import Input from "../components/Input/Input";
import GoogleAuthBtn from "../components/GoogleAuthBtn";
import { register } from "../api-services/authService";
import Emailsent from "../components/EmialVerified/Emailsent";
import Loader from "../components/Loader/Loader";

const Signup = () => {
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
        <div className="flex flex-row items-center h-screen justify-evenly">
          <Banner />
          {!verifying?
          <div className="flex items-center justify-center mt-[-75px]">
            <div className="rounded-2xl bg-bgPrimary shadow-2xl p-10 w-[410px] height[600px]">
              <div>
                <img
                  className="h-16 mx-auto w-36"
                  src={mainLogo}
                  alt="LinkCollect"
                />
                <h2 className="mt-2 mb-3 text-3xl font-bold tracking-tight text-center">
                  Welcome
                </h2>
                <p
                  className="-mt-2 text-lg text-center para"
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
