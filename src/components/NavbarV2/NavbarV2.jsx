import React from 'react'

const NavbarV2 = () => {
    return (
        <div className='flex items-center justify-end w-full gap-5 px-20 py-3 border-b border-neutral-200 bg-neutral-50'>
            <div className="flex items-center justify-center px-0 py-2 rounded">
                <span className="text-base font-normal text-center text-neutral-600">Contact us</span>
            </div>
            <div className="flex items-center justify-center px-0 py-2 rounded">
                <span className="text-base font-normal text-center text-neutral-600">FAQs</span>
            </div>
            <div className="flex items-center justify-center px-0 py-2 rounded">
                <span className="text-base font-normal text-center text-neutral-600">Feedback</span>
            </div>
        </div>
    )
}

export default NavbarV2