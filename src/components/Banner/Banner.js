import React from 'react'
import Vector from '../../assets/Vector.png'
import './styles.css'
// import Login_Form from '../Login_Form'
const Banner = () => {


  return (
<>
<div className="flex flex-row justify-evenly items-center ">

{/* Left Section */}
  <div className=" flex flex-col relative  -top-8 left-30 items-center content-center justify-center" style={{marginLeft:'', width: '600px'}}>
<img src={Vector} alt="Vector" width='470px' height='470px'  />
<h1 className='Heading'>Stay organized, save your web links</h1>
<p id='para' className='-mt-12'>linkcollect is the simplest way to save & share web links from anywhere to anyone</p>
  </div>

  {/* Right Section */}
</div>
</>
  )
}

export default Banner