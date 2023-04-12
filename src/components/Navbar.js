import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import mainLogo from '../assets/mainLogo.svg'
import Banner from './Banner/Banner'




export default function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="ml-10 p-1.5">
{/* <h1>Expense Tracker</h1> */}
          <img src={mainLogo} alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
             <img  />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>

    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        {/* <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[100rem] -translate-x-1/2  bg-gradient-to-tr from-[#9092FF] to-[#9092FF] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
background: "linear-gradient(257deg, rgba(147,149,255,1) 19%, rgba(255,253,253,1) 69%)"
                 }}
        /> */}
        <div className='relative aspect-[1155/1151] ' style={{
background:"linear-gradient(257deg, rgba(147,149,255,1) 19%, rgba(255,253,253,1) 69%)"}} />
      </div>
      <div className="mx-auto max-w-2xl pt-28 sm:py-53 lg:py-30">
      
        <Banner/>
        </div>
        </div>
  </div>
  )
}