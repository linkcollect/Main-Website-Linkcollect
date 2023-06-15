import React, { useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import mainLogo from "../assets/mainLogo.svg";
import Input from "../components/Input/Input";
import GoogleAuthBtn from "../components/GoogleAuthBtn";
import { register } from "../api-services/authService";
import Emailsent from "../components/EmialVerified/Emailsent";
import Loader from "../components/Loader/Loader";
import ClaimUsername from "../components/ClaimUsername/claimUsername";
const Signup = ({ windowWidth }) => {
  const [verifying, setVerifying] = useState(false)
  const [isSiging, setIsSigning] = useState(false)

  // signup details handling
  const [data, setData] = useState({
    name: '',
    password: '',
    email: ''
  })

  // Login details
  const onInput = (e) => {
    e.preventDefault();
    setData(state => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSigning(true);
    try {

      const { name, email, password } = e.target;

      const { data } = await register(name.value, email.value, password.value.trim());
      setIsSigning(false);
      setVerifying(true);
    } catch (error) {
      setIsSigning(false)
    }
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
            <div className="flex items-center justify-center w-full">
              <img src={mainLogo} alt="" className="h-16 w-36" />
            </div>
          } */}


          {!verifying ?
            <div className="flex items-center justify-center w-full h-screen sm:py-10 lg:py-0 lg:w-1/2 lg:items-center bg-bgPrimary">
              <div className=" flex items-center justify-center w-[90%] sm:w-2/3  lg:mt-0 md:w-3/4 lg:w-2/3 max-w-[420px] sm:max-w-[600px] md:max-w-[420px] ">
                <div className="rounded-2xl bg-bgPrimary  px-10 pb-[60px] w-full md:w-[410px]">
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
                          onInput={onInput}
                          value={data.name}
                        />
                      </div>
                      <div className="mb-3">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="homelander@gmail.com"
                          onInput={onInput}
                          value={data.email}
                        />
                      </div>
                      <div className="mb-4">
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="password"
                          onInput={onInput}
                          value={data.password}
                        />
                      </div>

                      {/* Need to add link after adding the api for forget pass */}
                      {/* <p className="mb-4 font-light text-left text-textSecondary">
                  Forget Your Password?
                </p> */}

                      <button className={`flex items-center justify-center w-full py-3 font-bold rounded-lg ${data.name.length > 1 && data.email.length > 1 && data.password.length > 1 ? 'bg-primary' : 'bg-textSecondary'} text-bgPrimary`}>
                        {!isSiging ? "Sign Up" : <Loader />}
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
            </div>
            :
            <div className="flex items-center justify-center w-full h-screen sm:py-10 lg:py-0 lg:w-1/2 lg:items-center bg-bgPrimary">
              <Emailsent/>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Signup;
