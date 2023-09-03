import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// components
import Carousel from './components/Carousel';
// images
import MockupImage from '../../../assets/landingPage/Mockup.png'
import BackArrow from '../../../assets/back-arrow.svg'
import GoogleIcon from '../../../assets/googleIcon.svg'
import Approve from '../../../assets/approve.svg'
import Extension from '../../../assets/landingPage/Extension.png'
import Notes from '../../../assets/landingPage/notes.png'
import Grid from '../../../assets/landingPage/GridBase.svg'
// video
import Video from '../../../assets/newTest.mp4'
// api
import CollectionitemV2 from '../../Common/CollectionCard';
import PageLoader from '../../UI/Loader/PageLoader';
// other
const testimonialData = Array(6).fill({comment: "This extension allow me to organize and access data from  my laptop where I want and when I want to. The interface is easy to navigate and I find everything I need quickly. Everyone should check it out!", name: "John Doe", designation: "CEO, Co-founder", imageUrl: GoogleIcon});
const links = {
    extensionUrl: 'https://chrome.google.com/webstore/detail/linkcollect/knekpacpcgkieomkhhngenjeeokddkif/',
    contact: 'https://linkcollect.io/askwhyharsh/c/64ecd6198fac6bae8d54fb77',
    feedback: 'https://forms.gle/Dg5ehCAR4AEZBnF89',
    instagram: 'https://www.instagram.com/linkcollect/',
    discord: 'https://discord.gg/askwhy-1074020862489022514',
    x: 'https://x.com/linkcollect_io',
    premium: 'https://linkcollect.lemonsqueezy.com/'
}

const Main = ({ exploreData = undefined}) => {
  const navigate = useNavigate();
	return (
	<main className='w-full mx-auto bg-[url("/src/assets/landingPage/Grid.svg")] bg-[length:100%_auto] bg-no-repeat'>
      <div className='w-full max-w-[1800px] mx-auto'>
        <section id='home' className='hero w-full py-[6.25rem] px-[5rem] '>
          <div className='hero-content mx-auto flex flex-col items-center w-[60rem]'>
            <h1 className='text-neutral-900 text-[5.25rem]'>Save, Curate, Share <br></br>& Discover Bookmarks</h1>
            <p className='text-neutral-600 w-[40rem]'>Effortlessly Manage Your Favorite Links: Save, Curate, and Share Bookmarks with Our Intuitive Platform. Discover a Smarter Way to Navigate the Web and much more.</p>
            <button 
              onClick={() => {window.open(links.extensionUrl, "_blank")}} 
              className="mt-[2.5rem] py-[0.75rem] px-[1rem] w-[175px] h-min leading-[1.25rem] bg-primary-400 rounded-[5px] text-white">
                Install Extension
            </button>
          </div>
          <img src={MockupImage} alt='' className='mt-[5rem] w-full rounded-[1rem] shadow-[0px_40px_100px_-30px_rgba(0,0,0,0.4)]'></img>
        </section>
        <section id='trending' className='trending py-[6.25rem] px-[0rem]'>
          <div className='flex flex-col items-center gap-[4rem]'>
            <h2 className='text-[4.25rem] leading-[4.75rem] max-w-[1000px]'>Trending Collections</h2>
            <div className='trending-list w-screen select-none'>
             
              {exploreData.data === undefined ? <PageLoader /> : 
              (<Carousel>
                {exploreData?.data?.map((collection) => {
                  return (
                  <div key={collection._id} className='min-w-[300px]'>
                    <CollectionitemV2
                        isHoverable={false}
                        id={collection._id}
                        image={collection.image}
                        title={collection.title}
                        links={collection.countOfLinks}
                        username={collection.username}
                        isPublic={collection.isPublic}
                        isPinned={collection.isPinned}
                        description={collection.description}
                        tags={collection.tags}
                        isOwner={false}
                        upvotes={collection.upvotes}
                        views={collection.views}
                    />
                  </div>
                  )}
                )}
              </Carousel>)}                
            </div>
            <button onClick={() => {navigate('/explore')}} className="p-[0.75rem] h-min leading-[calc(1.25rem-4px)] border-2 border-primary-300 rounded-[5px] flex gap-[0.25rem]">
              <p>Explore Collections</p>
              <img src={BackArrow} alt='' className='rotate-180 mt-[1px] h-4 w-4'></img>
            </button>
          </div>
        </section>
        <section id='features' className='features py-[6.25rem] px-[5rem]'>
          <div className='heading mx-auto max-w-[1000px]'>
            <h2 className='text-[4.25rem] leading-[4.75rem] max-w-[1000px]'>What we do?</h2>
            <p className='text-neutral-700 max-w-[500px] mx-auto mt-[1rem]'>A way to manage your online resources with our advanced bookmarking tool, simplifying saving, categorizing, and synchronizing for unmatched digital efficiency.</p>
          </div>
          <div className='content mt-[3rem] grid grid-cols-7 gap-[1.25rem]'>
            <div className='col-span-4 row-span-1 bg-gradient-to-br from-primary-100 to-neutral-50 border-[1px] border-neutral-300 p-[2rem] rounded-[1rem] grid grid-cols-2 gap-[2rem] h-[30rem] overflow-y-hidden'>
              <div className='w-full text-left self-end'>
                <h3 className='text-[1.25rem] font-medium leading-[1.75rem] mb-[0.5rem]'>Browser extension</h3>
                <p className='text-neutral-600'>LinkCollect Makes Bookmarking simpler for everyone. Save, organise, conquer! , you don't need a PhD in rocket science to bookmark. It's so easy, even your cat could do it. 🐱</p>
              </div>
              <div className='w-full h-[20rem] overflow-y-show shadow-[0px_40px_100px_-30px_rgba(0,0,0,0.4)]'> <img src={Extension} alt='' /></div>
            </div>
            <div className='col-span-3 row-span-1 bg-neutral-50 border-[1px] border-neutral-300 p-[2rem] rounded-[1rem] grid h-[30rem] bg-[url("/src/assets/landingPage/Features2.png")] bg-[length:100%_auto] bg-no-repeat'>
              <div className='w-full text-left self-end'>
                <h3 className='text-[1.25rem] font-medium leading-[1.75rem] mb-[0.5rem]'>Summarize content</h3>
                <p className='text-neutral-600'>A way to manage your online resources with our advanced bookmarking tool, simplifying saving, categorizing, and synchronizing for unmatched digital efficiency.</p>
              </div>
            </div>
            <div className='col-span-4 row-span-1 bg-neutral-50 border-[1px] border-neutral-300 rounded-[1rem] grid grid-cols-2 h-[30rem] overflow-y-hidden'>
              <div className='w-full text-left self-end p-[2rem]'>
                <h3 className='text-[1.25rem] font-medium leading-[1.75rem] mb-[0.5rem]'>Seamless sharing</h3>
                <p className='text-neutral-600'>A way to manage your online resources with our advanced bookmarking tool, simplifying saving, categorizing, and synchronizing for unmatched digital efficiency.</p>
              </div>
              <div className='h-full bg-[url("/src/assets/landingPage/Features4.png")] bg-[length:100%_100%] bg-no-repeat w-full overflow-y-show'> <img src='' alt='' /></div>
            </div>
            <div className='col-span-3 row-span-1 bg-gradient-to-b from-primary-200 to-neutral-50 border-[1px] border-neutral-300 p-[2rem] rounded-[1rem] grid h-[30rem] bg-[] bg-[length:100%_auto] bg-no-repeat'>
              <div className=''>
                <img src={Notes} alt='' className=' mx-auto h-[18rem]'/>
              </div>
              <div className='w-full text-left self-end'>
                <h3 className='text-[1.25rem] font-medium leading-[1.75rem] mb-[0.5rem]'>Add notes and reminders</h3>
                <p className='text-neutral-600'>A way to manage your online resources with our advanced bookmarking tool, simplifying saving, categorizing, and synchronizing for unmatched digital efficiency.</p>
              </div>
            </div>
            <div className='relative col-span-7 row-span-1 bg-[url("/src/assets/landingPage/GridBase.svg"),_linear-gradient(to_top_left,rgba(173,174,255,1.0),_rgba(249,249,251,0.1))] bg-[length:100%_auto] bg-no-repeat border-[1px] border-neutral-300 p-[2rem] rounded-[1rem] grid grid-cols-8 gap-[2rem]'>
              <div className='w-full text-left self-end col-span-3'>
                <h3 className='text-[1.25rem] font-medium leading-[1.75rem] mb-[0.5rem]'>Curate and discover new collections</h3>
                <p className='text-neutral-600'>LinkCollect is not just a bookmarking tool, We are a community, a community of 700+ developers, designers 🍥, writers and researchers 👨🏻‍💻 who are bookmarking and sharing some of the best content they come across and anyone can be a part of it 🤝</p>
              </div>
              <div className='col-span-5 w-full rounded-[1rem] overflow-hidden border border-primary-500'>
                <video autoPlay loop muted>
                  <source src={Video} type="video/mp4"/>
                  Your browser does not support video playing.
                </video>
              </div>
            </div>
          </div>
        </section>
        <section id='testimonials' className='testimonial py-[6.25rem] px-[5rem]'>
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
        <section id='pricing' className='pricing py-[6.25rem] px-[5rem]'>
          <div className='testimonial-heading mx-auto max-w-[1500px]'>
            <h2 className='text-[4.25rem] leading-[4.75rem] max-w-[1500px]'>Simple pricing for all your needs</h2>
            <p className='text-neutral-700 max-w-[500px] mx-auto mt-[1rem]'>Start for free, upgrade when you love it. No credit card required. All prices are in US Dollars.</p>
          </div>
          <div className='pricing-cards mt-[3rem] flex gap-[3rem] justify-center'>
            <div className='starter max-w-[30rem] p-[2rem] border-[1px] border-neutral-300 rounded-[1rem] flex flex-col gap-[2rem] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]'>
              <div className='head h-[10.5rem] border-b-[1px] border-b-neutral-300'>
                <p className='text-neutral-700'>Starter Plan</p>
                <h3 className='text-[2.75rem] text-neutral-700'>Free for everyone</h3>
              </div>
              <div className='list text-neutral-800'>
                <p className='text-left mb-[1rem]'>Includes</p>
                <ul className='list-none flex flex-col gap-[0.75rem] text-left'>
                  <li className='flex'><img src={Approve} alt='' className='w-[1.25rem] mt-[-0.25rem] mr-[0.75rem]'/><p>Access to all basic features</p></li>
                  <li className='flex'><img src={Approve} alt='' className='w-[1.25rem] mt-[-0.25rem] mr-[0.75rem]'/><p>Limited to 30 collections</p></li>
                  <li className='flex'><img src={Approve} alt='' className='w-[1.25rem] mt-[-0.25rem] mr-[0.75rem]'/><p>Save 3000 bookmarks (100 per collection)</p></li>
                </ul>
              </div>
              <div className='cta mt-auto'>
                <button onClick={() => {navigate('/signup')}} className="p-[0.75rem] h-min leading-[calc(1.25rem-4px)] w-full border-2 border-primary-300 rounded-[5px] flex gap-[0.25rem]">
                  <p className='mx-auto'>Get started with free</p>
                </button>
              </div>
            </div>
            <div className='pro max-w-[30rem] p-[2rem] bg-gradient-to-b from-primary-100 border-[1px] border-primary-400 rounded-[1rem] flex flex-col gap-[2rem] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]'>
              <div className='head h-[10.5rem] border-b-[1px] border-b-neutral-300'>
                <p className='text-neutral-700'>Pro Plan</p>
                <h3 className='text-[2.75rem] text-neutral-700'>$8 per user/month</h3>
                <div className='mx-auto mt-[1rem] py-[0.125rem] px-[0.125rem] rounded-[3.5rem] border-[1px] border-neutral-300 bg-neutral-50 font-light h-max w-max items-center flex'>
                  <div className='rounded-[3.5rem]  py-[0.125rem] px-[0.75rem] text-white bg-neutral-900 flex'>Monthly</div>
                  <div className='px-[0.75rem] text-neutral-500'>Anually</div>
                </div>
              </div>
              <div className='list text-neutral-800'>
                <p className='text-left mb-[1rem]'>Includes all features of free plan and</p>
                <ul className='list-none flex flex-col gap-[0.75rem] text-left'>
                  <li className='flex'><img src={Approve} alt='' className='w-[1.25rem] h-[1.5rem] mr-[0.75rem]'/><p className=''>Unlimited collections</p></li>
                  <li className='flex'><img src={Approve} alt='' className='w-[1.25rem] h-[1.5rem] mr-[0.75rem]'/><p className=''>Unlimited bookmarks</p></li>
                  <li className='flex'><img src={Approve} alt='' className='w-[1.25rem] h-[1.5rem] mr-[0.75rem]'/><p className=''>Add personalized notes to your bookmarks</p></li>
                  <li className='flex'><div className='ml-[2rem] rounded-[25px] border-[1px] border-success-300 bg-success-100 leading-0 px-[0.5rem]'>Coming Soon 👇</div></li>
                  <li className='flex'><img src={Approve} alt='' className='w-[1.25rem] h-[1.5rem] mr-[0.75rem]'/><p className=''>Auto summaries content on bookmarking using AI.</p></li>
                  <li className='flex'><img src={Approve} alt='' className='w-[1.25rem] h-[1.5rem] mr-[0.75rem]'/><p className=''>Visual analytics of bookmarks and browsing data</p></li>
                </ul>
              </div>
              <div className='cta mt-auto'>
                <button 
                  onClick={() => {window.open(links.premium, "_blank")}} 
                  className="p-[0.75rem] h-min w-full leading-[1.25rem] bg-primary-400 rounded-[5px] text-white font-light flex gap-[0.25rem]">
                  <p className='mx-auto'>Get started with pro plan</p>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className='cta py-[6.25rem] px-[5rem]'>
          <div className='flex flex-col items-center bg-gradient-to-b from-primary-200 rounded-[1rem] border-[1px] border-neutral-200 py-[2.5rem] px-[2.5rem] font-normal'>
            <h2 className='text-[4.25rem] leading-[4.75rem] max-w-[1000px]'>Simplify Bookmarking with LinkCollect's Magic</h2>
            <button 
              onClick={() => {window.open(links.extensionUrl, "_blank")}} 
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
