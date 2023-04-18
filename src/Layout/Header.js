import React from 'react'

const Header = ({children}) => {
  return (
    <div className="w-full flex-2 pl-[22rem] col-span-5 py-10 pr-[7rem]">
        <div className="fixed w-[74vw] bg-bgSecondary top-0 pt-10 pb-3">
          <p className="text-left font-bold text-[30px]">Ohayo, {userName}</p>
          <div className="w-full mt-3">
            <form onSubmit={searchHnadeler}>
              <Search
                onSearch={searchHnadeler}
                onChnageHandler={setSearchQuery}
              />
            </form>
            {/* Need to add filter option here */}
          </div>

          {/* Tabs */}
          <div className="mt-10 text-left font-semibold flex relative">
            <div
              className={`p-2 cursor-pointer ${
                tab === 1 ? "border-b-2 border-b-primary" : null
              }`}
              onClick={() => tabHander(1)}
            >
              My Collections
            </div>
            <div
              className={`p-2 cursor-pointer ${
                tab === 2 ? "border-b-2 border-b-primary" : null
              }`}
              onClick={() => tabHander(2)}
            >
              Explore all
            </div>
          </div>
        </div>
    </div>
  )
}


export default Header