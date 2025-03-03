import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Cards from '../components/Cards';
import Table from '../components/Table';
// import sales from '../assets/sales.svg';
// import order from '../assets/order.svg';
// const options = [
//   { label: 'This Month', href: '#' },
//   { label: 'Last Month', href: '#' },
//   { label: 'Last Week', href: '#' },
// ];

// const fields = [
//   {
//     icon: sales,
//     alt: 'Sales',
//     cardStyle: 'bg-blue-200 rounded-lg w-[322px] h-[145px]',
//     dropdownButtonStyle: 'text-gray-400 border-none',
//     dropdownMenuStyle: 'bg-white',
//     dropdownButtonText: 'This Week',
//     dropdownOptions: options,
//     title1: 'Sales',
//     subTitle1:'₦0.00',
//     title2: 'Volume',
//     subTitle2: '0',

//   },
//   {
//     icon: sales,
//     alt: 'Sales',
//     cardStyle: 'bg-blue-200 rounded-lg w-[322px] h-[145px]',
//     dropdownButtonStyle: 'text-gray-400  border-none',
//     dropdownMenuStyle: 'bg-white',
//     dropdownButtonText: 'This Week',
//     dropdownOptions: options,
//     title1: 'Sales',
//     subTitle1:'₦0.00',
//     title2: 'Volume',
//     subTitle2: '0',

//   },
//   {
//     icon: order,
//     alt: 'Orders',
//     cardStyle: 'bg-blue-300 rounded-lg w-[426px] h-[145px] ',
//     dropdownButtonStyle: 'text-gray-400 border-none ',
//     dropdownMenuStyle: 'bg-white',
//     dropdownButtonText: 'This Week',
//     dropdownOptions: options,
//     title1: 'Orders',
//     subTitle1:'0',
//     title2: 'Active',
//     subTitle2: '0',
//     title3: 'Pending',
//     subTitle3: '0',
//   },
// ];

const tableTitle =[
 'Customer name',
 'Email',
' Phone',
'Order',
'Order Total',
'Customer Since',
'Status',
];

const tableData =[
  {name:'john',email:'abc@gmail.com',phone:'39402049302',order:'23',Total:'23000',customer:'2002',status:'active'},
  {name:'john',email:'abc@gmail.com',phone:'39402049302',order:'23',Total:'23000',customer:'2002',status:'active'},
  {name:'john',email:'abc@gmail.com',phone:'39402049302',order:'23',Total:'23000',customer:'2002',status:'active'},
  {name:'john',email:'abc@gmail.com',phone:'39402049302',order:'23',Total:'23000',customer:'2002',status:'active'},
]

const table = [
  {
   heading: tableTitle,
   data:tableData,
  }
];

const InventoryPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* <Cards
        fields={fields}
        cardplace='flex flex-row gap-4'
      /> */}
      <Table
        title='Customer'
        heading={tableTitle}
        tableContent={table}
      />


    </div>
  );
};

export default InventoryPage;
