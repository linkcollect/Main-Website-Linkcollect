import React from 'react'
import Vector from '../../assets/Vector.png'
import './styles.css'
import mainLogo  from '../../assets/mainLogo.svg'
import googleIcon from '../../assets/googleIcon.svg'
const Banner = () => {


  return (
<>
<div class="flex flex-row justify-between items-center -translate-y-32 ">

{/* Left Section */}
  <div class=" flex flex-col basis-1/2" style={{marginLeft:'-5rem'}}>
<img src={Vector} alt="Vector" width='470px' height='470px'  />
<h1 className='Heading'>Stay organized, save your web links</h1>
<p id='para'>linkcollect is the simplest way to save & share web links from anywhere to anyone</p>
  </div>

  {/* Right Section */}
  <div class="basis-1/2 ">
  {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```h
      */}
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8 " style={{marginLeft:'12rem'}}>
        <div className="w-full max-w-md space-y-8 rounded-2xl  bg-white shadow-2xl p-10" style={{width:'425px',height:'656px'}} >
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={mainLogo}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 Heading ">
              Welcome
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
             Sign up to linkCollect
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
            <div className='para'>
                <label htmlFor="email-address" className="sr-only">
                  Text
                </label>
                <input
                  id="email-address"
                  name="text"
                  type="text"
                  autoComplete="text"
                  required
                  style={{borderColor:"#ADAEFF"}}
                  className="relative block w-full rounded-t-md  border-0 py-1.5 px-5 text-gray-900 ring-1  placeholder:text-gray-400  sm:text-sm sm:leading-6 border-slate-800"
                  placeholder="Name (Walter White)"
                />
              </div>
              <br />
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
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span> */}
                Sign up
              </button>
              <div className="flex items-center para mt-2">
                <label  className="ml-2 block text-sm text-gray-900 ">
               <span className='opacity-50'>Already have an account ?  </span> <span className='text-blue-500'>Log in </span>
                </label>
              </div>
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
          </form>
        </div>
      </div>

  </div>
  
</div>
</>
  )
}

export default Banner