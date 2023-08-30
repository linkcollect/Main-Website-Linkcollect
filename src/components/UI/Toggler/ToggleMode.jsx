import React from 'react'
import Light from '../../../assets/lightMode.svg'
import Dark from '../../../assets/darkMode/darkMode.svg'
import LightSun from '../../../assets/lightSun.svg'
import LightMoon from '../../../assets/lightMoon.svg'

const ToggleMode = ({ selectedMode, handleSwitchMode }) => {

    return (
        <div className={`relative flex p-1 items-start gap-1.5 rounded-md border ${selectedMode === "dark" ? " border-[#303] bg-dark-primary " : " border-borderPrimary bg-neutral-100 "}`}>

            {/* light */}
            <div
                className={`z-10 rounded cursor-pointer transition-all duration-300 flex px-1 py-0.5 items-center justify-center gap-1.5`}
                onClick={() => handleSwitchMode('light')}
            >
                {selectedMode === "light" ?
                    <img src={Light} alt="" />
                    :
                    <img src={LightSun} alt="" />
                }
            </div>

            {/* dark */}
            <div
                className={`z-10 rounded cursor-pointer transition-all duration-300 flex px-1 py-0.5 items-center justify-center gap-1.5`}
                onClick={() => handleSwitchMode('dark')}
            >
                {selectedMode === "light" ?
                    <img src={Dark} alt="" />
                    :
                    <img src={LightMoon} alt="" />
                }
            </div>
            <div className={`absolute w-[49%] h-[85%] transition-transform duration-200 top-1/2 -translate-y-1/2 left-0 rounded z-[1]   ${selectedMode === 'light' ? 'translate-x-[5%] bg-borderPrimary' : 'translate-x-[100%] bg-dark-secondary '}`}>
            </div>

        </div>
    )
}

export default ToggleMode