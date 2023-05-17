import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import Banner from "../components/Banner/Banner";
import mainLogo from "../assets/mainLogo.svg";
import Input from "../components/Input/Input";
import GoogleAuthBtn from "../components/GoogleAuthBtn";
import Loader from "../components/Loader/Loader";
import { login } from "../api-services/authService";
import { setJwtInRequestHeader } from "../api-services/httpService";
import { fileURLToPath } from "url";

const Login = ({handleSetUser, windowWidth}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogging,setIsLogging]=useState(false);

  // For google auth redirect and email verification redirect from server with token in query
  useEffect(() => {
    
    let token = new URLSearchParams(location.search).get("token");
    setUserAndRedirect(token)
  }, [])

  // To handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLogging(true);
    try {
      const { email, password } = e.target;
      const { data } = await login(email.value, password.value.trim());
      const token = data.data.token;
      await setUserAndRedirect(token)
    } catch (error) {
      setIsLogging(false);
    }
  }

  const setUserAndRedirect = async (token) => {
    if (!token) return;
    const { userId,username } = jwt.decode(token);
    setJwtInRequestHeader(token);
    localStorage.setItem("token", token);
    handleSetUser(userId,username,true)
    navigate(`/${username}`);
  }

  return (
    <>
      <div className="bg-gradient-to-r from-gradinetInitial to-gradientEnd from-50% ">
        <div className="flex flex-col items-center justify-around min-h-screen gap-24 pb-12 lg:gap-0 sm:flex-wrap lg:flex-nowrap sm:flex-row md:justify-evenly max-w-[2000px] mx-auto">
        {windowWidth>600 && <Banner />} 
        {windowWidth<600 && 
        <Link to={'/'}>
        <div className="flex items-center justify-center w-full">
          <img src={mainLogo} alt="" className="h-16 w-36" />
        </div>
        </Link>
        }
          <div className="flex items-center justify-center w-[90%] sm:w-2/3 md:w-1/2 max-w-[420px] sm:max-w-[600px] md:max-w-[420px] ">
            <div className="rounded-2xl bg-bgPrimary shadow-2xl px-10 pt-[40px] pb-[60px] w-full md:w-[410px]">
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
                  Log in to LinkCollect
                </p>
              </div>
              <form onSubmit={handleLogin}>
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
                {/* <p className="mb-4 font-light text-left text-textSecondary">
                  Forget Your Password?
                </p> */}
                <button className="flex justify-center w-full py-3 font-bold rounded-lg bg-primary text-bgPrimary">
                  {!isLogging ? "Login" : <Loader/>}
                </button>
                <p className="mt-1 font-light text-left text-textSecondary">
                  Don't have an account?{" "}
                  <Link to="/signup" className="font-bold text-primary">
                    Sign Up
                  </Link>
                </p>
              </div>
              </form>
              <hr className="mt-4 hr-text" data-content="OR" />
              <GoogleAuthBtn />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
