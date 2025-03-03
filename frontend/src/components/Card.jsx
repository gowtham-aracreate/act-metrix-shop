import React from 'react'
import Dropdown from './dropdown'

export const Card = ({ icon, alt, cardStyle, dropdownButtonStyle, dropdownMenuStyle, dropdownButtonText, dropdownOptions, maintitleStyle, titleStyle, subtitleStyle, titles, showDropdown = true }) => {
    return (
        <div className={cardStyle}>
            <div className='relative'>
            <div className="absolute top-3 left-3">
                    <img src={icon} alt={alt} className="" />
                </div>
                {showDropdown && (
          <div className="absolute top-3 right-3 ">
            <Dropdown
              dropdownButtonStyle={dropdownButtonStyle}
              dropdownMenuStyle={dropdownMenuStyle}
              dropdownButtonText={dropdownButtonText}
              dropdownOptions={dropdownOptions}
            />
          </div>
        )}
            </div>
            <div className={`flex pt-[46px] mb-[10px] ${maintitleStyle}`}>
                {Array.isArray(titles) && titles.map((title, index) => (
                    <div key={index} className="pt-[30px] flex flex-col">
                        <p className={titleStyle}>{title.title}</p>
                        <p className={subtitleStyle}>{title.subTitle}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
