import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from '../components/cards';
import sales from '../assets/sales.svg';
import order from '../assets/order.svg';
const options = [
  { label: 'This Month', href: '#' },
  { label: 'Last Month', href: '#' },
  { label: 'Last Week', href: '#' },
];

const fields = [
  {
    icon: sales,
    alt: 'Sales',
    cardStyle: 'bg-blue-200 rounded-lg w-[322px] h-[145px]',
    dropdownButtonStyle: 'text-gray-400 border-none',
    dropdownMenuStyle: 'bg-white',
    dropdownButtonText: 'This Week',
    dropdownOptions: options,
    title1: 'Sales',
    subTitle1:'₦0.00',
    title2: 'Volume',
    subTitle2: '0',

  },
  {
    icon: sales,
    alt: 'Sales',
    cardStyle: 'bg-blue-200 rounded-lg w-[322px] h-[145px]',
    dropdownButtonStyle: 'text-gray-400  border-none',
    dropdownMenuStyle: 'bg-white',
    dropdownButtonText: 'This Week',
    dropdownOptions: options,
    title1: 'Sales',
    subTitle1:'₦0.00',
    title2: 'Volume',
    subTitle2: '0',

  },
  {
    icon: order,
    alt: 'Orders',
    cardStyle: 'bg-blue-300 rounded-lg w-[426px] h-[145px] ',
    dropdownButtonStyle: 'text-gray-400 border-none ',
    dropdownMenuStyle: 'bg-white',
    dropdownButtonText: 'This Week',
    dropdownOptions: options,
    title1: 'Orders',
    subTitle1:'0',
    title2: 'Active',
    subTitle2: '0',
    title3: 'Pending',
    subTitle3: '0',
  },
];

const InventoryPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Cards
        fields={fields}
        cardplace='flex flex-row gap-4'
      />
    </div>
  );
};

export default InventoryPage;
