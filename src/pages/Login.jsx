import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import jwt from "jsonwebtoken";
import Banner from "../components/Banner/Banner";
import mainLogo from "../assets/mainLogo.svg";
import Input from "../components/Input/Input";
import GoogleAuthBtn from "../components/GoogleAuthBtn";
import Loader from "../components/Loader/Loader";


import { login } from "../api-services/authService";
import { authFailure, authStart, authSuccess } from "../actions/authActions";
import { setJwtInRequestHeader } from "../api-services/httpService";

const Login = ({handleSetUser}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector(state=>state.auth);
  const dispatch  = useDispatch();

  // For google auth redirect and email verification redirect from server with token in query
  useEffect(() => {
    
     let token = new URLSearchParams(location.search).get("token");
    setUserAndRedirect(token)
  }, [])

  // To handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(authStart());
    try {
      const { email, password } = e.target;
      const { data } = await login(email.value, password.value.trim());
      const token = data.data.token;
      await setUserAndRedirect(token)
    } catch (error) {
      dispatch(authFailure())
    }
  }

  const setUserAndRedirect = async (token) => {
    if (!token) return;
    const { userId,username } = jwt.decode(token);
    
    dispatch(authSuccess({
      token: token,
      user: { userId: userId, username: username },
    }))
    setJwtInRequestHeader(token)
    localStorage.setItem("token", token);
    navigate(`/${username}`);
  }

  console.log(auth)

  return (
    <>
      <div className="bg-gradient-to-r from-gradinetInitial to-gradientEnd from-50%">
        <div className="flex flex-row justify-evenly items-center h-screen flex-wrap">
          <Banner />
          <div className="flex items-center justify-center ">
            <div className="rounded-2xl bg-bgPrimary shadow-2xl px-10 pt-[40px] pb-[60px] w-[410px]">
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
                {/* <p className="text-textSecondary text-left mb-4 font-light">
                  Forget Your Password?
                </p> */}
                <button className="w-full rounded-lg bg-primary font-bold text-bgPrimary py-3 flex justify-center">
                  {!auth.loading ? "Login" : <Loader/>}
                </button>
                <p className="font-light text-left text-textSecondary mt-1">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary font-bold">
                    Sign Up
                  </Link>
                </p>
              </div>
              </form>
              <hr class="hr-text mt-4" data-content="OR" />
              <GoogleAuthBtn />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
