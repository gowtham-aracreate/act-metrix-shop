import React from 'react';
import Dropdown from './DropDown';

export const Card = ({ icon, alt, cardStyle, dropdownButtonStyle, dropdownMenuStyle, dropdownButtonText, dropdownOptions, titles }) => {
    return (
        <div className={cardStyle}>
            <div className='relative'>
                <div className="absolute top-3 left-3">
                    <img src={icon} alt={alt} className="" />
                </div>
                <div className="absolute top-3 right-3">
                    <Dropdown
                        dropdownButtonStyle={dropdownButtonStyle}
                        dropdownMenuStyle={dropdownMenuStyle}
                        dropdownButtonText={dropdownButtonText}
                        dropdownOptions={dropdownOptions}
                    />
                </div>
            </div>
            <div className="flex left-0 pt-[46px] mb-[10px]">
                {Array.isArray(titles) && titles.map((title, index) => (
                    <div key={index} className="pt-[30px] flex flex-col">
                        <p className="text-gray-600 mx-2 pr-20 pl-2">{title.title}</p>
                        <p className="mx-2 pr-20 pl-2 font-semibold">{title.subTitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};