import React from 'react';
import { useNavigate } from 'react-router';
// images
import MockupImage from '../../../assets/landingPage/Mockup.png'
import BackArrow from '../../../assets/back-arrow.svg'
import GoogleIcon from '../../../assets/googleIcon.svg'
// other
const testimonialData = Array(6).fill({comment: "This extension allow me to organize and access data from  my laptop where I want and when I want to. The interface is easy to navigate and I find everything I need quickly. Everyone should check it out!", name: "John Doe", designation: "CEO, Co-founder", imageUrl: GoogleIcon});

const Main = () => {
  const navigate = useNavigate();

	return (
		<main className='w-full mx-auto bg-[url("/src/assets/landingPage/Grid.svg")] bg-[length:100%_auto] bg-no-repeat'>
      <div className='w-full max-w-[1800px] mx-auto'>
        <section className='hero w-full py-[6.25rem] px-[5rem] '>
          <div className='hero-content mx-auto flex flex-col items-center w-[60rem]'>
            <h1 className='text-neutral-900 text-[5.25rem]'>Save, Curate, Share <br></br>& Discover Bookmarks</h1>
            <p className='text-neutral-600 w-[40rem]'>Effortlessly Manage Your Favorite Links: Save, Curate, and Share Bookmarks with Our Intuitive Platform. Discover a Smarter Way to Navigate the Web and much more.</p>
            <button 
              onClick={() => {window.location.href = 'https://chrome.google.com/webstore/detail/linkcollect/knekpacpcgkieomkhhngenjeeokddkif/'}} 
              className="mt-[2.5rem] py-[0.75rem] px-[1rem] w-[175px] h-min leading-[1.25rem] bg-primary-400 rounded-[5px] text-white">
                Install Extension
            </button>
          </div>
          <img src={MockupImage} alt='' className='mt-[5rem] w-full rounded-[1rem] shadow-[0px_40px_100px_-30px_rgba(0,0,0,0.4)]'></img>
        </section>
        <section className='trending py-[6.25rem] px-[0rem]'>
          <div className='flex flex-col items-center gap-[4rem]'>
            <h2 className='text-[4.25rem] leading-[4.75rem] max-w-[1000px]'>Trending Collections</h2>
            <div className='trending-list flex flex-row items-center flex-nowrap overflow-x-scroll w-full gap-[1.5rem] ml-[10rem]'>
              {[1,2,3,4,5,6,7,8,9,0,8,7,6,5].map((item, index) => (
                <div key={index} 
                  className='min-w-[350px] h-[250px] bg-neutral-50 border border-neutral-300 rounded-md'>
                  {item}
                </div>
              ))}
            </div>
            <button onClick={() => {navigate('/login')}} className="p-[0.75rem] h-min leading-[calc(1.25rem-4px)] border-2 border-primary-300 rounded-[5px] flex gap-[0.25rem]">
              <p>Explore Collections</p>
              <img src={BackArrow} alt='' className='rotate-180 mt-[1px] h-4 w-4'></img>
            </button>
          </div>
        </section>
        <section className='features py-[6.25rem] px-[5rem]'></section>
        <section className='testimonial py-[6.25rem] px-[5rem]'>
          <div className='testimonial-heading mx-auto w-[710px]'>
            <h2 className='text-[4.25rem] leading-[4.75rem] max-w-[1000px]'>Amazing stories from <br></br>our customers</h2>
            <p className='text-neutral-700 max-w-[500px] mx-auto mt-[1rem]'>Discover how our bookmarking solution simplified their online lives and revolutionized the way they explore the web.</p>
          </div>
          <div className='testimonial-cards mt-[3rem] grid grid-cols-3 grid-rows-2 gap-[1.75rem]'>
            {testimonialData.map((testimonial, index) => (
              <div key={index} className='h-[17rem] py-[2.5rem] px-[1.75rem] rounded-[0.5rem] border-[1px] border-neutral-200 text-neutral-700 bg-neutral-50 flex flex-col justify-between text-left'>
                <p className='text-ellipsis'>{testimonial.comment}</p>
                <div className='flex gap-[1rem] items-start'>
                  <img src={testimonial.imageUrl} alt='' className='h-[3rem] w-[3rem]'/>
                  <div className='flex flex-col items-start'>
                    <p className='font-semibold'>{testimonial.name}</p>
                    <p className='text-neutral-400'>{testimonial.designation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className='pricing py-[6.25rem] px-[5rem]'></section>
        <section className='cta py-[6.25rem] px-[5rem]'>
          <div className='flex flex-col items-center bg-gradient-to-b from-primary-200 rounded-[1rem] border-[1px] border-neutral-200 py-[2.5rem] px-[2.5rem] font-normal'>
            <h2 className='text-[4.25rem] leading-[4.75rem] max-w-[1000px]'>Simplify Bookmarking with LinkCollect's Magic</h2>
            <button 
              onClick={() => {window.location.href = 'https://chrome.google.com/webstore/detail/linkcollect/knekpacpcgkieomkhhngenjeeokddkif/'}} 
              className="mt-[2.5rem] py-[0.75rem] px-[1rem] w-[max-content] h-min leading-[1.25rem] bg-primary-400 rounded-[5px] text-white">
                Try Linkcollect for Free
            </button>
          </div>
        </section>
      </div>
		</main>
	);
};

export default Main;
