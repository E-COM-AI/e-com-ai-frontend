import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#030712' }}>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute w-[900px] h-[900px] rounded-full opacity-[0.07] animate-drift"
          style={{
            top: '-250px',
            right: '-250px',
            background: 'radial-gradient(circle, #6366f1, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute w-[700px] h-[700px] rounded-full opacity-[0.05] animate-drift-alt"
          style={{
            bottom: '-150px',
            left: '-150px',
            background: 'radial-gradient(circle, #22d3ee, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            top: '50%',
            left: '40%',
            background: 'radial-gradient(circle, #10b981, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'drift 30s ease-in-out infinite reverse',
          }}
        />
      </div>

      <Header />

      <main className="relative z-10 flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;