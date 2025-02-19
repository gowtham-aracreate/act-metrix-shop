import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Dashboard = ({children}) => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





