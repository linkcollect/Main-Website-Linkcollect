import React from 'react'

const TabContent = ({children, activeTab, aria_labelledby, id}) => {
    return (
        <div
            className={`${activeTab === id ? 'block' : 'hidden'} w-full `}
            id={id}
            role="tabpanel"
            aria-labelledby={aria_labelledby}
        >
            {children}
        </div>)
}

export default TabContent