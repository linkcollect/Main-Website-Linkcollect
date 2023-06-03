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

const Login = ({ handleSetUser, windowWidth }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogging, setIsLogging] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  // Login details
  const onInput = (e) => {
    e.preventDefault();
    setData(state => ({ ...state, [e.target.name]: e.target.value }));
  };
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
    const { userId, username } = jwt.decode(token);
    setJwtInRequestHeader(token);
    localStorage.setItem("token", token);
    handleSetUser(userId, username, true)
    navigate(`/${username}`);
  }

  return (
    <>
      <div style={{ background: `linear-gradient(0deg, #9092FF -10.03%, rgba(144, 146, 255, 0) 98.39%), #FFFFFF` }}>
        <div className="flex flex-col items-center justify-evenly min-h-screen gap-0 sm:flex-wrap lg:flex-nowrap sm:flex-row md:justify-center md:gap-12 lg:justify-evenly max-w-[3000px] mx-auto">


          {windowWidth > 1024 &&
            <div className="flex items-center justify-center w-full h-[80vh] lg:min-h-screen lg:w-1/2 "
            >
              <Banner />
            </div>
          }

          {/* {windowWidth < 600 &&
            <div className="flex items-center justify-center h-16 w-36">
              <img src={mainLogo} alt="" className="h-16 w-36" />
            </div>
          } */}
          <div className="flex items-center justify-center w-full h-screen sm:py-0 sm:h-screen lg:w-1/2 sm:items-center bg-bgPrimary">
            <div className=" flex items-center justify-center w-[90%] sm:w-2/3  lg:mt-0 md:w-3/4 lg:w-2/3 max-w-[420px] sm:max-w-[600px] lg:max-w-[420px] ">
              <div className="rounded-2xl bg-bgPrimary  px-10  w-full sm:w-5/6 lg:w-[410px]">
                <div>
                  <Link to={'/'}>
                    <img
                      className="h-16 mx-auto w-36"
                      src={mainLogo}
                      alt="LinkCollect"
                    />
                  </Link>

                  <h2 className="mt-2 mb-3 text-xl font-bold tracking-tight text-center sm:text-3xl">
                    Welcome
                  </h2>
                  <p
                    className="-mt-2 text-sm text-center sm:text-lg para"
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
                        name="email"
                        type="email"
                        placeholder="homelander@gmail.com"
                        value={data.email}
                        onInput={onInput}
                      />
                    </div>
                    <div className="mb-4">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="password"
                        value={data.password}
                        onInput={onInput}
                      />
                    </div>

                    {/* Need to add link after adding the api for forget pass */}
                    {/* <p className="mb-4 font-light text-left text-textSecondary">
                  Forget Your Password?
                </p> */}
                    <button className={`flex justify-center w-full py-3 font-bold rounded-lg ${data.email.length > 1 && data.password.length > 0 ? 'bg-primary' : 'bg-textSecondary'} text-bgPrimary`}>
                      {!isLogging ? "Login" : <Loader />}
                    </button>
                    <p className="mt-1 font-light text-left whitespace-break-spaces text-textSecondary">
                      Don't have an account?{" "}
                      <Link to="/signup" className="font-bold text-primary">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
                <hr className="mt-4 hr-text" data-content="OR" />
                {windowWidth < 600 ?
                  <div className="w-full">
                    <GoogleAuthBtn />
                  </div>
                  :
                  <GoogleAuthBtn />
                }
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;
