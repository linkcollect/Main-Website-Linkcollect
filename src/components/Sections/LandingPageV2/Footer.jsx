import React from 'react';
import { useNavigate } from 'react-router';
// images
import MainLogo from '../../../assets/mainLogo.svg';
const links = {
    extensionUrl: 'https://chrome.google.com/webstore/detail/linkcollect/knekpacpcgkieomkhhngenjeeokddkif/',
    contact: 'https://linkcollect.io/askwhyharsh/c/64ecd6198fac6bae8d54fb77',
    feedback: 'https://forms.gle/Dg5ehCAR4AEZBnF89',
    instagram: 'https://www.instagram.com/linkcollect/',
    discord: 'https://discord.gg/askwhy-1074020862489022514',
    x: 'https://x.com/linkcollect_io'
}

const Footer = ({ analytics }) => {
	const navigate = useNavigate();
	return (
		<footer className='w-screen flex flex-col lg:px-[5rem] border-t-[1px] bg-neutral-50 border-t-neutral-300 text-neutral-800'>
        <div className='footer-content py-[4rem] px-[2rem] lg:px-0 flex flex-col gap-[4rem] lg:gap-0 lg:flex-row justify-between'>
          <div className='logo max-w-[400px]'>
            <img onClick={() => navigate('/')} src={MainLogo} alt="" className='h-[2.5rem] mb-[1rem]'/>
            <p className='text-start'>When you find something you like on the internet, save it with linkcollect before you forget</p>
          </div>
          <div className='links flex flex-col lg:flex-row justify-between gap-[2rem] lg:gap-[4.5rem] '>
            <div className='flex flex-col items-start'>
              <a href={links.extensionUrl} rel="noreferrer" target='_blank' className='mb-[1rem]'>Install Extension</a>
              <a href="https://linkcollect.io/explore" rel="noreferrer" target='_blank' className='mb-[1rem]'>Explore Collections</a>
            </div>
            <div className='flex flex-col items-start'>
              <a href="#features" rel="noreferrer" className='mb-[1rem]'>How it works </a>
              <a href={links.feedback} rel="noreferrer" target='_blank' className='mb-[1rem]'>Feedback</a>
            </div>
            <div className='flex flex-col items-start'>
              <a href={links.instagram} rel="noreferrer" target='_blank' className='mb-[1rem]'>Instagram</a>
              <a href={links.x} rel="noreferrer" target='_blank' className='mb-[1rem]'>X / Twitter</a>
              <a href={links.discord} rel="noreferrer" target='_blank' className='mb-[1rem]'>Discord</a>
            </div>
          </div>
        </div>
        <div className='copyright border-2 border-neutral-200 lg:border-none py-[1.25rem] px-[2rem] lg:px-0 flex flex-col lg:flex-row gap-[1rem] justify-between text-neutral-500 w-full'>
          <p>Copyright © 2023 linkCollect.io</p>
          <div className='flex gap-[2rem] justify-between lg:justify-start'>
            <a href={links.contact} target='_blank' rel='noreferrer'>Contact Us</a>
            <a href='https://linkcollect.io/privacy' target='_blank' rel='noreferrer'>Privacy Policy</a>
          </div>
        </div>
		</footer>
	);
};

export default Footer;
