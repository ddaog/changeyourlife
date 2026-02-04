import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen bg-bg-app text-text-primary flex flex-col items-center">
            {/* 
          Removed Global Header/Footer/Padding to allow pages (Onboarding/Dashboard) 
          to control their own full-screen mobile layouts. 
      */}
            <main className="w-full h-full flex-1 relative z-10 max-w-md mx-auto shadow-2xl min-h-screen bg-bg-app">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
