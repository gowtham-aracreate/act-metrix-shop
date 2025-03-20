import React from 'react'
import Sidebar from "../layout/Sidebar";
import Cards from '../components/Cards';
import upload from '../assets/upload.svg';
import sales from '../assets/sales.svg';
import view from '../assets/view.svg';
import order from '../assets/order.svg';
import Table from '../components/Table';

export const OrderDetail = () => {
    const tableTitle = [
        "Order Date",
        "Order Type",
        "Tracking ID",
        "Order Total",
        "Action",
        "Status",
    ];

    const fields = [
        {
            icon: sales,
            alt: "Sales",
            cardStyle: "bg-white rounded-lg w-[345px] h-[140px]",
            maintitleStyle: " px-2 justify-between",
            dropdownButtonStyle: "text-gray-400 border-none pr-10",
            dropdownMenuStyle: "bg-white",
            dropdownButtonText: "This Week",
            titleStyle: "text-[#8B8D97] text-[14px]",
            subtitleStyle: "font-bold text-[#45464E]",
            title1: "Total Orders",
            subTitle1: "10",
            title2: "Home Delivery",
            subTitle2: "10",
            title3: "Pickup",
            subTitle3: "10",
        },
        {
            icon: order,
            alt: "Sales",
            cardStyle: "bg-white rounded-lg w-[345px] h-[140px]",
            maintitleStyle: " px-3 justify-between",
            dropdownButtonStyle: "text-gray-400 border-none pr-10",
            dropdownMenuStyle: "bg-white",
            dropdownButtonText: "This Week",
            titleStyle: "text-[#8B8D97] text-[15px]",
            subtitleStyle: "font-bold text-[#45464E]",
            title1: "All Orders",
            subTitle1: "10",
            title2: "In Progress",
            subTitle2: "10",
            title3: "Completed",
            subTitle3: "10",
        },
    ];
    return (
        <div>
            <Sidebar />
            <div className='ml-64 mt-15 bg-[#5E636614] h-screen p-4'>
                <div className='ml-4'>
                    <div className='flex justify-between items-center'>
                        <div className='flex'>
                            <h1>Polo T-Shirt </h1>
                            <h1>Date Added</h1>
                            <p>12 Sept 2022 - 12:55 pm</p>
                        </div>

                        <div className='flex space-x-4'>
                            <button
                                className="bg-black inline-flex w-[150px] h-[36px] justify-center items-center rounded-lg text-[14px] text-white"
                            >
                                Edit Product
                            </button>
                            <button
                                className="bg-red-600 inline-flex w-[150px] h-[36px] justify-center items-center rounded-lg text-[14px] text-white"
                            >
                                Unpublish Product
                            </button>
                        </div>
                    </div>
                    <div className='flex justify-between mt-4'>
                        <img src={upload} alt="Product" />
                        <div className="bg-white p-4 rounded-lg w-[300px] h-[140px]">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 text-[14px]">Last Order <span className="text-black">12 Sept 2022</span></p>
                                <span className="bg-green-100 text-green-600 text-[14px] px-3 py-1 rounded-full">Published</span>
                            </div>
                            <div className="flex justify-between mt-10">
                                <div>
                                    <p className="text-[#8B8D97] text-[14px]">Price</p>
                                    <p className="text-black font-medium text-[18px]">₦25,000.00</p>
                                </div>
                                <div className='pr-10'>
                                    <p className="text-[#8B8D97] text-[14px]">In-Stock</p>
                                    <p className="text-black font-medium text-[18px]">20</p>
                                </div>
                            </div>
                        </div>
                        <Cards fields={fields} cardplace="flex flex-row gap-4" />
                    </div>
                    
                </div>
                <div className='pl-4'>
                        <Table
                            title="Orders"
                            mode="order"
                            tableTitle={tableTitle}
                            heading={tableTitle}
                            tableContent={[
                                
                                
                            ]}
                        />
                    </div>
            </div>
        </div>
    )
}
