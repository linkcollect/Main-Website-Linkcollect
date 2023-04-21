import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import mainLogo from "../assets/mainLogo.svg";
import Input from "../components/Input/Input";
import GoogleAuthBtn from "../components/GoogleAuthBtn";
import { login } from "../api-services/authService";
import jwt from "jsonwebtoken";

const Login = ({handleSetUser}) => {
  const location = useLocation();
  const navigate = useNavigate()

  // For google auth redirect and email verification redirect from server with token in query
  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    setUserAndRedirect(token)
  }, [])

  // To handle login
  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = e.target;
    const { data } = await login(email.value, password.value.trim());
    const token = data.data.token;
    setUserAndRedirect(token)
  }

  const setUserAndRedirect = async (token) => {
    if (!token) return;
    const { userId } = jwt.decode(token);
    // const response = await getUserById(userId);
    handleSetUser({userId});
    localStorage.setItem("token", token);
    return navigate("/"+userId);
  }


  return (
    <>
      <div className="bg-gradient-to-r from-gradinetInitial to-gradientEnd from-50% h-screen">
        <div className="w-[50%] m-auto">
          <img src={mainLogo} alt="" />
        </div>
        <div className="flex flex-row justify-evenly items-center">
          <Banner />
          <div className="flex items-center justify-center mt-[-32px]">
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
