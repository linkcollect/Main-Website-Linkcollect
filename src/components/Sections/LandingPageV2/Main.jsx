import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// components
import Carousel from './components/Carousel';
// images
import BackArrow from '../../../assets/back-arrow.svg';
import GoogleIcon from '../../../assets/googleIcon.svg';
import Approve from '../../../assets/approve.svg';
import Extension from '../../../assets/landingPage/Extension.png';
import Notes from '../../../assets/landingPage/notes.png';
import Grid from '../../../assets/landingPage/GridBase.svg';
// api
import CollectionitemV2 from '../../Common/CollectionCard';
import PageLoader from '../../UI/Loader/PageLoader';
// other
import testimonialData from './constants/testimonialData.json';
import { useRef } from 'react';
const links = {
  extensionUrl:
    'https://chrome.google.com/webstore/detail/linkcollect/knekpacpcgkieomkhhngenjeeokddkif/',
  contact: 'https://linkcollect.io/askwhyharsh/c/64ecd6198fac6bae8d54fb77',
  feedback: 'https://forms.gle/Dg5ehCAR4AEZBnF89',
  instagram: 'https://www.instagram.com/linkcollect/',
  discord: 'https://discord.gg/askwhy-1074020862489022514',
  x: 'https://x.com/linkcollect_io',
  premium:
    'https://linkcollect.lemonsqueezy.com/checkout/buy/7d135ecc-36de-4977-a2d2-7d56c512706b',
  premium2:
    'https://linkcollect.lemonsqueezy.com/checkout/buy/02d91509-7595-4a62-9d69-0192f5670ad0',
};

const Main = ({ analytics, exploreData = undefined, windowWidth }) => {
  const navigate = useNavigate();
  // const video1Ref = useRef();
  // const video1Controls = {
  //   end: () => {video1Ref.current.currentTime = 0; video1Ref.current.play()},
  //   play: () => {if(video1Ref.current.currentTime >= 20) {video1Ref.current.currentTime = 0; video1Ref.current.play()}}
  // }
  // api call to https://api.linkcollect.io/api/v1/analytics

  const [analyticsData, setAnalyticsData] = useState(undefined);

  useEffect(() => {
    const getAnalyticsData = async () => {
      const res = await fetch('https://api.linkcollect.io/api/v1/analytics');
      const data = await res.json();
      console.log(data);
      setAnalyticsData(data.data);
    };
    getAnalyticsData();
  }, []);

  const video2Ref = useRef();
  const video2Controls = {
    end: () => {
      video2Ref.current.currentTime = 0;
      video2Ref.current.play();
    },
    play: () => {
      if (video2Ref.current.currentTime >= 20) {
        video2Ref.current.currentTime = 0;
        video2Ref.current.play();
      }
    },
  };
  return (
    <main className='w-full mx-auto bg-[url("/src/assets/landingPage/Grid.svg")] md:bg-[length:100%_auto] bg-no-repeat'>
      <div className="w-full max-w-[1800px] mx-auto">
        <section
          id="home"
          className="hero w-full py-[clamp(1rem,5vw,6.25rem)] px-[clamp(1rem,5vw,5rem)] "
        >
          <div className="hero-content mx-auto flex flex-col items-center gap-[2rem] w-[clamp(auto,12vw,60rem)]">
            <h1 className="text-neutral-900 text-[clamp(1rem,10vw,4.25rem)] leading-[clamp(1rem,12vw,4.75rem)]">
              Keep forgetting links? <br className="hidden md:block"></br>not
              anymore
            </h1>
            <p className="text-neutral-600 max-w-[520px] text-xl">
              {' '}
              <span className="text-primary-500 font-medium">
                A Bookmark Manager that does it all 😎
              </span>
              {` - we help you curate and share links and browser tabs + discover and search across ${
                analyticsData ? analyticsData.collections : 3000
              }+ public collections, just like
              pinterest`}{' '}
            </p>

            {/* Product Hunt banner/badge (330 upvotes)*/}
            {/* <a href="https://www.producthunt.com/posts/linkcollect-pinterest-for-links?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-linkcollect&#0045;pinterest&#0045;for&#0045;links" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=413974&theme=light" alt="LinkCollect&#0032;&#0045;&#0032;Pinterest&#0032;For&#0032;Links - Bookmark&#0032;In&#0032;Public&#0032;&#0045;&#0032;Social&#0032;Bookmarking&#0032;Platform | Product Hunt"  width="220" height="52" /></a> */}

            {windowWidth > 768 ? (
              <button
                onClick={() => {
                  analytics('Landing page', 'Install Extension', 'click');
                  window.open(links.extensionUrl, '_blank');
                }}
                className="mt-[2.5rem] py-[0.75rem] px-[1rem] w-[175px] h-min leading-[1.25rem] bg-primary-400 rounded-[5px] text-white hover:scale-[1.05] hover:shadow-md transition"
              >
                Install Extension
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                }}
                className="mt-[2.5rem] py-[0.75rem] px-[1rem] w-[175px] h-min leading-[1.25rem] bg-primary-400 rounded-[5px] text-white hover:scale-[1.05] hover:shadow-md transition"
              >
                Login
              </button>
            )}
          </div>
          <img
            src="https://media.discordapp.net/attachments/1075034816849924166/1151585862681890917/Screen-min.jpg"
            alt=""
            className="mt-[5rem] w-full rounded-[1rem] shadow-[0px_40px_100px_-30px_rgba(0,0,0,0.4)]"
          ></img>
        </section>
        <section id="trending" className="trending py-[6.25rem] px-[0rem]">
          <div className="flex flex-col items-center gap-[1rem]">
            <h2 className="text-[clamp(1rem,10vw,4.25rem)] leading-[clamp(1rem,12vw,4.75rem)] px-[clamp(1rem,5vw,5rem)] max-w-[1000px]">
              Trending Collections
            </h2>
            <div className="trending-list w-screen select-none">
              {exploreData.data === undefined ? (
                <PageLoader />
              ) : (
                <Carousel>
                  {exploreData?.data?.map(collection => {
                    return (
                      <div
                        key={collection._id}
                        className="min-w-[300px] rounded-md hover:scale-[103%] hover:shadow-xl transition"
                      >
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
                          userId={collection.userId}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              )}
            </div>
            <button
              onClick={() => {
                navigate('/explore');
              }}
              className="p-[0.75rem] h-min leading-[calc(1.25rem-4px)] border-2 border-primary-300 rounded-[5px] flex gap-[0.25rem] hover:scale-[1.05] hover:shadow-md transition"
            >
              <p>Explore Collections</p>
              <img
                src={BackArrow}
                alt=""
                className="rotate-180 mt-[1px] h-4 w-4"
              ></img>
            </button>
          </div>
        </section>
        <section
          id="features"
          className="features py-[clamp(1rem,5vw,6.25rem)] px-[clamp(1rem,5vw,5rem)]"
        >
          <div className="heading mx-auto max-w-[1000px]">
            <h2 className="text-[clamp(1rem,10vw,4.25rem)] leading-[clamp(1rem,12vw,4.75rem)] max-w-[1000px] ">
              What we do?
            </h2>
            <p className="text-neutral-700 max-w-[500px] mx-auto mt-[1rem] text-xl">
              A Bookmarking tool made for Developers, Designers, Content writers
              and Creators to help collect, curate and share information in a
              simple and faster way 🤷🏻‍♂️{' '}
            </p>
          </div>
          <div className="content mt-[3rem] grid xl:grid-cols-7 gap-[1.25rem]">
            <div className="xl:col-span-4 xl:row-span-1 bg-gradient-to-br from-primary-100 to-neutral-50 border-[1px] border-neutral-300 p-[0.75rem] md:p-[2rem] rounded-[1rem] flex flex-col gap-[1rem] md:grid md:grid-cols-2 md:gap-[2rem] min-h-[30rem] overflow-y-hidden hover:scale-[1.02] hover:shadow-md transition">
              <div className="w-full text-left self-end">
                <h3 className="text-[1.25rem] font-medium leading-[1.75rem] mb-[0.5rem]">
                  Browser extension
                </h3>
                <p className="text-[0.75rem] md:text-[1rem] text-neutral-600">
                  LinkCollect Makes Bookmarking simpler for everyone. Save,
                  organise, conquer!, you don't need a PhD in rocket science to
                  bookmark. It's so easy, even your cat could do it 🐱
                </p>
              </div>
              <div className="w-full h-[20rem] overflow-y-show ">
                {' '}
                <img
                  src={Extension}
                  alt=""
                  className="shadow-[0px_40px_100px_-30px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>
            <div className="xl:col-span-3 xl:row-span-1 bg-neutral-50 border-[1px] border-neutral-300 p-[0.75rem] md:p-[2rem] rounded-[1rem] gap-[1rem] md:grid md:min-h-[30rem] hover:scale-[1.02] hover:shadow-md transition">
              <div className="mb-[1rem] w-full aspect-video rounded-[1rem] overflow-hidden border-2 border-primary-500">
                <video
                  loop
                  autoPlay
                  muted
                  className="rounded-[1rem] h-full w-full mx-auto"
                >
                  <source
                    src="https://res.cloudinary.com/dkbxxcfau/video/upload/v1694515772/r2gtvuxiokxgghbgdfac.mp4?autoplay=1&amp;loop=1&amp;options=0"
                    type="video/mp4"
                  />
                  Your browser does not support video playing.
                </video>
              </div>
              {/* <div className='col-span-3 row-span-1 bg-neutral-50 border-[1px] border-neutral-300 p-[2rem] rounded-[1rem] grid h-[30rem] bg-[url("/src/assets/landingPage/Features2.png")] bg-[length:100%_auto] bg-no-repeat hover:scale-[1.02] hover:shadow-md transition'> */}
              <div className="w-full text-left self-end">
                <h3 className="text-[1.25rem] font-medium leading-[1.75rem] mb-[0.5rem]">
                  Use Commands to save
                </h3>
                <p className="text-[0.75rem] md:text-[1rem] text-neutral-600">
                  Right click or use commands Alt+A or Alt+C to save the link /
                  tab / All open tabs directly to linkCollect on any Page. Open
                  all links in a collections with just a click, it's like
                  restoring you tab sessions
                </p>
              </div>
            </div>
            <div className="xl:col-span-4 xl:row-span-1 bg-neutral-50 border-[1px] border-neutral-300 rounded-[1rem] md:grid md:grid-cols-2 md:h-[30rem] overflow-y-hidden hover:scale-[1.02] hover:shadow-md transition">
              <div className="w-full text-left self-end p-[0.75rem] md:p-[2rem]">
                <h3 className="text-[1.25rem] font-medium leading-[1.75rem] mb-[0.5rem]">
                  Seamless sharing
                </h3>
                <p className="text-[0.75rem] md:text-[1rem] text-neutral-600">
                  Create collections of links and start sharing them instantly
                  with your friends, you can also just share them your
                  linkcollect profile, that's <b>linkcollect.io/yourusername</b>{' '}
                  and boom 💥. if you ever get in a fight with them, just edit
                  your collection visibility to private{' '}
                </p>
              </div>
              <div className='h-full bg-[url("/src/assets/landingPage/Features4.png")] bg-[length:100%_100%] bg-no-repeat w-full overflow-y-show'>
                {' '}
                <img src="" alt="" />
              </div>
            </div>
            <div className="xl:col-span-3 xl:row-span-1 bg-gradient-to-b from-primary-200 to-neutral-50 border-[1px] border-neutral-300 p-[0.75rem] md:p-[2rem] rounded-[1rem] md:grid md:grid-rows-5 md:h-[30rem] bg-no-repeat hover:scale-[1.02] hover:shadow-md transition">
              <div className="row-span-3 my-auto">
                <img
                  src={Notes}
                  alt=""
                  className="mx-auto h-[clamp(5rem,30vw,15rem)] md:h-[15rem]"
                />
              </div>
              <div className="row-span-2 w-full text-left self-end">
                <div className="flex flex-col items-start justify-start md:gap-[1rem] md:flex-row md:items-center mb-[0.5rem]">
                  <h3 className="text-[1.25rem] font-medium leading-[1.75rem]">
                    Add notes and reminders
                  </h3>
                  <div className="rounded-[25px] border-[1px] border-success-300 bg-success-100 leading-0 h-[1.5rem] px-[0.5rem] inline text-[1rem]">
                    Coming Soon 👇
                  </div>
                </div>
                <p className="text-[0.75rem] md:text-[1rem] text-neutral-600">
                  A way to manage your online resources with our advanced
                  bookmarking tool, simplifying saving, categorizing, and
                  synchronizing for unmatched digital efficiency.
                </p>
              </div>
            </div>
            <div className='relative xl:col-span-7 xl:row-span-1 items-center bg-[url("/src/assets/landingPage/GridBase.svg"),_linear-gradient(to_top_left,rgba(173,174,255,1.0),_rgba(249,249,251,0.1))] bg-[length:100%_auto] bg-no-repeat border-[1px] border-neutral-300 p-[0.75rem] md:p-[2rem] rounded-[1rem] flex flex-col lg:grid lg:grid-cols-8 gap-[0.75rem] md:gap-[2rem] hover:scale-[1.02] hover:shadow-md transition'>
              <div className="lg:col-span-3 md:py-[2rem] flex flex-col justify-between gap-[2rem]">
                <div className="w-full text-left self-end">
                  <h3 className="text-[1.25rem] font-medium leading-[1.75rem] mb-[0.5rem]">
                    Curate and discover new collections
                  </h3>
                  <p className="text-[0.75rem] md:text-[1rem] text-neutral-600">
                    LinkCollect is not just a bookmarking tool, We are a
                    community, a community of 700+ developers, designers 🍥,
                    writers and researchers 👨🏻‍💻 who are bookmarking and sharing
                    some of the best content they come across and anyone can be
                    a part of it 🤝
                  </p>
                </div>
                <div className="w-full text-left self-end">
                  <h3 className="text-[1.25rem] font-medium leading-[1.75rem] mb-[0.5rem]">
                    🤖 Explore
                  </h3>
                  <p className="text-[0.75rem] md:text-[1rem] text-neutral-600">
                    Learn new skills and Secrets Be like Sherlock without the
                    pipe. Dive into our explore page and find treasures
                    recommended by the our community. Share your linkcollect
                    profile to your friends easily, use it as your personal
                    linktree or however you would like it 🕵️‍♂️📚
                  </p>
                </div>
              </div>
              <div className="col-span-5 w-full rounded-[1rem]  overflow-hidden border-2 border-primary-500 aspect-video">
                <video
                  loop
                  autoPlay
                  muted
                  className="rounded-[1rem] object-cover"
                >
                  <source
                    src="https://res.cloudinary.com/dkbxxcfau/video/upload/v1694515857/qsp5brdeox6pn9fwl0nz.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support video playing.
                </video>
              </div>
            </div>
          </div>
        </section>
        <section
          id="testimonials"
          className="testimonial py-[clamp(1rem,5vw,6.25rem)] px-[clamp(1rem,5vw,5rem)]"
        >
          <div className="testimonial-heading mx-auto max-w-[710px]">
            <h2 className="text-[clamp(1rem,10vw,4.25rem)] leading-[clamp(1rem,12vw,4.75rem)] max-w-[1000px]">
              Amazing stories from <br className="hidden md:block"></br>our
              customers
            </h2>
            <p className="text-neutral-700 max-w-[500px] mx-auto mt-[1rem]">
              Discover how our bookmarking solution simplified their online
              lives and revolutionized the way they explore the web.
            </p>
          </div>
          <div className="testimonial-cards mt-[3rem] grid md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-[1rem] md:gap-[1.75rem]">
            {testimonialData.data.map((testimonial, index) => (
              <div
                key={index}
                className="h-[100%] p-[1rem] md:py-[2.5rem] md:px-[1.75rem] rounded-[0.5rem] border-[1px] border-neutral-200 text-neutral-700 bg-neutral-50 flex flex-col justify-between text-left select-none cursor-pointer hover:scale-[105%] hover:shadow-xl transition-all"
                onClick={() => window.open(testimonial.link)}
              >
                <p
                  className="text-ellipsis text-[0.75rem] md:text-[1rem] "
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {testimonial.comment}
                </p>
                <div className="flex gap-[1rem] pt-[1rem] mt-auto items-start">
                  <img
                    src={testimonial.imageUrl}
                    alt=""
                    className="h-[3rem] w-[3rem] rounded-full"
                  />
                  <div className="flex flex-col items-start">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-neutral-400 text-[0.75rem] md:text-[1rem] ">
                      {testimonial.designation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section
          id="pricing"
          className="pricing py-[clamp(1rem,5vw,6.25rem)] px-[clamp(1rem,5vw,5rem)]"
        >
          <div className="pricing-heading mx-auto max-w-[1500px]">
            <h2 className="text-[clamp(1rem,10vw,4.25rem)] leading-[clamp(1rem,12vw,4.75rem)] max-w-[1500px]">
              Simple pricing for all your needs
            </h2>
            <p className="text-neutral-700 max-w-[500px] mx-auto mt-[1rem]">
              Start for free, upgrade when you love it. No credit card required.
              All prices are in US Dollars.
            </p>
          </div>
          <div className="pricing-cards mt-[3rem] mx-auto items-center lg:items-stretch flex flex-col lg:flex-row gap-[3rem] lg:justify-center ">
            <div className="starter w-full max-w-[30rem] p-[2rem] border-[1px] border-neutral-300 rounded-[1rem] flex flex-col gap-[2rem] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] hover:scale-[1.02] transition">
              <div className="head min-h-[10.5rem] border-b-[1px] border-b-neutral-300">
                <p className="text-neutral-700">Starter Plan</p>
                <h3 className="text-[2.75rem] text-neutral-700">
                  Free for everyone
                </h3>
              </div>
              <div className="list text-neutral-800">
                <p className="text-left mb-[1rem]">Includes</p>
                <ul className="list-none flex flex-col gap-[0.75rem] text-left">
                  <li className="flex">
                    <img
                      src={Approve}
                      alt=""
                      className="w-[1.25rem] mt-[-0.25rem] mr-[0.75rem]"
                    />
                    <p>Access to all basic features</p>
                  </li>
                  <li className="flex">
                    <img
                      src={Approve}
                      alt=""
                      className="w-[1.25rem] mt-[-0.25rem] mr-[0.75rem]"
                    />
                    <p>Limited to 20 collections</p>
                  </li>
                  <li className="flex">
                    <img
                      src={Approve}
                      alt=""
                      className="w-[1.25rem] mt-[-0.25rem] mr-[0.75rem]"
                    />
                    <p>Save 3000 bookmarks (100 per collection)</p>
                  </li>
                  <li className="flex">
                    <img
                      src={Approve}
                      alt=""
                      className="w-[1.25rem] h-[1.5rem] mr-[0.75rem]"
                    />
                    <p className="">Add personalized notes to your bookmarks</p>
                  </li>
                </ul>
              </div>
              <div className="cta mt-auto">
                <button
                  onClick={() => {
                    navigate('/signup');
                  }}
                  className="p-[0.75rem] h-min leading-[calc(1.25rem-4px)] w-full border-2 border-primary-300 rounded-[5px] flex gap-[0.25rem]"
                >
                  <p className="mx-auto">Get started with free</p>
                </button>
              </div>
            </div>
            <div className="pro w-full max-w-[30rem] p-[2rem] bg-gradient-to-b from-primary-100 border-[1px] border-primary-400 rounded-[1rem] flex flex-col gap-[2rem] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] hover:scale-[1.02] transition">
              <div className="head min-h-[10.5rem] border-b-[1px] border-b-neutral-300">
                <p className="text-neutral-700">Pro Plan</p>
                <h3 className="text-[2.75rem] text-neutral-700">
                  $29 billed yearly
                </h3>
                <div className="mx-auto mt-[1rem] py-[0.125rem] px-[0.125rem] rounded-[3.5rem] border-[1px] border-neutral-300 bg-neutral-50 font-light h-max w-max items-center flex">
                  <div className="rounded-[3.5rem]  py-[0.125rem] px-[0.75rem] text-white bg-neutral-900 flex">
                    yearly
                  </div>
                  {/* <div className='px-[0.75rem] text-neutral-500'>monthly</div> */}
                </div>
              </div>
              <div className="list text-neutral-800 ">
                <p className="text-left mb-[1rem]">
                  Includes all features of free plan and
                </p>
                <ul className="list-none flex flex-col gap-[0.75rem] text-left">
                  <li className="flex">
                    <img
                      src={Approve}
                      alt=""
                      className="w-[1.25rem] h-[1.5rem] mr-[0.75rem]"
                    />
                    <p className="">Unlimited collections</p>
                  </li>
                  <li className="flex">
                    <img
                      src={Approve}
                      alt=""
                      className="w-[1.25rem] h-[1.5rem] mr-[0.75rem]"
                    />
                    <p className="">Unlimited bookmarks</p>
                  </li>
                  <li className="flex">
                    <img
                      src={Approve}
                      alt=""
                      className="w-[1.25rem] h-[1.5rem] mr-[0.75rem]"
                    />
                    <p className="">
                      Add notes to your bookmarks right when you save
                    </p>
                  </li>
                  <li className="flex">
                    <div className="ml-[2rem] rounded-[25px] border-[1px] border-success-300 bg-success-100 leading-0 px-[0.5rem]">
                      Coming Soon 👇
                    </div>
                  </li>
                  <li className="flex">
                    <img
                      src={Approve}
                      alt=""
                      className="w-[1.25rem] h-[1.5rem] mr-[0.75rem]"
                    />
                    <p className="">
                      Add Reminders to your bookmarks, so you don't forget to
                      check it out later
                    </p>
                  </li>
                  <li className="flex">
                    <img
                      src={Approve}
                      alt=""
                      className="w-[1.25rem] h-[1.5rem] mr-[0.75rem]"
                    />
                    <p className="">
                      Collaborative Curation, create privately shared
                      collections between your colleagues or friends
                    </p>
                  </li>
                  <li className="flex">
                    <img
                      src={Approve}
                      alt=""
                      className="w-[1.25rem] h-[1.5rem] mr-[0.75rem]"
                    />
                    <p className="">
                      Export your collection data into a well organised excel
                      sheet or csv, so you can do research without copy pasting
                      links and titles 😃{' '}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="cta mt-auto">
                <button
                  onClick={() => {
                    window.open(links.premium, '_blank');
                  }}
                  className="p-[0.75rem] h-min w-full leading-[1.25rem] bg-primary-400 rounded-[5px] text-white font-light flex gap-[0.25rem] hover:scale-[1.02] hover:shadow-md transition"
                >
                  <p className="mx-auto ">Get started with PRO plan</p>
                </button>
              </div>
            </div>
            {windowWidth > 768 && (
              <div className="pro w-full max-w-[30rem] p-[2rem] bg-gradient-to-b from-[#ffd900b9] border-[1px] border-[#ffdf27e3] rounded-[1rem] flex flex-col gap-[2rem] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] hover:scale-[1.02] transition">
                <div className="head min-h-[10.5rem] border-b-[1px] border-b-neutral-300">
                  <p className="text-neutral-700">Pro Plan</p>
                  <h3 className="text-[2.75rem] text-neutral-700">
                    $119 for LifeTime
                  </h3>
                  <div className="mx-auto mt-[1rem] py-[0.125rem] px-[0.125rem] rounded-[3.5rem] border-[1px] border-neutral-300 bg-neutral-50 font-light h-max w-max items-center flex">
                    <div className="rounded-[3.5rem]  py-[0.125rem] px-[0.75rem] text-white bg-neutral-900 flex">
                      lifetime
                    </div>
                    {/* <div className='px-[0.75rem] text-neutral-500'>monthly</div> */}
                  </div>
                </div>
                <div className="list text-neutral-800 ">
                  <p className="text-left mb-[1rem]">
                    Includes all features of pro plan and
                  </p>
                  <ul className="list-none flex flex-col gap-[0.75rem] text-left">
                    <li className="flex">
                      <img
                        src={Approve}
                        alt=""
                        className="w-[1.25rem] h-[1.5rem] mr-[0.75rem]"
                      />
                      <p className="">Unlimited collections</p>
                    </li>
                    <li className="flex">
                      <img
                        src={Approve}
                        alt=""
                        className="w-[1.25rem] h-[1.5rem] mr-[0.75rem]"
                      />
                      <p className="">Unlimited bookmarks</p>
                    </li>
                    <li className="flex">
                      <img
                        src={Approve}
                        alt=""
                        className="w-[1.25rem] h-[1.5rem] mr-[0.75rem]"
                      />
                      <p className="">
                        Add notes to your bookmarks right when you save
                      </p>
                    </li>
                    <li className="flex">
                      <img
                        src={Approve}
                        alt=""
                        className="w-[1.25rem] h-[1.5rem] mr-[0.75rem]"
                      />
                      <p className="">Join Private Community</p>
                    </li>
                    <li className="flex">
                      <div className="ml-[2rem] rounded-[25px] border-[1px] border-success-300 bg-success-100 leading-0 px-[0.5rem]">
                        Coming Soon 👇
                      </div>
                    </li>
                    <li className="flex">
                      <img
                        src={Approve}
                        alt=""
                        className="w-[1.25rem] h-[1.5rem] mr-[0.75rem]"
                      />
                      <p className="">
                        Add Reminders to your bookmarks, so you don't forget to
                        check it out later
                      </p>
                    </li>
                    <li className="flex">
                      <img
                        src={Approve}
                        alt=""
                        className="w-[1.25rem] h-[1.5rem] mr-[0.75rem]"
                      />
                      <p className="">
                        Collaborative Curation, create privately shared
                        collections between your colleagues or friends
                      </p>
                    </li>
                    <li className="flex">
                      <img
                        src={Approve}
                        alt=""
                        className="w-[1.25rem] h-[1.5rem] mr-[0.75rem]"
                      />
                      <p className="">
                        Export your collection data into a well organised excel
                        sheet or csv, so you can do research without copy
                        pasting links and titles 😃{' '}
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="cta mt-auto">
                  <button
                    onClick={() => {
                      window.open(links.premium2, '_blank');
                    }}
                    className="p-[0.75rem] h-min w-full leading-[1.25rem] bg-[#ffdf27d1] rounded-[5px] font-normal flex gap-[0.25rem] hover:scale-[1.02] hover:shadow-md transition"
                  >
                    <p className="mx-auto ">Grab PRO for Lifetime</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="cta py-[clamp(1rem,5vw,6.25rem)] px-[clamp(1rem,5vw,5rem)]">
          <div className='flex flex-col items-center bg-[linear-gradient(to_top,_rgba(255,255,255,1),_rgba(255,255,255,0)_80%),url("/src/assets/landingPage/GridBase.svg"),_linear-gradient(180deg,_rgba(97,102,241,0.50)_0%,_rgba(254,254,255,0.50)_100%)] bg-[length:100%_auto] bg-no-repeat rounded-[1rem] border-[1px] border-neutral-200 py-[2.5rem] px-[2.5rem] font-normal'>
            <h2 className="text-[clamp(1rem,10vw,4.25rem)] leading-[clamp(1rem,12vw,4.75rem)] max-w-[1000px]">
              Simplify Bookmarking with LinkCollect's Magic
            </h2>
            <button
              onClick={() => {
                window.open(links.extensionUrl, '_blank');
              }}
              className="mt-[2.5rem] py-[0.75rem] px-[1rem] w-[max-content] h-min leading-[1.25rem] bg-primary-400 rounded-[5px] text-white hover:scale-[1.09] hover:shadow-xl transition"
            >
              {`Join ${analyticsData ? analyticsData.users : 1000}+ users ⚡️`}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Main;
