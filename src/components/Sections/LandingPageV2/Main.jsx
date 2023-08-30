import React from 'react';
import MockupImage from '../../../assets/landingPage/Mockup.png'

const Main = () => {
	return (
		<main className='max-w-[1800px] w-full mx-auto bg-[url("/src/assets/landingPage/Grid.svg")] bg-no-repeat'>
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
        <img src={MockupImage} alt='' className='mt-[5rem] rounded-[1rem] shadow-[0px_40px_100px_-30px_rgba(0,0,0,0.4)]'></img>
      </section>
			<section className='trending py-[6.25rem] px-[5rem]'></section>
			<section className='features py-[6.25rem] px-[5rem]'></section>
			<section className='testimonial py-[6.25rem] px-[5rem]'></section>
			<section className='pricing py-[6.25rem] px-[5rem]'></section>
			<section className='cta py-[6.25rem] px-[5rem]'></section>
		</main>
	);
};

export default Main;
