import React from 'react'
import mainLogo  from '../assets/mainLogo.svg'
import googleIcon from '../assets/googleIcon.svg'
import {
    Link
  } from "react-router-dom";
const LoginForm = () => {
  return (
    <>
<div className="flex min-h-full items-center justify-center pt-6" style={{marginRight:'120px', marginLeft: '180px'}}>
    <div className=" max-w-md space-y-8 rounded-2xl  bg-white shadow-2xl p-10" style={{width:'410px',height:'600px'}} >
      <div>
        <img
          className="mx-auto h-16 w-36"
          src={mainLogo}
          alt="Your Company"
        />
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900 form--heading ">
          Welcome
        </h2>
        <p className="text-center text-lg para -mt-2" style={{color: '#747474'}}>
         Log in to linkCollect
        </p>
      </div>
      <form className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
                 <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full rounded-t-md border-0 py-1.5 px-5 text-gray-900 ring-1  placeholder:text-gray-400   sm:text-sm sm:leading-6"
              placeholder="skylerwhitehatesmeth@gmail.com"
            />
          </div>
          <br/>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full rounded-b-md border-0 py-1.5 px-5 text-gray-900 ring-1  placeholder:text-gray-400  sm:text-sm sm:leading-6"
              placeholder="Password"
            />
            <span className='opacity-50 flex justify-start items-center w-80 h-5 font-light text-xs mt-2 para'>Forgot your password? </span>
          </div>
        </div>
{/* 
        <div className="flex items-center justify-between">
         
          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div> */}

        <div>
          <button
            type="submit"
            className="relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Log in
          </button>
          <div className="flex items-center para mt-2">
            <label  className="ml-2 block text-sm text-gray-900 ">
           <span className='opacity-50'>Don't have an account ?  </span> <Link className='text-blue-500' to={'/signup'}>Sign up </Link>
            </label>
          </div>
        </div>
      </form>
          <hr class="hr-text mt-4" data-content="OR"/>
          <button
            // type="submit"
            className="group mt-5 p-5 bg-white relative flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-black"
          style={{borderColor:"#EDEDED",borderRadius:'10px',borderWidth:'1px',padding:'0.5rem'}}
          >
            {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span> */}
<span>
<img src={googleIcon} alt="" width='26px' />
</span>
         <span className='ml-5 mb-1 para' style={{fontWeight:'400'}}>Continue with Google </span>   
         
          </button>
    </div>
  </div> 
  </>
   )
}

export default LoginForm