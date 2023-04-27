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
      console.log(error)
      setIsSigning(false)
    }
  }

  return (
    <>
      <div className="bg-gradient-to-r from-gradinetInitial to-gradientEnd from-50%">
        <div className="flex flex-row justify-evenly items-center h-screen">
          <Banner />
          {!verifying?
          <div className="flex items-center justify-center mt-[-75px]">
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
                {/* <p className="text-textSecondary text-left mb-4 font-light">
                  Forget Your Password?
                </p> */}

                <button className="w-full rounded-lg bg-primary font-bold text-bgPrimary py-3 flex justify-center items-center">
                  {!isSiging ? "Sign Up" : <Loader/>}
                </button>
                <p className="font-light text-left text-textSecondary mt-1">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary font-bold">
                    Log in
                  </Link>
                </p>
                </form>
              </div>
              <hr class="hr-text mt-4" data-content="OR" />
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
